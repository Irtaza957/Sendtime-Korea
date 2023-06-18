import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { LNG } from '@constants/language';
import { TIME } from '@constants/time';
import { DailyTimes } from '@contexts/ReservationProvider';

import { REGION } from './language';

dayjs.extend(utc);
dayjs.extend(timezone);

export const FORMAT = {
  YMDd: 'YYYY년 MM월 DD일 (dd)',
  YMDHmsSZ: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  YMD: 'YYYY-MM-DD',
  YMDHm: 'YYYY-MM-DD HH:mm',
  YMDHms: 'YYYY-MM-DD HH:mm:ss',
  koYMD: 'YYYY년 MM월 DD일',
  koYMDHm: 'YYYY년 MM월 DD일 HH:mm',
  koYMDddHm: 'YYYY년 MM월 DD일(dd) HH:mm',
};

export const SELECTED_OFFSET = '+09:00';

export const subtractHours = (d: Date, hour: number) => {
  const date = new Date(d);
  date.setHours(date.getHours() - hour);

  return date;
};

const makeZero = (num: number) => {
  return num > 9 ? `${num}` : `0${num}`;
};

const getYearMonthDay = (date: Date) => {
  const newDate = date.toLocaleDateString(LNG.ko_KR, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const splittedDate = newDate.split(' ');

  const year = parseInt(splittedDate[0]);
  const month = parseInt(splittedDate[1]);
  const day = parseInt(splittedDate[2]);
  const weekDay = splittedDate[3];

  const splittedTime = splittedDate[4]?.split(':');

  const hour = parseInt(splittedTime[0]);
  const minute = parseInt(splittedTime[1]);
  const second = parseInt(splittedTime[2]);

  return {
    year: makeZero(year),
    month: makeZero(month),
    day: makeZero(day),
    hour: makeZero(hour),
    minute: makeZero(minute),
    second: makeZero(second),
    weekDay: weekDay,
  };
};

// Format: 2022-07-04
export const toDateWithDash = (date: Date) => {
  const { year, month, day } = getYearMonthDay(date);

  return `${year}-${month}-${day}`;
};

export const withWeekDay = (d: Date) => {
  const date = new Date(d);
  const { year, month, day, weekDay } = getYearMonthDay(date);
  const dd = weekDay.split('요일')[0];

  return `${year}년 ${month}월 ${day}일 (${dd})`;
};

export const rangeDate = (start: Date, end: Date, index: '.' | '/' | '-') => {
  const { year: sYear, month: sMonth, day: sDay } = getYearMonthDay(start);
  const { year: eYear, month: eMonth, day: eDay } = getYearMonthDay(end);

  const startDate = `${sYear}.${sMonth}.${sDay}`;
  const endDate = `${eYear}.${eMonth}.${eDay}`;

  if (startDate === endDate) return startDate;

  if (sYear === eYear) {
    return `${sYear}.${sMonth}.${sDay} - ${eMonth}.${eDay}`;
  }

  return `${startDate} - ${endDate}`;
};

// 앞 시간 < 뒤 시간인지 확인
export const isTimeValid = (
  startValue: DailyTimes['start'] | string,
  endValue: DailyTimes['end'] | string
) => {
  const [sHour, sMin] = startValue.split(':');
  const [eHour, eMin] = endValue.split(':');
  const startTime = new Date().setHours(Number(sHour), Number(sMin));
  const endTime = new Date().setHours(Number(eHour), Number(eMin));

  if (startTime - endTime > 0) return false;

  return true;
};

type EngWeekDays =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

type KorWeekDays =
  | '월요일'
  | '화요일'
  | '수요일'
  | '목요일'
  | '금요일'
  | '토요일'
  | '일요일';

export const engToKorWeekDay = (day: EngWeekDays) => {
  switch (day) {
    case 'MONDAY':
      return '월요일';
    case 'TUESDAY':
      return '화요일';
    case 'WEDNESDAY':
      return '수요일';
    case 'THURSDAY':
      return '목요일';
    case 'FRIDAY':
      return '금요일';
    case 'SATURDAY':
      return '토요일';
    case 'SUNDAY':
    default:
      return '일요일';
  }
};

// TODO: enum 역매핑 어떻게 쓰는지 보고 활용해보기
export const korToEngWeekDay = (
  day: '월' | '화' | '수' | '목' | '금' | '토' | '일'
) => {
  switch (day) {
    case '월':
      return 'MONDAY';
    case '화':
      return 'TUESDAY';
    case '수':
      return 'WEDNESDAY';
    case '목':
      return 'THURSDAY';
    case '금':
      return 'FRIDAY';
    case '토':
      return 'SATURDAY';
    case '일':
    default:
      return 'SUNDAY';
  }
};

const getDateParams = (date: string) => {
  const splittedDate = date.split(' ');
  const year = parseInt(splittedDate[0]);
  const month = parseInt(splittedDate[1]);
  const day = parseInt(splittedDate[2]);
  const weekDay = '';
  const splittedTime = splittedDate[3].split(':');
  const hour = parseInt(splittedTime[0]);
  const minute = parseInt(splittedTime[1]);
  return {
    year: makeZero(year),
    month: makeZero(month),
    day: makeZero(day),
    hour: makeZero(hour),
    minute: makeZero(minute),
    weekDay: weekDay,
  };
};

export const rangeTime = (
  start: Date,
  end: Date,
  lng = LNG.ko_KR,
  timezone: string
) => {
  const startDate = dayjs.tz(start, timezone).format(FORMAT.koYMDddHm);
  const endDate = dayjs.tz(end, timezone).format(FORMAT.koYMDddHm);
  const {
    year: sYear,
    month: sMonth,
    day: sDay,
    hour: sHour,
    minute: sMinute,
  } = getDateParams(startDate);
  const {
    year: eYear,
    month: eMonth,
    day: eDay,
    hour: eHour,
    minute: eMinute,
  } = getDateParams(endDate);

  if (startDate === endDate) return startDate;

  if (lng?.includes(REGION.KO)) {
    if (sYear === eYear && sMonth === eMonth && sDay === eDay) {
      return `${startDate} - ${eHour}:${eMinute}`;
    }

    return `${startDate} - ${eMonth}월 ${eDay}일 ${eHour}:${eMinute}`;
  } else {
    const enSMM = toEnMonthName(+sMonth);
    const enEMM = toEnMonthName(+eMonth);

    if (sYear === eYear && sMonth === eMonth && sDay === eDay) {
      return `${sHour}:${sMinute} - ${eHour}:${eMinute}, ${enSMM} ${sDay}th, ${sYear}`;
    }

    return `${sHour}:${sMinute} ${enSMM} ${sDay}th - ${eHour}:${eMinute} ${enEMM} ${eDay}th, ${sYear}`;
  }

  return '';
};

export const toKODateTime = (date: string | Date) => {
  return dayjs(date).tz('Asia/Seoul').format(FORMAT.YMDHmsSZ);
};

export const toTzDateTime = (date: string | Date, timezone?: string) => {
  return toTzDateTimeObj(date, timezone).format(FORMAT.YMDHmsSZ);
};

export const toTzOffsetDateTime = (date: string | Date, timezone?: string) => {
  return toTzOffsetDateTimeObj(date, timezone).format(FORMAT.YMDHmsSZ);
};

export const toTzDate = (date: string | Date, timezone?: string) => {
  return dayjs(date).tz(timezone).format(FORMAT.YMD);
};

export const toTzDateTimeObj = (date: string | Date, timezone?: string) => {
  return dayjs(date).tz(timezone || 'Asia/Seoul');
};

export const toTzOffsetDateTimeObj = (
  date: string | Date,
  timezone?: string
) => {
  return dayjs(date).tz(timezone || 'Asia/Seoul', true);
};

export const toTimeOnly = (date: string | Date) => {
  return dayjs(date).format('hh:mm');
};

export const addToTzDate = (
  date: string | Date,
  days: number,
  timezone?: string
) => {
  return dayjs(date).tz(timezone).add(days, 'day').format(FORMAT.YMD);
};
export const subtractToTzDate = (
  date: string | Date,
  days: number,
  timezone?: string
) => {
  return dayjs(date).tz(timezone).subtract(days, 'day').format(FORMAT.YMD);
};

// export const getTzAdjustment = (date: string|Date, timezone: string) => {
//   return new Date(date).toLocaleTimeString('en-US', {timeZone: timezone)
// }

// Format: 2022-07-04T14:06:49.221+09:00
export const toKODateTimeMobile = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);

  return toKODateTime(dateOffset);
};

