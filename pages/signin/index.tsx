import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { MetaProps } from '@components/Meta';
import { USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import { META_TRANSLATION_ID } from '@constants/seo';
import SignInPage from '@pages/SignIn';
import { getLocalStorage } from '@utils/storage';

const Page = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const userToken = getLocalStorage(USER_TOKEN);

  useEffect(() => {
    if (!groupId && userToken) {
      router.replace(ROUTES.MY_CALENDAR);
    }
  }, []);

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
    route: ROUTES.USER.SIGN_IN,
  };
  return { props: { meta } };
};
