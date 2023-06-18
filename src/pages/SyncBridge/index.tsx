import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import i18n from 'locales';
import { useMutation } from 'react-query';

import { LinkAPI } from '@api/personal/calendar/LinkCalendar';
import { FROM_BRIDGE, PREVIOUS_PATH } from '@constants/account';
import usePreventGoBack from '@hooks/usePreventGoBack';
import { Icon } from '@iconify/react';
import {
  getLocalStorage,
  removeFromLocalStorage,
  setLocalStorage,
} from '@utils/storage';

export type QueryParamsObj = {
  [key: string]: string;
};

const SyncBridge = () => {
  const router = useRouter();
  const routerPath = router.asPath;
  usePreventGoBack();

  const { mutate: getCalendar } = useMutation(
    (params: GetCalendarRequestParams) => LinkAPI.getCalendar(params),
    {
      onSuccess: () => {
        setLocalStorage(FROM_BRIDGE, 'true');
        const previousPath = getLocalStorage(PREVIOUS_PATH);

        if (!previousPath) return;

        removeFromLocalStorage(PREVIOUS_PATH);
        router.push(previousPath);
      },
      onError: (error: { message: string; code: number }) => {
        if (error.message === 'Google Account already registered.') {
          setLocalStorage(FROM_BRIDGE, 'true');
        }
        if (error.code === 4501) {
          alert(i18next.t('commonRequests:googleCalendarPermissionRequired'));
        }

        const previousPath = getLocalStorage(PREVIOUS_PATH);

        if (!previousPath) {
          window.history.go(-4);
          return;
        }

        removeFromLocalStorage(PREVIOUS_PATH);
        router.push(previousPath);
      },
    }
  );

  useEffect(() => {
    const [_, queries] = routerPath.split('?');

    if (!queries) {
      alert('잘못된 접근입니다.');
      router.back();
      return;
    }

    const queryParamsArr = queries.split('&').map((query) => query.split('='));
    const queryParams = queryParamsArr.reduce((prev: QueryParamsObj, cur) => {
      const [key, value] = cur;
      prev[key] = value;
      return prev;
    }, {});

    if (queryParams['code'] === undefined) {
      router.back();
      return;
    }

    getCalendar({ type: 'GOOGLE', code: queryParams['code'] });
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 10,
        lineHeight: 1.4,
      }}
    >
      <Icon icon="line-md:loading-alt-loop" width={120} />
      {i18n.t('onboarding:integrateCalendar.pleaseWait')}
    </div>
  );
};

export default SyncBridge;
