import { request } from '../../Request';

const GroupReservationQueryKeys = {
  get: () => ['getGroupReservationData'] as const,
  create: (request: CreateGroupReservationParams) =>
    ['reservation', request] as const,
};

const groupReservationAPI = {
  get: async (params: { groupId: string }) => {
    return await request.get<GetGroupReservationResponse>(
      `/reservationPages/resource?team=${params.groupId}`
    );
  },

  create: async (params: CreateGroupReservationParams) => {
    return await request.post<CreateGroupReservationResponse>(
      `/v2/reservation/page`,
      params
    );
  },

  update: async (params: CreateGroupReservationParams, id: string) => {
    return await request.post<PostGroupReservationEditResponse>(
      `/v2/reservation/page/${id}`,
      params
    );
  },

  getEditData: async (id: string) => {
    return await request.get<GetReservationEditDetailResponse>(
      `/v2/reservation/page/${id}`
    );
  },
};

export { groupReservationAPI, GroupReservationQueryKeys };
