import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import {
  guestUserInfoAPI,
  GuestUserInfoKeys,
} from '@api/personal/reservation/GuestReservationInfo';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import MobileCalendar from '@components/Calendar/MobileCalendar';
import Line from '@components/Line';
import ReservationPreview from '@components/pages/GuestReservation/mobile/ReservationPreview';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import { BASE_URL } from '@constants/baseUrl';
import { GuestInfoType } from '@contexts/GuestReservationProvider';
import { timeUnitToMilliseconds } from '@utils/calendarTime';
import { FORMAT } from '@utils/time';

import { SelectedTimeType } from '..';

import * as Styled from './index.styles';

interface MobileGuestReservationProps {
  hostInfo: HostInfoType;
  guestInfo: GuestInfoType;
  optionCount: number;
  pageId: string;
  setGuestInfo: Dispatch<SetStateAction<GuestInfoType>>;
  onTimeSelectionCompleted: () => void;
  selectedTimezone: Timezone;
  onTimeZoneSelected: (data: Timezone) => void;
}

type Schedule = {
  date: string;
  times: ReservationTime[];
};

const MobileGuestReservation = ({
  hostInfo,
  guestInfo,
  optionCount,
  pageId,
  setGuestInfo,
  onTimeSelectionCompleted,
  selectedTimezone,
  onTimeZoneSelected,
}: MobileGuestReservationProps) => {
  const { t } = useTranslation('guestPage');
  const [availableDateTimesData, setAvailableDateTimesData] = useState<
    GuestMobileCalendarInfo['availableDateTimesData']
  >([]);
  const [duration, setDuration] = useState(hostInfo.timeUnit[0]);

  const [mobileMonth, setMobileMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const convertAvailableSchedules = (availableDateTimesData: Schedule[]) => {
    const fromTimeZone = hostInfo?.hostTimezone?.timezone as string;
    const toTimeZone = selectedTimezone?.timezone;

    const convertedSchedules: Schedule[] = [];
    const addTime = (
      isExists: number,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string
    ) => {
      if (isExists === -1) {
        convertedSchedules.push({
          date: startDate,
          times: [
            {
              startDateTime: `${startDate}T${startTime.split('T')[1]}`,
              endDateTime: `${endDate}T${endTime.split('T')[1]}`,
              startTime: '',
              endTime: '',
            },
          ],
        });
      } else {
        convertedSchedules[isExists].times.push({
          startDateTime: `${startDate}T${startTime.split('T')[1]}`,
          endDateTime: `${endDate}T${endTime.split('T')[1]}`,
          startTime: '',
          endTime: '',
        });
      }
    };

    // Iterate over each date's schedule
    for (const { date, times } of availableDateTimesData) {
      // Convert each schedule's start and end date/time
      for (const { startDateTime, endDateTime } of times) {
        const fromMomentStart = dayjs.utc(startDateTime).tz(fromTimeZone);
        const toMomentStart = fromMomentStart.clone().tz(toTimeZone);
        const convertedStartDateTime = toMomentStart.format(FORMAT.YMDHmsSZ);

        const fromMomentEnd = dayjs.utc(endDateTime).tz(fromTimeZone);
        const toMomentEnd = fromMomentEnd.clone().tz(toTimeZone);
        const convertedEndDateTime = toMomentEnd.format(FORMAT.YMDHmsSZ);

        // Adjust the start/end date if moving back one day
        if (fromMomentStart.utcOffset() > toMomentStart.utcOffset()) {
          const isSameStartDate =
            fromMomentStart.format('YYYY-MM-DD') ===
            toMomentStart.format('YYYY-MM-DD');
          const isSameEndDate =
            fromMomentEnd.format('YYYY-MM-DD') ===
            toMomentEnd.format('YYYY-MM-DD');

          if (!isSameStartDate && !isSameEndDate) {
            const prevDate = dayjs
              .utc(date)
              .tz(fromTimeZone)
              .subtract(1, 'day')
              .format('YYYY-MM-DD');
            const isDateExists = convertedSchedules.findIndex(
              (schedule) => schedule.date === prevDate
            );
            addTime(
              isDateExists,
              prevDate,
              prevDate,
              convertedStartDateTime,
              convertedEndDateTime
            );
          } else if (isSameStartDate && isSameEndDate) {
            const isDateExists = convertedSchedules.findIndex(
              (schedule) => schedule.date === date
            );
            addTime(
              isDateExists,
              date,
              date,
              convertedStartDateTime,
              convertedEndDateTime
            );
          } else if (!isSameStartDate && isSameEndDate) {
            const prevDate = dayjs
              .utc(date)
              .tz(fromTimeZone)
              .subtract(1, 'day')
              .format('YYYY-MM-DD');
            const isPrevDateExists = convertedSchedules.findIndex(
              (schedule) => schedule.date === prevDate
            );
            addTime(
              isPrevDateExists,
              prevDate,
              date,
              convertedStartDateTime,
              convertedEndDateTime
            );
          }
        }
        // Adjust the start/end date if moving forward one day
        else if (fromMomentStart.utcOffset() < toMomentStart.utcOffset()) {
          const isSameStartDate =
            fromMomentStart.format('YYYY-MM-DD') ===
            toMomentStart.format('YYYY-MM-DD');
          const isSameEndDate =
            fromMomentEnd.format('YYYY-MM-DD') ===
            toMomentEnd.format('YYYY-MM-DD');

          if (!isSameStartDate && !isSameEndDate) {
            const nextDate = dayjs
              .utc(date)
              .tz(fromTimeZone)
              .add(1, 'day')
              .format('YYYY-MM-DD');
            const isDateExists = convertedSchedules.findIndex(
              (schedule) => schedule.date === nextDate
            );
            addTime(
              isDateExists,
              nextDate,
              nextDate,
              convertedStartDateTime,
              convertedEndDateTime
            );
          } else if (isSameStartDate && isSameEndDate) {
            const isDateExists = convertedSchedules.findIndex(
              (schedule) => schedule.date === date
            );
            addTime(
              isDateExists,
              date,
              date,
              convertedStartDateTime,
              convertedEndDateTime
            );
          } else if (isSameStartDate && !isSameEndDate) {
            const isCurrentDateExists = convertedSchedules.findIndex(
              (schedule) => schedule.date === date
            );
            const nextDate = dayjs
              .utc(date)
              .tz(fromTimeZone)
              .add(1, 'day')
              .format('YYYY-MM-DD');
            addTime(
              isCurrentDateExists,
              date,
              nextDate,
              convertedStartDateTime,
              convertedEndDateTime
            );
          }
        }
        // If the offsets are the same, use the original dates/times
        else {
          const isDateExists = convertedSchedules.findIndex(
            (schedule) => schedule.date === date
          );
          addTime(
            isDateExists,
            date,
            date,
            convertedStartDateTime,
            convertedEndDateTime
          );
        }
      }
    }
    return convertedSchedules;
  };

  const { refetch: getMobileCalendar } = useQuery(
    GuestUserInfoKeys.getMobileCalendar(pageId),
    () => {
      return guestUserInfoAPI.getMobileCalendarInfo(pageId, {
        year: `${mobileMonth.year}`,
        month: `${mobileMonth.month}`,
      });
    },
    {
      onSuccess: ({ data: { results } }) => {
        const { availableDateTimesData } = results[0];
        const TzAvailableOpenTimes = convertAvailableSchedules(
          availableDateTimesData
        );
        setAvailableDateTimesData(TzAvailableOpenTimes);
      },
      onError: (error) => console.error(error),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    getMobileCalendar();
  }, [mobileMonth.year, mobileMonth.month]);

  const deleteCurrentOption = (selectedTime: SelectedTimeType) => {
    setGuestInfo((prevState) => {
      const newOptions = prevState.reservationOptions.filter(
        (option) => option.startDateTime !== selectedTime.startDateTime
      );

      const indexedNewOptions = newOptions.map((option, idx) => ({
        ...option,
        priority: idx + 1,
      }));

      return { ...prevState, reservationOptions: indexedNewOptions };
    });
  };

  const onMakeMobileCalendarReservation = (selectedTime: SelectedTimeType) => {
    /* 이미 옵션이 있는 경우, 지워줘야 함 */
    const option = guestInfo.reservationOptions.find(
      ({ startDateTime }) => startDateTime === selectedTime.startDateTime
    );

    if (option) {
      deleteCurrentOption(selectedTime);
      return;
    }

    /* 이미 옵션이 다 찼으면, 새로 옵션을 선택하지 못하게 해줘야 함 */
    if (guestInfo.reservationOptions.length === optionCount) {
      return;
    }

    setGuestInfo((prevState) => {
      const { length } = prevState.reservationOptions;
      const newOption = [
        ...prevState.reservationOptions.map((option, index) => ({
          ...option,
          priority: index + 1,
        })),
        {
          id: nanoid(),
          startDateTime: dayjs
            .utc(selectedTime.startDateTime)
            .tz(selectedTimezone?.timezone)
            .format(FORMAT.YMDHmsSZ),
          endDateTime: dayjs
            .utc(selectedTime.startDateTime)
            .tz(selectedTimezone?.timezone)
            .add(timeUnitToMilliseconds(duration), 'ms')
            .format(FORMAT.YMDHmsSZ),
          priority: length + 1,
          className: 'blocked-events',
          overlap: false,
          blocked: true,
        },
      ];
      return {
        ...prevState,
        reservationOptions: newOption,
      };
    });
  };

  const clearCalendarBlocks = () => {
    setGuestInfo((prevState) => ({
      ...prevState,
      reservationOptions: [],
    }));
  };

  useEffect(() => {
    clearCalendarBlocks();
    getMobileCalendar();
  }, [selectedTimezone]);

  return (
    <Styled.MobileContainer>
      <Styled.MobileLanguageDropdownWrapper>
        <LanguageDropdown position="relative" />
      </Styled.MobileLanguageDropdownWrapper>
      <Styled.MobileContentWrapper>
        <Styled.OptionsWrapper>
          <ReservationPreview
            selectedTimezone={selectedTimezone}
            onTimeZoneSelected={onTimeZoneSelected}
            pageInfo={hostInfo}
            changeDurationInParent={setDuration}
          />
          <Line />
        </Styled.OptionsWrapper>
        <Styled.CalendarWrapper>
          <Styled.Header>{t('mobile.description')}</Styled.Header>
          <MobileCalendar
            availableDateTimesData={availableDateTimesData}
            guestInfo={guestInfo}
            onMakeOptions={onMakeMobileCalendarReservation}
            optionCount={optionCount}
            onTimeSelectionCompleted={onTimeSelectionCompleted}
            selectedTimezone={selectedTimezone}
            onDateChange={(year: number, month: number) =>
              setMobileMonth({ year, month })
            }
          />
          <ImageContainer width={200}>
            <AutoHeightImage
              src={`${BASE_URL.image}/banners/powered_by_no_bg.png`}
              alt="powered_by_sendtime"
            />
          </ImageContainer>
        </Styled.CalendarWrapper>
      </Styled.MobileContentWrapper>
    </Styled.MobileContainer>
  );
};

export default MobileGuestReservation;
