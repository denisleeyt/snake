import { isNil } from 'lodash';
import type { SnakeApi } from '../../type';

export default function TextRenderPlugin(api: SnakeApi) {
  api.registerRender('text', ({ value, props }) => {
    if (isNil(value)) return null;
    return <span {...props}>{api.t(value?.toString())}</span>;
  });
}
