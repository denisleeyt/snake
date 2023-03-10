import { Switch } from 'antd';
import { RenderModes } from '../constants';
import type { SnakeApi } from '../../type';

export default function SwitchRenderPlugin(api: SnakeApi) {
  api.registerRender('switch', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <span>{value?.toString()}</span>;
    }
    return (
      <Switch
        checked={value}
        onChange={onChange}
        {...props}
      />
    );
  });
}
