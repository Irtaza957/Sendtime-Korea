import React from 'react';
import { useRouter } from 'next/router';

import { USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import { getLocalStorage } from '@utils/storage';

const App = () => {
  const router = useRouter();
  if (process.env.ACTIVATE_MAINTENANCE_MODE == 'true') {
    router.push(ROUTES.MAINTENANCE);
    return <></>;
  }

  const userToken = getLocalStorage(USER_TOKEN);
  if (userToken) {
    router.push(ROUTES.MY_CALENDAR);
    return <></>;
  }

  if (typeof window !== 'undefined') {
    if (process.env.NEXT_PUBLIC_SKIP_LANDING_PAGE == 'true') {
      router.push(ROUTES.USER.SIGN_IN);
    } else {
      if (router.locale?.includes('ko')) {
        window.location.replace(ROUTES.LANDING.KO);
      } else {
        window.location.replace(ROUTES.LANDING.EN);
      }
    }
  }

  return <></>;
};

export default App;
