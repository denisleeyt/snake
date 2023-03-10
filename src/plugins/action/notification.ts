import { notification } from 'antd';
import type { SnakeApi } from '../../type';
import { isString } from '../utils';

export default function notificationActionPlugin(api: SnakeApi) {
  api.registerAction(
    'notification',
    ({ level = 'info', message, description, placement = 'topRight', duration = 4.5 }, ctx) => {
      const msgContent = isString(message) ? api.t(message) : api.renderSchemas(ctx, message);
      const descContent = isString(description)
        ? api.t(description)
        : api.renderSchemas(ctx, description);
      return notification[level]({
        message: msgContent,
        description: descContent,
        placement,
        duration,
      });
    },
  );
}
