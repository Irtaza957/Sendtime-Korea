import { request } from '@api/Request';

const nestedAPI = {
  create: async ({ uuid, params }: CreateNestedPageParams) => {
    return await request.post<GetReservationResponse>(
      `/v2/reservation/page/custom/${uuid}`,
      params
    );
  },

  edit: async ({ customPageId, params }: EditNestedPageParams) => {
    return await request.put<EditNestedPageResponse>(
      `/v2/reservation/page/custom/${customPageId}`,
      params
    );
  },

  delete: async ({ customPageId }: DeleteNestedPageParams) => {
    return await request.delete<DeleteNestedPageResponse>(
      `/v2/reservation/page/custom/${customPageId}`
    );
  },
};

export { nestedAPI };
