import { request } from '../Request';

const UserInfoQueryKeys = {
  get: () => ['userInfo'],
  getCoreUserInfo: () => ['getCoreUserInfo'],
};

const userInfoAPI = {
  getInfo: async () => {
    return await request.get<UserInfoResponse>(`/v2/member/my-page`);
  },
  updateInfo: async (params: UpdateMyPageRequestParams) => {
    return await request.put(`/members/myPage`, params);
  },
  getCoreUserInfo: async () => {
    return await request.get<CoreUserInfoResponse>(`/v2/member/info`);
  },
};

const calendarSettingAPI = {
  setSyncedCalendar: async (params: UpdateSyncedCalendarRequestParams) => {
    return await request.put(`/members/myPage/syncedCalendars`, params);
  },
  setSavingCalendar: async (calendarId: string) => {
    return await request.post(`/members/myPage/savingCalendar/${calendarId}`);
  },
  deleteCalendarAccount: async (accountId: string) => {
    return await request.delete(
      `/members/myPage/calendarAccounts/${accountId}`
    );
  },
  setEmail: async (params: PostEmailRequestParams) => {
    return await request.post(`/members/email`, params);
  },
  setAdvancedSetting: async (params: AdvancedOptionsParams) => {
    return await request.post<AdvancedOptionsResponse>(
      `/members/myPage/syncOption`,
      params
    );
  },
};

const TimezoneQueryKeys = {
  get: () => ['Timezone'],
};

const timeZoneAPI = {
  getTimezones: async () => {
    return await request.get<TimezoneResponse>(`/timezones`);
  },
};

const onboardingAPI = {
  updateJoinPath: async (params: UpdateJoinPathRequestParams) => {
    return await request.post('/v2/member/onboard/join-path', params);
  },
  syncCalendar: async () => {
    return await request.post('/v2/member/onboard/external-calendar');
  },
  setOpenTimes: async (params: SetOpenTimesRequestParams) => {
    return await request.post('/v2/member/onboard/open-times', params);
  },
  setCustomUrl: async (params: SetCustomUrlRequestParams) => {
    return await request.post('/v2/member/onboard/custom-url', params);
  },
};

export {
  calendarSettingAPI,
  onboardingAPI,
  timeZoneAPI,
  TimezoneQueryKeys,
  userInfoAPI,
  UserInfoQueryKeys,
};
