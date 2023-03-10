import actionConfig from './action/plugin.config';
import renderConfig from './action/plugin.config';
import templateConfig from './template/plugin.config';

export default {
  ...templateConfig,
  action: actionConfig,
  render: renderConfig,
};
