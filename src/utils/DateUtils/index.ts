import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
require('dayjs/locale/id');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Jakarta');

export function formateDate(date: string, format?: string) {
  return dayjs(date).format(format ?? 'DD-MM-YYYY');
}

export function getCurrentYear() {
  return dayjs().year();
}

export function maskDate(value: string) {
  let v = value.replace(/\D/g,'').slice(0, 10);
  let date = v.slice(0,2);
  if (Number(date) > 31) {
    date = '31';
  }
  if (v.length >= 5) {
    let month = v.slice(2,4);
    let year = v.slice(4);
    if (Number(month) > 12) {
      month = '12';
    }
    if (Number(year) > getCurrentYear()) {
      year = `${getCurrentYear()}`;
    }
    return `${date}/${month}/${year}`;
  } else if (v.length >= 3) {
    return `${date}/${v.slice(2)}`;
  }
  return v;
}
