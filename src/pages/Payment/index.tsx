import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { paymentAPI, paymentKeys } from '@api/Payment';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { SubSection } from '@components/Reservation/Common';
import { ContentAlert } from '@components/Reservation/index.styles';
import TextInput from '@components/TextInput';
import { ACCOUNT_MESSAGE } from '@constants/accountMessage';
import { BASE_URL } from '@constants/baseUrl';
import { LNG } from '@constants/language';
import { REGEX } from '@constants/regex';
import useLoading from '@hooks/useLoading';
import { makePhoneNumberWithHyphen } from '@utils/phoneNumber';
import { validate } from '@utils/validation';

import {
  AccountInfo,
  Container,
  Method,
  Money,
  PaymentAccount,
  PaymentAmount,
  PaymentContainer,
  PaymentGoods,
  PaymentInfo,
  PaymentMethod,
  PaymentTitle,
} from './index.styles';

const defaultUserData = {
  name: { value: '', alertMessage: <></>, validated: false },
  email: { value: '', alertMessage: <></>, validated: false },
  phone: { value: '', alertMessage: <></>, validated: false },
};

interface PaymentProps {
  ticket: string;
}
const Payment = ({ ticket }: PaymentProps) => {
  ///note Minsueng asked to redirect
  window.location.href = 'https://hire.sendtime.global/payments';

  const router = useRouter();
  const [userData, setUserData] = useState(defaultUserData);
  const { loadingView } = useLoading();

  const { data: userInfo, isLoading } = useQuery(
    paymentKeys.get(),
    () => paymentAPI.get(ticket),
    {
      onSuccess: ({ data: { results } }) => {
        const [userInfo] = results;
        if (userInfo.payerEmail && userInfo.payerName && userInfo.payerHp) {
          setUserData({
            name: {
              value: userInfo.payerName,
              alertMessage: <></>,
              validated: true,
            },
            email: {
              value: userInfo.payerEmail,
              validated: true,
              alertMessage: <></>,
            },
            phone: {
              value: userInfo.payerHp,
              validated: true,
              alertMessage: <></>,
            },
          });
        }
      },
      onError: () => {
        alert('결제 오류입니다.');
      },

      staleTime: Infinity,
    }
  );

  const infos = userInfo?.data.results[0];

  const getResult = (res: any) => {
    if (res.PCD_PAY_RST === 'success') {
      router.push(
        {
          pathname: '/payment/done',
          query: res,
        },
        '/payment/done'
      );
    } else {
      window.alert(res.PCD_PAY_MSG);
    }
  };

  const handleClick = () => {
    if (infos) {
      const form = {
        callbackFunction: getResult,
        PCD_PAYER_NAME: userData.name.value,
        PCD_PAYER_EMAIL: userData.email.value,
        PCD_PAYER_HP: userData.phone.value,
        PCD_AUTH_KEY: infos.authKey,
        PCD_CARD_VER: infos.cardVer,
        PCD_PAY_GOODS: infos.payGoods,
        PCD_PAY_TOTAL: infos.payTotal,
        PCD_PAY_TYPE: infos.payType,
        PCD_PAY_URL: infos.payUrl,
        PCD_PAY_WORK: infos.payWork,
        // PCD_RST_URL: infos.rstUrl,
        PCD_RST_URL: '/payment/done',
        PCD_PAYER_NO: infos.payerMemberId,
        PCD_PAY_OID: infos.oId,
      };

      if (window.PaypleCpayPopup) {
        window.PaypleCpayPopup(form);
      }
    }
  };

  const title = infos?.payGoods || '센드타임 프로모션 구독권 결제';
  const amount = infos?.payTotal.toLocaleString(LNG.ko_KR) || '0';
  const method = () => {
    if (infos?.payType === 'card' && infos?.cardVer === '01') {
      return '카드결제(정기결제)';
    }

    return '카드결제(정기결제)';
  };

  const handleChangeName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trimStart();

    if (withoutSpace === '') {
      setUserData((prevValue) => ({
        ...prevValue,
        name: {
          value: withoutSpace,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>이름을 입력해주세요</ContentAlert>
          ),
        },
      }));

      return;
    }

    setUserData((prevValue) => ({
      ...prevValue,
      name: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const handleChangePhone = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (validate.phone.length(target.value.length)) {
      const newValue = target.value.slice(0, 13);
      setUserData((prevValue) => ({
        ...prevValue,
        phone: {
          value: makePhoneNumberWithHyphen(newValue),
          validated: true,
          alertMessage: <></>,
        },
      }));

      return;
    }

    if (!validate.phone.form(target.value)) {
      setUserData((prevValue) => ({
        ...prevValue,
        phone: {
          ...prevValue.phone,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              {ACCOUNT_MESSAGE.PHONE.INPUT_ERROR}
            </ContentAlert>
          ),
        },
      }));

      return;
    }

    if (!validate.phone.formWithLength(target.value)) {
      setUserData((prevValue) => ({
        ...prevValue,
        phone: {
          ...prevValue.phone,
          validated: false,
          alertMessage: <></>,
        },
      }));

      return;
    }

    setUserData((prevValue) => ({
      ...prevValue,
      phone: {
        value: makePhoneNumberWithHyphen(target.value),
        validated: true,
        alertMessage: <></>,
      },
    }));

    if (validate.phone.empty(target.value)) {
      setUserData((prevValue) => ({
        ...prevValue,
        phone: {
          ...prevValue.phone,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>전화번호를 입력해주세요</ContentAlert>
          ),
        },
      }));
    }
  };

  const handleChangeEmail = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trim();

    if (withoutSpace === '') {
      setUserData((prevValue) => ({
        ...prevValue,
        email: {
          value: target.value,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>이메일을 입력해주세요.</ContentAlert>
          ),
        },
      }));

      return;
    }

    if (!withoutSpace.match(REGEX.EMAIL)) {
      setUserData((prevValue) => ({
        ...prevValue,
        email: {
          value: target.value,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              이메일 형식에 맞게 입력해주세요.
            </ContentAlert>
          ),
        },
      }));

      return;
    }

    setUserData((prevValue) => ({
      ...prevValue,
      email: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  return (
    <Container>
      {isLoading && loadingView()}
      <PaymentContainer>
        <PaymentInfo>
          <div>
            <ImageContainer width={200}>
              <AutoHeightImage
                src={`${BASE_URL.image}/logos/sendtime_logo.png`}
                alt="sendtime-logo"
              />
            </ImageContainer>
          </div>
          <PaymentGoods>{title}</PaymentGoods>

          <PaymentAmount>
            결제 금액
            <Money>{amount} 원</Money>
          </PaymentAmount>

          <PaymentMethod>
            결제 수단
            <Method>{method()}</Method>
          </PaymentMethod>
        </PaymentInfo>
        <PaymentAccount>
          <PaymentTitle>
            구독하실 센드타임 계정 정보를 입력해주세요.
          </PaymentTitle>

          <AccountInfo>
            <SubSection subTitle="이름" required>
              <TextInput
                value={userData.name.value}
                onChange={handleChangeName}
                alert={userData.name.alertMessage}
                placeholder="김센드타임"
              />
            </SubSection>
            <SubSection subTitle="이메일" required>
              <TextInput
                value={userData.email.value}
                onChange={handleChangeEmail}
                alert={userData.email.alertMessage}
                placeholder="send.time@sendtime.app"
              />
            </SubSection>
            <SubSection subTitle="전화번호" required>
              <TextInput
                value={userData.phone.value}
                onChange={handleChangePhone}
                alert={userData.phone.alertMessage}
                placeholder="010-1234-5678"
              />
            </SubSection>
          </AccountInfo>
        </PaymentAccount>
      </PaymentContainer>
      <StyledButton
        padding="15px 50px"
        borderRadius={10}
        // onClickButton={() => {}}
        disabled={
          !userData.name.validated ||
          !userData.email.validated ||
          !userData.phone.validated
        }
        onClickButton={handleClick}
      >
        다음
      </StyledButton>
    </Container>
  );
};

export default Payment;
