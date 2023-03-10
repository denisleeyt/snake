import { message } from 'antd';
import type { SnakeApi } from '../../type';
import { isString } from '../utils';

export default function messageActionPlugin(api: SnakeApi) {
  api.registerAction('message', ({ level = 'info', content, duration = 1.5 }, ctx) => {
    const msgContent = isString(content) ? api.t(content) : api.renderSchemas(ctx, content);
    return message[level](msgContent, [duration]);
  });
}
