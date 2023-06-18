import React from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import { StandardizedModalStackType } from '@contexts/NestedModalProvider';

import {
  Box,
  DefaultModalContainer,
  DefaultModalContent,
  ModalTitle,
} from './index.styles';
interface DefaultModalProps
  extends Omit<StandardizedModalStackType, 'id' | 'callback'> {
  onSuccess: () => void;
}

const DefaultModal = ({
  type = 'confirm',
  title,
  description,
  buttonText,
  onSuccess,
  onClose,
}: DefaultModalProps) => {
  const { t } = useTranslation('common');
  return (
    <DefaultModalContainer>
      <Box>
        {title && <ModalTitle>{title}</ModalTitle>}
        <DefaultModalContent>{description}</DefaultModalContent>
      </Box>

      <Box gap={10} width={'80%'} flex>
        {type === 'confirm' && (
          <>
            <StyledButton
              onClickButton={onClose}
              withBorder
              bgColor="white"
              borderColor="gray-550"
              color="gray-750"
              padding="10px 20px"
              width="50%"
            >
              {t('cancel')}
            </StyledButton>
            <StyledButton
              onClickButton={onSuccess}
              withBorder
              bgColor="purple-500"
              borderColor="purple-500"
              color="white"
              width="50%"
            >
              {buttonText?.confirm || t('confirm2')}
            </StyledButton>
          </>
        )}

        {type === 'delete' && (
          <>
            <StyledButton
              onClickButton={onClose}
              withBorder
              bgColor="white"
              borderColor="gray-550"
              color="gray-750"
              padding="10px 20px"
              width="50%"
            >
              {t('cancel')}
            </StyledButton>
            <StyledButton
              onClickButton={onSuccess}
              withBorder
              bgColor="alert"
              borderColor="alert"
              color="white"
              width="50%"
            >
              {buttonText?.delete || t('delete')}
            </StyledButton>
          </>
        )}

        {type === 'alert' && (
          <StyledButton
            onClickButton={onClose}
            withBorder
            bgColor="white"
            borderColor="gray-550"
            color="gray-750"
            padding="10px 20px"
            width="100%"
          >
            {buttonText?.alert || t('confirm')}
          </StyledButton>
        )}
      </Box>
    </DefaultModalContainer>
  );
};

export default DefaultModal;
