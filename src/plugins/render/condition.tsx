import type { SnakeApi } from '../../type';
import { getExpressionResult } from '../utils';

export default function conditionRenderPlugin(api: SnakeApi) {
  api.registerRender('condition', (args, ctx) => {
    const { express, render } = args;
    const valid = getExpressionResult(ctx, express, false);
    if (!valid) {
      return null;
    }
    return api.renderSchemas(ctx, render);
  });
}
