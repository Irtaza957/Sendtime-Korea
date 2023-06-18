import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import {
  groupCalendarAPI,
  GroupCalendarKeys,
} from '@api/group/calendar/GroupCalendar';
import GroupCalendar from '@components/GroupCalendar';
import useCalendar from '@hooks/useCalendar';
import useLoading, { ICONTYPE } from '@hooks/useLoading';
import useTranslate from '@hooks/useTranslate';
import useUserInfo from '@hooks/useUserInfo';
import { FORMAT, toTzOffsetDateTime } from '@utils/time';

import { GroupCalendarContainer, GroupCalendarLoading } from './index.styles';

export type GroupCalendarBlockEventType = {
  id: string;
  start: string;
  end: string;
  blocked: boolean;
  className: string;
};

export type GroupCalendarWeeklyEventType = {
  id: string;
  title: string;
  start: string;
  end: string;
  className: string;
  calColor: string;
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

interface GroupCalendarPageProps {
  groupId: string;
  activeMembers: GroupMember[];
  validRange: {
    startDateTime: string;
    endDateTime: string;
  };
}

const GroupCalendarPage = ({
  groupId,
  activeMembers,
  validRange,
}: GroupCalendarPageProps) => {
  const {
    defaultDate,
    setDefaultDate,
    goPrev,
    goNext,
    goToday,
    handleMakeBlockingEvents,
    handleMakeGroupWeeklyEvents,
  } = useCalendar();
  const { i18n } = useTranslate();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (validRange.startDateTime && validRange.endDateTime) {
      setDefaultDate({
        start: dayjs(validRange.startDateTime).day(0).toDate(),
        end: dayjs(validRange.endDateTime).day(0).toDate(),
      });
    }
  }, [validRange]);

  const [events, setEvents] = useState<
    (GroupCalendarWeeklyEventType | GroupCalendarBlockEventType)[]
  >([]);

  const { t } = useTranslation('common');

  const { loadingView } = useLoading(
    <GroupCalendarLoading>{t('calendarLoading')}</GroupCalendarLoading>,
    ICONTYPE.DEFAULT
  );

  const { mutate: deleteBlock } = useMutation(
    (id: string) => groupCalendarAPI.deleteBlock({ blockTimeId: id, groupId }),
    { onSuccess: () => getCalendarInfo() }
  );

  /* TODO: 
   1. Globalization 할 때 뒤에 +09:00 지워질 듯(거의 확실)
   2. milliseconds 지워질 듯(혹시 모름)
   3. 시간대는 따로 필드로 보내기
  */
  const { mutate: makeBlock } = useMutation(
    ({ startStr, endStr }: { startStr: string; endStr: string }) => {
      return groupCalendarAPI.makeBlock({
        startTime: toTzOffsetDateTime(startStr, userInfo?.timezone.timezone),
        endTime: toTzOffsetDateTime(endStr, userInfo?.timezone.timezone),
        groupId,
      });
    },
    { onSuccess: () => getCalendarInfo() }
  );

  const {
    refetch: syncCalendar,
    isLoading: isSyncLoading,
    isRefetching: isSyncRefetching,
  } = useQuery(
    GroupCalendarKeys.sync(groupId),
    () => groupCalendarAPI.sync({ groupId }),
    {
      onSuccess: () => getCalendarInfo(),
      enabled: false,
    }
  );

  const memberIds = activeMembers.map(({ memberId }) => memberId);

  const {
    refetch: getCalendarInfo,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery(
    GroupCalendarKeys.getGroupCalendar(memberIds),
    () => {
      const startDate = dayjs(defaultDate.start).format(FORMAT.YMD);
      const endDate = dayjs(defaultDate.end).format(FORMAT.YMD);

      return groupCalendarAPI.getGroupCalendar({
        startDate,
        endDate,
        groupId,
        members: memberIds.join(','),
      });
    },
    {
      onSuccess: ({ data: { results } }) => {
        const [res] = results;

        const blockingEvents: GroupCalendarBlockEventType[] =
          handleMakeBlockingEvents(res.nonDisturbTime);

        const weeklyEvents: GroupCalendarWeeklyEventType[] =
          handleMakeGroupWeeklyEvents(res.events);

        setEvents([...blockingEvents, ...weeklyEvents]);
      },
      enabled: groupId !== '',
    }
  );

  useEffect(() => {
    getCalendarInfo();
  }, [groupId]);

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

  // const [showInfo, setShowInfo] = useState(false);
  // const [blockedDays, setBlockedDays] = useState(0);
  //     {/* {showInfo && (
  //       <GroupCalendarInfo start={blockedDays}>
  //         캘린더 공개기간이 아닙니다.
  //       </GroupCalendarInfo>
  //     )} */}

  return (
    <GroupCalendarContainer ref={calendarRef}>
      {(isLoading ||
        isFetching ||
        isRefetching ||
        isSyncLoading ||
        isSyncRefetching) &&
        loadingView()}
      <GroupCalendar
        events={events}
        updateCalendar={syncCalendar}
        onDeleteCalendarBlock={deleteBlock}
        onSelectCalendarBlock={makeBlock}
        enableModal={false}
        groupParticipants={activeMembers}
        groupId={groupId}
        validRange={{
          start: validRange.startDateTime,
          end: validRange.endDateTime,
        }}
        locale={i18n.language}
      />
    </GroupCalendarContainer>
  );
};

export default GroupCalendarPage;
