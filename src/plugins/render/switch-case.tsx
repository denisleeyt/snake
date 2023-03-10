import type { SnakeApi } from '../../type';
import { isEmpty, getExpressionResult } from '../utils';

export default function switchCaseRenderPlugin(api: SnakeApi) {
  api.registerRender('switch-case', (args, ctx) => {
    const { express, case: caseRenders } = args;
    const switchValue = getExpressionResult(ctx, express, '');
    const caseRender = caseRenders[switchValue?.toString()] ?? caseRenders['default'];
    if (isEmpty(caseRender)) return null;
    return api.renderSchemas(ctx, caseRender);
  });
}
