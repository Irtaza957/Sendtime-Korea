import { request } from '../Request';

export type CreateCustomPageRequest = {
  companyName: string;
  description: string;
  logoUrl: string;
  phone: string;
  email: string;
  website: string;
};

export type CustomCardType = {
  reservationPageUuid: string;
  title: string;
  description: string;
  tags: string[];
  buttonText: string;
  color: string;
  imageUrl?: string;
};

export type CreateCustomCardRequest = CustomCardType[];

const CustomPageKeys = {
  getCustomPageInfo: (customUrl: string) => ['getCustomPageInfo', customUrl],
};

const CustomPageAPI = {
  action: async ({
    customUrl,
    type,
    reservationPageUuid,
  }: CustomPageActionParams) => {
    const { data } = await request.post<CustomPageActionResponse>(
      `/profilePages/${customUrl}/cards/${reservationPageUuid}?action=${type}`
    );

    return data;
  },

  getCustomPageInfo: async (customUrl: string) => {
    const { data } = await request.get<CustomPageInfoResponse>(
      `/profilePages/${customUrl}`
    );
    return data;
  },

  /* TODO: any 타입 변경 필요 */
  createCustomPage: async (
    customUrl: string,
    values: CreateCustomPageRequest
  ) => {
    const { data } = await request.post<any>(
      `/profilePages/${customUrl}`,
      values
    );
    return data;
  },

  createCustomCard: async (
    customUrl: string,
    values: CreateCustomCardRequest
  ) => {
    const { data } = await request.post<any>(
      `/profilePages/${customUrl}/cards`,
      values
    );
    return data;
  },
};

export { CustomPageAPI, CustomPageKeys };
