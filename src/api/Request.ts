import axios from 'axios';
import i18next from 'i18next';

import { optionalAuthRoutes } from '@components/AuthRedirect';
import { USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import {
  getLocalStorage,
  removeFromLocalStorage,
  setLocalStorage,
} from '@utils/storage';

import { setToken } from '../helper/TokenManager';

const request = axios.create({
  baseURL: process.env.API_SERVER,
  withCredentials: true,
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    let alertPresent = false;

    console.error({ error });
    if (response.data.status.code === 4114) {
      if (typeof window !== undefined) {
        window.history.go(-2);
      }

      return;
    }

    // if (/(^\/reservation).*/g.test(window?.location.pathname)) {
    // return;
    // }

    if (response.data.status.code === 4013) {
      /* 만료된 토큰에 대한 오류 코드 - 이 오류가 발생하면 refresh 토큰을 발급하게 됨 */
      const {
        data: { results },
      } = await request.post<RefreshTokenResponse>(`/auth/refresh`);

      const { accessToken: newToken } = results[0];

      request.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setLocalStorage(USER_TOKEN, newToken);

      if (typeof window !== undefined) {
        window.location.reload();
      }

      return;
    }

    if (
      response.data.status.code === 4014 ||
      response.data.status.code === 4015
    ) {
      /* 4014: 유효하지 않은 토큰 = login으로 보내줘야 함. */
      /* 4015: refresh token 만료 = login으로 보내줘야 함. */
      removeFromLocalStorage(USER_TOKEN);
      request.defaults.headers.common['Authorization'] = '';
      delete request.defaults.headers.common['Authorization'];

      if (
        typeof window !== undefined &&
        !optionalAuthRoutes.includes(window.location.pathname) &&
        !window.location.pathname.includes('/space/@') &&
        !window.location.pathname.includes(ROUTES.GUEST_RESERVATION.CONTENT)
      ) {
        window.location.replace(
          `${ROUTES.USER.SIGN_IN}?url=${window.location.pathname}`
        );
        return;
      }
    }

    // if (response.data.status.code === 4113) {
    //   alert(
    //     '동기화할 연동된 외부 캘린더가 없습니다. 연결을 원하시면 마이페이지에서 연결해주세요.'
    //   );
    // }

    if (response.data.status.code === 5000) {
      if (!alertPresent) {
        alert(i18next.t('commonRequests:serverError'));
      }
      alertPresent = true;
    }

    if (
      response.data.status.code === 4010 &&
      response.data.status.message !== '계정 정보가 올바르지 않습니다.'
    ) {
      if (
        typeof window !== undefined &&
        !optionalAuthRoutes.includes(window.location.pathname) &&
        !window.location.pathname.includes('/space/@') &&
        !window.location.pathname.includes(ROUTES.GUEST_RESERVATION.CONTENT)
      ) {
        window.location.replace(
          `${ROUTES.USER.SIGN_IN}?url=${window.location.pathname}`
        );
      }
      return;
    }

    throw error.response.data.status;
  }
);

const token = getLocalStorage(USER_TOKEN);

if (token) {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  setToken(token);
}

export { request };
