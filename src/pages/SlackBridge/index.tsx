import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { externalServicesAPI } from '@api/integrations/ExternalServices';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { Icon } from '@iconify/react';
import * as Sentry from '@sentry/browser';

import { FROM_BRIDGE } from '../../constants/account';
import { setLocalStorage } from '../../utils/storage';

const SlackBridge = () => {
  const router = useRouter();
  const routerPath = router.asPath;
  const { showModal } = useNestedModal({
    type: 'alert',
    title: 'Slack 오류',
    description: `Slack 내부 오류가 발생했습니다. 
    새로고침 후 다시 시도해주세요.`,
  });

  const { mutate: getSlackIntegration } = useMutation(
    (params: GetSlackIntegrationParams) =>
      externalServicesAPI.getSlackIntegration(params),
    {
      onSuccess: () => {
        setLocalStorage(FROM_BRIDGE, 'true');

        router.replace(ROUTES.MY_PAGE);
      },
      onError: (error) => {
        Sentry.captureException(error);
        showModal();
        console.error(error);
      },
    }
  );

  useEffect(() => {
    const code = routerPath.split('?code=')[1];

    if (!code) {
      showModal();
      return;
    }

    getSlackIntegration({ code });
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
      슬랙을 연동중입니다. <br />
      새로고침(F5)을 누르지 마세요.
    </div>
  );
};

export default SlackBridge;
