import React from 'react';
import { useRouter } from 'next/router';

import WithAuth from '@components/AuthRedirect';
import { PREVIOUS_PATH } from '@constants/account';
import SyncBridge from '@pages/SyncBridge';
import { getLocalStorage } from '@utils/storage';

const Page = () => {
  const router = useRouter();
  const { error } = router.query;

  if (error === 'access_denied' && typeof window !== 'undefined') {
    const previousPath = getLocalStorage(PREVIOUS_PATH);
    if (previousPath) {
      router.push(previousPath);
    } else {
      window.history.go(-3);
    }

    return <></>;
  }

  return <SyncBridge />;
};

export default WithAuth(Page);
