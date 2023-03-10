import type { SnakeApi } from '../../type';
import { isEmpty, getExpressionResult, runActions } from '../utils';

export default function switchActionPlugin(api: SnakeApi) {
  api.registerAction('switch', async (args, ctx) => {
    const { express, case: caseActions, chained = false } = args;
    const switchValue = getExpressionResult(ctx, express, '');
    const caseAction = caseActions[switchValue?.toString()] ?? caseActions['default'];
    // console.debug('[snake][switch]:', switchValue, express, ctx, caseAction);
    if (!isEmpty(caseAction)) {
      const actionsChain = await runActions(api, ctx, caseAction);
      if (chained) return actionsChain;
    }
    return ctx?.chain;
  });
}
