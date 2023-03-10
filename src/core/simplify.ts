import type { SnakeApi } from '../type';
import { isFunction, runActions } from '../plugins/utils';
import type { SchemaAction, SchemaRender } from '../schema';

/**
 * Simplify plugin
 * @param api snake instance
 */

function SimplifyPlugin(api: SnakeApi) {
  api.registerHook({ name: 'simplify', argNumber: 3 });

  api.onSimplify((type, name, schema) => {
    if (type === 'action') {
      api.registerAction(name, (args, ctx) => {
        // @ts-ignore
        const actionSchema = isFunction(schema) ? schema?.(args) : schema;
        return runActions(api, ctx, actionSchema as SchemaAction);
      });
    } else if (type === 'render') {
      api.registerRender(name, (args, ctx) => {
        // @ts-ignore
        const renderSchema = isFunction(schema) ? schema?.(args) : schema;
        return api.renderSchemas(ctx, renderSchema as SchemaRender);
      });
    }
  });
}

export { SimplifyPlugin as default };
