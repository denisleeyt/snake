import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import type { SnakeApi } from '../../type';
import { isString } from '../_utils/lang';

export default function TooltipRenderPlugin(api: SnakeApi) {
  api.registerRender('tooltip', ({ title, children, props }, ctx) => {
    return (
      <Tooltip
        title={isString(title) ? title : api.renderSchemas(ctx, title)}
        {...(props as TooltipProps)}
      >
        <span>{api.renderSchemas(ctx, children)}</span>
      </Tooltip>
    );
  });
}
