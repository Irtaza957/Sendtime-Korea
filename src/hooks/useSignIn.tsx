import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { removeToken, setToken } from 'helper/TokenManager';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { request } from '@api/Request';
import { loginAPI, logoutAPI } from '@api/user/Auth';
import { coreUserState } from '@atoms/index';
import { USER_ID, USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import * as Sentry from '@sentry/browser';
import {
  getLocalStorage,
  removeFromLocalStorage,
  setLocalStorage,
} from '@utils/storage';
import { validate } from '@utils/validation';

import { Alert } from '../styles/common.styles';

const useSignIn = () => {
  const router = useRouter();
  const { t } = useTranslation('signIn');
  const { email } = router.query;
  const {
    showModal: showDuplicatedErrorModal,
    hideModal: hideDuplicatedErrorModal,
  } = useNestedModal({
    type: 'alert',
    title: t('alert.alreadySignedUpWithSocial'),
    description: t('alert.signInWithSocial'),
  });

  const setCoreUserInfo = useSetRecoilState(coreUserState);

  const [value, setValue] = useState({
    email: {
      text: email ? `${email}` : '',
      validated: !!email,
      alertMessage: <></>,
    },
    password: { text: '', alertMessage: <></>, validated: false },
  });

  const onChangeEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      email: {
        text: target.value,
        validated: true,
        alertMessage: <></>,
      },
    }));

    if (validate.email.empty(target.value)) {
      setValue((prevValue) => ({
        ...prevValue,
        email: {
          ...prevValue.email,
          validated: false,
          alertMessage: <></>,
        },
      }));
    }
  };

  const onChangePassword = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      password: {
        text: target.value,
        validated: true,
        alertMessage: <></>,
      },
    }));

    if (validate.password.empty(target.value)) {
      setValue((prevValue) => ({
        ...prevValue,
        password: {
          ...prevValue.password,
          validated: false,
          alertMessage: <></>,
        },
      }));
    }
  };

  const saveLoginInfo = (accessToken: string, userInfo: CoreUserInfo) => {
    setToken(accessToken);
    setCoreUserInfo({
      ...userInfo,
      integrationStatus: {
        zoom: false,
        meet: false,
        slack: false,
        googleGroupSheets: false,
        googleThirdPersonSheets: false,
        googlePersonalSheets: false,
      },
    });
    setLocalStorage(USER_TOKEN, accessToken);
    setLocalStorage(USER_ID, userInfo.id);

    if (accessToken) {
      request.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
    }
  };

  const { mutate: login, isLoading: loginLoading } = useMutation(
    async (nextTargetURL: { url: string; query?: Record<string, any> }) => {
      hideDuplicatedErrorModal();
      if (!validate.email.form(value.email.text)) {
        setValue((prevValue) => ({
          ...prevValue,
          email: {
            ...prevValue.email,
            alertMessage: <Alert>{t('alert.emailInputForm')}</Alert>,
            validated: false,
          },
        }));

        return { response: null, nextTargetURL };
      }

      const response = await loginAPI.login({
        email: value.email.text,
        password: value.password.text,
      });

      return { response, nextTargetURL };
    },
    {
      onSuccess: ({ response, nextTargetURL }) => {
        if (!response) return;
        const {
          data: { results },
        } = response;
        const { accessToken, userInfo } = results[0];

        saveLoginInfo(accessToken, userInfo);

        const { next, i, r } = router.query;
        if (
          typeof next === 'string' &&
          typeof i === 'string' &&
          typeof r === 'string' &&
          next &&
          i &&
          r
        ) {
          router.push(`${next}&i=${i}&r=${r}`);
          return;
        }

        if (!(next && i && r) && nextTargetURL.url) {
          const { ...rest } = router.query;

          router.push({
            pathname: nextTargetURL.url,
            query: { ...nextTargetURL.query, ...rest },
          });

          return;
        }

        if (userInfo.onboardStep !== 'DONE') {
          router.push(ROUTES.ONBOARDING.INIT);
          return;
        }

        router.push(ROUTES.MY_CALENDAR);
      },
      onError: (error: { message: string; code: number }) => {
        if (error.code === 4120) {
          showDuplicatedErrorModal();
          return;
        }

        let alert = error.message;
        if (error.code === 4103) {
          alert = t('alert.wrongPassword');
        }

        setValue((prevValue) => ({
          ...prevValue,
          password: {
            ...prevValue.password,
            alertMessage: <Alert>{alert}</Alert>,
          },
        }));

        return;
      },
    }
  );

  const { mutate: logout } = useMutation(
    () => {
      const token = getLocalStorage(USER_TOKEN);

      if (token) {
        return logoutAPI.logout();
      }

      throw new Error(t('alert.notLoggedIn'));
    },
    {
      onSuccess: () => {
        request.defaults.headers.common['Authorization'] = '';
        delete request.defaults.headers.common['Authorization'];

        removeFromLocalStorage(USER_TOKEN);
        removeFromLocalStorage(USER_ID);
        removeToken();

        setCoreUserInfo(null);
        router.push(ROUTES.USER.SIGN_IN);
      },
      onError: (error: { message: string }) => {
        Sentry.captureException(error);
        console.error(error);
        alert(error.message);
        router.push(ROUTES.USER.SIGN_IN);
      },
    }
  );

  const { mutate: logoutQuitely, isLoading: isLogoutQuitelyLoading } =
    useMutation(
      () => {
        const token = getLocalStorage(USER_TOKEN);

        if (token) {
          return logoutAPI.logout();
        }

        throw new Error(t('alert.notLoggedIn'));
      },
      {
        onSuccess: () => {
          request.defaults.headers.common['Authorization'] = '';
          delete request.defaults.headers.common['Authorization'];

          removeFromLocalStorage(USER_TOKEN);
          removeFromLocalStorage(USER_ID);
          removeToken();

          setCoreUserInfo(null);
        },
        onError: (error: { message: string }) => {
          Sentry.captureException(error);
          console.error(error);
          alert(error.message);
        },
      }
    );

  return {
    value,
    setValue,
    onChangeEmail,
    onChangePassword,
    login,
    loginLoading,
    logout,
    logoutQuitely,
    isLogoutQuitelyLoading,
    saveLoginInfo,
  };
};

export default useSignIn;
