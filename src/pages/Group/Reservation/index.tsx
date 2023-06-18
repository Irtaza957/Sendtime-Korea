import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import i18next from 'i18next';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import MediaQuery from 'react-responsive';

import {
  groupCalendarAPI,
  GroupCalendarKeys,
} from '@api/group/calendar/GroupCalendar';
import { groupReservationAPI } from '@api/group/reservation/Reservation';
import Calendar from '@components/Calendar';
import FormConfigPagePreview from '@components/pages/NewReservation/FormConfigPage/FormConfigPagePreview';
import FirstPage from '@components/Reservation/FirstPage';
import FirstPagePreview from '@components/Reservation/FirstPage/FirstPagePreview';
import FormConfigPage from '@components/Reservation/FormConfigPage';
import HowToPage from '@components/Reservation/HowToPage';
import SecondPage from '@components/Reservation/SecondPage';
import ThirdPage from '@components/Reservation/ThirdPage';
import ReservationNavigationBar from '@components/ReservationNavigationBar';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { PAGE_TYPE } from '@constants/utils';
import {
  GROUP_RESERVATION_PAGE_COUNT,
  useGroupReservation,
} from '@contexts/GroupReservationProvider';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useDebounce from '@hooks/useDebounce';
import useLoading from '@hooks/useLoading';
import useSnackbar from '@hooks/useSnackbar';
import useUserInfo from '@hooks/useUserInfo';
import { reservationPeriodInfo } from '@pages/Reservation';
import * as Sentry from '@sentry/browser';
import { sortDurations } from '@utils/durationSort';
import { getSessionStorage } from '@utils/storage';
import {
  FORMAT,
  korToEngWeekDay,
  makeDaysOfWeek,
  toDateWithDash,
} from '@utils/time';

import { CalendarBlockEventType } from '../../MyCalendar';
import {
  AboutPage,
  Box,
  Content,
  FormContent,
  PreviewAlert,
  PreviewContainer,
  PreviewContent,
  PreviewPageContainer,
  PreviewTitle,
  RightLine,
} from '../../Reservation/index.styles';

interface GroupReservationProps {
  participants?: string;
  edit?: boolean;
}

