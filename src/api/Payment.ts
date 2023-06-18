import { request } from './Request';

const paymentKeys = {
  get: () => ['paymentKey'],
};

const paymentAPI = {
  get: async (ticketId: string) => {
    return await request.get<GetPaymentResponse>(`/order?ticket=${ticketId}`);
  },

  createPayment: async (params: CreatePaymentParams) => {
    return await request.post<CreatePaymentResponse>(`/order/result`, params);
  },
};

export { paymentAPI, paymentKeys };
