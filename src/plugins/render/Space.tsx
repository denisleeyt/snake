import { Space } from 'antd';
import type { SnakeApi } from '../../type';

export default function SpaceRenderPlugin(api: SnakeApi) {
  api.registerRender('space', ({ children, props }, ctx) => {
    return <Space {...props}>{api.renderSchemas(ctx, children)}</Space>;
  });
}
