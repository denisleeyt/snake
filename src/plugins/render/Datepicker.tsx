import { DatePicker } from 'antd';
import { castArray } from 'lodash';
import moment from 'moment';
import { RenderModes } from '../constants';
import type { SnakeApi } from '../../type';

const { RangePicker } = DatePicker;

function _formatDate(dates: moment.Moment[] | undefined, dateFormatter: string) {
  return dates
    ?.map((date) => (moment.isMoment(date) ? date?.format(dateFormatter) : date))
    .join('~');
}

export default function DatePickerRenderPlugin(api: SnakeApi) {
  api.registerRender('date-picker', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <span>{_formatDate(castArray(value), props?.format ?? 'YYYY-MM-DD')}</span>;
    }
    return <DatePicker value={value} onChange={onChange} {...props} />;
  });

  api.registerRender('range-picker', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <span>{_formatDate(castArray(value), props?.format ?? 'YYYY-MM-DD')}</span>;
    }

    return <RangePicker value={value} onChange={onChange} {...props} />;
  });
}
