type CalendarItem = {
  id: string;
  calendarId: string;
  calendarName: string;
  synced: boolean;
  saving: boolean;
};

type OpenTime = {
  day:
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY';
  available: boolean;
  start: DailyTimes['start'];
  end: DailyTimes['end'];
};

type CalendarAccount = {
  id: string;
  calendarType: 'GOOGLE' | 'OUTLOOK';
  accountName: string;
  sendtimeCalendars: CalendarItem[];
};

type FavoritePlaces = {
  id: string;
  name: string;
};

type IntegrationStatus = {
  zoom: boolean;
  slack: boolean;
  meet: boolean;
  googleGroupSheets: boolean;
  googleThirdPersonSheets: boolean;
  googlePersonalSheets: boolean;
};

type Timezone = {
  id: string;
  name: string;
  timezone: string;
};

/* 마이페이지의 유저 정보*/
type UserInfo = {
  name: string;
  phone: string;
  email: string;
  customUrl: string;
  syncCalendarAccounts: CalendarAccount[];
  saveCalendarAccounts: CalendarAccount[];
  openTimes: OpenTime[] /* TODO: 일-토까지 7개만 있도록 변경 필요 */;
  favoritePlaces: FavoritePlaces[];
  integrationStatus: IntegrationStatus;
  syncOption: AdvancedOptions;
  timezone: Timezone;
  locale: string;
};

type CoreUserInfo = {
  activated: boolean;
  color: string;
  customUrl: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  calendarAccounts: CalendarAccount[];
  integrationStatus: IntegrationStatus;
  timezone: Timezone;
  locale: string;
  onboardStep:
    | 'JOIN_PATH'
    | 'SYNC_CALENDAR'
    | 'RESERVATION_SETTING'
    | 'CUSTOM_URL'
    | 'DONE';
};

type UserInfoResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [UserInfo];
};

type TimezoneResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [Timezone];
};

type PostOpenTimesResponse = {
  status: {
    code: number;
    message: string;
  };
};

type PostCustomUrlResponse = {
  status: {
    code: number;
    message: string;
  };
};

type UpdateSyncedCalendarRequestParams = {
  ids: string[];
};

type PostEmailRequestParams = {
  email: string;
};

type CoreUserInfoResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [CoreUserInfo];
};

type AdvancedOptions = {
  accepted: boolean;
  declined: boolean;
  tentative: boolean;
  needsAction: boolean;
};

type AdvancedOptionsParams = AdvancedOptions;
type AdvancedOptionsResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [AdvancedOptions];
};
