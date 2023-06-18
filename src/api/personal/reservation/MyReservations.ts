import { request } from '../../Request';

const MyReservationKeys = {
  getUpcoming: () => ['myUpcomingReservation'],
  getPending: () => ['myPendingReservation'],
  getPast: () => ['myPastReservation'],
};

const myReservationAPI = {
  getUpcoming: async (params: GetMyReservationParams) => {
    return await request.get<GetReservationResponse>(
      `v2/reservation/confirmed`,
      {
        params: { limit: params.limit, page: params.page },
      }
    );
  },
  getPending: async (params: GetMyReservationParams) => {
    return await request.get<GetReservationResponse>(`v2/reservation/pending`, {
      params: { limit: params.limit, page: params.page },
    });
  },
  getPast: async (params: GetMyReservationParams) => {
    return await request.get<GetReservationResponse>(`v2/reservation/past`, {
      params: { limit: params.limit, page: params.page },
    });
  },
};

export { myReservationAPI, MyReservationKeys };
