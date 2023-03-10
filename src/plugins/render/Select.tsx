import React, { useState } from 'react';
import { Select } from 'antd';
import { castArray, isEqual } from 'lodash';
import { EMPTY_ARRAY, RenderModes } from '../constants';
import type { SnakeApi } from '../../type';
import type {
  SchemaOptionType,
  SchemaActionRemoteResponse,
  Schema,
  SchemaActionRemote,
  SchemaRender,
} from '../../schema';
import OptionView from '../_components/OptionView';
import { isArray, isString, isEmpty, normalizeSchema, isObject } from '../utils';
import type { SchemaComponentType } from '../type';
import { useCompareEffect, usePrevious } from '../hooks';

const SchemaSelect: React.FC<SchemaComponentType> = ({
  api,
  ctx,
  mode = RenderModes.ADD,
  value,
  onChange,
  disabled = false,
  remote,
  options: initOptions = EMPTY_ARRAY,
  autoClear = false,
  autoSwap = false,
  props = {},
}) => {
  const [options, setOptions] = useState(initOptions);

  // for case when options changed
  useCompareEffect(() => {
    if (!isEqual(initOptions, options)) {
      setOptions(initOptions);
    }
  }, [initOptions]);

  useCompareEffect(() => {
    if (remote) {
      const remoteSchema = normalizeSchema(remote as Schema, 'url');
      api
        .action('remote', remoteSchema as SchemaActionRemote, ctx)
        .then((res: SchemaActionRemoteResponse) => {
          setOptions(res?.result ?? []);
        })
        .catch(() => {
          setOptions([]);
        });
    }
  }, [remote]);

  const previousOptions = usePrevious(options);
  useCompareEffect(() => {
    if (!isEmpty(options) && isArray(options) && !isEqual(previousOptions, options)) {
      // trigger reset
      // case1. nullable & ( not empty & value unmatched )
      // case2. not nullable & (empty | value unmatched)
      const nullable = props?.allowClear !== false;
      const unmatched = !options.some(({ value: ov }: SchemaOptionType) =>
        castArray(value).includes(ov),
      );
      // if (nullable && !isEmpty(value) && unmatched) {
      //   onChange?.(options[0].value);
      // } else if (!nullable && (isEmpty(value) || unmatched)) {
      //   onChange?.(options[0].value);
      // }
      if (isEmpty(value)) {
        if (!nullable) onChange?.(options[0].value);
      } else if (unmatched) {
        if (autoClear) {
          onChange?.(undefined);
        } else if (autoSwap) {
          onChange?.(options[0].value);
        }
      }
    }
  }, [value, options]);

  if (mode === RenderModes.VIEW || disabled) {
    return <OptionView api={api} value={value} options={options} />;
  }

  const filterOption = (input: string, option: Record<string, any>) =>
    isString(props?.filterOption)
      ? new Function('input', 'option', `return ${props?.filterOption}`)(input, option)
      : option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0;

  const memoOptions = options.map((item: { value: any; label: SchemaRender | SchemaRender[] }) => ({
    value: item.value,
    label: isObject(item?.label)
      ? api.renderSchemas(ctx, item?.label)
      : isEmpty(item?.label)
      ? item?.value
      : api.t(item?.label),
  }));
  return (
    <Select
      value={value}
      onChange={onChange}
      allowClear={true}
      showSearch={true}
      {...props}
      // @ts-ignore
      filterOption={filterOption}
      options={memoOptions}
      placeholder={props?.placeholder ? (api.t(props.placeholder) as string) : undefined}
    />
  );
};

export default function SelectRenderPlugin(api: SnakeApi) {
  api.registerRender('select', (args, ctx) => {
    return <SchemaSelect api={api} ctx={ctx} {...args} />;
  });
}