const GroupReservation = ({ edit, participants }: GroupReservationProps) => {
  const router = useRouter();
  const { id: pageId, groupId } = router.query;
  const { loadingView } = useLoading();
  const { debounce } = useDebounce();
  const showSnackbar = useSnackbar();
  const { userInfo } = useUserInfo();

  const gId = typeof groupId === 'string' ? groupId : '';

  const {
    isValidated,
    page,
    goNextPage,
    goPrevPage,
    pageInfo,
    onMakeCalendarBlock,
    onDeleteCalendarBlock,
  } = useGroupReservation();

  const { showModal } = useNestedModal({
    type: 'alert',
    description: i18next.t('common:errorMessage.createBookingPageError'),
  });

  const creatorIds = () => {
    if (edit) return pageInfo.creatorIds;

    const sessionParticipants = getSessionStorage('p');

    if (participants) {
      const participantArray = participants?.split(',');
      return participantArray;
    }

    if (sessionParticipants && sessionParticipants !== 'undefined') {
      const sessionParticipantArray = (sessionParticipants ?? []).split(',');
      return sessionParticipantArray || [];
    }

    return [];
  };

  const { mutate: createReservation } = useMutation(
    () => {
      const data: CreateGroupReservationParams = {
        ...(!edit && { hostId: gId }),
        reservationPageName: pageInfo.title,
        reservationPageType: 'TEAM',
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
        creatorIds: creatorIds(),
        googleOrganizerId:
          pageInfo.googleOrganizerOptions.find(({ checked }) => checked)?.id ||
          '',
        masking: pageInfo.masked,
        displayOption: pageInfo.displayOption,
        isDisplayBlockingTimes: pageInfo.isDisplayBlockingTimes,
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
        ? groupReservationAPI.update(data, `${pageId || ''}`)
        : groupReservationAPI.create(data);
    },
    {
      onSuccess: ({ data: { results } }) => {
        const res = results[0];

        // goNextPage({
        //   description: pageInfo.description,
        //   customUrl: res.customUrl,
        //   uuid: res.reservationPageUuid || '',
        //   edit: edit,
        // });

        goNextPage();
        !edit &&
          showSnackbar({
            type: 'up',
            message: i18next.t('common:successMessage.createdGroupBookingPage'),
          });
      },
      onError: (error) => {
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
      GroupCalendarKeys.getGroupPreview(),
      () =>
        groupCalendarAPI.getGroupCalendarPreview({
          team: gId,
          startDate: setStartDate(),
          endDate: setEndDate(),
          frontBufferTimeString: pageInfo.spareTime.before.checked
            ? pageInfo.spareTime.before.time
            : '0분',
          backBufferTimeString: pageInfo.spareTime.next.checked
            ? pageInfo.spareTime.next.time
            : '0분',
          masking: pageInfo.masked,
          displayOption: pageInfo.displayOption,
          creatorIds: creatorIds(),
          reservationPeriodInfo: reservationPeriodInfo(pageInfo.term, userInfo),
          timeUnit: pageInfo.timeIndex,
          reservationAvailableRange: pageInfo.availableDays.map(
            ({ day, start, end, available }) => ({
              day: korToEngWeekDay(day),
              start,
              end,
              available,
            })
          ) as unknown as CreateReservationParams['reservationAvailableRange'],
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

          /* 블로킹 타임 보여줌, 이벤트는 블록해서 보여줌 */
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

          /* 블로킹 타임, 이벤트 다 보여줌 */
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
        enabled: gId !== '',
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
    pageInfo.displayOption,
    pageInfo.creatorIds,
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

  const googleOrganizers = pageInfo.googleOrganizerOptions.map((option) => ({
    name: option.name,
    email: option.email,
    isLinked: option.isLinked,
    checked: option.checked,
  }));

  const handleNextClick = () => {
    if (page !== GROUP_RESERVATION_PAGE_COUNT) {
      goNextPage();
      return;
    }

    debounce(() => createReservation(), 500);
  };
  const { t } = useTranslation('createGroupBookingPage');
  return (
    <WithSidebarComponent>
      {getCalendarPreviewLoading && loadingView()}
      <SideAreaContainer padding="33px 28px 0 28px">
        <Title>{edit ? t('editTitle') : t('title')}</Title>
        <PreviewContainer isFourthPage={page === 4}>
          <Box>
            <ReservationNavigationBar
              currentStep={page}
              maxStep={GROUP_RESERVATION_PAGE_COUNT}
              onClickNext={handleNextClick}
              onClickBack={goPrevPage}
              isLast={page === GROUP_RESERVATION_PAGE_COUNT}
              isNextButtonDisabled={
                !(
                  isValidated.firstPage.title &&
                  isValidated.firstPage.term &&
                  isValidated.firstPage.isDurationSelected
                )
              }
              edit={edit}
            />
            {page === 1 && (
              <>
                <AboutPage>{t('pageName.1')}</AboutPage>
                <Content ref={contentRef}>
                  <FirstPage type={PAGE_TYPE.group} />
                </Content>
              </>
            )}
            {page === 2 && (
              <>
                <AboutPage>{t('pageName.2')}</AboutPage>
                <HowToPage
                  ref={contentRef}
                  type={PAGE_TYPE.group}
                  googleOrganizers={googleOrganizers}
                  edit={edit}
                />
              </>
            )}
            {page === 3 && (
              <>
                <AboutPage>{t('pageName.3')}</AboutPage>
                <Content ref={contentRef}>
                  <SecondPage type={PAGE_TYPE.group} />
                </Content>
              </>
            )}
            {page === 4 && (
              <>
                <AboutPage>{t('pageName.4')}</AboutPage>
                <Content ref={contentRef}>
                  <ThirdPage type={PAGE_TYPE.group} />
                </Content>
              </>
            )}
            {page === 5 && (
              <>
                <AboutPage>{t('pageName.5')}</AboutPage>
                <FormContent ref={contentRef}>
                  <FormConfigPage type="GROUP" />
                </FormContent>
              </>
            )}
          </Box>

          <MediaQuery minWidth={769}>
            <RightLine />
            <PreviewContent>
              {page !== 4 && page !== 5 && (
                <PreviewTitle>{t('preview.title')}</PreviewTitle>
              )}
              {page == 5 && (
                <PreviewTitle>{t('formPreview.title')}</PreviewTitle>
              )}
              {page === 1 && (
                <FirstPagePreview pageInfo={pageInfo} type="GROUP" />
              )}
              {(page === 2 || page === 3) && (
                <PreviewPageContainer>
                  <Calendar
                    businessHours={businessHours}
                    validRange={{ start: setStartDate(), end: setEndDate() }}
                    events={
                      pageInfo.masked
                        ? [...events.hiddenEvents, ...pageInfo.blockingTimes]
                        : [...events.notHiddenEvents, ...pageInfo.blockingTimes]
                    }
                    enableModal={false}
                    withNavigation={false}
                    selectable={false}
                    allDaySlot={false}
                    locale={i18n.language}
                  />
                </PreviewPageContainer>
              )}
              {page === 4 && (
                <PreviewPageContainer isFourthPage>
                  <PreviewAlert>{t('customBlockingTimes.guide')}</PreviewAlert>
                  <Calendar
                    businessHours={businessHours}
                    validRange={{ start: setStartDate(), end: setEndDate() }}
                    events={
                      pageInfo.masked
                        ? [...events.hiddenEvents, ...pageInfo.blockingTimes]
                        : [...events.notHiddenEvents, ...pageInfo.blockingTimes]
                    }
                    onSelectCalendarBlock={onMakeCalendarBlock}
                    onDeleteCalendarBlock={onDeleteCalendarBlock}
                    withNavigation={false}
                    enableModal={false}
                    allDaySlot={false}
                    locale={i18n.language}
                  />
                </PreviewPageContainer>
              )}
              {page === 5 && (
                <FormConfigPagePreview pageInfo={pageInfo} type="GROUP" />
              )}
            </PreviewContent>
          </MediaQuery>
        </PreviewContainer>
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default GroupReservation;
