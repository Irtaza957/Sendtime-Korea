import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import {
  myCalendarAPI,
  MyCalendarKeys,
} from '@api/personal/calendar/MyCalendar';
import { reservationAPI } from '@api/personal/reservation/Reservation';
import Calendar from '@components/Calendar';
import FormConfigPagePreview from '@components/pages/NewReservation/FormConfigPage/FormConfigPagePreview';
import FirstPage from '@components/Reservation/FirstPage';
import FirstPagePreview from '@components/Reservation/FirstPage/FirstPagePreview';
import FormConfigPage from '@components/Reservation/FormConfigPage';
import FourthPage from '@components/Reservation/FourthPage';
import SecondPage from '@components/Reservation/SecondPage';
import ThirdPage from '@components/Reservation/ThirdPage';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { Radio, useReservation } from '@contexts/ReservationProvider';
import useDebounce from '@hooks/useDebounce';
import useLoading from '@hooks/useLoading';
import useSnackbar from '@hooks/useSnackbar';
import useUserInfo from '@hooks/useUserInfo';
import * as Sentry from '@sentry/browser';
import { sortDurations } from '@utils/durationSort';
import {
  FORMAT,
  korToEngWeekDay,
  makeDaysOfWeek,
  toDateWithDash,
  toTzOffsetDateTime,
} from '@utils/time';

import { CalendarBlockEventType } from '../MyCalendar';

import { Content, FormContent, PreviewPageContainer } from './index.styles';
import PageContainer from './PageContainer';

interface ReservationProps {
  edit?: boolean;
}

export const reservationPeriodInfo = (
  term: {
    custom: Radio;
    days: Radio;
    infinite: Radio;
  },
  user: any
) => {
  if (term.custom.checked) {
    return {
      isInfinite: false,
      startDateTime: toTzOffsetDateTime(
        term.custom.start,
        user.timezone.timezone
      ),
      endDateTime: toTzOffsetDateTime(term.custom.end, user.timezone.timezone),
    };
  }

  if (term.infinite.checked) {
    return {
      isInfinite: term.infinite.checked,
      startDateTime: toTzOffsetDateTime(new Date(), user.timezone.timezone),
      endDateTime: toTzOffsetDateTime(
        new Date('2999-12-31T00:00:00.000+09:00'),
        user.timezone.timezone
      ),
    };
  }

  if (term.days.checked) {
    return {
      isInfinite: false,
      startDateTime: toTzOffsetDateTime(
        term.days.start,
        user.timezone.timezone
      ),
      endDateTime: toTzOffsetDateTime(term.days.end, user.timezone.timezone),
    };
  }

  // 있을 수 없는 일이긴 함
  return { isInfinite: false, startDateTime: '', endDateTime: '' };
};

