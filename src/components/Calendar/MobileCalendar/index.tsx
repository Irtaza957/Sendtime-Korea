import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import StyledButton from '@components/Button';
import { GuestInfoType } from '@contexts/GuestReservationProvider';
import useTranslate from '@hooks/useTranslate';
import { LeftArrow, RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { SelectedTimeType } from '@pages/GuestReservation';
import { translateMeridiem } from '@utils/format';
import { REGION } from '@utils/language';
import { FORMAT, getDateWithZero } from '@utils/time';

import {
  ConfirmReservationButtonContainer,
  DotContainer,
  MobileCalendarContainer,
  MobileCalendarSection,
  TimeButton,
  TimeContainer,
} from './index.styles';

dayjs.extend(LocalizedFormat);

type MobileCalendarProps = GuestMobileCalendarInfo & {
  guestInfo: GuestInfoType;
  optionCount?: number;
  onMakeOptions?: (selectedTime: SelectedTimeType) => void;
  onTimeSelectionCompleted?: () => void;
  onDateChange: (year: number, month: number) => void;
  selectedTimezone: Timezone;
};

type availableTimes = SelectedTimeType & {
  startTime: string;
  endTime: string;
  startDateTime: string;
  endDateTime: string;
};

const MobileCalendar = ({
  guestInfo,
  optionCount,
  availableDateTimesData,
  onMakeOptions = () => {},
  onTimeSelectionCompleted = () => {},
  onDateChange,
  selectedTimezone,
}: MobileCalendarProps) => {
  const { t } = useTranslation('guestPage');
  const { i18n } = useTranslate();
  const [availableTimes, setAvailableTimes] = useState<availableTimes[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [forceCalendarRerender, setForceCalendarRerender] = useState(true);

  const availableDates = availableDateTimesData.map(({ date }) => date);

  const getAvailableTimes = (targetDate: Date) => {
    setSelectedDate(targetDate);
    const allTimes: ReservationTime[] = [];
    const selectedDateSchedules = availableDateTimesData.filter((schedule) => {
      return (
        dayjs(schedule.date).format(FORMAT.YMD) ===
        dayjs(targetDate).format(FORMAT.YMD)
      );
    });
    selectedDateSchedules.forEach((obj) => {
      obj.times.forEach((time) => {
        allTimes.push(time);
      });
    });
    const selectedDateTimes = allTimes;
    return selectedDateTimes?.map((time) => time);
  };

  const updateAvailableTimes = () => {
    if (selectedDate) getAvailableTimes(selectedDate);
  };

  const handleTime = (date: Date | string) => {
    const parsedTime = dayjs(date)
      .tz(selectedTimezone.timezone)
      .locale(REGION.KO)
      .format('A hh:mm');
    if (i18n.language.includes(REGION.KO)) {
      return dayjs(date)
        .tz(selectedTimezone.timezone)
        .locale(i18n.language)
        .format('a h시 mm분');
    }
    return translateMeridiem(parsedTime);
  };

  const availableDatesDate = availableDates.map((date) =>
    dayjs(date).format(FORMAT.YMD)
  );

  useEffect(() => {
    updateAvailableTimes();
    setSelectedDate(undefined);
    setForceCalendarRerender(false);
    const timer = setTimeout(() => {
      setForceCalendarRerender(true);
    }, 100);
    () => clearTimeout(timer);
  }, [selectedTimezone]);

  return (
    <MediaQuery maxWidth={1280}>
      <MobileCalendarContainer>
        <MobileCalendarSection>
          {forceCalendarRerender && (
            <Calendar
              onActiveStartDateChange={({ activeStartDate }) => {
                onDateChange(
                  activeStartDate.getFullYear(),
                  activeStartDate.getMonth() + 1
                );
              }}
              minDetail="month"
              maxDetail="month"
              calendarType="US"
              locale={i18n.language}
              tileDisabled={({ date }) =>
                !availableDatesDate.includes(dayjs(date).format(FORMAT.YMD))
              }
              tileContent={({ date }) => {
                const targetDate = getDateWithZero(date);

                const selectedDate = guestInfo.reservationOptions.find(
                  ({ startDateTime }) =>
                    getDateWithZero(new Date(startDateTime)) === targetDate
                );

                const isTargetDate = availableDates.some(
                  (event) => event === targetDate
                );

                /* Today 일 때 Dot만 보여주기*/
                if (
                  !isTargetDate &&
                  getDateWithZero(new Date()) === targetDate
                ) {
                  return <DotContainer />;
                }

                if (isTargetDate) {
                  /* Today이면서 일정이 있는 Date일 때 */
                  if (getDateWithZero(new Date()) === targetDate) {
                    return (
                      <>
                        <div
                          className={`available ${selectedDate && 'selected'}`}
                        >
                          {date.getDate()}
                        </div>
                        <DotContainer />
                      </>
                    );
                  }

                  /* Today가 아니면서 일정이 있는 Date일 때 */
                  return (
                    <div className={`available ${selectedDate && 'selected'}`}>
                      {date.getDate()}
                    </div>
                  );
                }

                /* 그 이외 */
                return <></>;
              }}
              prevLabel={
                <CustomIcon
                  size={7}
                  height={17}
                  fill="none"
                  stroke="gray-800"
                  viewBox="0 0 8 14"
                >
                  <LeftArrow />
                </CustomIcon>
              }
              prev2Label={null}
              nextLabel={
                <CustomIcon
                  size={7}
                  height={17}
                  fill="none"
                  stroke="gray-800"
                  viewBox="0 0 8 14"
                >
                  <RightArrow />
                </CustomIcon>
              }
              next2Label={null}
              formatDay={(_, date) => {
                const targetDate = getDateWithZero(date);
                const isTargetDate = availableDates.some(
                  (event) => event === targetDate
                );

                if (isTargetDate) {
                  return '';
                }

                return `${date.getDate()}`;
              }}
              tileClassName={({ date }) => {
                if (date.getDay() === 0) {
                  return 'sunday';
                }

                return null;
              }}
              onClickDay={(event) => {
                setAvailableTimes(getAvailableTimes(event) || []);
              }}
            />
          )}
        </MobileCalendarSection>

        <TimeContainer>
          {selectedDate &&
            availableTimes.map(
              ({ startTime, endTime, startDateTime, endDateTime }, idx) => {
                const priority = guestInfo.reservationOptions.find(
                  (option) => option.startDateTime === startDateTime
                )?.priority;

                return (
                  <TimeButton
                    key={idx}
                    selected={!!priority || false}
                    priority={priority || -1}
                    priorityName={t(`rank.${priority}`)}
                    onClick={() =>
                      onMakeOptions({
                        startTime,
                        endTime,
                        startDateTime: startDateTime,
                        endDateTime: endDateTime,
                      })
                    }
                  >
                    {handleTime(startDateTime)}
                  </TimeButton>
                );
              }
            )}
        </TimeContainer>
        <ConfirmReservationButtonContainer>
          <StyledButton
            onClickButton={onTimeSelectionCompleted}
            bgColor="mobile-active"
            padding="15px 0"
            disabled={guestInfo.reservationOptions.length === 0}
          >
            {guestInfo.reservationOptions.length}/{optionCount}{' '}
            {t('slotSelected')}
          </StyledButton>
        </ConfirmReservationButtonContainer>
      </MobileCalendarContainer>
    </MediaQuery>
  );
};

export default MobileCalendar;
