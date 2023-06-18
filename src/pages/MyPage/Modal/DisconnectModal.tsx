import React from 'react';
import { useTranslation } from 'react-i18next';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { useModal } from '@contexts/ModalProvider';

import {
  ButtonContainer,
  DisconnectAccountContainer,
  DisconnectModalContainer,
  SubDescription,
} from './index.styles';

interface DisconnectModalProps {
  email: string;
  logoUrl: string;
  onDisconnectAccount: () => void;
}

const DisconnectModal = ({
  email,
  logoUrl,
  onDisconnectAccount,
}: DisconnectModalProps) => {
  const { closeModal } = useModal();
  const { t } = useTranslation('accountSettingPage');
  const { t: tCommon } = useTranslation('common');

  return (
    <DisconnectModalContainer>
      <SubDescription fontColor="gray-750">
        {t('calendar.integratedCalendarList.deintegrateConfirm')}
      </SubDescription>

      <DisconnectAccountContainer>
        <ImageContainer width={18}>
          <AutoHeightImage src={logoUrl} alt="account type" />
        </ImageContainer>
        {email}
      </DisconnectAccountContainer>

      <ButtonContainer>
        <StyledButton
          onClickButton={closeModal}
          withBorder
          bgColor="white"
          borderColor="gray-550"
          color="gray-750"
          padding="12px 0"
        >
          {tCommon('cancel')}
        </StyledButton>
        <StyledButton
          bgColor="red"
          padding="12px 0"
          onClickButton={() => {
            onDisconnectAccount();
            closeModal();
          }}
        >
          {t('calendar.integratedCalendarList.deintegrate')}
        </StyledButton>
      </ButtonContainer>
    </DisconnectModalContainer>
  );
};

export default DisconnectModal;
