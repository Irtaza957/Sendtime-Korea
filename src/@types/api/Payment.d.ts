type PaymentType = {
  callbackFunction: string;
  payWork: string;
  authKey: string;
  rstUrl: string;
  payUrl: string;
  payerNo: string;
  payType: 'card';
  cardVer: '01'; // 정기결제
  payGoods: string; // 상품 제목
  payTotal: number; // 결제 금액
  payerName?: string; // 이름| null
  payerHp?: string; // 전화번호| null
  payerEmail?: string; // 이메일 | null
  oId?: string;
  payerMemberId?: string;
};

type GetPaymentResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [PaymentType];
};

type CreatePaymentParams = {
  payRst: string;
  payCode: string;
  payCofUrl: string;
  payMsg: string;
  payType: string;
  cardVer: string;
  payReqKey: string;
  payWork: string;
  authKey: string;
  payHost: string;
  payUrl: string;
  payerId: string;
  payerMemberId: string;
  payerName: string;
  payerHp: string;
  payerEmail: string;
  payOId: string;
  payGoods: string;
  payAmount: string;
  payDiscount: string;
  payAmountReal: string;
  payTotal: string;
  payTaxTotal: string;
  payIsTax: string;
  payCardName: string;
  payCardNum: string;
  payCardQuota: string;
  payCardTradeNum: string;
  payCardAuthNo: string;
  payCardReceipt: string;
  payTime: string;
  regulerFlag: string;
  simpleFlag: string;
  rstUrl: string;
};

type CreatePaymentResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [PaymentType];
};
