import { useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import i18next from 'i18next';
import { useRecoilValue } from 'recoil';
dayjs.extend(weekday);

import { coreUserState } from '@atoms/index';
import { REGION } from '@utils/language';

const today = {
  start: dayjs().day(0).toDate(), // 그 주 일요일
  end: dayjs().day(6).toDate(), // 그 주 토요일
};

const useCalendar = (start?: Date) => {
  const startDate = start
    ? { start: dayjs(start).day(0).toDate(), end: dayjs(start).day(6).toDate() }
    : today;

  const [defaultDate, setDefaultDate] = useState(startDate);
  const user = useRecoilValue(coreUserState);

  const goPrev = () => {
    setDefaultDate((prevValue) => {
      const start = dayjs(prevValue.start).weekday(-7).toDate();
      const end = dayjs(prevValue.end).weekday(-1).toDate();

      return { start, end };
    });
  };

  const goNext = () => {
    setDefaultDate((prevValue) => {
      const start = dayjs(prevValue.start).weekday(7).toDate();
      const end = dayjs(prevValue.end).weekday(13).toDate();

      return { start, end };
    });
  };

  const goToday = () => setDefaultDate(today);

  const handleMakeBlockingEvents = (nonDisturbTime: BlockType[]) => {
    return nonDisturbTime.map((time: BlockType) => ({
      id: time.id,
      start: time.startTime,
      end: time.endTime,
      className: 'blocked-events',
      blocked: true,
    }));
  };

  const handleMakePersonalWeeklyEvents = (events: EventType[]) => {
    return events.map((time: EventType) => ({
      id: time.id,
      title: time.summary,
      start: time.startDateTime,
      end: time.endDateTime,
      className: 'calendar-events',
      range: {
        start: time.startDateTime,
        end: time.endDateTime,
      },
      user: {
        name:
          time.attendees
            .filter((attendee) => attendee.displayName)
            .map((attendee) => attendee.displayName)
            .join(', ') ||
          user?.name ||
          '참석자 미정',
        email: time.creator.email,
      },
      location:
        time.location.map((place) => place.name).join(', ') || '장소 미정',
      category: time.calendarName || '카테고리 없음',
      allDay: time.allDay,
      calendarId: time.calendarId,
    }));
  };

  const handleMakeGroupWeeklyEvents = (events: GroupEventType[]) => {
    return events.map((time: GroupEventType) => ({
      id: time.id,
      title: i18next.language.includes(REGION.KO)
        ? time.summary
        : time.summary.replace('님의 일정', ''),
      start: time.startDateTime,
      end: time.endDateTime,
      className: 'calendar-events',
      calColor: time.color,
      range: {
        start: time.startDateTime,
        end: time.endDateTime,
      },
      user: {
        name:
          time.attendees
            .filter((attendee) => attendee.displayName)
            .map((attendee) => attendee.displayName)
            .join(', ') ||
          user?.name ||
          '참석자 미정',
        email: time.creator.email,
      },
      location:
        time.location.map((place) => place.name).join(', ') || '장소 미정',
      category: time.calendarName || '카테고리 없음',
      allDay: time.allDay,
      calendarId: time.calendarId,
    }));
  };

  return {
    defaultDate,
    setDefaultDate,
    goPrev,
    goNext,
    goToday,
    handleMakeBlockingEvents,
    handleMakePersonalWeeklyEvents,
    handleMakeGroupWeeklyEvents,
  };
};

export default useCalendar;
