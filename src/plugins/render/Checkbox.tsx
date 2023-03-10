import { Checkbox } from 'antd';
import { EMPTY_ARRAY, RenderModes } from '../constants';
import type { SnakeApi } from '../../type';
import OptionView from '../_components/OptionView';

export default function CheckboxRenderPlugin(api: SnakeApi) {
  api.registerRender('checkbox', ({ mode = RenderModes.ADD, children, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <span>{value}</span>;
    }
    return (
      <Checkbox value={value} onChange={onChange} {...props}>
        {children}
      </Checkbox>
    );
  });

  api.registerRender(
    'checkbox-group',
    ({ mode = RenderModes.ADD, options = EMPTY_ARRAY, value, onChange, props }) => {
      if (mode === RenderModes.VIEW) {
        return <OptionView api={api} value={value} options={options} />;
      }
      return <Checkbox.Group value={value} onChange={onChange} options={options} {...props} />;
    },
  );
}
