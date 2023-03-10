import { message } from 'antd';
import type { SnakeApi, SnakeActionRegisterCallback } from '../type';

/**
 * Action plugin
 * @param api snake instance
 */

// eslint-disable-next-line no-underscore-dangle
const __actionTypes: Record<string, SnakeActionRegisterCallback | undefined> = {};

function ActionPlugin(api: SnakeApi) {
  api.registerHook({ name: 'action', argNumber: 3 });
  api.registerHook({ name: 'registerAction', argNumber: 2 });
  api.registerHook({ name: 'unregisterAction', argNumber: 1 });

  api.onRegisterAction((type, callback) => {
    __actionTypes[type] = callback;
  });

  api.onUnregisterAction((type) => {
    __actionTypes[type] = undefined;
    delete __actionTypes[type];
  });

  api.onAction((type, args, ctx = {}) => {
    if (!__actionTypes[type]) {
      const errMsg = `Unmatched action type [${type}]`;
      console.error(errMsg);
      return message.error(errMsg);
    }
    // @ts-ignore
    return __actionTypes[type](args, { ...api.getCtx(), ...ctx });
  });
}

export { ActionPlugin as default };
