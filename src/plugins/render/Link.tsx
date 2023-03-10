import { Button } from 'antd';
import type { SnakeApi } from '../../type';
import { getReplacedTemplate } from '../utils';

export default function ButtonRenderPlugin(api: SnakeApi) {
  api.registerRender('link', ({ children, onClick, props, href, isInner = true }, ctx) => {
    const _href = getReplacedTemplate(ctx, href);
    return (
      <Button
        onClick={() => {
          if (isInner) {
            ctx?.history?.push(_href);
          } else {
            onClick?.();
          }
        }}
        {...props}
        href={isInner ? null : _href}
      >
        <span>{api.renderSchemas(ctx, children)}</span>
      </Button>
    );
  });
}
