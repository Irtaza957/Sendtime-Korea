import { request } from '../../Request';

const LinkCalendarQueryKeys = {
  get: () => ['linkCalendar'] as const,
  getFirstUpdateCalendar: (type: SyncCalendarRequestParams) => [
    'fisrtUpdateCalendar',
    type,
  ],
};

const LinkAPI = {
  syncCalendar: async (type: SyncCalendarRequestParams) => {
    return await request.get<SyncCalendarResponse>(`/sync/init?type=${type}`);
  },
  getCalendar: async ({ type, code }: GetCalendarRequestParams) => {
    return await request.get<GetCalendarResponse>(
      `/sync/initIntegration?type=${type}&code=${code}`
    );
  },
  getFirstUpdateCalendar: async (type: SyncCalendarRequestParams) => {
    return await request.get<FirstGetCalendarResponse>(
      `/sync/initSync?type=${type}`
    );
  },
  updateCalendar: async (type: SyncCalendarRequestParams) => {
    return await request.post<UpdateCalendarRespoonse>(
      `/sync/next?type=${type}`
    );
  },
  syncGoogleSheets: async (type: 'GOOGLE_SHEETS') => {
    return await request.get<SyncSheetResponse>(
      `/sync/sheet/init?type=${type}`
    );
  },
  integrateGoogleSheets: async ({
    type,
    category,
    code,
  }: IntegrateSheetsParams) => {
    return await request.get<IntegrateSheetsResponse>(
      `/sync/sheet/initIntegration?type=${type}&category=${category}&code=${code}`
    );
  },
};

export { LinkAPI, LinkCalendarQueryKeys };