export const parseDateString = (dateString: string) => {
  const [date, time] = dateString.split('T');
  const [hms, rest] = time.split('.');
  const [h, m, s] = hms.split(':');

  return `${date} ${h}:${m}`;
};

export const makeDaysOfWeek = (day: typeof TIME.DAYS[number]) => {
  if (day === '일') return 0;
  if (day === '월') return 1;
  if (day === '화') return 2;
  if (day === '수') return 3;
  if (day === '목') return 4;
  if (day === '금') return 5;
  if (day === '토') return 6;
};

export const getPreviousDay = (day: string) => {
  if (day === 'SUNDAY') return 'SATURDAY';
  if (day === 'MONDAY') return 'SUNDAY';
  if (day === 'TUESDAY') return 'MONDAY';
  if (day === 'WEDNESDAY') return 'TUESDAY';
  if (day === 'THURSDAY') return 'WEDNESDAY';
  if (day === 'FRIDAY') return 'THURSDAY';
  if (day === 'SATURDAY') return 'FRIDAY';
  return 'SUNDAY';
};

export const getNextDay = (day: string) => {
  if (day === 'SUNDAY') return 'MONDAY';
  if (day === 'MONDAY') return 'TUESDAY';
  if (day === 'TUESDAY') return 'WEDNESDAY';
  if (day === 'WEDNESDAY') return 'THURSDAY';
  if (day === 'THURSDAY') return 'FRIDAY';
  if (day === 'FRIDAY') return 'SATURDAY';
  if (day === 'SATURDAY') return 'SUNDAY';
  return 'MONDAY';
};

