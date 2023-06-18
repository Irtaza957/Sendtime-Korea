import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';

import * as Styled from './index.styles';

type FileUploadErrorModalProps = {
  setErrorModal: (show: boolean, value: string) => void;
  errorMessage: string;
};
export const FileUploadErrorModal = ({
  setErrorModal,
  errorMessage,
}: FileUploadErrorModalProps) => {
  const { t } = useTranslation('guestQuestionare');
  return (
    <Styled.ModalContainer>
      <Styled.Box>
        <Styled.Header>
          <Styled.Title>
            <Styled.WarningIcon>
              <Icon
                icon="mdi:warning-circle"
                width={24}
                height={24}
                color="#EB5757"
              />
            </Styled.WarningIcon>
            {t('fileUploadErr.message')}
          </Styled.Title>
          <Styled.CrossBtnWrapper onClick={() => setErrorModal(false, '')}>
            <Icon
              icon="akar-icons:cross"
              color="#000000"
              width={17}
              height={17}
            />
          </Styled.CrossBtnWrapper>
        </Styled.Header>
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      </Styled.Box>
      <Styled.OkayContainer>
        <Styled.OkayText onClick={() => setErrorModal(false, '')}>
          {t('fileUploadErr.ok')}
        </Styled.OkayText>
      </Styled.OkayContainer>
    </Styled.ModalContainer>
  );
};
