import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useGoogleSignIn from '@hooks/useGoogleSignIn';

const OAuth2GooglePage = () => {
  const router = useRouter();
  const path = router.asPath;

  const params: { [key: string]: string } = {};
  path
    .split('#')[1]
    ?.split('&')
    .forEach((param) => {
      const [key, value] = param.split('=');
      params[key] = value;
    });
  const { access_token: accessToken, state } = params;

  const { loginWithGoogle } = useGoogleSignIn(accessToken);

  useEffect(() => {
    const stateObject = JSON.parse(
      Buffer.from(decodeURIComponent(state), 'base64').toString()
    );
    loginWithGoogle({ state: stateObject });
  }, []);

  return <></>;
};

export default OAuth2GooglePage;
