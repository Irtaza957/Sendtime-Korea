import React from 'react';
import { GetServerSideProps } from 'next';

import { MetaProps } from '@components/Meta';
import { ROUTES } from '@constants/routes';
import { META_TRANSLATION_ID } from '@constants/seo';
import ResetPasswordPage from '@pages/Password/Reset';

const Page = () => {
  return (
    <>
      <ResetPasswordPage />
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.DEFAULT,
    route: ROUTES.PASSWORD.RESET,
  };
  return { props: { meta } };
};
