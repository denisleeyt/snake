import { Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import type { SnakeApi } from '../../type';
import { isString, runActions } from '../utils';

export default function PopconfirmRenderPlugin(api: SnakeApi) {
  api.registerRender('popconfirm', ({ title, confirm, cancel, children, props = {} }, ctx) => {
    return (
      <Popconfirm
        // okText="Yes"
        // cancelText="No"
        {...(props as PopconfirmProps)}
        title={isString(title) ? api.t(title) : api.renderSchemas(ctx, title)}
        onConfirm={() => runActions(api, ctx, confirm)}
        onCancel={() => runActions(api, ctx, cancel)}
      >
        {/* need to wrap `a` tag */}
        <a>{api.renderSchemas(ctx, children)}</a>
      </Popconfirm>
    );
  });
}
