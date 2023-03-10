import ErrorTip from '../_components/ErrorTip';
import type { SnakeApi, SnakeRenderRegisterCallback } from '../type';

/**
 * Render plugin
 * @param api snake instance
 */

// eslint-disable-next-line no-underscore-dangle
const __renderTypes: Record<string, SnakeRenderRegisterCallback | undefined> = {};

function RenderPlugin(api: SnakeApi) {
  api.registerHook({ name: 'render', argNumber: 3 });
  api.registerHook({ name: 'registerRender', argNumber: 2 });
  api.registerHook({ name: 'unregisterRender', argNumber: 1 });

  api.onRegisterRender((type, callback) => {
    __renderTypes[type] = callback;
  });

  api.onUnregisterRender((type) => {
    __renderTypes[type] = undefined;
    delete __renderTypes[type];
  });

  api.onRender((type, args, ctx = {}) => {
    if (!__renderTypes[type]) {
      return <ErrorTip type={type} />;
    }
    // @ts-ignore
    return __renderTypes[type](args, { ...api.getCtx(), ...ctx });
  });
}

export { RenderPlugin as default };
