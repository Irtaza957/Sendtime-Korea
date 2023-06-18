import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { myReservationAPI } from '@api/personal/reservation/MyReservations';
import Navigation from '@components/Navigation';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import useLoading from '@hooks/useLoading';
import { Main } from '@pages/MyPage/index.styles';

import ScheduleTab from './ScheduleTab';

const ManageSchedulesPage = () => {
  const { t } = useTranslation('eventHistoryPage');
  const { t: tCommon } = useTranslation('common');
  const [, setSearchInput] = useState('');

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const { loadingView } = useLoading();

  const {
    mutate: getUpcomingEvents,
    data: upcomingEvents,
    isLoading: isUpcomingEventsLoading,
  } = useMutation(
    (page?: number) =>
      myReservationAPI.getUpcoming({ limit: 10, page: page ? page : 1 }),
    { onSuccess: () => {} }
  );

  const {
    mutate: getPendingEvents,
    data: pendingEvents,
    isLoading: isPendingEventsLoading,
  } = useMutation(
    (page?: number) =>
      myReservationAPI.getPending({ limit: 10, page: page ? page : 1 }),
    { onSuccess: () => {} }
  );

  const {
    mutate: getPastEvents,
    data: pastEvents,
    isLoading: isPastEventsLoading,
  } = useMutation(
    (page: number) =>
      myReservationAPI.getPast({ limit: 10, page: page ? page : 1 }),
    { onSuccess: () => {} }
  );

  useEffect(() => {
    getUpcomingEvents(1);
    getPendingEvents(1);
  }, []);

  const items = () => {
    const upcoming = [
      {
        reservations: upcomingEvents?.data?.results[0].reservations || [],
      },
    ];
    const pending = [
      {
        reservations: pendingEvents?.data?.results[0].reservations || [],
      },
    ];
    const past = [
      {
        reservations: pastEvents?.data?.results[0].reservations || [],
      },
    ];
    return [
      {
        title: t('upcoming.title'),
        onClick: getUpcomingEvents,
        contents: <ScheduleTab data={upcoming} upcoming />,
        dataLength: upcomingEvents?.data?.results[0].totalCount || 0,
        showLength: true,
      },
      {
        title: t('pending.title'),
        onClick: getPendingEvents,
        contents: <ScheduleTab data={pending} pending />,
        dataLength: pendingEvents?.data?.results[0].totalCount || 0,
        notification: true,
        showLength: true,
      },
      {
        title: t('passed.title'),
        onClick: getPastEvents,
        contents: <ScheduleTab data={past} past />,
        dataLength: pastEvents?.data?.results[0].totalCount || 0,
      },
    ];
  };

  return (
    <Main>
      <WithSidebarComponent>
        {(isUpcomingEventsLoading ||
          isPendingEventsLoading ||
          isPastEventsLoading) &&
          loadingView()}
        <SideAreaContainer>
          <Title margin="0 0 15px 0" padding="0 0 0 15px">
            {tCommon('nav_items.MY_RESERVATION')}
          </Title>
          <Navigation navItems={items()} />
        </SideAreaContainer>
      </WithSidebarComponent>
    </Main>
  );
};

export default ManageSchedulesPage;
