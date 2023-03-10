import { Upload } from 'antd';
import { RenderModes } from '../constants';
import type { SnakeApi } from '../../type';

export default function UploadRenderPlugin(api: SnakeApi) {
  api.registerRender(
    'upload',
    ({ mode = RenderModes.ADD, children, value, onChange, props }, ctx) => {
      if (mode === RenderModes.VIEW) {
        return <span>{value}</span>;
      }
      return (
        <Upload onChange={onChange} {...props}>
          {api.renderSchemas(ctx, children)}
        </Upload>
      );
    },
  );
}
