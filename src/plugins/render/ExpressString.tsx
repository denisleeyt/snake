import type { SnakeApi } from '../../type';
import { getExpressionResult } from '../utils';

export default function ExpressStringRenderPlugin(api: SnakeApi) {
  api.registerRender('express-string', ({ value, props }, ctx) => {
    const expressionResult = getExpressionResult(ctx, value, value);
    return (
      <span title={expressionResult} {...props}>
        {expressionResult}
      </span>
    );
  });
}
