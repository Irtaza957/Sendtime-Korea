import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { LinkAPI } from '@api/personal/calendar/LinkCalendar';
import { ROUTES } from '@constants/routes';
import { SYNC_CATEGORY } from '@constants/storage';
import { Icon } from '@iconify/react';
import { getLocalStorage, removeFromLocalStorage } from '@utils/storage';

export type QueryParamsObj = {
  [key: string]: string;
};

/* 구글에서 result로 온 redirect URL로 가면 나오는 페이지 */
const SyncSheets = () => {
  const router = useRouter();
  const routerPath = router.asPath;

  const { mutate: integrateSheet } = useMutation(
    ({ type, category, code }: IntegrateSheetsParams) =>
      LinkAPI.integrateGoogleSheets({ type, category, code }),
    {
      onSuccess: () => {
        router.push(ROUTES.MY_PAGE);
      },
      onError: () => {
        alert(
          '구글 스프레드 시트를 연동하는 중 오류가 발생했습니다. 다시 시도해 주세요.'
        );
        router.back();
      },
    }
  );

  const isCategory = (
    cat: string
  ): cat is IntegrateSheetsParams['category'] => {
    return ['TEAM', 'PERSONAL', 'THIRD_PERSON'].indexOf(cat) !== -1;
  };

  useEffect(() => {
    const [_, queries] = routerPath.split('?');
    const queryParamsArr = queries.split('&').map((query) => query.split('='));
    const queryParams = queryParamsArr.reduce((prev: QueryParamsObj, cur) => {
      const [key, value] = cur;
      prev[key] = value;
      return prev;
    }, {});

    const cat = getLocalStorage(SYNC_CATEGORY);

    if (cat && isCategory(cat)) {
      integrateSheet({
        type: 'GOOGLE_SHEETS',
        category: cat,
        code: queryParams['code'],
      });
    }

    () => removeFromLocalStorage(SYNC_CATEGORY);
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

export default SyncSheets;
