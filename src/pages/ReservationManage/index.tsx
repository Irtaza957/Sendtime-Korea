import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { reservationAPI } from '@api/personal/reservation/Reservation';
import CalendarEvents from '@components/CalendarEvents';
import Navigation from '@components/Navigation';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import useLoading from '@hooks/useLoading';

import { PageContainer } from './index.styles';

type ReservationType = 'PERSONAL' | 'TEAM';

const ReservationManage = () => {
  const router = useRouter();
  const { navIndex } = router.query;
  const [reservationData, setReservationData] = useState<MyReservation[]>([]);
  const { loadingView } = useLoading();
  const { t } = useTranslation('common');

  const {
    data: myReservationPages,
    mutate: getReservationPages,
    isLoading: isMyPageLoading,
  } = useMutation(
    (type: ReservationType) => reservationAPI.getPageList({ type }),
    {
      onSuccess: ({ data: { results } }) => {
        const [data] = results;
        setReservationData(data.reservationPages);
      },
      onError: (error) => console.error(error),
    }
  );

  const items = [
    {
      title: t('nav_items.MY_CALENDAR'),
      onClick: () => getReservationPages('PERSONAL'),
      contents: (
        <CalendarEvents
          data={reservationData}
          refetch={() => getReservationPages('PERSONAL')}
        />
      ),
      dataLength: reservationData.length,
    },
    {
      title: t('nav_items.GROUP_CALENDAR'),
      onClick: () => getReservationPages('TEAM'),
      contents: (
        <CalendarEvents
          data={reservationData}
          refetch={() => getReservationPages('TEAM')}
        />
      ),
      dataLength: reservationData.length,
    },
  ];

  useEffect(() => {
    if (!navIndex) return;
    getReservationPages('PERSONAL');
  }, []);

  return (
    <PageContainer>
      <WithSidebarComponent>
        {isMyPageLoading && loadingView()}
        <SideAreaContainer>
          <Title margin="0 0 15px 0" padding="0 0 0 15px">
            {t('nav_items.MANAGE')}
          </Title>
          <Navigation navItems={items} pagination={false} />
        </SideAreaContainer>
      </WithSidebarComponent>
    </PageContainer>
  );
};

export default ReservationManage;
