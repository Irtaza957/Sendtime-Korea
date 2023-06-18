import { request } from '../../Request';

export type ChangeActivateStatusParams = {
  id: string;
  active: boolean;
};

export type ChangeNestedActivateStatusParams = ChangeActivateStatusParams & {
  customPageId: string;
};

const ReservationQueryKeys = {
  get: () => ['getReservationData'] as const,
  getPageList: () => ['getAllMyPages'] as const,
  create: (request: CreateReservationParams) =>
    ['reservation', request] as const,
  getEditData: () => ['getReservationEditDetails'] as const,
};

const reservationAPI = {
  // get: async () => {
  //   return await request.get<GetReservationResponse>(
  //     `/reservationPages/resource`
  //   );
  // },

  create: async (params: CreateReservationParams) => {
    return await request.post<CreateReservationResponse>(
      `/v2/reservation/page`,
      params
    );
  },

  delete: async (id: string) => {
    return await request.delete<DeleteMyPageResponse>(
      `/v2/reservation/page/${id}`
    );
  },

  update: async (params: CreateReservationParams, id: string) => {
    return await request.post<PostReservationEditResponse>(
      `/v2/reservation/page/${id}`,
      params
    );
  },

  getPageList: async ({ type = 'PERSONAL' }: GetAllMyPagesParams) => {
    return await request.get<GetAllMyPagesResponse>(
      `/v2/reservation/page?type=${type}`
    );
  },

  getEditData: async (id: string) => {
    return await request.get<GetReservationEditDetailResponse>(
      `/v2/reservation/page/${id}`
    );
  },

  changeActivateStatus: async (params: ChangeActivateStatusParams) => {
    return await request.post<GetReservationActivationResponse>(
      `/v2/reservation/page/${params.id}/status?active=${params.active}`
    );
  },

  changeNestedActivateStatus: async (
    params: ChangeNestedActivateStatusParams
  ) => {
    return await request.post<GetReservationActivationResponse>(
      `/v2/reservation/page/custom/status/${params.customPageId}`
    );
  },
};

export { reservationAPI, ReservationQueryKeys };
