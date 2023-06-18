import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { paymentAPI } from '@api/Payment';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import {
  CompletedTitle,
  Container,
  Content,
} from '@pages/GuestEmail/EmailComplete/index.styles';

import { PaymentCompleted } from './index.styles';

const PaymentDone = () => {
  const router = useRouter();
  const { showModal } = useNestedModal({
    type: 'alert',
    title: '결제 실패',
    description: `결제에 실패했습니다. 
      지속적으로 문제가 생긴다면 
      help@splab.dev로 연락주세요.`,
  });

  const { mutate: createPayment } = useMutation(
    (params: CreatePaymentParams) => paymentAPI.createPayment(params),
    {
      onSuccess: () => {},
      onError: (e) => {
        showModal();
      },
    }
  );

  useEffect(() => {
    if (router.query) {
      const data = {
        payRst: router.query.PCD_PAY_RST,
        payCode: router.query.PCD_PAY_CODE,
        payCofUrl: router.query.PCD_PAY_COFURL,
        payMsg: router.query.PCD_PAY_MSG,
        payType: router.query.PCD_PAY_TYPE,
        cardVer: router.query.PCD_CARD_VER,
        payWork: router.query.PCD_PAY_WORK,
        authKey: router.query.PCD_AUTH_KEY,
        payHost: router.query.PCD_PAY_HOST,
        payUrl: router.query.PCD_PAY_URL,
        payerId: router.query.PCD_PAYER_ID,
        payerMemberId: router.query.PCD_PAYER_NO,
        payerName: router.query.PCD_PAYER_NAME,
        payerHp: router.query.PCD_PAYER_HP,
        payerEmail: router.query.PCD_PAYER_EMAIL,
        payOId: router.query.PCD_PAY_OID,
        payGoods: router.query.PCD_PAY_GOODS,
        payAmount: router.query.PCD_PAY_AMOUNT,
        payDiscount: router.query.PCD_PAY_DISCOUNT,
        payAmountReal: router.query.PCD_PAY_AMOUNT_REAL,
        payTotal: router.query.PCD_PAY_TOTAL,
        payTaxTotal: router.query.PCD_PAY_TAXTOTAL,
        payIsTax: router.query.PCD_PAY_ISTAX,
        payCardName: router.query.PCD_PAY_CARDNAME,
        payCardNum: router.query.PCD_PAY_CARDNUM,
        payCardQuota: router.query.PCD_PAY_CARDQUOTA,
        payCardTradeNum: router.query.PCD_PAY_CARDTRADENUM,
        payCardAuthNo: router.query.PCD_PAY_CARDAUTHNO,
        payCardReceipt: router.query.PCD_PAY_CARDRECEIPT,
        payTime: router.query.PCD_PAY_TIME,
        regulerFlag: router.query.PCD_REGULER_FLAG,
        simpleFlag: router.query.PCD_SIMPLE_FLAG,
        rstUrl: router.query.PCD_RST_URL,
      } as CreatePaymentParams;

      createPayment(data);
    }
  }, []);

  return (
    <PaymentCompleted>
      <Container>
        <ImageContainer width={120}>
          <AutoHeightImage
            src={`${BASE_URL.image}/icons/new_done.gif`}
            alt="sendtime-logo"
          />
        </ImageContainer>
        <CompletedTitle>결제가 완료되었습니다!</CompletedTitle>

        <Content>
          메일과 알림톡으로 결제 내역을 송부해드립니다.
          <br />
          결제 내역을 송부받지 못하셨거나 <br />
          결제 관련 문의 사항이 있으실 경우 help@splab.dev로 알려주세요.
        </Content>

        <StyledButton
          onClickButton={() => router.push(ROUTES.MY_CALENDAR)}
          padding="15px 40px"
          borderRadius={10}
        >
          홈으로 이동
        </StyledButton>
      </Container>
    </PaymentCompleted>
  );
};

export default PaymentDone;
