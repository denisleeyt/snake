import { has, omit } from 'lodash';
import moment from 'moment';
import type React from 'react';
import type {
  Schema,
  SchemaActionRemote,
  SchemaActionRemoteResponse,
  SchemaColumn,
  SchemaField,
} from '../../schema';
import type { SnakeApi, SnakeCtx } from '../../type';
import {
  getCompiledTemplate,
  getExpressionResult,
  isArray,
  isEmpty,
  isObject,
  isString,
} from './lang';

/**
 * Normalize schema: string => schema
 * @param schema
 * @param identifier
 */
export function normalizeSchema(schema: Schema, identifier: string = 'type'): Schema {
  if (isEmpty(schema)) return {};
  if (isString(schema)) {
    return { [identifier]: schema };
  } else if (isObject(schema) && schema[identifier] !== undefined) {
    return schema;
  }
  return {};
}

/**
 * Normalize table column configuration
 * @param column
 */
export function normalizeColumn(column: SchemaColumn): SchemaColumn {
  const { dataIndex } = column;
  if (dataIndex === undefined) return { ...column, dataIndex: column.key };
  return column;
}

/**
 * Normalize form field configuration
 * @param field
 */
export function normalizeField(field: SchemaField): SchemaField {
  const { type = field.render } = field.render || 'input';

  switch (type) {
    case 'switch':
      return {
        ...field,
        valuePropName: 'checked',
      };
    case 'upload':
      return {
        ...field,
        valuePropName: 'fileList',
      };
    default:
      return field;
  }
}

function _omitFieldRenderRemote(field: SchemaField): SchemaField {
  const { render, ...restField } = field;
  if (isEmpty(render)) return restField as SchemaField;
  return {
    ...restField,
    render: isObject(render) ? omit(render, 'remote') : render,
    // @ts-ignore
    _remote_: render?.remote?.url ?? '',
  };
}

/**
 * Normalize form fields configuration with data
 * @param ctx
 * @param fields
 * @param changedFields
 */
