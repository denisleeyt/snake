import moment from 'moment';
import { DateFormatter } from './constants';
/**
 *
 * @param text
 * @param type : 0 is needed to add three zero at the end of the text, 1 is the type that can transform without any further handling
 * @returns
 */
export const transferTimeString = (
  text: string,
  dateFormatter: string = DateFormatter.Date,
  type?: number,
): string => {
  return type === 1
    ? moment(parseInt(text, 10)).utc().format(dateFormatter)
    : moment(parseInt(text, 10) * 1000)
        .utc()
        .format(dateFormatter);
};
