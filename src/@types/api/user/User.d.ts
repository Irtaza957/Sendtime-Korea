type LoginRequestParams = {
  email: string;
  password: string;
};

type GoogleLoginRequestParams = {
  accessToken: string;
  locale: string;
  tags: string[];
};

type GoogleOAuthRequestParams = {
  state?: {
    url?: string;
    tags?: string[];
    query?: object;
  };
};

type BetaRequestParams = {
  code: string;
};

type BetaResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      valid: boolean;
    }
  ];
};

type LoginResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      grantType: string;
      accessToken: string;
      accessTokenExpiresIn: string;
      customUrl?: string;
      userInfo: CoreUserInfo;
    }
  ];
};

type LogoutResponse = {
  status: {
    code: number;
    message: string;
  };
  results: string[];
};

type SendSmsResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [];
};

type ConfirmSmsResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [];
};

type SignUpRequestParams = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  timezone: Timezone;
  locale: string;
  tags: string[];
};

type VerifyEmailRequestParams = {
  emailToken: string;
};

type VerifyEmailResponse = {
  results: { email: string }[];
  status: {
    code: number;
    message: string;
  };
};

type SendSmsRequestParams = {
  phoneNumber: string;
};

type ConfirmSmsRequestParams = {
  phoneNumber: string;
  code: string;
};

type UpdateMyPageRequestParams = {
  name: string;
  phone: string;
  openTimes: OpenTime[];
  favoritePlaces: FavoritePlaces[];
  timezone: Timezone;
  locale: string;
};

type RefreshTokenResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      grantType: 'Bearer ';
      accessToken: string;
      accessTokenExpiresIn: string;
      customUrl: string;
      email: string;
      userInfo: {
        id: string;
        name: string;
        phone: string;
        email: string;
        activated: boolean;
        customUrl: string;
        color: string;
      };
    }
  ];
};

type SendResetPasswordEmailRequestParams = {
  email: string;
};

type CreateNewPasswordRequestParams = {
  password: string;
  token: string;
};

type ResetPasswordTeamMemberParams = {
  password: string;
  activationLinkUuid: string;
  teamId: string;
};
