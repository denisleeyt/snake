import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Button, Form, Spin } from 'antd';
import type { Rule, RuleObject } from 'antd/lib/form';
import { omit } from 'lodash';
import { EMPTY_ARRAY, RenderModes } from '../../constants';
import type { SnakeApi } from '../../../type';
import type {
  SchemaField,
  SchemaActionRemoteResponse,
  Schema,
  SchemaActionRemote,
} from '../../../schema';
import {
  isEmpty,
  isObject,
  normalizeSchema,
  normalizeField,
  normalizeFields,
  normalizeFieldsWithRemote,
  runActions,
  normalizeFieldsValues,
  formatFieldsValues,
} from '../../utils';
import type { SchemaComponentType } from '../../type';
import { useCompareEffect } from '../../hooks';

export const SchemaForm: React.FC<SchemaComponentType> = forwardRef(
  (
    {
      api,
      ctx,
      mode = RenderModes.ADD,
      remote,
      initialValues = {},
      fields = EMPTY_ARRAY,
      submit = null,
      onSubmit,
      props,
      immediate = false,
      withLoading = false,
    },
    ref,
  ) => {
    const [formRef] = Form.useForm();
    useImperativeHandle(ref, () => formRef, [formRef]);
    const [loading, setLoading] = useState<Record<string, boolean>>({ data: false, remote: false });

    // top-level form data
    const [data, setData] = useState({
      form: normalizeFieldsValues(fields, initialValues, ctx),
      fieldsList: normalizeFields({ ...ctx, form: initialValues }, fields),
    });
    const formFieldRemoteData = useRef({});

    // load form field remote data
    useCompareEffect(() => {
      if (isEmpty(fields)) {
        if (isEmpty(data.fieldsList)) return;
        setData((pre) => ({ ...pre, fieldsList: [] }));
      } else {
        if (withLoading) setLoading((prevState) => ({ ...prevState, remote: true }));
        normalizeFieldsWithRemote(
          api,
          { ...ctx, form: data.form },
          formFieldRemoteData,
          fields,
          data.fieldsList,
          [],
        )
          .then((fieldsList) => {
            // @ts-ignore
            setData((pre) => ({ ...pre, fieldsList }));
          })
          .finally(() => {
            if (withLoading) setLoading((prevState) => ({ ...prevState, remote: false }));
          });
      }
    }, [fields, mode]);

    // load form data
    useCompareEffect(() => {
      if (remote && mode !== RenderModes.ADD) {
        const remoteSchema = normalizeSchema(remote as Schema, 'url');
        if (withLoading) setLoading((prevState) => ({ ...prevState, data: true }));
        api
          .action('remote', remoteSchema as SchemaActionRemote, ctx)
          .then((res: SchemaActionRemoteResponse) => {
            setData((pre) => ({
              ...pre,
              form: normalizeFieldsValues(fields, { ...initialValues, ...res?.result }, ctx),
            }));
            // formRef.setFieldsValue(res?.result ?? {});
            formRef.resetFields();
          })
          .finally(() => {
            if (withLoading) setLoading((prevState) => ({ ...prevState, data: false }));
          });
      }
    }, [remote?.params, mode]);

    // Deal with cascade cases
    const handleValuesChange = async (changedValues: object, allValues: object) => {
      // console.log('===> handleValuesChange: ', changedValues, allValues);
      const changedFields = Object.keys(changedValues);
      // reload remote data
      normalizeFieldsWithRemote(
        api,
        { ...ctx, form: allValues },
        formFieldRemoteData,
        fields,
        [],
        changedFields,
      ).then((fieldsList = []) => {
        // props?.onValuesChange?.(changedValues, allValues, fieldsList);
        setData((pre) => ({ ...pre, form: allValues, fieldsList }));
        // trigger submit immediately once values changed
        if (immediate && isEmpty(submit)) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleSubmit(allValues);
        }
      });
    };

    // submit actions
    const handleSubmit = async (values: Record<string, any>) => {
      const formattedValues = formatFieldsValues(fields, values);
      setData((pre) => ({ ...pre, form: formattedValues }));
      onSubmit?.(formattedValues);
      if (!isEmpty(submit)) {
        await runActions(api, { ...ctx, form: formattedValues }, submit?.action);
      }
    };

    /**
     * add by sean.pan
     * Add a listener event and assign a value to the component
     * @param actionProps:The fields and values ​​corresponding to the form
     * @note if the value is empty, the original value of the component will be cleared
     */
    useEffect(() => {
      api.registerAction('form-refresh', (actionProps) => {
        // 对应name,form会自动赋值的
        formRef.setFieldsValue(actionProps);
      });

      return () => {
        api.unregisterAction('form-refresh');
      };
    }, []);

    // TODO. to optimize re-render
    // return useMemo(() => {}, [data.form, data.fieldsList]);
    // console.debug('[snake][form]:', data.form, data.fieldsList, formFieldRemoteData.current);
    return (
      <div data-schema-type="form" className="w-e">
        <Spin spinning={withLoading && (loading?.data || loading?.remote)} delay={200}>
          <Form
            form={formRef}
            // defaultValue={value}
            {...props}
            initialValues={data.form}
            // onValuesChange={(_, values) => setData({ ...values })}
            onValuesChange={handleValuesChange}
            onFinish={handleSubmit}
          >
            {data.fieldsList
              .filter((field: SchemaField) => {
                return field.visible !== false;
              })
              .map((field: SchemaField) => {
                const { name, label, render, disabled, rules, ...restField } =
                  normalizeField(field);

                // normalize rules message
                let _rules = rules && isObject(rules) ? ([rules] as Rule[]) : rules;
                // @ts-ignore
                _rules = _rules?.map((item) => {
                  if (typeof isObject(item)) {
                    // @ts-ignore
                    if (item.pattern) {
                      try {
                        // @ts-ignore
                        const pattern = new Function(`return ${item?.pattern}`)();
                        console.debug('[snake][form] pattern:', pattern);
                        return {
                          ...item,
                          pattern,
                          message: api.t((item as RuleObject).message),
                        };
                      } catch (error) {
                        console.error('[snake][form] pattern error:', error);
                      }
                    }
                    return {
                      ...item,
                      message: api.t((item as RuleObject).message),
                    };
                  }
                  return item;
                });

                // @ts-ignore
                const { type: renderType, ...restRender } = normalizeSchema(render as Schema);
                const children = api.render(
                  renderType,
                  {
                    value: data.form?.[name],
                    mode,
                    disabled,
                    ...restRender,
                    props: { ...(restRender?.props ?? {}), disabled },
                  },
                  { ...ctx, form: data.form },
                );
                return (
                  <Form.Item
                    key={name?.toString()}
                    name={name}
                    label={api.t(label)}
                    rules={_rules}
                    {...omit(restField, 'visible')}
                  >
                    {children}
                  </Form.Item>
                );
              })}
            {submit && (
              <Form.Item
                wrapperCol={{
                  offset: props?.labelCol?.span || (props?.layout === 'inline' ? 0 : 8),
                  span: props?.wrapperCol?.span || 0,
                }}
              >
                <Button type="primary" htmlType="submit">
                  {api.renderSchemas(ctx, omit(submit, 'action'))}
                </Button>
              </Form.Item>
            )}
          </Form>
        </Spin>
      </div>
    );
  },
);

export default function FormRenderPlugin(api: SnakeApi) {
  api.registerRender('form', (args, ctx) => {
    return <SchemaForm api={api} ctx={ctx} {...args} />;
  });
}
