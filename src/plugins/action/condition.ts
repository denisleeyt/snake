import type { SnakeApi } from '../../type';
import { getExpressionResult, runActions } from '../utils';

export default function conditionActionPlugin(api: SnakeApi) {
  api.registerAction('condition', async (args, ctx) => {
    const { express, action, chained = false } = args;
    const valid = getExpressionResult(ctx, express, false);
    // console.debug('[snake][condition]:', valid, express, ctx);
    if (valid) {
      const actionsChain = await runActions(api, ctx, action);
      if (chained) return actionsChain;
    }
    return ctx?.chain;
  });
}
