import { Modal } from 'antd';
import type { SnakeApi } from '../../type';
import { isString, runActions } from '../utils';

const { confirm } = Modal;

export default function confirmActionPlugin(api: SnakeApi) {
  api.registerAction(
    'confirm',
    ({ title, content, okText, cancelText, okAction, cancelAction }, ctx) => {
      const titleContent = isString(title) ? api.t(title) : api.renderSchemas(ctx, title);
      const confirmContent = isString(content) ? api.t(content) : api.renderSchemas(ctx, content);
      return new Promise((resolve) =>
        confirm({
          title: titleContent,
          content: confirmContent,
          okText,
          cancelText,
          onOk: async () => {
            const chain = await runActions(api, ctx, okAction);
            resolve(chain);
          },
          onCancel: async () => {
            await runActions(api, ctx, cancelAction);
          },
        }),
      );
    },
  );
}
