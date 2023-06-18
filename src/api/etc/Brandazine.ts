import { request } from '../Request';

const BrandazinePageKeys = {
  get: () => ['getBrandazineFormData'],
};

const BrandazinePageAPI = {
  get: async () => {
    const { data } = await request.get<GetBrandazineFormDataResponse>(
      `/reservationPages/mapper/brandazine`
    );

    return data;
  },
  submitFormData: async (params: SubmitBrandazineFormDataRequestParams) => {
    return await request.post<SubmitBrandazineFormDataResponse>(
      `/reservationPages/mapper/brandazine`,
      params
    );
  },
};

export { BrandazinePageAPI, BrandazinePageKeys };
