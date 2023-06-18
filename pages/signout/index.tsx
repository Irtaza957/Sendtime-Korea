import React, { useEffect } from 'react';

import WithAuth from '@components/AuthRedirect';
import useLoading from '@hooks/useLoading';
import useSignIn from '@hooks/useSignIn';

const Page = () => {
  const { logout } = useSignIn();
  const { loadingView } = useLoading();

  useEffect(() => {
    logout();
  }, []);

  return <>{loadingView()}</>;
};

export default WithAuth(Page);
