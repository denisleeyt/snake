import React from 'react';
import type { SnakeApi } from '../../type';

export default function HtmlRenderPlugin(api: SnakeApi) {
  api.registerRender('html', ({ tag, children, props }, ctx) => {
    return React.createElement(tag, props, api.renderSchemas(ctx, children));
  });
}
