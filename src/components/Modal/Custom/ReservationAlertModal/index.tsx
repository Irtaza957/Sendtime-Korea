import React from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import {
  Box,
  DefaultModalContainer,
  DefaultModalContent,
  ModalTitle,
} from '@components/Modal/index.styles';

import { SkipButton } from './index.styles';

interface ReservationAlertModalProps {
  skip: () => void;
  makeReservation: () => void;
}

const ReservationAlertModal = ({
  skip,
  makeReservation,
}: ReservationAlertModalProps) => {
  const { t } = useTranslation('guestPage');
  const handleSubmit = () => {
    skip();
  };

  const handleSkip = () => {
    skip();
    makeReservation();
  };

  return (
    <DefaultModalContainer>
      <Box>
        <ModalTitle>{t('chooseMoreTime.title')}</ModalTitle>
        <DefaultModalContent>
          {t('chooseMoreTime.description.leading')}
          <br /> {t('chooseMoreTime.description.trailing')}
        </DefaultModalContent>
      </Box>

      <StyledButton
        onClickButton={handleSubmit}
        borderColor="gray-600"
        bgColor="white"
        color="gray-800"
        withBorder
      >
        {t('chooseMoreTime.buttonText')}
      </StyledButton>
      <SkipButton onClick={handleSkip}>{t('chooseMoreTime.skip')}</SkipButton>
    </DefaultModalContainer>
  );
};

export default ReservationAlertModal;
