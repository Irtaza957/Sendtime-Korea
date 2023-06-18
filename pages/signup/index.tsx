import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { MetaProps } from '@components/Meta';
import { USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import { META_TRANSLATION_ID } from '@constants/seo';
import SignUpPage, { SignUpPageProps } from '@pages/SignUp';
import { getLocalStorage } from '@utils/storage';

const Page = (props: SignUpPageProps) => {
  const router = useRouter();
  const { groupId } = router.query;
  const userToken = getLocalStorage(USER_TOKEN);

  useEffect(() => {
    if (!groupId && userToken) {
      router.replace(ROUTES.MY_CALENDAR);
    }
  }, [groupId, router, userToken]);

  return <SignUpPage {...props} />;
};

export default Page;

export const getServerSideProps: GetServerSideProps<
  SignUpPageProps
> = async () => {
  const timezonesResponse = await axios.get<TimezoneResponse>(
    `${process.env.API_SERVER}/timezones`
  );

  const meta: MetaProps = {
    useTranslation: true,
    translationId: META_TRANSLATION_ID.SIGNUP,
    route: ROUTES.USER.SIGN_UP,
  };

  return {
    props: { timezones: timezonesResponse.data.results, meta },
  };
};
