import React from 'react';
import { GetServerSideProps } from 'next';

import WithAuth from '@components/AuthRedirect';
import { MetaProps } from '@components/Meta';
import { ROUTES } from '@constants/routes';
import { META_TRANSLATION_ID } from '@constants/seo';
import ReservationProvider from '@contexts/ReservationProvider';
import Reservation from '@pages/Reservation';

const Page = () => {
  return (
    <>
      <ReservationProvider edit>
        <Reservation edit />
      </ReservationProvider>
    </>
  );
};

export default WithAuth(Page);

export const getServerSideProps: GetServerSideProps = async () => {
  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.RESERVATION_EDIT,
    route: ROUTES.EDIT.RESERVATION,
  };
  return { props: { meta } };
};
