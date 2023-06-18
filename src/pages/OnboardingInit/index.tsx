import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { userInfoAPI } from '@api/user/UserInfo';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';

const OnboadingInit = () => {
  const router = useRouter();
  const { loadingView } = useLoading();

  useQuery('userQueryKey', () => userInfoAPI.getCoreUserInfo(), {
    onSuccess: ({ data: { results } }) => {
      const [user] = results;

      switch (user?.onboardStep) {
        case 'JOIN_PATH':
          router.push(ROUTES.ONBOARDING.JOIN_PATH);
          break;
        case 'SYNC_CALENDAR':
          router.push(ROUTES.ONBOARDING.SELECT.CALENDAR);
          break;
        case 'RESERVATION_SETTING':
          router.push(ROUTES.ONBOARDING.SETTINGS);
          break;
        case 'CUSTOM_URL':
          router.push(ROUTES.ONBOARDING.URL);
          break;
        case 'DONE':
          router.push(ROUTES.MY_CALENDAR);
          break;
        default:
          router.push(ROUTES.ONBOARDING.JOIN_PATH);
          break;
      }
    },
  });

  return <>{loadingView()}</>;
};

export default OnboadingInit;
