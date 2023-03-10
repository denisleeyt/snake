import moment from 'moment';
import momentTZ from 'moment-timezone';

export const upperFirst = (text: string) => {
  return text.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};

/**
 * Reset timezone for project
 *  UTC-0: Europe/London
 * @param timezone
 */
export const setTimeZone = (timezone?: string) => {
  momentTZ.tz.setDefault(timezone);
}

/**
 * Get timezone
 *  UTC-0: Europe/London
 */
export const getTimeZone = () => {
  // @ts-ignore
  return moment?.defaultZone?.name ?? momentTZ.tz.guess();
}
