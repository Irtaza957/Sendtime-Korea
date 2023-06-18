import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { userInfoAPI } from '@api/user/UserInfo';
import { coreUserState } from '@atoms/index';
import { USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import { getLocalStorage } from '@utils/storage';

import Custom404 from '../../../pages/404';

/* TODO: Authentication이 필요한 새로운 페이지가 있을 때 여기에 들어가면 됨 */
const validRoutes = [
  ROUTES.USER.SIGN_IN,
  ROUTES.USER.SIGN_UP,
  ROUTES.USER.SIGN_OUT,
  ROUTES.MAIN,
  ROUTES.MANAGE.INDEX,
  ROUTES.MY_CALENDAR,
  ROUTES.MY_PAGE,
  ROUTES.NEW.COMPLETED,
  ROUTES.NEW.RESERVATION,
  ROUTES.EDIT.RESERVATION,
  ROUTES.ONBOARDING.INIT,
  ROUTES.ONBOARDING.JOIN_PATH,
  ROUTES.ONBOARDING.SELECT.CALENDAR,
  ROUTES.ONBOARDING.SELECT.CATEGORY,
  ROUTES.ONBOARDING.SETTINGS,
  ROUTES.ONBOARDING.URL,
  ROUTES.GROUP.MANAGE,
  ROUTES.GROUP.MAIN,
  ROUTES.GROUP.INVITATION,
  ROUTES.GROUP.NEW,
  ROUTES.GROUP.NEW_COMPLETED,
  ROUTES.GROUP.PARTICIPATION,
  ROUTES.GROUP.SETTINGS,
  ROUTES.GROUP.PARTICIPANTS,
  ROUTES.SECRET.CUSTOM_PAGE_MAKER,
  ROUTES.SECRET.QR,
  ROUTES.SECRET.QR_DETAIL,
  ROUTES.BRIDGE.SLACK,
  ROUTES.BRIDGE.ZOOM,
  ROUTES.BRIDGE.SHEETS,
  ROUTES.ONBOARDING.AUTO_SIGNIN_COMPLETED,
  ROUTES.PASSWORD.RESET,
  ROUTES.ACTIVATE,
];

export const optionalAuthRoutes = [
  ROUTES.SPACE,
  ROUTES.GUEST_RESERVATION.CONTENT,
];

const WithAuth = (Component: React.FC<any>) => {
  return function RequireAuthWrapperComponent<T>(props: T) {
    const userToken = getLocalStorage(USER_TOKEN);
    const [user, setUser] = useRecoilState(coreUserState);
    const router = useRouter();
    const isAuthRequired = useMemo(
      () => !optionalAuthRoutes.includes(router.pathname),
      [router.pathname]
    );

    useQuery('userQueryKey', () => userInfoAPI.getCoreUserInfo(), {
      onSuccess: ({ data: { results } }) => {
        const [coreUser] = results;
        setUser(coreUser);

        // if (
        //   router.asPath === ROUTES.ONBOARDING.SELECT.CALENDAR ||
        //   router.asPath === ROUTES.ONBOARDING.SELECT.CATEGORY
        // ) {
        //   return;
        // }

        // if (!router.query.groupId && !coreUser.email) {
        //   router.push(ROUTES.ONBOARDING.EMAIL);
        //   return;
        // }

        // if (!router.query.groupId && !coreUser.customUrl) {
        //   router.push(ROUTES.ONBOARDING.URL);
        // }
      },
      refetchOnWindowFocus: false,
      enabled: isAuthRequired
        ? !user || router.pathname !== ROUTES.USER.SIGN_IN
        : userToken != null,
    });

    /* 게스트 예약 페이지가 없으면 404 페이지 */
    if (
      validRoutes.findIndex((route) => route === router.pathname) === -1 &&
      optionalAuthRoutes.findIndex((route) => route === router.pathname) ===
        -1 &&
      !/(\/reservation).*/g.test(router.pathname) &&
      !/(\/sync\/bridge).*/g.test(router.pathname)
    ) {
      return <Custom404 />;
    }

    /* 유저가 로그인 한 상태 */
    if (userToken && user) {
      return <Component {...props} />;
    }

    /* 유저가 로그인 하지 않은 상태 */
    if (
      /(^\/reservation).*/g.test(router.pathname) ||
      /(\/sync\/bridge).*/g.test(router.pathname) ||
      router.pathname === ROUTES.MAIN ||
      !isAuthRequired
    ) {
      return <Component {...props} />;
    }

    /* 새로고침 하는 상황 등 */
    return <></>;
  };
};

export default WithAuth;
