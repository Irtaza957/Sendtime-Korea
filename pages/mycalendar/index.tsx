import React from 'react';
import { GetServerSideProps } from 'next';

import WithAuth from '@components/AuthRedirect';
import { MetaProps } from '@components/Meta';
import { ROUTES } from '@constants/routes';
import { META_TRANSLATION_ID } from '@constants/seo';
import MyCalendar from '@pages/MyCalendar';

const Page = () => {
  return (
    <>
      <MyCalendar />
    </>
  );
};

export default WithAuth(Page);

export const getServerSideProps: GetServerSideProps = async () => {
  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.MY_CALENDAR,
    route: ROUTES.MY_CALENDAR,
  };
  return { props: { meta } };
};
