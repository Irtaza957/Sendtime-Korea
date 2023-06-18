import React from 'react';
import i18next from 'i18next';

import { ContentContainer, SubDescription } from './index.styles';

const WithdrawalModal = () => {
  return (
    <ContentContainer>
      <SubDescription fontColor="gray-750">
        {i18next.t('common:modal.leaveSendtime.title')}
      </SubDescription>
      <SubDescription fontColor="gray-750">
        {i18next.t('common:modal.leaveSendtime.subtitle')}
      </SubDescription>
    </ContentContainer>
  );
};

export default WithdrawalModal;
