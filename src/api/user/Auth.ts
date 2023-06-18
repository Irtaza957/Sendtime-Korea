import { request } from '@api/Request';
import { USER_TOKEN } from '@constants/account';
import { getLocalStorage } from '@utils/storage';

const BetaQueryKeys = {
  post: (request: BetaRequestParams) => ['betaCode', request] as const,
  proxyLogin: () => ['proxyLogin'],
  memberCheck: () => ['memberCheck'],
};

const betaAPI = {
  validateCode: async (params: BetaRequestParams) => {
    return await request.post<BetaResponse>(`/beta-code/validate`, params);
  },
};

const LoginQueryKeys = {
  post: (request: LoginRequestParams) => ['login', request] as const,
};

const loginAPI = {
  login: async (params: LoginRequestParams) => {
    return await request.post<LoginResponse>(`/v2/auth/login`, params);
  },
  loginWithGoogle: async (params: GoogleLoginRequestParams) => {
    return await request.post<LoginResponse>(`/v2/oauth/google`, params);
  },
  googleOAuth: (params: GoogleOAuthRequestParams) => {
    const state = Buffer.from(JSON.stringify(params.state)).toString('base64');
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const responseType = 'token';
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/calendar',
      'openid',
    ];
    const scopeString = scopes.join(' ');
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scopeString}` +
      (state ? `&state=${state}` : '');

    window.open(url, '_self');
  },
  refresh: async () => {
    return await request.post<RefreshTokenResponse>(`/auth/refresh`);
  },
};

const LogoutQueryKeys = {
  post: () => ['logout' as const],
};

const logoutAPI = {
  logout: async () => {
    const token = getLocalStorage(USER_TOKEN);
    return request.post<LogoutResponse>(
      `/auth/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
};

const SignUpQueryKeys = {
  post: (request: SignUpRequestParams) => ['signup', request] as const,
};

const signupAPI = {
  createUser: async (params: SignUpRequestParams) => {
    return await request.post('/v2/auth/signup', params);
  },
  verifyEmail: async (params: VerifyEmailRequestParams) => {
    return await request.post<VerifyEmailResponse>(
      '/v2/auth/certification',
      {},
      { params }
    );
  },
  sendSms: async (params: SendSmsRequestParams) => {
    return await request.post<SendSmsResponse>(
      `/auth/certification/send-sms`,
      params
    );
  },
  confirmSms: async (params: ConfirmSmsRequestParams) => {
    return await request.post<ConfirmSmsResponse>(
      `/auth/certification/confirm`,
      params
    );
  },

  proxyLogin: async (params: ProxyLoginRequestParams) => {
    const { teamId, memberId, activationLinkUuid } = params;
    return await request.post<ProxyLoginResponse>(
      `/auth/${teamId}/${memberId}/activate/${activationLinkUuid}`
    );
  },

  memberCheck: async (memberId: string) => {
    return await request.get<MemberCheckResponse>(
      `/members/check?id=${memberId}`
    );
  },
};

const passwordApi = {
  sendResetEmail: async (params: SendResetPasswordEmailRequestParams) => {
    return await request.post(`/v2/auth/reset-password`, params);
  },
  createNewPassword: async (params: CreateNewPasswordRequestParams) => {
    return await request.post(`/v2/member/reset-password`, params);
  },
  resetPasswordTeamMember: async (params: ResetPasswordTeamMemberParams) => {
    return await request.post(`/v2/team/member/reset-password`, params);
  },
};

export {
  betaAPI,
  BetaQueryKeys,
  loginAPI,
  LoginQueryKeys,
  logoutAPI,
  LogoutQueryKeys,
  passwordApi,
  signupAPI,
  SignUpQueryKeys,
};