export function normalizeFields(
  ctx: SnakeCtx,
  fields: SchemaField[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changedFields?: string[],
): SchemaField[] {
  return fields.map((f: SchemaField) => {
    // if (isEmpty(f.dependency)) {
    //   return _omitFieldRenderRemote(f);
    // }

    // TODO. to separate dependency on `visible` | `disabled` | ...
    // has changedFields, need to update cascade values
    // const { relates = [] } = f.dependency ?? {};
    // const isCascade = relates.some((r: string) => changedFields?.includes(r));
    // if (isCascade) {}
    const visible = getExpressionResult(ctx, f?.visible, true);
    const disabled = getExpressionResult(ctx, f?.disabled, false);
    return _omitFieldRenderRemote({
      ...f,
      visible,
      disabled,
    });
  });
}

/**
 * Normalize form fields configuration with remote data, consider initialize and cascade cases
 * @param api
 * @param ctx
 * @param formFieldRemoteData
 * @param fields
 * @param fieldsList
 * @param changedFields
 */
export function normalizeFieldsWithRemote(
  api: SnakeApi,
  ctx: SnakeCtx,
  formFieldRemoteData: React.MutableRefObject<object>,
  fields: SchemaField[],
  fieldsList?: SchemaField[],
  changedFields?: string[],
) {
  const remotePromises = fields
    .filter((f) => !isEmpty(f?.render?.remote))
    .filter(
      (f) =>
        isEmpty(changedFields) || f?.dependency?.relates?.some((r) => changedFields?.includes(r)),
    )
    .map((f) => {
      const remoteSchema = normalizeSchema(f?.render?.remote as Schema, 'url');
      return api
        .action('remote', remoteSchema as SchemaActionRemote, ctx)
        .then((res: SchemaActionRemoteResponse) => {
          return [`${f.name}_${f?.render?.remote?.url ?? ''}`, res?.result ?? []];
        })
        .catch(() => {
          // deal with remote error
          return [`${f.name}_${f?.render?.remote?.url ?? ''}`, []];
        });
    });
  return Promise.all(remotePromises).then((remoteDataList) => {
    // const finalFieldsList = isEmpty(fieldsList)
    //   ? normalizeFields(ctx, fields, changedFields)
    //   : fieldsList;
    const finalFieldsList = normalizeFields(ctx, fields, changedFields);
    return finalFieldsList?.map((f) => {
      // @ts-ignore
      const remoteKey = `${f.name}_${f?._remote_ ?? ''}`;
      const selectRemote = remoteDataList.find((r) => r[0] === remoteKey);
      if (selectRemote) {
        formFieldRemoteData.current[selectRemote[0]] = selectRemote[1];
        return {
          ...f,
          render: { ...f.render, options: selectRemote[1] },
        };
      } else if (formFieldRemoteData.current[remoteKey]) {
        return {
          ...f,
          render: { ...f.render, options: formFieldRemoteData.current[remoteKey] },
        };
      }
      return f;
    });
  });
}

/**
 * Normalize form fields values before render
 * @param fields
 * @param values
 * @returns
 */
export function normalizeFieldsValues(fields: SchemaField[], values: any, ctx: SnakeCtx) {
  if (isEmpty(values)) return {};
  return fields.reduce((pre, f: SchemaField) => {
    const { type = f.render, rangeNames = [] } = f.render || 'input';
    let value = getCompiledTemplate(ctx, values[f.name]);
    if (has(values, f.name)) {
      switch (type) {
        case 'date-picker':
          value = getMomentResult(value);
          break;
        case 'range-picker':
          value = isArray(value) ? value.map((v: string | number) => getMomentResult(v)) : [];
          break;
        default:
      }
      return { ...pre, [f.name]: value };
    }

    if (type === 'range-picker' && rangeNames.length) {
      value = [getMomentResult(values[rangeNames[0]]), getMomentResult(values[rangeNames[1]])];
      return { ...pre, [f.name]: value };
    }

    return pre;
  }, {});
}

/**
 * Parse time value to moment format
 * @param value
 * @returns
 */
export function getMomentResult(value: string | number) {
  return moment(typeof value === 'string' ? value : value * 1000);
}
/**
 * to Non Exponential, ex: 1e-8 to 0.00000001
 * @param fields
 * @param values
 * @returns
 */
export function toNonExponential(num: number = 0) {
  const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  if (!m) return 0;
  const m2 = m[2] as any;
  return num.toFixed(Math.max(0, (m[1] || '').length - m2));
}

/**
 * Format Thousands
 * @param values
 * @returns
 */
export function _formatThousands(value: number | undefined) {
  const val = toNonExponential(value);
  const parts = val?.toString()?.split('.') ?? [''];
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * Format fields values before submit
 * @param fields
 * @param values
 * @returns
 */
export function formatFieldsValues(fields: SchemaField[], values: any) {
  if (isEmpty(values)) return {};
  return fields.reduce((a, f: SchemaField) => {
    if (has(values, f.name)) {
      let value = values[f.name];
      const { type = f.render, submitFormat, rangeNames = [] } = f.render;
      switch (type) {
        case 'input-number':
          value = toNonExponential(Number(value));
        case 'date-picker':
          value = moment.isMoment(value)
            ? submitFormat
              ? moment(value).format(submitFormat)
              : value.valueOf() / 1000
            : value;
          break;
        case 'range-picker':
          value = value?.map((v: any) =>
            moment.isMoment(v)
              ? submitFormat
                ? moment(v).format(submitFormat)
                : v.valueOf() / 1000
              : v,
          );
          break;
        default:
      }

      return rangeNames.length && value?.length
        ? {
            ...a,
            [rangeNames[0]]: value[0],
            [rangeNames[1]]: value[1],
          }
        : {
            ...a,
            [f.name]: value,
          };
    }
    return a;
  }, {});
}
