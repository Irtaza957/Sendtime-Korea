import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useQuery } from 'react-query';

import {
  guestUserInfoAPI,
  GuestUserInfoKeys,
} from '@api/personal/reservation/GuestReservationInfo';
import Calendar from '@components/Calendar';
import GuestReservationPreview from '@components/GuestReservation/Preview';
import CustomCursor from '@components/NamedCursor';
import ReservationRankModal from '@components/ReservationRankModal';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import CursorProvider from '@contexts/CursorProvider';
import { GuestInfoType } from '@contexts/GuestReservationProvider';
import { DateSelectArg, DateSpanApi } from '@fullcalendar/common';
import useCalendar from '@hooks/useCalendar';
import useLoading from '@hooks/useLoading';
import useTranslate from '@hooks/useTranslate';
import { timeUnitToMilliseconds } from '@utils/calendarTime';
import {
  FORMAT,
  getNextDay,
  getPreviousDay,
  getTzOffsetTime,
  makeDaysOfWeekResponse,
  makeWeekResponseOfDay,
  toTzDate,
  toTzDateTime,
  toTzOffsetDateTime,
} from '@utils/time';

import {
  GuestReservationContainer,
  LanguageDropdownWrapper,
  Left,
  Right,
} from '../index.styles';

import * as Styled from './index.styles';

interface WebGuestReservationProps {
  hostInfo: HostInfoType;
  guestInfo: GuestInfoType;
  pageId: string;
  optionCount: number;
  setGuestInfo: Dispatch<SetStateAction<GuestInfoType>>;
  onTimeSelectionCompleted: () => void;
  selectedTimezone: Timezone;
  onTimeZoneSelected: (data: Timezone) => void;
}

type CustomBlockTimeType = {
  groupId: string;
  start: string;
  end: string;
  className: string;
  guestBlocked: boolean;
  display: string;
};

type EventType = {
  title: string;
  start: string;
  end: string;
  className: 'blocked-events' | 'calendar-events';
  masking: boolean;
};

type ReservationType = {
  start: string;
  end: string;
  className: string;
};

type BusinessHour = {
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
};

