import React from 'react';
import dayjs from 'dayjs';

import StyledButton from '@components/Button';
import Line from '@components/Line';
import { FORMAT } from '@utils/time';

import { FlexBox } from '../../../../../styles/container/index.styles';

import {
  AlertTitle,
  InfoBoxContainer,
  InfoContent,
  InfoTitle,
  PaymentAlarm,
  PaymentAlarmList,
  PaymentAlertContainer,
} from './index.styles';

interface InfoBoxProps {
  title?: string;
  content?: string;
}

const InfoBox = ({ title, content }: InfoBoxProps) => {
  return (
    <InfoBoxContainer alignItems="flex-start">
      <InfoTitle>{title}</InfoTitle>
      <InfoContent>{content}</InfoContent>
    </InfoBoxContainer>
  );
};

interface PaymentAlertModalProps {
  hideModal: () => void;
  startFreeTrial: () => void;
}

const PaymentAlertModal = ({
  hideModal,
  startFreeTrial,
}: PaymentAlertModalProps) => {
  const handleFreeTrial = () => {
    startFreeTrial();
    hideModal();
  };

  const createFreeTrialDate = () => {
    const today = dayjs().format(FORMAT.koYMD);
    const date = dayjs().get('date');

    if (8 < date) {
      return `${today} - ${dayjs()
        .add(2, 'month')
        .date(6)
        .format(FORMAT.koYMD)}`;
    }

    return `${today} - ${dayjs().add(1, 'month').date(6).format(FORMAT.koYMD)}`;
  };

  const createPaymentDue = () => {
    const date = dayjs().get('date');

    if (8 < date) {
      return dayjs().add(2, 'month').date(7).format(FORMAT.koYMD);
    }

    return dayjs().add(1, 'month').date(7).format(FORMAT.koYMD);
  };

  return (
    <PaymentAlertContainer gap={10} alignItems="flex-start">
      <AlertTitle>무료체험을 시작하시겠습니까?</AlertTitle>
      <InfoBox title="무료체험 기간" content={createFreeTrialDate()} />
      <InfoBox title="결제 예정일" content={createPaymentDue()} />

      <Line />

      <PaymentAlarmList>
        <PaymentAlarm bold>센드타임의 결제일은 매달 7일입니다.</PaymentAlarm>
        <PaymentAlarm>
          그룹 기능 무료체험은 최소 30일로, 무료 체험 시작일 기준 최소 30일 이후
          매달 7일 전까지 가능합니다.
        </PaymentAlarm>
        <PaymentAlarm>
          그룹 기능 무료체험이 끝난 이후 매달 7일마다 계정수에 상관없이 월
          10만원씩 결제되며, 이후 요금 정책에 따라 가격은 변동될 수 있습니다.
        </PaymentAlarm>
      </PaymentAlarmList>

      <FlexBox gap={10} margin="10px 0">
        <StyledButton
          padding="10px 35px"
          onClickButton={hideModal}
          bgColor="white"
          color="gray-750"
          withBorder
        >
          취소
        </StyledButton>
        <StyledButton padding="10px 50px" onClickButton={handleFreeTrial}>
          무료체험 시작하기
        </StyledButton>
      </FlexBox>
    </PaymentAlertContainer>
  );
};

export default PaymentAlertModal;
