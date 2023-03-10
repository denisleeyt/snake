import remoteActionPlugin from './remote';
import messageActionPlugin from './message';
import backActionPlugin from './back';
import conditionActionPlugin from './condition';
import switchActionPlugin from './switch';
import notificationActionPlugin from './notification';
import confirmActionPlugin from './confirm';

import type { SnakeApi } from '../../type';

/**
 * Action plugins
 * @param api snake instance
 */
function ActionPlugins(api: SnakeApi) {
  api.registerPlugin(remoteActionPlugin);
  api.registerPlugin(messageActionPlugin);
  api.registerPlugin(backActionPlugin);
  api.registerPlugin(conditionActionPlugin);
  api.registerPlugin(switchActionPlugin);
  api.registerPlugin(notificationActionPlugin);
  api.registerPlugin(confirmActionPlugin);
}

export { ActionPlugins as default };
