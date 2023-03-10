import type { SnakeApi } from '../../type';

export default function backActionPlugin(api: SnakeApi) {
  api.registerAction('back', () => {
    window.history.back();
    return Promise.resolve();
  });
}
