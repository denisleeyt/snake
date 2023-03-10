import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { FormInstance } from 'antd';
import { Drawer } from 'antd';
import classNames from 'classnames';
import type { SnakeApi } from '../../type';
import { SchemaForm } from './Form';
import { DrawerActions, RenderModes } from '../constants';
import { formatFieldsValues, renderSchemas, merge } from '../utils';
import { useCompareEffect, useEvent } from '../hooks';
import type { SchemaComponentType } from '../type';

// @ts-ignore
export const SchemaDrawerForm: React.FC<SchemaComponentType> = ({
  api,
  ctx,
  form = {},
  props = {},
  ...restProps
}) => {
  const [data, setData] = useState({ visible: false, form, ctx });
  const formRef = useRef<FormInstance>();
  const toolbarRef = useRef(null);

  // useMemo(() => {
  // }, []);
  const setToolbarPrimaryButtonDisabled = useEvent((value: boolean) => {
    if (toolbarRef?.current) {
      // @ts-ignore
      // eslint-disable-next-line react/no-find-dom-node
      const toolbarDom = ReactDOM.findDOMNode(toolbarRef?.current);
      const primaryButtons = Array.prototype.slice.call(
        // @ts-ignore
        toolbarDom?.getElementsByClassName('ant-btn ant-btn-primary'),
      );
      primaryButtons.forEach((btn) => {
        if (value) {
          btn.setAttribute('disabled', '');
        } else {
          btn.removeAttribute('disabled');
        }
      });
    }
  });
  useCompareEffect(() => {
    api.registerAction(DrawerActions.SHOW, (actionProps, actionCtx) => {
      // for multiple form schemas
      const formSchema = restProps?.[actionProps['schema']] ?? form;
      return setData((pre) => ({
        visible: true,
        form: merge(formSchema, actionProps?.form),
        ctx: { ...pre.ctx, ...actionCtx },
      }));
    });
    api.registerAction(DrawerActions.UPDATE, (actionProps, actionCtx) => {
      return setData((pre) => ({
        ...pre,
        form: merge(pre.form, actionProps?.form),
        ctx: { ...pre.ctx, ...actionCtx },
      }));
    });
    api.registerAction(DrawerActions.HIDE, () => {
      return setData({ visible: false, form, ctx });
    });
    api.registerAction(DrawerActions.VALIDATE_FORM, () => {
      return formRef?.current?.validateFields?.().then((values) => {
        const formattedValues = formatFieldsValues(data?.form?.fields, values);
        // console.debug('[snake][drawer-validate-form]: ', values, formattedValues);
        api.setCtx('validate-form', formattedValues);
        return formattedValues;
      });
    });
    api.registerAction(DrawerActions.DISABLE_TOOLBAR_PRIMARY_BUTTON, () =>
      setToolbarPrimaryButtonDisabled(true),
    );
    api.registerAction(DrawerActions.ENABLE_TOOLBAR_PRIMARY_BUTTON, () =>
      setToolbarPrimaryButtonDisabled(false),
    );

    return () => {
      api.unregisterAction(DrawerActions.SHOW);
      api.unregisterAction(DrawerActions.HIDE);
      api.unregisterAction(DrawerActions.VALIDATE_FORM);
      api.unregisterAction(DrawerActions.DISABLE_TOOLBAR_PRIMARY_BUTTON);
      api.unregisterAction(DrawerActions.ENABLE_TOOLBAR_PRIMARY_BUTTON);
    };
  }, [data.form]);

  return (
    data.visible && (
      <Drawer
        title={renderSchemas(
          api,
          { ...data.ctx, mode: data?.form?.mode },
          data?.form?.header?.title,
        )}
        extra={
          <div ref={toolbarRef}>
            {renderSchemas(
              api,
              { ...data.ctx, mode: data?.form?.mode },
              data?.form?.header?.toolbar,
            )}
          </div>
        }
        placement="right"
        onClose={() => setData({ visible: false, form, ctx })}
        visible={data.visible}
        maskClosable={false}
        // getContainer={false}
        // style={{ position: 'absolute' }}
        {...props}
        className={classNames('snake-container w-e', props?.className)}
        data-schema-type="drawer-form"
      >
        <SchemaForm
          ref={formRef}
          api={api}
          ctx={{ ...data.ctx, mode: data?.form?.mode }}
          // @ts-ignore
          mode={RenderModes.VIEW}
          {...data?.form}
          initialValues={{
            ...form?.initialValues,
            ...data?.form?.initialValues,
            ...data?.ctx?.record,
          }}
        />
      </Drawer>
    )
  );
};

export default function DrawerFormRenderPlugin(api: SnakeApi) {
  api.registerRender('drawer-form', (args, ctx) => {
    return <SchemaDrawerForm api={api} ctx={ctx} {...args} />;
  });
}
