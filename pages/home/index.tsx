import React from 'react';
import { GetServerSideProps } from 'next';

import { MetaProps } from '@components/Meta';
import { META_TRANSLATION_ID } from '@constants/seo';
import SignInPage from '@pages/SignIn';

const Page = () => {
  return (
    <>
      <SignInPage />
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.SIGNIN,
  };
  return { props: { meta } };
};
