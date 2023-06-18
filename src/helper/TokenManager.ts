import axios from 'axios';
import { Cookies } from 'react-cookie';

import { DOMAIN, HTTP_ONLY } from '../config/config';

export const ACCESS_TOKEN_COOKIE_KEY = 'st_access_token';
export const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken';
const cookie = new Cookies();

const setToken = (accessToken: string, refreshToken?: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24);

  cookie.set(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
    path: '/',
    expires,
    secure: true,
    sameSite: 'none',
    httpOnly: HTTP_ONLY,
    domain: DOMAIN,
  });

  if (refreshToken) {
    cookie.set(REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      path: '/',
      expires,
      secure: true,
      sameSite: 'none',
      httpOnly: HTTP_ONLY,
      domain: DOMAIN,
    });
  }
};

const removeToken = () => {
  cookie.remove(ACCESS_TOKEN_COOKIE_KEY);
};

export { cookie, removeToken, setToken };
