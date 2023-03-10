import FormRenderPlugin from './Form';
import TableRenderPlugin from './Table';
import SearchTableRenderPlugin from './SearchTable/index';
import DrawerFormRenderPlugin from './DrawerForm';

import type { SnakeApi } from '../../type';

/**
 * Template plugin
 * @param api snake instance
 */

function TemplatePlugins(api: SnakeApi) {
  api.registerPlugin(FormRenderPlugin);
  api.registerPlugin(TableRenderPlugin);
  api.registerPlugin(SearchTableRenderPlugin);
  api.registerPlugin(DrawerFormRenderPlugin);
}

export { TemplatePlugins as default };
