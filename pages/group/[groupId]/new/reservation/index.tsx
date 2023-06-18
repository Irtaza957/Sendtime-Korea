import React from 'react';
import { GetServerSideProps } from 'next';

import WithAuth from '@components/AuthRedirect';
import { MetaProps } from '@components/Meta';
import { META_TRANSLATION_ID } from '@constants/seo';
import GroupReservationProvider from '@contexts/GroupReservationProvider';
import GroupReservation from '@pages/Group/Reservation';
import { getSessionStorage } from '@utils/storage';

const Page = () => {
  const getParticipants = () => {
    const p = getSessionStorage('p');
    if (p && p !== 'undefined') return p;
    return '';
  };

  return (
    <>
      <GroupReservationProvider>
        <GroupReservation participants={getParticipants()} />
      </GroupReservationProvider>
    </>
  );
};

export default WithAuth(Page);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.GROUP.RESERVATION,
    route: `/group/${context.params?.groupId}/new/reservation`,
  };

  return { props: { meta } };
};
