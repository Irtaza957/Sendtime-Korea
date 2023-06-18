import { request } from '../../Request';

const ConfirmHostMailKeys = {
  get: () => ['getConfirmHostMailInfo'],
};

const mailHostInfoAPI = {
  getConfirm: async (uuid: string, reservationId: string) => {
    return await request.get<GuestReservationInfoResponse>(
      `/v2/reservation/${uuid}/${reservationId}`
    );
  },
  createHostReservation: async (params: HostMailParams, body: HostMailBody) => {
    const { uuid, reservationId, force } = params;

    return await request.post<PostHostReservationResponse>(
      `/v2/reservation/${uuid}/${reservationId}?force=${!!force}`,
      body
    );
  },
};

export { ConfirmHostMailKeys, mailHostInfoAPI };
