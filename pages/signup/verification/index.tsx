import React from 'react';
import { GetServerSideProps } from 'next';

import { MetaProps } from '@components/Meta';
import { ROUTES } from '@constants/routes';
import { META_TRANSLATION_ID } from '@constants/seo';
import SignUpVerificationPage from '@pages/SignUp/verification';

const Page = () => {
  return (
    <>
      <SignUpVerificationPage />
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.SIGNUP,
    route: ROUTES.USER.SIGN_UP_VERIFICATION,
  };
  return { props: { meta } };
};
