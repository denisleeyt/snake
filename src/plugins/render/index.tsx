import type { SnakeApi } from '../../type';

import IconRenderPlugin from './Icon';
import TextRenderPlugin from './Text';
import TemplateStringRenderPlugin from './TemplateString';
import TooltipRenderPlugin from './Tooltip';
import ButtonRenderPlugin from './Button';
import SpaceRenderPlugin from './Space';
import InputRenderPlugin from './Input';
import MaskRenderPlugin from './Mask';
import InputNumberRenderPlugin from './InputNumber';
import SelectRenderPlugin from './Select';
import SelectSearchRenderPlugin from './SelectSearch';
import RadioRenderPlugin from './Radio';
import SwitchRenderPlugin from './Switch';
import CheckboxRenderPlugin from './Checkbox';
import UploadRenderPlugin from './Upload';
import conditionRenderPlugin from './condition';
import switchCaseRenderPlugin from './switch-case';
import DatePickerRenderPlugin from './Datepicker';
import ExpressStringRenderPlugin from './ExpressString';
import FormatTimeRenderPlugin from './FormatTime';
import ImageRenderPlugin from './Image';
import PopconfirmRenderPlugin from './Popconfirm';
import LinkRenderPlugin from './Link';
import HtmlRenderPlugin from './Html';
import MultipleRowEditorRenderPlugin from './MultipleRowEditor';

/**
 * Render plugins
 * @param api snake instance
 */

function RenderPlugins(api: SnakeApi) {
  api.registerPlugin(IconRenderPlugin);
  api.registerPlugin(TextRenderPlugin);
  api.registerPlugin(TemplateStringRenderPlugin);
  api.registerPlugin(TooltipRenderPlugin);
  api.registerPlugin(ButtonRenderPlugin);
  api.registerPlugin(SpaceRenderPlugin);
  api.registerPlugin(InputRenderPlugin);
  api.registerPlugin(MaskRenderPlugin);
  api.registerPlugin(InputNumberRenderPlugin);
  api.registerPlugin(SelectRenderPlugin);
  api.registerPlugin(SelectSearchRenderPlugin);
  api.registerPlugin(RadioRenderPlugin);
  api.registerPlugin(SwitchRenderPlugin);
  api.registerPlugin(CheckboxRenderPlugin);
  api.registerPlugin(UploadRenderPlugin);
  api.registerPlugin(conditionRenderPlugin);
  api.registerPlugin(switchCaseRenderPlugin);
  api.registerPlugin(DatePickerRenderPlugin);
  api.registerPlugin(ExpressStringRenderPlugin);
  api.registerPlugin(FormatTimeRenderPlugin);
  api.registerPlugin(ImageRenderPlugin);
  api.registerPlugin(PopconfirmRenderPlugin);
  api.registerPlugin(LinkRenderPlugin);
  api.registerPlugin(HtmlRenderPlugin);
  api.registerPlugin(MultipleRowEditorRenderPlugin);
}

export { RenderPlugins as default };
