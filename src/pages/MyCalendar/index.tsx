import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import {
  myCalendarAPI,
  MyCalendarKeys,
} from '@api/personal/calendar/MyCalendar';
import { coreUserState } from '@atoms/index';
import Calendar from '@components/Calendar';
import ChannelService from '@components/ChannelService';
import NewTabLink from '@components/NewTabLink';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { HACKLE_KEYS } from '@constants/hackle';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { useTrack } from '@hackler/react-sdk';
import useCalendar from '@hooks/useCalendar';
import useLoading, { ICONTYPE } from '@hooks/useLoading';
import useTranslate from '@hooks/useTranslate';
import { XIcon } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';
import { FORMAT, toTzDateTime, toTzOffsetDateTime } from '@utils/time';

import {
  ArcadeEmbed,
  BannerText,
  CalendarLoading,
  MyCalendarContainer,
  NoticeBanner,
  NoticeBannerContainer,
} from './index.styles';

export type CalendarBlockEventType = {
  id: string;
  start: string;
  end: string;
  blocked: boolean;
  className: string;
};

export type CalendarWeeklyEventType = {
  id: string;
  title: string;
  start: string;
  end: string;
  className: string;
  range: {
    start: string;
    end: string;
  };
  user: {
    name: string;
    email: string;
  };
  location: string;
  category: string;
  calendarId: string;
};

dayjs.extend(utc);
dayjs.extend(weekday);

const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currentBrowserTime = toTzDateTime(new Date(), browserTimezone);

