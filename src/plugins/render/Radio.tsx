import { Radio } from 'antd';
import { EMPTY_ARRAY, RenderModes } from '../constants';
import type { SnakeApi } from '../../type';
import OptionView from '../_components/OptionView';

export default function RadioRenderPlugin(api: SnakeApi) {
  api.registerRender('radio', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return value;
    }
    return (
      <Radio
        // defaultValue={value}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  });

  api.registerRender(
    'radio-group',
    ({ mode = RenderModes.ADD, value, onChange, options = EMPTY_ARRAY, props }) => {
      if (mode === RenderModes.VIEW) {
        return <OptionView api={api} value={value} options={options} />;
      }
      return (
        <Radio.Group
          value={value}
          onChange={(e) => onChange?.(e?.target?.value)}
          options={options}
          // defaultValue={value}
          {...props}
        />
      );
    },
  );
}
