import { request } from '../../Request';

const GuestUserInfoKeys = {
  get: (url: GuestReservationInfoParams['url']) => ['guestUserInfo', url],
  getCalendar: (url: GuestReservationInfoParams['url']) => [
    'guestUserCalendarInfo',
    url,
  ],
  getMobileCalendar: (url: GuestReservationInfoParams['url']) => [
    'mobileCalendar',
    url,
  ],
};

const guestUserInfoAPI = {
  get: async (
    url: GuestReservationInfoParams['url'],
    params?: { custom?: string; third?: string }
  ) => {
    if (params?.third) {
      return await request.get<GuestReservationInfoResponse>(
        `/v2/reservation/page/third/guest/${url}?thirdId=${params.third}`
      );
    }

    if (params?.custom) {
      return await request.get<GuestReservationInfoResponse>(
        `/v2/reservation/page/custom/guest/${url}/${params.custom}`
      );
    }

    return await request.get<GuestReservationInfoResponse>(
      `/v2/reservation/page/guest/${url}`
    );
  },

  getCalendar: async (
    url: GuestReservationInfoParams['url'],
    params: GuestReservationCalendarInfoParams
  ) => {
    return await request.get<GuestReservationCalendarInfoResponse>(
      `/v2/reservation/page/guest/${url}/calendar-elements`,
      { params: { startDate: params.startDate, endDate: params.endDate } }
    );
  },

  createReservation: async (
    url: GuestReservationInfoParams['url'],
    params: CreateGuestReservationInfoParams
  ) => {
    return await request.post<GuestReservationCalendarInfoResponse>(
      `v2/reservation/${url}/request`,
      params
    );
  },

  fileUpload: async (params: FileUploadParams) => {
    return await request.post<FileUploadResponse>(
      `v2/reservation/file/upload`,
      params
    );
  },

  getMobileCalendarInfo: async (
    url: GuestReservationInfoParams['url'],
    params: MobileGuestReservationCalendarInfoParams
  ) => {
    return await request.get<GuestMobileReservationCalendarInfoResponse>(
      `/v2/reservation/page/guest/${url}/calendar-elements/mobile`,
      { params: { year: params.year, month: params.month } }
    );
  },
};

export { guestUserInfoAPI, GuestUserInfoKeys };
