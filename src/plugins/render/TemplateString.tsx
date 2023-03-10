import type { SnakeApi } from '../../type';
import { getCompiledTemplate } from '../utils';

export default function TemplateStringRenderPlugin(api: SnakeApi) {
  api.registerRender('template-string', ({ value, props }, ctx) => {
    return <span {...props}>{getCompiledTemplate(ctx, value)}</span>;
  });
}
