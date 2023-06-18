import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { LinkAPI } from '@api/personal/calendar/LinkCalendar';
import { SYNC_CATEGORY } from '@constants/storage';
import { Icon } from '@iconify/react';
import * as Sentry from '@sentry/browser';
import { setLocalStorage } from '@utils/storage';

const SyncSheetPage = () => {
  const router = useRouter();
  const { category } = router.query;

  if (typeof category === 'string') {
    setLocalStorage(SYNC_CATEGORY, category);
  }

  const { mutate: syncSheet } = useMutation(
    () => LinkAPI.syncGoogleSheets('GOOGLE_SHEETS'),
    {
      onSuccess: ({ data: { results } }) => {
        /* sync/bridge/sheets 로 이동 */
        router.push(results[0]);
      },
      onError: (error: { message: string }) => {
        Sentry.captureException(error);
        console.error(error);

        alert('구글 스프레드시트 연동 오류입니다. 다시 시도해주세요.');
        router.back();
      },
    }
  );

  useEffect(() => {
    syncSheet();
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
      구글 스프레드 시트를 연동중입니다. <br />
      새로고침(F5)을 누르지 마세요.
    </div>
  );
};

export default SyncSheetPage;