const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currentBrowserTime = toTzDateTime(new Date(), browserTimezone);
const WebGuestReservation = ({
  hostInfo,
  guestInfo,
  pageId,
  setGuestInfo,
  optionCount,
  onTimeSelectionCompleted,
  selectedTimezone,
  onTimeZoneSelected,
}: WebGuestReservationProps) => {
  const { i18n } = useTranslate();
  const calendarWrapper = useRef<HTMLDivElement | null>(null);
  // This state is used to re-render the calendar
  const [forceCalendarRerender, setForceCalendarRerender] = useState(true);
  // We will never need to set the hostTzTime. It should be same always otherwise things will blow up.
  const [hostTzTime, setHostTzTime] = useState(
    getTzOffsetTime(hostInfo?.hostTimezone?.timezone as string)
  );
  const [calendarOpenTimes, setCalendarOpenTimes] = useState<OpenTimeType[]>(
    []
  );
  const [currentDuration, setCurrentDuration] = useState<string>(
    hostInfo.timeUnit[0]
  );
  const [timeUnitCount, setTimeUnitCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(currentBrowserTime);
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([]);
  const [userSelectable, setUserSelectable] = useState(true);
  const [availableHr, setAvailableHr] = useState('00:00:00');
  const [calendarMasking, setCalendarMasking] = useState(false);
  const [events, setEvents] = useState<{
    blockedEvents: CustomBlockTimeType[];
    unavailableEvents: CustomBlockTimeType[];
    calendarEvents: EventType[];
  }>({ blockedEvents: [], unavailableEvents: [], calendarEvents: [] });
  const calendarRef = useRef<HTMLElement | null>(null);
  const { loadingView } = useLoading();

  const selectAllowLimit = (span: DateSpanApi) => {
    setUserSelectable(true);
    return true;
  };

  const calculateTimeBlockCount = () => {
    if (currentDuration.includes('시간')) {
      const [hr, mi] = currentDuration.split('시간');
      const totalMinutes = parseInt(hr) * 60 + (parseInt(mi) || 0);
      const calculatedBlockMinutes = Math.ceil(totalMinutes / 15);
      setTimeUnitCount(calculatedBlockMinutes);
    } else {
      const mi = parseInt(currentDuration);
      const calculatedBlockMinutes = Math.ceil(mi / 15);
      setTimeUnitCount(calculatedBlockMinutes);
    }
  };

  const clearCalendarBlocks = () => {
    setGuestInfo((prevState) => ({
      ...prevState,
      reservationOptions: [],
    }));
  };

  const onDeleteCalendarBlock = (id: string) => {
    setGuestInfo((prevState) => ({
      ...prevState,
      reservationOptions: prevState.reservationOptions.filter(
        (time) => time.id !== id
      ),
    }));
  };

  const onMakeCalendarBlock = ({ startStr }: DateSelectArg) => {
    // If number of slots are selected OR
    // If the change is true then we will only select one option.
    if (guestInfo.reservationOptions.length === optionCount) {
      return;
    }
    const startDate = dayjs(startStr).format(FORMAT.YMDHmsSZ);
    const endDate = dayjs(startStr)
      .add(timeUnitToMilliseconds(currentDuration), 'milliseconds')
      .format(FORMAT.YMDHmsSZ);

    const overlapStartDate = toTzOffsetDateTime(startStr, getTimezone());
    const overlapEndDate = toTzOffsetDateTime(
      dayjs(startStr)
        .add(timeUnitToMilliseconds(currentDuration), 'milliseconds')
        .format(FORMAT.YMDHmsSZ),
      getTimezone()
    );

    const blockedEvents = [
      ...events.blockedEvents,
      ...events.unavailableEvents,
    ];
    const firstCheck = handleTimeOverlap(
      blockedEvents,
      overlapStartDate,
      overlapEndDate
    );
    const secondCheck = handleTimeOverlap(
      events.calendarEvents,
      overlapStartDate,
      overlapEndDate
    );
    if (firstCheck || secondCheck) {
      setUserSelectable(false);
      return;
    }
    setGuestInfo((prevState) => {
      const length = prevState.reservationOptions.length;
      const newOptions = [
        ...prevState.reservationOptions.map((option, index) => ({
          ...option,
          priority: index + 1,
        })),
        {
          id: nanoid(),
          startDateTime: startDate,
          endDateTime: endDate,
          className: 'blocked-events',
          overlap: false,
          blocked: true,
          priority: length + 1,
        },
      ];
      return {
        ...prevState,
        reservationOptions: newOptions,
      };
    });
  };

  const handleTimeOverlap = (
    times: (CustomBlockTimeType | EventType)[],
    startDate: string,
    endDate: string
  ) => {
    return times.some(({ start }) => {
      const blockStart = toTzDateTime(start, getTimezone());
      if (
        dayjs(startDate).isBefore(blockStart) &&
        dayjs(blockStart).isBefore(endDate)
      ) {
        return start;
      }
    });
  };

  const getExtendedEndDateTime = (
    startDateTime: string,
    endDateTime: string
  ) => {
    const minutes = dayjs(endDateTime).diff(dayjs(startDateTime), 'minute');
    const minutesToBeAdded = minutes % 15 === 0 ? 0 : 15 - (minutes % 15);
    const endDateTimeExtended = dayjs(startDateTime)
      .add(minutesToBeAdded + minutes, 'minute')
      .format(FORMAT.YMDHmsSZ);
    return endDateTimeExtended;
  };

  const getTzStartDate = () => {
    if (selectedTimezone && selectedTimezone.timezone) {
      const startDate = toTzDate(hostInfo.startDate, selectedTimezone.timezone);
      const currentDate = toTzDate(new Date(), selectedTimezone.timezone);
      if (startDate < currentDate) {
        return currentDate;
      }
      return startDate;
    }
    return hostInfo.startDate;
  };

  const getTzEndDate = () => {
    if (selectedTimezone && selectedTimezone.timezone) {
      const endDate = dayjs(hostInfo.endDate)
        .tz(selectedTimezone.timezone)
        .add(1, 'day')
        .format(FORMAT.YMD);
      const currentDate = toTzDate(new Date(), selectedTimezone.timezone);
      if (endDate < currentDate) {
        return currentDate;
      }
      return endDate;
    }
    return hostInfo.endDate;
  };

  const { defaultDate, goPrev, goNext, goToday } = useCalendar(
    dayjs().isAfter(dayjs(hostInfo.startDate))
      ? dayjs().toDate()
      : dayjs(getTzStartDate()).toDate()
  );

  const {
    isLoading,
    isRefetching: isSyncLoading,
    refetch: getCalendarInfo,
  } = useQuery(
    GuestUserInfoKeys.getCalendar(pageId),
    () => {
      const startDate = dayjs(defaultDate.start).format(FORMAT.YMD);
      const endDate = dayjs(defaultDate.end).format(FORMAT.YMD);
      return guestUserInfoAPI.getCalendar(pageId, {
        startDate: startDate,
        endDate: endDate,
      });
    },
    {
      onSuccess: ({ data: { results } }) => {
        const [res] = results;
        const startDate = dayjs(defaultDate.start).format(FORMAT.YMD);
        const endDate = dayjs(defaultDate.end).format(FORMAT.YMD);
        const blockingEvents: CustomBlockTimeType[] = res.blockingTimes.map(
          ({ startTime, endTime }) => {
            const convertedStartTime = dayjs(startTime)
              .second(0)
              .tz(getTimezone())
              .format(FORMAT.YMDHmsSZ);
            const convertedEndTime = dayjs(endTime)
              .second(0)
              .tz(getTimezone())
              .format(FORMAT.YMDHmsSZ);
            return {
              groupId: 'blocked-times',
              start: convertedStartTime, //toTzDateTime(startTime, getTimezone()),
              end: convertedEndTime, //toTzDateTime(endTime, getTimezone()),
              className: 'blocked-events',
              guestBlocked: true,
              display: 'background',
            };
          }
        );
        const events: EventType[] = res.events.map(
          ({ name, startTime, endTime }) => {
            return {
              title: name ?? '무제(Untitled)',
              start: toTzDateTime(startTime, getTimezone()),
              end: toTzDateTime(endTime, getTimezone()),
              className: !res.masking ? 'calendar-events' : 'blocked-events',
              masking: res.masking,
            };
          }
        );
        const unavailableEvents = getUnavailableEvents(startDate, endDate);
        setEvents((prevEvents) => ({
          ...prevEvents,
          blockedEvents: [...blockingEvents],
          unavailableEvents: [...unavailableEvents],
          calendarEvents: [...events],
        }));
        setCalendarMasking(res.masking);
      },
      onError: (error) => console.error(error),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const prevButton = calendarRef.current?.querySelector('.fc-prev-button');
      prevButton?.addEventListener('click', () => {
        goPrev();
        getCalendarInfo();
      });

      const nextButton = calendarRef.current?.querySelector('.fc-next-button');
      nextButton?.addEventListener('click', (e) => {
        goNext();
        getCalendarInfo();
      });

      const todayButton =
        calendarRef.current?.querySelector('.fc-today-button');
      todayButton?.addEventListener('click', async () => {
        goToday();
        getCalendarInfo();
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getTimezone = () => {
    if (selectedTimezone && selectedTimezone.timezone) {
      return selectedTimezone.timezone;
    }
    return hostInfo?.hostTimezone?.timezone as string;
  };

  const getUnavailableEvents = (sd: string, ed: string) => {
    const unavailableTimes: CustomBlockTimeType[] = [];
    if (selectedTimezone && selectedTimezone.timezone) {
      // We are only concern with date only in start date and end date
      // We don't have time while creating reservation
      const startDate = new Date(sd + 'T00:00:00');
      const endDate = new Date(ed + 'T00:00:00');
      const currentDate = new Date();
      // Block till current time
      if (+startDate < +currentDate) {
        unavailableTimes.push({
          groupId: 'unavailable-times',
          start:
            `${startDate.getFullYear()}-${startDate.getMonth() + 1 > 9
              ? startDate.getMonth()
              : '0' + (startDate.getMonth() + 1)
            }-${startDate.getDate() > 9
              ? startDate.getDate()
              : '0' + startDate.getDate()
            }T00:00:00.000` + getTzOffsetTime(getTimezone()),
          end:
            `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 > 9
              ? currentDate.getMonth()
              : '0' + (currentDate.getMonth() + 1)
            }-${currentDate.getDate() > 9
              ? currentDate.getDate()
              : '0' + currentDate.getDate()
            }T${currentDate.getHours() > 9
              ? currentDate.getHours()
              : '0' + currentDate.getHours()
            }:${currentDate.getMinutes() > 9
              ? currentDate.getMinutes()
              : '0' + currentDate.getMinutes()
            }:00.000` + getTzOffsetTime(getTimezone()),
          className: 'unavailable-events',
          guestBlocked: true,
          display: 'background',
        });
      }
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const day = makeWeekResponseOfDay(d.getDay());
        const dayAvailableTimes = calendarOpenTimes.filter((time) => {
          return time.day === day;
        });

        // When we have only one slot in a day. We will calculate it like
        // Unavailable = 00:00:00 - start time of slot AND end time of slot - 23:59:59
        if (dayAvailableTimes.length === 1) {
          const startTimeSplit = dayAvailableTimes[0].start.split(':');
          const blockedTimeStart1 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
            }T00:00:00.000` + getTzOffsetTime(getTimezone());
          const blockedTimeEnd1 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}T${startTimeSplit[0]
            }:${startTimeSplit[1]}:00.000` + getTzOffsetTime(getTimezone());

          const endTimeSplit = dayAvailableTimes[0].end.split(':');
          const blockedTimeStart2 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}T${endTimeSplit[0]
            }:${endTimeSplit[1]}:00.000` + getTzOffsetTime(getTimezone());
          const blockedTimeEnd2 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
            }T23:59:59.000` + getTzOffsetTime(getTimezone());

          if (blockedTimeStart1 !== blockedTimeEnd1) {
            unavailableTimes.push({
              groupId: 'unavailable-times',
              start: blockedTimeStart1,
              end: blockedTimeEnd1,
              className: 'unavailable-events',
              guestBlocked: true,
              display: 'background',
            });
          }
          if (blockedTimeStart2 !== blockedTimeEnd2) {
            unavailableTimes.push({
              groupId: 'unavailable-times',
              start: blockedTimeStart2,
              end: blockedTimeEnd2,
              className: 'unavailable-events',
              guestBlocked: true,
              display: 'background',
            });
          }
        } else if (dayAvailableTimes.length === 2) {
          // When we have two slots in a day. We will calculate it like
          // Unavailable = 00:00:00 - start time of smaller slot, end time of smaller slot - start time of larger slot, end time of larger slot - 23:59:59

          const sortedAvailableTimes = dayAvailableTimes;
          let temp;
          if (dayAvailableTimes[0].start > dayAvailableTimes[1].start) {
            temp = sortedAvailableTimes[0];
            sortedAvailableTimes[0] = sortedAvailableTimes[1];
            sortedAvailableTimes[1] = temp;
          }

          const smallerSlotStartSplit = sortedAvailableTimes[0].start.split(":");
          const smallerSlotEndSplit = sortedAvailableTimes[0].end.split(":");

          const largerSlotStartSplit = sortedAvailableTimes[1].start.split(":");
          const largerSlotEndSplit = sortedAvailableTimes[1].end.split(":");

          const blockedTimeStart1 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
            }T00:00:00.000` + getTzOffsetTime(getTimezone());
          const blockedTimeEnd1 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}T${smallerSlotStartSplit[0]
            }:${smallerSlotStartSplit[1]}:00.000` +
            getTzOffsetTime(getTimezone());

          const blockedTimeStart2 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}T${smallerSlotEndSplit[0]
            }:${smallerSlotEndSplit[1]}:00.000` +
            getTzOffsetTime(getTimezone());
          const blockedTimeEnd2 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}T${largerSlotStartSplit[0]
            }:${largerSlotStartSplit[1]}:00.000` +
            getTzOffsetTime(getTimezone());

          const blockedTimeStart3 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()}T${largerSlotEndSplit[0]
            }:${largerSlotEndSplit[1]}:00.000` + getTzOffsetTime(getTimezone());
          const blockedTimeEnd3 =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
            }T23:59:59.000` + getTzOffsetTime(getTimezone());

          // We need to add conditions because some weird behaviour is shown by Full calendar is start and end date time is same
          // i.e. on 00:00:00 and 00:00:00, it is adding 1 hour unavailable time i.e. 00:00 - 01:00 issue
          if (blockedTimeStart1 !== blockedTimeEnd1) {
            unavailableTimes.push({
              groupId: 'unavailable-times',
              start: blockedTimeStart1,
              end: blockedTimeEnd1,
              className: 'unavailable-events',
              guestBlocked: true,
              display: 'background',
            });
          }
          if (blockedTimeStart2 !== blockedTimeEnd2) {
            unavailableTimes.push({
              groupId: 'unavailable-times',
              start: blockedTimeStart2,
              end: blockedTimeEnd2,
              className: 'unavailable-events',
              guestBlocked: true,
              display: 'background',
            });
          }
          if (blockedTimeStart3 !== blockedTimeEnd3) {
            unavailableTimes.push({
              groupId: 'unavailable-times',
              start: blockedTimeStart3,
              end: blockedTimeEnd3,
              className: 'unavailable-events',
              guestBlocked: true,
              display: 'background',
            });
          }
        } else if (!dayAvailableTimes.length) {
          const sd =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
            }T00:00:00.000` + getTzOffsetTime(getTimezone());
          const ed =
            `${d.getFullYear()}-${d.getMonth() + 1 > 9 ? d.getMonth() : '0' + (d.getMonth() + 1)
            }-${d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
            }T23:59:59.000` + getTzOffsetTime(getTimezone());
          unavailableTimes.push({
            groupId: 'unavailable-times',
            start: sd,
            end: ed,
            className: 'unavailable-events',
            guestBlocked: true,
            display: 'background',
          });
        }
      }
    }
    return unavailableTimes;
  };

  const getReservations = () => {
    const guestReservations = guestInfo.reservationOptions.map(
      ({ startDateTime, endDateTime }) => {
        return {
          start: startDateTime,
          end: endDateTime, //getExtendedEndDateTime(startDateTime, endDateTime),
          className: 'reservation-events',
        };
      }
    );
    return guestReservations;
  };

  const reservationEvents = () => {
    const guestReservations: ReservationType[] = getReservations();
    return [...guestReservations];
  };

  /**
   * This method is used to calculate open times using selected timezone.
   * During conversion we might be having more than 1 duration. That is why an
   * item can return atmost two durations.
   * @param item
   * @returns An array of opentimes according to selected times
   */
  const getTzAvailableOpenTimes = (item: OpenTimeType) => {
    const openTimeItem = JSON.parse(JSON.stringify(item));
    const TzAvailableOpenTimes: OpenTimeType[] = [];
    // Helper Methods
    const isTzPositive = (tz: string) => tz.includes('+');
    const convertToInt = (num: string) => parseInt(num);
    if (selectedTimezone && selectedTimezone.timezone) {
      // Selected Tz Time
      const getSelectedTzTime = getTzOffsetTime(selectedTimezone?.timezone);
      // Get Host Tz Hours and Mins
      const hostTzTimeSplit = hostTzTime.split(':');
      const hostTzHours = hostTzTimeSplit[0];
      const hostTzMins = hostTzTimeSplit[1];
      // Get Selected Tz Hours & Mins
      const selectedTzTime = getTzOffsetTime(selectedTimezone?.timezone);
      const selectedTzHours = selectedTzTime.split(':')[0];
      const selectedTzMins = selectedTzTime.split(':')[1];
      // Get Item Start Hours & Mins
      const openTimeItemStartSplit = openTimeItem.start.split(':');
      const itemStartHours = openTimeItemStartSplit[0];
      const itemStartMins = openTimeItemStartSplit[1];
      // Get Item End Hours & Mins
      const openTimeItemEndSplit = openTimeItem.end.split(':');
      const itemEndHours = openTimeItemEndSplit[0];
      const itemEndMins = openTimeItemEndSplit[1];

      let addCurrentDay = true;
      if (
        !(convertToInt(hostTzHours) > convertToInt(selectedTzHours)) ||
        (convertToInt(hostTzHours) === convertToInt(selectedTzHours) &&
          convertToInt(hostTzMins) < convertToInt(selectedTzMins))
      ) {
        // This scenario can fall in the next day
        let addNextDay = false;
        let newdayStartHours = 0;
        let newdayEndHours = 0;
        let newdayStartMins = 0;
        let newdayEndMins = 0;
        /**
         * We can only three cases here.
         * 1. If both timezones are +ve (Selected will be greater here always)
         * 2. If both timezones are -ve (Selected will be greater here always)
         * 3. Host Timezone is -ve and Selected is +ve (Selected will be greater here always)
         */
        if (
          (isTzPositive(hostTzTime) && isTzPositive(getSelectedTzTime)) ||
          (!isTzPositive(hostTzTime) && !isTzPositive(getSelectedTzTime))
        ) {
          const tzHourGap = Math.abs(
            Math.abs(convertToInt(hostTzHours)) -
            Math.abs(convertToInt(selectedTzHours))
          );
          const tzMinGap = Math.abs(
            Math.abs(convertToInt(selectedTzMins)) -
            Math.abs(convertToInt(hostTzMins))
          ); // It will always be 0, 30 or 45
          let stHours = convertToInt(itemStartHours) + tzHourGap;
          let stMins = convertToInt(itemStartMins) + tzMinGap;
          if (stMins < 60) {
            stMins = convertToInt(itemStartMins) + tzMinGap;
          } else {
            stHours += 1;
            stMins = stMins - 60;
          }

          let etHours = convertToInt(itemEndHours) + tzHourGap;
          let etMins = convertToInt(itemEndMins) + tzMinGap;
          if (etMins < 60) {
            etMins = convertToInt(itemEndMins) + tzMinGap;
          } else {
            etHours += 1;
            etMins = etMins - 60;
          }

          if (etHours > 23) {
            addNextDay = true;
            newdayEndHours = etHours - 24;
            newdayEndMins = etMins;
          }
          if (stHours > 23) {
            addCurrentDay = false;
            newdayStartHours = etHours - 24;
            newdayStartMins = stMins;
          } else if (addNextDay) {
            etHours = 23;
            etMins = 59;
            newdayStartHours = 0;
            newdayStartMins = 0;
          }

          if (addCurrentDay) {
            openTimeItem.start =
              (stHours >= 10 ? stHours : '0' + stHours) +
              ':' +
              (stMins > 10 ? stMins : '0' + stMins);
            openTimeItem.end =
              (etHours >= 10 ? etHours : '0' + etHours) +
              ':' +
              (etMins > 10 ? etMins : '0' + etMins);
            TzAvailableOpenTimes.push(openTimeItem);
          }
          if (addNextDay) {
            TzAvailableOpenTimes.push({
              day: getNextDay(openTimeItem.day),
              available: true,
              start:
                (newdayStartHours >= 10
                  ? newdayStartHours
                  : '0' + newdayStartHours) +
                ':' +
                (newdayStartMins > 10
                  ? newdayStartMins
                  : '0' + newdayStartMins),
              end:
                (newdayEndHours >= 10 ? newdayEndHours : '0' + newdayEndHours) +
                ':' +
                (newdayEndMins > 10 ? newdayEndMins : '0' + newdayEndMins),
            });
          }
        } else if (
          !isTzPositive(hostTzTime) &&
          isTzPositive(getSelectedTzTime)
        ) {
          // There is no difference except + in the below block of code in respect to above IF block of code. Need to Refactor this.
          const tzHourGap = Math.abs(
            Math.abs(convertToInt(hostTzHours)) +
            Math.abs(convertToInt(selectedTzHours))
          );
          const tzMinGap = Math.abs(
            Math.abs(convertToInt(selectedTzMins)) -
            Math.abs(convertToInt(hostTzMins))
          ); // It will always be 0, 30 or 45
          let stHours = convertToInt(itemStartHours) + tzHourGap;
          let stMins = convertToInt(itemStartMins) + tzMinGap;
          if (stMins < 60) {
            stMins = convertToInt(itemStartMins) + tzMinGap;
          } else {
            stHours += 1;
            stMins = stMins - 60;
          }

          let etHours = convertToInt(itemEndHours) + tzHourGap;
          let etMins = convertToInt(itemEndMins) + tzMinGap;
          if (etMins < 60) {
            etMins = convertToInt(itemEndMins) + tzMinGap;
          } else {
            etHours += 1;
            etMins = etMins - 60;
          }

          if (etHours > 23) {
            addNextDay = true;
            newdayEndHours = etHours - 24;
            newdayEndMins = etMins;
          }
          if (stHours > 23) {
            addCurrentDay = false;
            newdayStartHours = stHours - 24;
            newdayStartMins = stMins;
          } else if (addNextDay) {
            etHours = 23;
            etMins = 59;
            newdayStartHours = 0;
            newdayStartMins = 0;
          }

          if (addCurrentDay) {
            openTimeItem.start =
              (stHours >= 10 ? stHours : '0' + stHours) +
              ':' +
              (stMins > 10 ? stMins : '0' + stMins);
            openTimeItem.end =
              (etHours >= 10 ? etHours : '0' + etHours) +
              ':' +
              (etMins > 10 ? etMins : '0' + etMins);
            TzAvailableOpenTimes.push(openTimeItem);
          }
          if (addNextDay) {
            TzAvailableOpenTimes.push({
              day: getNextDay(openTimeItem.day),
              available: true,
              start:
                (newdayStartHours >= 10
                  ? newdayStartHours
                  : '0' + newdayStartHours) +
                ':' +
                (newdayStartMins > 10
                  ? newdayStartMins
                  : '0' + newdayStartMins),
              end:
                (newdayEndHours >= 10 ? newdayEndHours : '0' + newdayEndHours) +
                ':' +
                (newdayEndMins > 10 ? newdayEndMins : '0' + newdayEndMins),
            });
          }
        } else {
          // This is NOT possible otherwise we need to review our logic for calculating available open times
        }
      } else if (
        convertToInt(hostTzHours) > convertToInt(selectedTzHours) ||
        (convertToInt(hostTzHours) === convertToInt(selectedTzHours) &&
          convertToInt(hostTzMins) > convertToInt(selectedTzMins))
      ) {
        // This scenario can fall in the previous day
        let addPrevDay = false;
        let newdayStartHours = 0;
        let newdayEndHours = 0;
        let newdayStartMins = 0;
        let newdayEndMins = 0;
        /**
         * We can only three cases here.
         * 1. If both timezones are +ve (Host will be greater here always)
         * 2. If both timezones are -ve (Host will be greater here always)
         * 3. Host Timezone is +ve and Selected is -ve (Host will be greater here always)
         */
        if (
          (isTzPositive(hostTzTime) && isTzPositive(getSelectedTzTime)) ||
          (!isTzPositive(hostTzTime) && !isTzPositive(getSelectedTzTime))
        ) {
          const tzHourGap = Math.abs(
            Math.abs(convertToInt(hostTzHours)) -
            Math.abs(convertToInt(selectedTzHours))
          );
          const tzMinGap = Math.abs(
            Math.abs(convertToInt(selectedTzMins)) -
            Math.abs(convertToInt(hostTzMins))
          ); // It will always be 0, 30 or 45
          let stHours = convertToInt(itemStartHours) - tzHourGap;
          let stMins = convertToInt(itemStartMins) - tzMinGap;
          if (convertToInt(itemStartMins) >= tzMinGap) {
            stMins = convertToInt(itemStartMins) - tzMinGap;
          } else {
            if (convertToInt(hostTzHours) > convertToInt(selectedTzHours)) {
              stMins = Math.abs(convertToInt(itemStartMins) - tzMinGap);
            } else {
              stHours -= 1;
              stMins = 60 - Math.abs(convertToInt(itemStartMins) - tzMinGap);
            }
          }

          let etHours = convertToInt(itemEndHours) - tzHourGap;
          let etMins = convertToInt(itemEndMins) - tzMinGap;
          if (convertToInt(itemEndMins) >= tzMinGap) {
            etMins = convertToInt(itemEndMins) - tzMinGap;
          } else {
            if (convertToInt(hostTzHours) > convertToInt(selectedTzHours)) {
              etMins = Math.abs(convertToInt(itemEndMins) - tzMinGap);
            } else {
              etHours -= 1;
              etMins = 60 - Math.abs(convertToInt(itemEndMins) - tzMinGap);
            }
          }

          if (stHours < 0) {
            addPrevDay = true;
            newdayStartHours = 24 + stHours;
            newdayStartMins = stMins;
            stHours = 0;
          }
          if (etHours < 0) {
            addCurrentDay = false;
            newdayEndHours = 24 + etHours;
            newdayEndMins = etMins;
          } else if (addPrevDay) {
            stHours = 0;
            stMins = 0;
            newdayEndHours = 23;
            newdayEndMins = 59;
          }

          if (addPrevDay) {
            TzAvailableOpenTimes.push({
              day: getPreviousDay(openTimeItem.day),
              available: true,
              start:
                (newdayStartHours >= 10
                  ? newdayStartHours
                  : '0' + newdayStartHours) +
                ':' +
                (newdayStartMins > 10
                  ? newdayStartMins
                  : '0' + newdayStartMins),
              end:
                (newdayEndHours >= 10 ? newdayEndHours : '0' + newdayEndHours) +
                ':' +
                (newdayEndMins > 10 ? newdayEndMins : '0' + newdayEndMins),
            });
          }
          if (addCurrentDay) {
            openTimeItem.start =
              (stHours >= 10 ? stHours : '0' + stHours) +
              ':' +
              (stMins > 10 ? stMins : '0' + stMins);
            openTimeItem.end =
              (etHours >= 10 ? etHours : '0' + etHours) +
              ':' +
              (etMins > 10 ? etMins : '0' + etMins);
            TzAvailableOpenTimes.push(openTimeItem);
          }
        } else if (
          isTzPositive(hostTzTime) &&
          !isTzPositive(getSelectedTzTime)
        ) {
          // There is no difference except + in the below block of code in respect to above IF block of code. Need to Refactor this.
          const tzHourGap = Math.abs(
            Math.abs(convertToInt(hostTzHours)) +
            Math.abs(convertToInt(selectedTzHours))
          );
          const tzMinGap = Math.abs(
            Math.abs(convertToInt(selectedTzMins)) -
            Math.abs(convertToInt(hostTzMins))
          ); // It will always be 0, 30 or 45
          let stHours = convertToInt(itemStartHours) - tzHourGap;
          let stMins = convertToInt(itemStartMins) - tzMinGap;
          if (convertToInt(itemStartMins) >= tzMinGap) {
            stMins = convertToInt(itemStartMins) - tzMinGap;
          } else {
            stHours -= 1;
            stMins = 60 - Math.abs(convertToInt(itemStartMins) - tzMinGap);
          }

          let etHours = convertToInt(itemEndHours) - tzHourGap;
          let etMins = convertToInt(itemEndMins) - tzMinGap;
          if (convertToInt(itemEndMins) >= tzMinGap) {
            etMins = convertToInt(itemEndMins) - tzMinGap;
          } else {
            etHours -= 1;
            etMins = 60 - Math.abs(convertToInt(itemEndMins) - tzMinGap);
          }

          if (stHours < 0) {
            addPrevDay = true;
            newdayStartHours = 24 + stHours;
            newdayStartMins = stMins;
            stHours = 0;
          }
          if (etHours < 0) {
            addCurrentDay = false;
            newdayEndHours = 24 + etHours;
            newdayEndMins = etMins;
          } else if (addPrevDay) {
            stHours = 0;
            stMins = 0;
            newdayEndHours = 23;
            newdayEndMins = 59;
          }

          if (addPrevDay) {
            TzAvailableOpenTimes.push({
              day: getPreviousDay(openTimeItem.day),
              available: true,
              start:
                (newdayStartHours >= 10
                  ? newdayStartHours
                  : '0' + newdayStartHours) +
                ':' +
                (newdayStartMins > 10
                  ? newdayStartMins
                  : '0' + newdayStartMins),
              end:
                (newdayEndHours >= 10 ? newdayEndHours : '0' + newdayEndHours) +
                ':' +
                (newdayEndMins > 10 ? newdayEndMins : '0' + newdayEndMins),
            });
          }
          if (addCurrentDay) {
            openTimeItem.start =
              (stHours >= 10 ? stHours : '0' + stHours) +
              ':' +
              (stMins > 10 ? stMins : '0' + stMins);
            openTimeItem.end =
              (etHours >= 10 ? etHours : '0' + etHours) +
              ':' +
              (etMins > 10 ? etMins : '0' + etMins);
            TzAvailableOpenTimes.push(openTimeItem);
          }
        } else {
          // This is NOT possible otherwise we need to review our logic for calculating available open times
        }
      }
    }
    return TzAvailableOpenTimes;
  };

  /**
   * We deep copy the hostInfo openTimes(saved while creating reservation) in local array.
   * Then we calculate the available times according to selected Timezone.
   * @returns Available Open Times
   */
  const makeAvailableTime = () => {
    let availableOpenTimes: OpenTimeType[] = [];
    availableOpenTimes = JSON.parse(JSON.stringify(hostInfo.openTimes));
    availableOpenTimes = availableOpenTimes.filter(({ available }) => {
      return available;
    });
    if (selectedTimezone && selectedTimezone.timezone) {
      // Base Case => Same timezones
      if (hostTzTime === getTzOffsetTime(selectedTimezone?.timezone)) {
        setCalendarOpenTimes(availableOpenTimes);
        return availableOpenTimes;
      }
      let TzAvailableOpenTimes: OpenTimeType[] = [];
      availableOpenTimes.forEach((item) => {
        TzAvailableOpenTimes.push(...getTzAvailableOpenTimes(item));
      });
      TzAvailableOpenTimes = TzAvailableOpenTimes.filter((element) => {
        return !(element.start === '00:00' && element.end === '00:00');
      });
      setCalendarOpenTimes(TzAvailableOpenTimes);
      return TzAvailableOpenTimes;
    } else {
      setCalendarOpenTimes(availableOpenTimes);
      return availableOpenTimes;
    }
  };

  const calculateScrollTime = () => {
    let minHour = 23;
    let minMin = 45;
    businessHours.forEach((item) => {
      const [hr, min] = item.startTime.split(':');
      if (parseInt(hr) <= minHour) {
        minHour = parseInt(hr);
        if (parseInt(min) <= minMin) {
          minMin = parseInt(min);
        }
      }
    });
    const timeHrString = minHour > 9 ? minHour : `0${minHour}`;
    const timeMinString = minMin > 9 ? minMin : `0${minMin}`;
    setAvailableHr(`${timeHrString}:${timeMinString}:00`);
  };

  useEffect(() => {
    calculateScrollTime();
  }, [businessHours]);

  /**
   * This hook should be called each time when our timezone is changed.
   * This hook is also called on the initial render. This hook share the
   * same dependency as below hook but this must be called first so our
   * data is calculated before re-rendering the Calendar.
   */
  useEffect(() => {
    const setStartTime = setTimeout(() => {
      getCalendarInfo();
      const times = makeAvailableTime();
      const businessHours = times.map((item) => {
        return {
          daysOfWeek: [makeDaysOfWeekResponse(item.day)],
          startTime: item.start,
          endTime: item.end,
        };
      });
      setBusinessHours(businessHours);
    }, 200);
    clearCalendarBlocks();
    setCurrentDuration(hostInfo.timeUnit[0]);
    const currentTzTime = toTzDateTime(new Date(), selectedTimezone.timezone);
    setCurrentTime(currentTzTime);
    return () => clearTimeout(setStartTime);
  }, [selectedTimezone]);

  /**
   * This hook should be called each time when our timezone is changed.
   * We need to update the data for the calendar that is why we need to
   * re-render the calendar.
   */
  useEffect(() => {
    setForceCalendarRerender(false);
    const timer = setTimeout(() => {
      setForceCalendarRerender(true);
    }, 200);
    () => clearTimeout(timer);
  }, [selectedTimezone]);
  return (
    <>
      {forceCalendarRerender && (
        <GuestReservationContainer locale={i18n.language} ref={calendarRef}>
          <Left>
            <GuestReservationPreview
              pageInfo={hostInfo}
              selectedTimezone={selectedTimezone}
              onTimeZoneSelected={onTimeZoneSelected}
              changeSelectedDuration={setCurrentDuration}
              calculateTimeBlockCount={calculateTimeBlockCount}
            />
          </Left>
          <Right userSelectable={userSelectable} locale={i18n.language}>
            <LanguageDropdownWrapper>
              <LanguageDropdown position="absolute" top="16px" />
            </LanguageDropdownWrapper>
            <CursorProvider>
              {guestInfo.reservationOptions.length !== optionCount && (
                <CustomCursor />
              )}
              <Styled.CalendarWrapper ref={calendarWrapper}>
                {(isSyncLoading || isLoading) && loadingView()}
                <Calendar
                  timeStart={availableHr}
                  validRange={{ start: getTzStartDate(), end: getTzEndDate() }}
                  businessHours={businessHours}
                  events={[
                    ...events.blockedEvents,
                    ...events.calendarEvents,
                    ...events.unavailableEvents,
                    ...reservationEvents(),
                  ]}
                  onSelectCalendarBlock={onMakeCalendarBlock}
                  onDeleteCalendarBlock={onDeleteCalendarBlock}
                  masking={calendarMasking}
                  selectAllow={selectAllowLimit}
                  enableModal={false}
                  allDaySlot={false}
                  withNavigation={false}
                  timeUnitCount={timeUnitCount}
                  selectable={
                    guestInfo.reservationOptions.length !== optionCount
                  }
                  hover={guestInfo.reservationOptions.length !== optionCount}
                  locale={i18n.language}
                  // nowTime={currentTime}
                  timezone={selectedTimezone.timezone}
                />
              </Styled.CalendarWrapper>
            </CursorProvider>
            <ReservationRankModal
              modalContents={guestInfo.reservationOptions}
              optionCount={optionCount}
              onDeleteOption={onDeleteCalendarBlock}
              onTimeSelectionCompleted={onTimeSelectionCompleted}
            />
          </Right>
        </GuestReservationContainer>
      )}
    </>
  );
};

export default WebGuestReservation;