export const makeDaysOfWeekResponse = (day: EngWeekDays) => {
  if (day === 'SUNDAY') return 0;
  if (day === 'MONDAY') return 1;
  if (day === 'TUESDAY') return 2;
  if (day === 'WEDNESDAY') return 3;
  if (day === 'THURSDAY') return 4;
  if (day === 'FRIDAY') return 5;
  if (day === 'SATURDAY') return 6;
  return 0;
};
export const makeWeekResponseOfDay = (day: number) => {
  if (day === 0) return 'SUNDAY';
  if (day === 1) return 'MONDAY';
  if (day === 2) return 'TUESDAY';
  if (day === 3) return 'WEDNESDAY';
  if (day === 4) return 'THURSDAY';
  if (day === 5) return 'FRIDAY';
  if (day === 6) return 'SATURDAY';
};

export const getDateNumber = (tz: Timezone, date = new Date()) => {
  return +dayjs(date).tz(tz.timezone).format('d');
};

// 오전 9시 | 오후 9시 20분
export const convertTime = (time: string) => {
  if (time.includes('오전')) {
    const hourMinute = time.split('오전 ')[1];
    const [hr, mi] = hourMinute.split('시');

    const minute = parseInt(mi);

    if (hr && mi) {
      return { hr, mi: `${minute}` };
    }

    return { hr: `${+hr + 12}`, mi: '00' };
  }

  if (time.includes('오후')) {
    const hourMinute = time.split('오후 ')[1];
    const [hr, mi] = hourMinute.split('시');

    const minute = parseInt(mi);

    if (hr && mi) {
      return { hr: `${+hr + 12}`, mi: `${minute}` };
    }

    return { hr: `${+hr + 12}`, mi: '00' };
  }

  return { hr: '00', mi: '00' };
};

export const convertTZ = (date: Date | string, tzString?: string) => {
  return (typeof date === 'string' ? new Date(date) : date).toLocaleString(
    'en-US',
    { timeZone: tzString }
  );
};

