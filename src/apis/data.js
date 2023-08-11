import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import relativeTime from 'dayjs/plugin/relativeTime';

export const chatTimeFormat = (data) => {
  dayjs.locale('zh-tw');
  const currentTime = dayjs();
  const messageTime = dayjs(data)

  if (currentTime.diff(messageTime, 'day') >= 365) {
    return dayjs(data).format('YYYY年MM月DD日・A hh:mm ');
  }
  if (currentTime.diff(messageTime, 'day') < 1) {
    return dayjs(data).format('A hh:mm');
  }
  return dayjs(data).format('MM月DD日・A hh:mm ');
}

export const YMDTimeFormat = (data) => {
  dayjs.extend(relativeTime);
  dayjs.locale('zh-tw');
  return dayjs(data).format('A hh:mm・YYYY年MM月DD日 ');
}