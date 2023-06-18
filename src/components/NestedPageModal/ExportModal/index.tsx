import React from 'react';
import { useTranslation } from 'react-i18next';

import Navigation from '@components/Navigation';
import { Icon } from '@iconify/react';

import {
  ButtonContainer,
  ContentContainer,
  HideButton,
  NestedModalContainer,
  NestedModalTitle,
} from '../index.styles';

import ButtonCode from './Code';
import QrCode from './QrCode';

interface ExportModalProps {
  hideModal: () => void;
  pageUrl: string;
}

const ExportModal = ({ hideModal, pageUrl }: ExportModalProps) => {
  const { t } = useTranslation('eventHistoryPage');
  const urlWithOrigin = `${
    window.location.origin ? window.location.origin : 'https://sendtime.app'
  }${pageUrl}`;

  const items = [
    {
      title: t('exportModal.withButton'),
      onClick: () => {},
      contents: <ButtonCode pageUrl={urlWithOrigin} />,
      dataLength: 0,
    },
    {
      title: t('exportModal.withQR'),
      onClick: () => {},
      contents: <QrCode pageUrl={urlWithOrigin} />,
      dataLength: 0,
    },
    // {
    //   title: '텍스트로 내보내기',
    //   onClick: () => {},
    //   contents: <Message pageUrl={urlWithOrigin} description={''} />,
    //   dataLength: 0,
    // },
  ];

  return (
    <NestedModalContainer>
      <ButtonContainer>
        <HideButton onClick={hideModal}>
          <Icon
            icon="eva:close-outline"
            width="50"
            height="35"
            color="#A6B5C6"
          />
        </HideButton>
      </ButtonContainer>
      <NestedModalTitle align="center">
        {t('exportModal.title')}
      </NestedModalTitle>
      <ContentContainer>
        <Navigation navItems={items} pagination={false} rememberTab={false} />
      </ContentContainer>
    </NestedModalContainer>
  );
};

export default ExportModal;
