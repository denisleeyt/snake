import moment from 'moment';
import type { SnakeApi } from '../../type';

export default function FormatTimeRenderPlugin(api: SnakeApi) {
  api.registerRender('format-time', ({ value, props, format = 'YYYY-MM-DD HH:mm:ss' }) => {
    return <span {...props}>{moment(value * 1000).format(format)}</span>;
  });
}
