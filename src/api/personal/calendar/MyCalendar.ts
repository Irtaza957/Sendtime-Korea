import { request } from '../../Request';

const MyCalendarKeys = {
  get: () => ['mycalendar'],
  getPreview: () => ['calendarPreview'],
};

const myCalendarAPI = {
  get: async (params: GetWeeklyEventParams) => {
    return await request.get<GetWeeklyEventsResponse>('/events/weekly2', {
      params: { startDate: params.startDate, endDate: params.endDate },
    });
  },

  deleteEvent: async ({ calId, id }: DeleteWeeklyEventsRequestParams) => {
    return await request.delete<DeleteWeeklyEventResponse>(
      `/events/${calId}/${id}`
    );
  },

  makeBlock: async (params: MakeBlockParams) => {
    const { startTime, endTime } = params;

    return await request.post<MakeBlockResponse>(`/events/blockingTime`, {
      startTime,
      endTime,
    });
  },

  deleteBlock: async (id: string) => {
    return await request.delete<DeleteBlockResponse>(
      `/events/blockingTime/${id}`
    );
  },

  sync: async () => {
    return await request.get<CalendarSyncResponse>(`/sync`);
  },

  calendarPreview: async (params: CalendarPreviewParams) => {
    const { startDate, endDate, masking, frontBufferTime, backBufferTime } =
      params;

    return await request.get<CalendarPreviewResponse>(
      `/reservationPages/preview2`,
      {
        params: {
          startDate,
          endDate,
          masking,
          frontBufferTime,
          backBufferTime,
        },
      }
    );
  },
};

export { myCalendarAPI, MyCalendarKeys };