const MyCalendar = () => {
  const [, setCurrentTime] = useState(currentBrowserTime);
  const [user] = useRecoilState(coreUserState);
  const track = useTrack();
  const router = useRouter();
  const { i18n } = useTranslate();

  useEffect(() => {
    if (user?.onboardStep !== 'DONE') {
      router.push(ROUTES.ONBOARDING.INIT);
    }
  }, [user]);

  const {
    defaultDate,
    goPrev,
    goNext,
    goToday,
    handleMakeBlockingEvents,
    handleMakePersonalWeeklyEvents,
  } = useCalendar();
  const { isFirst } = router.query;

  const {
    refetch: syncCalendar,
    isLoading,
    isRefetching: isSyncLoading,
  } = useQuery('sync-calendar', () => myCalendarAPI.sync(), {
    onSuccess: () => getCalendarInfo(),
    enabled: false,
  });

  const { refetch: ghostSyncCalendar } = useQuery(
    'ghost-sync-calendar',
    () => myCalendarAPI.sync(),
    {
      onSuccess: () => getCalendarInfo(),
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    const channelTalk = new ChannelService();
    const { id, name, email } = user || { id: '', name: '', email: '' };

    const pluginKey =
      i18n.language === 'ko'
        ? process.env.NEXT_PUBLIC_CHANNEL_IO_KEY
        : process.env.NEXT_PUBLIC_CHANNEL_IO_ENG_KEY;
    channelTalk.boot({
      pluginKey: pluginKey,
      memberId: id,
      profile: { name, email },
    });

    return () => channelTalk.shutdown();
  }, []);

  useEffect(() => {
    track({ key: HACKLE_KEYS.VIEW.MY_CALENDAR });
  }, []);

  const { t } = useTranslation('common');

  const { loadingView } = useLoading(
    <CalendarLoading>{t('calendarLoading')}</CalendarLoading>,
    ICONTYPE.DEFAULT
  );

  const { showModal, hideModal } = useNestedModal({
    type: 'custom',
    customModal: (
      <ArcadeEmbed>
        <button
          onClick={() => hideModal()}
          style={{ position: 'absolute', right: '9.5%', top: '9.5%' }}
        >
          <CustomIcon
            size={16}
            scale={1.3}
            viewBox="1 1 14 14"
            fill="gray-100"
            stroke="gray-700"
          >
            <XIcon />
          </CustomIcon>
        </button>
        <iframe
          src="https://demo.arcade.software/Qf0x0ezL8uQHYmdZKTv7?embed"
          frameBorder="0"
          allowFullScreen
          style={{ width: '80%', height: '80%' }}
        />
      </ArcadeEmbed>
    ),
  });

  useEffect(() => {
    if (isFirst) {
      showModal();
    }
  }, []);

  const [events, setEvents] = useState<
    (CalendarWeeklyEventType | CalendarBlockEventType)[]
  >([]);

  const { mutate: deleteBlock } = useMutation(
    (id: string) => myCalendarAPI.deleteBlock(id),
    { onSuccess: () => getCalendarInfo() }
  );

  /* TODO: 
   1. Globalization 할 때 뒤에 +09:00 지워질 듯(거의 확실)
   2. milliseconds 지워질 듯(혹시 모름)
   3. 시간대는 따로 필드로 보내기
  */
  const { mutate: makeBlock } = useMutation(
    ({ startStr, endStr }: { startStr: string; endStr: string }) => {
      return myCalendarAPI.makeBlock({
        startTime: toTzOffsetDateTime(startStr, user?.timezone.timezone),
        endTime: toTzOffsetDateTime(endStr, user?.timezone.timezone),
      });
    },
    { onSuccess: () => getCalendarInfo() }
  );

  const { mutate: deleteEvent } = useMutation(
    ({ calId, id }: DeleteWeeklyEventsRequestParams) =>
      myCalendarAPI.deleteEvent({ calId, id }),
    { onSuccess: () => getCalendarInfo() }
  );

  useEffect(() => {
    syncCalendar();
  }, []);

  const { refetch: getCalendarInfo } = useQuery(
    MyCalendarKeys.get(),
    () => {
      const startDate = dayjs(defaultDate.start).format(FORMAT.YMD);
      const endDate = dayjs(defaultDate.end).format(FORMAT.YMD);

      return myCalendarAPI.get({ startDate, endDate });
    },
    {
      onSuccess: ({ data: { results } }) => {
        const [res] = results;

        const blockingEvents: CalendarBlockEventType[] =
          handleMakeBlockingEvents(res.nonDisturbTime);

        const weeklyEvents: CalendarWeeklyEventType[] =
          handleMakePersonalWeeklyEvents(res.events);

        setEvents([...blockingEvents, ...weeklyEvents]);
      },
      enabled: false,
    }
  );

  const calendarRef = useRef<HTMLElement | null>(null);

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
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const bannerDetail = [
    {
      link: 'https://splendid-mail-46d.notion.site/b81249fddffb450e9b594072525e37f1',
      text: t('banner.guide'),
    },
    {
      link: 'https://join.slack.com/t/sendtimecommunity/shared_invite/zt-1gbrirhtw-u8nAWAIkpDR~J4wpQigsjA',
      text: t('banner.slackCommunity'),
    },
  ];

  useEffect(() => {
    setCurrentTime(toTzDateTime(new Date(), user?.timezone.timezone));
  }, []);

  return (
    <MyCalendarContainer ref={calendarRef}>
      <WithSidebarComponent>
        {(isSyncLoading || isLoading) && loadingView()}
        <SideAreaContainer>
          <Title>
            {' '}
            <NoticeBannerContainer>
              {bannerDetail.map(({ text, link }, idx) => (
                <NewTabLink key={idx} href={link}>
                  <NoticeBanner>
                    <BannerText>{text}</BannerText>
                    <Icon
                      icon="heroicons-outline:arrow-narrow-right"
                      color="#8F98A3"
                    />
                  </NoticeBanner>
                </NewTabLink>
              ))}
            </NoticeBannerContainer>
          </Title>

          <Calendar
            events={events}
            updateCalendar={syncCalendar}
            onDeleteCalendarBlock={deleteBlock}
            onSelectCalendarBlock={makeBlock}
            onDeleteCalendarEvent={deleteEvent}
            locale={i18n.language}
            // nowTime={currentTime}
          />
        </SideAreaContainer>
      </WithSidebarComponent>
    </MyCalendarContainer>
  );
};

export default MyCalendar;
