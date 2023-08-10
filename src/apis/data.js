import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import relativeTime from 'dayjs/plugin/relativeTime';

export const chatTimeFormat = (data) => {
  dayjs.locale('zh-tw');
  const time = dayjs(data).format('A hh:mm');
  return time
}

export const YMDTimeFormat = (data) => {
  dayjs.extend(relativeTime);
  dayjs.locale('zh-tw');
  return dayjs(data).format('A hh:mm・YYYY年MM月DD日 ');
}