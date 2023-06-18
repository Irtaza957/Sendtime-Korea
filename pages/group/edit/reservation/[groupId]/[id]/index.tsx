import React from 'react';
import { GetServerSideProps } from 'next';

import WithAuth from '@components/AuthRedirect';
import { MetaProps } from '@components/Meta';
import { ROUTES } from '@constants/routes';
import { META_TRANSLATION_ID } from '@constants/seo';
import GroupReservationProvider from '@contexts/GroupReservationProvider';
import GroupReservation from '@pages/Group/Reservation';

const Page = () => {
  return (
    <>
      <GroupReservationProvider edit>
        <GroupReservation edit />
      </GroupReservationProvider>
    </>
  );
};

export default WithAuth(Page);

export const getServerSideProps: GetServerSideProps = async () => {
  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.GROUP.RESERVATION_EDIT,
    route: ROUTES.EDIT.RESERVATION,
  };
  return { props: { meta } };
};