// 2022 07 21, 오전 9시 20분, 오후 9시 20분
export const koreanTimeToDateTime = (
  date: { year: string; month: string; date: string },
  startTime: string,
  endTime: string
) => {
  const { year, month, date: dd } = date;
  const { hr: shr, mi: smi } = convertTime(startTime);
  const { hr: ehr, mi: emi } = convertTime(endTime);

  const startDateTime = new Date(+year, +month - 1, +dd, +shr, +smi);
  const endDateTime = new Date(+year, +month - 1, +dd, +ehr, +emi);

  if (startDateTime > endDateTime) {
    const startDateTime = new Date(+year, +month - 1, +dd, +shr, +smi);
    const endDateTime = new Date(+year, +month - 1, +dd + 1, +ehr, +emi);
    return { startDateTime, endDateTime };
  }

  return { startDateTime, endDateTime };
};

export const getDateWithZero = (date: Date) => {
  const yr = date.getFullYear();
  const mo = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yr}-${mo < 10 ? `0${mo}` : mo}-${dd < 10 ? `0${dd}` : dd}`;
};

export const toEnMonthName = (monthNumber: number) => {
  return dayjs()
    .set('month', monthNumber - 1)
    .locale('en')
    .format('MMM');
  // const date = new Date();
  // date.setMonth(monthNumber - 1);
  // return date.toLocaleString('en-US', {
  //   month: 'long',
  // });
};

export const setMidnight = (time?: string | Date) => {
  return dayjs(time).set('hour', 0).set('minute', 0).set('second', 0);
};

export const setBeforeMidnight = (time?: string | Date) => {
  return dayjs(time).set('hour', 23).set('minute', 59).set('second', 59);
};

export const adjustTimeOffset = (
  time: string,
  date: Date | string,
  tz: Timezone,
  prevTz: string
) => {
  const timeZoneSplit = toTzDateTimeObj(date, tz?.timezone).format('Z');
  if (timeZoneSplit == prevTz) {
    return { timeZoneSplit, time };
  }
  const timeZoneHours = timeZoneSplit.split(':')[0];
  const timeZoneMins = timeZoneSplit.split(':')[1];

  const prevTzSplit = prevTz ? prevTz.split(':') : [];
  let prevTzHours = 0;
  let prevTzMins = 0;

  if (prevTzSplit.length && timeZoneSplit != prevTz) {
    prevTzHours = +prevTzSplit[0];
    prevTzMins = +prevTzSplit[1];
  }

  const timeSplit = time.split(':');
  const timeHours = timeSplit[0];
  const timeMins = timeSplit[1];

  const timeHoursFinal = +timeHours - +prevTzHours + +timeZoneHours;
  const timeMinsFinal = +timeMins - +prevTzMins + +timeZoneMins;

  const isHoursNegative = timeHoursFinal < 0;

  const hoursAdjustment = Math.abs(timeHoursFinal);
  const minsAdjustment = Math.abs(timeMinsFinal);

  let prependHour = '0';
  const prependMin = '0';

  if (isHoursNegative) {
    prependHour = '-0';
  }
  // if (isMinsNegative) {
  //   prependMin = "-0";
  // }

  const parsedTimeHourFinal =
    hoursAdjustment < 10 ? prependHour + hoursAdjustment : timeHoursFinal;
  const parsedTimeMinFinal =
    minsAdjustment < 10 ? prependMin + minsAdjustment : timeMinsFinal;

  time = parsedTimeHourFinal + ':' + parsedTimeMinFinal;

  return { timeZoneSplit, time };
};
// New Methods

// This method will return offset of the passed timezone name. e.g. Pacific/Port_Moresby
export const getTzOffsetTime = (tz: string) => {
  return dayjs(new Date()).tz(tz).format('Z');
};

// This method will return browser timezone from list if exists otherwise return the same offset timezone.
export const getMatchBrowserTimezone = (timezones: Timezone[]) => {
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneEntity = timezones.find((x) => x.timezone == browserTimezone);
  if (timezoneEntity) {
    return timezoneEntity;
  }
  const sameOffsetTz = timezones.filter((item) => {
    return item.name.includes(getTzOffsetTime(browserTimezone));
  });
  if (sameOffsetTz.length) {
    return sameOffsetTz[0];
  }
  // This is never going to happen as we will always have an offset which will match to one of the existing timezones e.g. +14:00 will have a match
  return timezones[0];
};
