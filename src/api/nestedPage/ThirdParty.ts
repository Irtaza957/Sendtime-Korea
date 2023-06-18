import { request } from '@api/Request';

const ThirdPartyQueryKeys = {
  create: () => ['createThirdParty'] as const,
};

const ThirdPartyAPI = {
  create: async ({ uuid, ...params }: CreateThirdPartyParams) => {
    return await request.post<CreateThirdPartyResponse>(
      `/reservationPages/${uuid}/thirdPersonPages`,
      params
    );
  },

  delete: async ({ uuid, thirdPartyPageId }: DeleteThirdPartyParams) => {
    return await request.delete<DeleteThirdPartyPageResponse>(
      `/reservationPages/${uuid}/thirdPersonPages/${thirdPartyPageId}`
    );
  },
};

export { ThirdPartyAPI, ThirdPartyQueryKeys };