const Reservation = ({ edit }: ReservationProps) => {
  const {
    page,
    goNextPage,
    pageInfo,
    onMakeCalendarBlock,
    onDeleteCalendarBlock,
  } = useReservation();
  const { t } = useTranslation('common');
  const { loadingView } = useLoading();
  const { debounce } = useDebounce();
  const router = useRouter();
  const { id: pageId } = router.query;
  const { userInfo } = useUserInfo();
  const { showModal } = useNestedModal({
    type: 'alert',
    description: `${
      edit
        ? t('errorMessage.editBookingPageError')
        : t('errorMessage.createBookingPageError')
    }`,
  });
  const showSnackbar = useSnackbar();
  const { mutate: createReservation } = useMutation(
    () => {
      const data: CreateReservationParams = {
        reservationPageName: pageInfo.title,
        reservationPageType: 'PERSONAL',
        reservationPageDescription: pageInfo.description,
        reservationPeriodInfo: reservationPeriodInfo(pageInfo.term, userInfo),
        timeUnit: sortDurations(pageInfo.timeIndex),
        reservationAvailableRange: pageInfo.availableDays.map(
          ({ day, start, end, available }) => ({
            day: korToEngWeekDay(day),
            start,
            end,
            available,
          })
        ) as unknown as CreateReservationParams['reservationAvailableRange'],
        frontBufferTime: pageInfo.spareTime.before.checked
          ? pageInfo.spareTime.before.time
          : '',
        backBufferTime: pageInfo.spareTime.next.checked
          ? pageInfo.spareTime.next.time
          : '',
        reservationPageOptionCount: pageInfo.rankOption.value,
        masking: pageInfo.masked,
        remind: pageInfo.reminder,
        blockingTimes: pageInfo.blockingTimes.map(({ start, end }) => ({
          startTime: start,
          endTime: end,
        })),
        reservationLocations: [
          ...pageInfo.location
            .filter(({ checked }) => checked)
            .map(({ id, content }) => ({ id, name: content, type: 'CUSTOM' })),
          ...pageInfo.online
            .filter(({ checked }) => checked)
            .map(({ id, content }) => {
              if (content === 'Zoom') {
                return { id, name: content, type: 'ZOOM' };
              }

              if (content === 'Google Meet') {
                return { id, name: content, type: 'MEET' };
              }

              if (content === 'Microsoft Teams') {
                return { id, name: content, type: 'TEAMS' };
              }

              if (content === '전화 미팅') {
                return { id, name: content, type: 'PHONE' };
              }

              return { id, name: content, type: 'CUSTOM' };
            }),
        ],
        questions: pageInfo.form.questions.map((question) => {
          return {
            ...(edit && { questionId: question.id ? question.id : '' }),
            type: question.questionType,
            title: question.title,
            options: question.options || null,
            isContainEtc: question.isContainEtc || false,
            isRequired: question.isRequired,
            isExposed: question.isSwitchOn || false,
          };
        }) as unknown as CreateReservationParams['questions'],
      };

      return edit
        ? reservationAPI.update(data, typeof pageId === 'string' ? pageId : '')
        : reservationAPI.create(data);
    },
    {
      onSuccess: () => {
        goNextPage();
        !edit &&
          showSnackbar({
            type: 'up',
            message: t('successMessage.createdBookingPage'),
          });
      },
      onError: (error: Error) => {
        showModal();
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  type HiddenEvents = Omit<CalendarBlockEventType, 'blocked' | 'id'>;
  type NotHiddenEvents = {
    title: string;
    start: string;
    end: string;
    className: 'calendar-events';
  };

  const [events, setEvents] = useState<{
    hiddenEvents: HiddenEvents[];
    notHiddenEvents: (NotHiddenEvents | HiddenEvents)[];
  }>({ hiddenEvents: [], notHiddenEvents: [] });

  const { refetch: getCalendarPreview, isFetching: getCalendarPreviewLoading } =
    useQuery(
      MyCalendarKeys.getPreview(),
      () =>
        myCalendarAPI.calendarPreview({
          startDate: setStartDate(),
          endDate: setEndDate(),
          masking: pageInfo.masked,
          frontBufferTime: pageInfo.spareTime.before.checked
            ? pageInfo.spareTime.before.time
            : '0분',
          backBufferTime: pageInfo.spareTime.next.checked
            ? pageInfo.spareTime.next.time
            : '0분',
        }),
      {
        onSuccess: ({ data: { results } }) => {
          const { masking, events, blockingTimes } = results[0];

          const blockedEvents: HiddenEvents[] = blockingTimes.map(
            ({ startTime, endTime }) => ({
              start: startTime,
              end: endTime,
              className: 'blocked-events',
            })
          );

          if (masking) {
            const maskedEvents: HiddenEvents[] = events.map(
              ({ startTime, endTime }) => ({
                start: startTime,
                end: endTime,
                className: 'blocked-events',
              })
            );

            setEvents((prevEvents) => ({
              ...prevEvents,
              hiddenEvents: [...maskedEvents, ...blockedEvents],
            }));

            return;
          }

          const unMaskedEvents: NotHiddenEvents[] = events.map(
            ({ name, startTime, endTime }) => ({
              title: name,
              start: startTime,
              end: endTime,
              className: 'calendar-events',
              range: {
                start: startTime,
                end: endTime,
              },
            })
          );

          setEvents((prevEvents) => ({
            ...prevEvents,
            notHiddenEvents: [...unMaskedEvents, ...blockedEvents],
          }));

          return;
        },
      }
    );

  useEffect(() => {
    getCalendarPreview();
  }, [
    pageInfo.masked,
    pageInfo.spareTime.before.checked,
    pageInfo.spareTime.next.checked,
    pageInfo.spareTime.before.time,
    pageInfo.spareTime.next.time,
    getCalendarPreview,
  ]);

  const setEndDate = () => {
    const { term } = pageInfo;
    const { custom, days, infinite } = term;

    if (custom.checked) {
      return dayjs(custom.end).add(1, 'day').format(FORMAT.YMD);
    }

    if (days.checked) {
      return dayjs(days.end).add(1, 'day').format(FORMAT.YMD);
    }

    if (infinite.checked) {
      return '2023-12-31';
    }

    return toDateWithDash(new Date());
  };

  const setStartDate = () => {
    const { term } = pageInfo;
    const { custom, days, infinite } = term;
    const currentDate = dayjs();
    if (custom.checked) {
      return dayjs(custom.start).isAfter(currentDate)
        ? dayjs(custom.start).format(FORMAT.YMD)
        : currentDate.format(FORMAT.YMD);
    }

    if (days.checked) {
      return dayjs(days.start).isAfter(currentDate)
        ? dayjs(days.start).format(FORMAT.YMD)
        : currentDate.format(FORMAT.YMD);
    }

    if (infinite.checked) {
      return dayjs(infinite.start).isAfter(currentDate)
        ? dayjs(infinite.start).format(FORMAT.YMD)
        : currentDate.format(FORMAT.YMD);
    }

    return toDateWithDash(new Date());
  };

  const businessHours = pageInfo.availableDays
    .filter(({ available }) => available)
    .map(({ day, start, end }) => ({
      daysOfWeek: [makeDaysOfWeek(day)],
      startTime: start,
      endTime: end,
    }));

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [page]);

  const handleReservation = () => {
    debounce(() => createReservation(), 500);
  };

  return (
    <WithSidebarComponent>
      {getCalendarPreviewLoading && loadingView()}
      <SideAreaContainer padding="33px 28px 0 28px">
        <Title>
          {edit
            ? t('titleForPages.editBookingPage')
            : t('titleForPages.createBookingPage')}
        </Title>
        <PageContainer
          edit={edit}
          createReservation={handleReservation}
          editableContents={
            <>
              {page === 1 && (
                <Content ref={contentRef}>
                  <FirstPage />
                </Content>
              )}
              {page === 2 && (
                <Content ref={contentRef}>
                  <SecondPage />
                </Content>
              )}
              {page === 3 && (
                <Content ref={contentRef}>
                  <ThirdPage />
                </Content>
              )}
              {page === 4 && (
                <FormContent ref={contentRef}>
                  <FormConfigPage type="PERSONAL" />
                </FormContent>
              )}
              {page === 5 && <FourthPage />}
            </>
          }
          previewContents={
            <>
              {page === 1 && (
                <FirstPagePreview pageInfo={pageInfo} type="PERSONAL" />
              )}
              {(page === 2 || page === 3) && (
                <PreviewPageContainer>
                  <Calendar
                    enableModal={false}
                    businessHours={businessHours}
                    validRange={{ start: setStartDate(), end: setEndDate() }}
                    events={
                      pageInfo.masked
                        ? [...events.hiddenEvents, ...pageInfo.blockingTimes]
                        : [...events.notHiddenEvents, ...pageInfo.blockingTimes]
                    }
                    withNavigation={false}
                    selectable={false}
                    allDaySlot={false}
                    locale={i18n.language}
                  />
                </PreviewPageContainer>
              )}
              {page === 4 && (
                <FormConfigPagePreview pageInfo={pageInfo} type="PERSONAL" />
              )}
              {page === 5 && (
                <Calendar
                  enableModal={false}
                  businessHours={businessHours}
                  validRange={{ start: setStartDate(), end: setEndDate() }}
                  events={
                    pageInfo.masked
                      ? [...events.hiddenEvents, ...pageInfo.blockingTimes]
                      : [...events.notHiddenEvents, ...pageInfo.blockingTimes]
                  }
                  withNavigation={false}
                  onSelectCalendarBlock={onMakeCalendarBlock}
                  onDeleteCalendarBlock={onDeleteCalendarBlock}
                  allDaySlot={false}
                  locale={i18n.language}
                />
              )}
            </>
          }
        />
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default Reservation;
