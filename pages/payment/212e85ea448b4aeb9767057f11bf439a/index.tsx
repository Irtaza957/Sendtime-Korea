import React from 'react';
import Script from 'next/script';

import { PAYMENT_TICKET } from '@constants/payment';
import Payment from '@pages/Payment';

const Page = () => {
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cpay.payple.kr/js/cpay.payple.1.0.1.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://democpay.payple.kr/js/cpay.payple.1.0.1.js"
        strategy="beforeInteractive"
      />
      <Payment ticket={PAYMENT_TICKET.TEN} />
    </>
  );
};

export default Page;
