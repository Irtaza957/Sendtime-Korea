import { request } from '../Request';

const QrQueryKeys = {
  get: () => ['qr-data'],
};

const QrAPI = {
  get: async () => {
    const { data } = await request.get<QrTableListResponse>(
      `/reservationPages/newPages`
    );

    return data.results;
  },
};

export { QrAPI, QrQueryKeys };
