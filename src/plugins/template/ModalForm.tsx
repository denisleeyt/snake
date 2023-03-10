import React, { useEffect, useState, useRef } from 'react';
import { Modal } from 'antd';
import type { FormInstance } from 'antd';
import type { SnakeApi } from '../../type';
import { SchemaForm } from './Form';
import { ModalActions, RenderModes } from '../constants';
import { formatFieldsValues, merge } from '../utils';
import type { SchemaComponentType } from '../type';

// @ts-ignore
export const SchemaModalForm: React.FC<SchemaComponentType> = ({
  api,
  ctx,
  form = {},
  props = {},
  ...restProps
}) => {
  const [data, setData] = useState({ visible: false, form, ctx });
  const formRef = useRef<FormInstance>();

  // useMemo(() => {
  // }, []);
  useEffect(() => {
    api.registerAction(ModalActions.SHOW, (actionProps, actionCtx) => {
      // for multiple form schemas
      const formSchema = restProps?.[actionProps['schema']] ?? form;
      return setData((pre) => ({
        visible: true,
        form: merge(formSchema, actionProps?.form),
        ctx: { ...pre.ctx, ...actionCtx },
      }));
    });
    api.registerAction(ModalActions.HIDE, () => {
      return setData({ visible: false, form, ctx });
    });
    api.registerAction(ModalActions.VALIDATE_FORM, () => {
      return formRef?.current
        ?.validateFields?.()
        .then((values) => formatFieldsValues(data?.form?.fields, values));
    });

    return () => {
      api.unregisterAction(ModalActions.SHOW);
      api.unregisterAction(ModalActions.HIDE);
    };
  }, []);

  return (
    data?.visible && (
      <Modal
        title={api.renderSchemas(
          { ...data.ctx, mode: data?.form?.mode },
          data?.form?.header?.title,
        )}
        footer={api.renderSchemas(
          { ...data.ctx, mode: data?.form?.mode },
          data?.form?.header?.toolbar,
        )}
        // @ts-ignore
        onClose={() => setData({ visible: false, form, ctx })}
        onCancel={() => setData({ visible: false, form, ctx })}
        visible={data.visible}
        maskClosable={false}
        {...props}
      >
        <SchemaForm
          ref={formRef}
          api={api}
          ctx={data.ctx}
          // @ts-ignore
          mode={RenderModes.VIEW}
          {...data?.form}
          initialValues={data?.ctx?.record ?? data?.form?.initialValues ?? form?.initialValues}
        />
      </Modal>
    )
  );
};

export default function ModalFormRenderPlugin(api: SnakeApi) {
  api.registerRender('modal-form', (args, ctx) => {
    return <SchemaModalForm api={api} ctx={ctx} {...args} />;
  });
}
