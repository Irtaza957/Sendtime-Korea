import i18next from 'i18next';

import { REGION } from '@utils/language';

type location = { id: string; name: string; type: string; checked: boolean }[];

export const locationContent = (location: location) => {
  return locationContentWithNames(location.map(({ name }) => name));
};

export const locationContentWithNames = (locationNames: string[]) => {
  if (locationNames.length === 0) return '';

  if (locationNames.length > 1) {
    return `${i18next.t('guestPage:preview.chooseFrom.leading')}${locationNames
      .map((name) => {
        if (name === '예약자가 장소입력') {
          return i18next.t('guestPage:preview.location.alert');
        }
        if (name === '전화 미팅') {
          return i18next.t('guestPage:preview.location.phone');
        }
        return name;
      })
      .join(' / ')}${i18next.t('guestPage:preview.chooseFrom.trailing')}`;
  }

  return translateLocation(locationNames[0]);
};

// 오후 12:30 OR 오전 09:20
export const translateMeridiem = (time: string) => {
  const [medidiem, HHMM] = time.split(' ');
  if (medidiem && HHMM) {
    return `${HHMM} ${
      medidiem === '오후' ? i18next.t('common:pm') : i18next.t('common:am')
    }`;
  }

  return time;
};

export const convertKorWeekday = (day: string) => {
  switch (day) {
    case '월요일':
    case '월':
      return i18next.t('common:weekdays.monday');
    case '화요일':
    case '화':
      return i18next.t('common:weekdays.tuesday');
    case '수요일':
    case '수':
      return i18next.t('common:weekdays.wednesday');
    case '목요일':
    case '목':
      return i18next.t('common:weekdays.thursday');
    case '금요일':
    case '금':
      return i18next.t('common:weekdays.friday');
    case '토요일':
    case '토':
      return i18next.t('common:weekdays.saturday');
    case '일요일':
    case '일':
    default:
      return i18next.t('common:weekdays.sunday');
  }
};

/**
 * The location is converted based on name
 * @param location
 * @returns translated location
 */
export const translateLocation = (location: string) => {
  if (!location) {
    return '';
  }
  switch (location) {
    case '예약자가 장소입력':
      return i18next.t('createBookingPage:location.askInterviewee');
    case '전화 미팅':
      return i18next.t('createBookingPage:location.phoneCall');
    case 'Google Meet':
    case 'Microsoft Teams':
    case 'Zoom':
    default:
      return location;
  }
};

/**
 * The timeUnit should always be passed in KOREAN.
 * @param timeUnit
 * @returns translated timeUnit
 */
export const translateTime = (timeUnit: string) => {
  if (!timeUnit) {
    return '';
  }
  if (timeUnit.includes('분') || timeUnit.includes('시간')) {
    const replaceMin = timeUnit.replace('분', i18next.t('common:min'));
    return replaceMin.replace('시간', i18next.t('common:hour'));
  }
  return timeUnit;
};

export const translateOptionSlot = (optionSlot: string) => {
  const number = parseInt(optionSlot.split('순위까지 옵션받기')[0]);
  switch (number) {
    case 1:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.1');
    case 2:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.2');
    case 3:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.3');
    case 4:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.4');
    case 5:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.5');
    case 6:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.6');
    case 7:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.7');
    case 8:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.8');
    case 9:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.9');
    case 10:
      return i18next.t('createBookingPage:timeSlotSetting.numberOfSlots.10');
    default:
      return optionSlot;
  }
};

export const convertKoreanGoogleMeet = (location: string) => {
    if(location === '구글 미트') {
        return 'Google Meet';
    }
    return location;
}

// 2023.03.24 OR 2023 03 24
export const translateDate = (date: string, separator: string) => {
  if (date === '무기한') {
    return i18next.language.includes(REGION.KO) ? '무기한' : 'Indefinitely';
  }
  const [yy, mm, dd] = date.split(separator);
  if (i18next.language.includes(REGION.KO)) {
    return `${parseInt(yy)}년 ${parseInt(mm)}월 ${parseInt(dd)}일`;
  }
  return `${parseInt(yy)}-${
    parseInt(mm) >= 10 ? parseInt(mm) : '0' + parseInt(mm)
  }-${parseInt(dd) >= 10 ? parseInt(dd) : '0' + parseInt(dd)}`;
};

export const translateDateRange = (dateRange: string, dateSeparator = ' ') => {
  const [startDate, endDate] = dateRange.split('-');
  if (startDate && endDate) {
    const startFormatted = translateDate(startDate.trim(), dateSeparator);
    const endFormatted = translateDate(endDate.trim(), dateSeparator);
    return `${startFormatted} - ${endFormatted}`;
  }
  return '';
};

// 2023년 03월 23일 03:51
export const translateKODateTime = (dateTime: string) => {
  if (!i18next.language.includes(REGION.KO)) {
    const date = dateTime.substring(0, 13);
    const [yy, mm, dd] = date.split(' ');
    return `${parseInt(yy)}-${
      parseInt(mm) >= 10 ? parseInt(mm) : '0' + parseInt(mm)
    }-${parseInt(dd)} ${dateTime.substring(13)}`;
  }
  return dateTime;
};
