import React from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import SelectCalendarComponent from '@components/SelectCalendarComponent';
import { useModal } from '@contexts/ModalProvider';

import { CalendarAddModalContainer, OneButtonContainer } from './index.styles';

const CalendarAddModal = () => {
  const { closeModal } = useModal();
  const { t } = useTranslation('common');
  return (
    <CalendarAddModalContainer>
      <SelectCalendarComponent />
      <OneButtonContainer>
        <StyledButton
          onClickButton={closeModal}
          withBorder
          bgColor="white"
          borderColor="gray-550"
          color="gray-750"
          padding="12px 44px"
        >
          {t('cancel')}
        </StyledButton>
      </OneButtonContainer>
    </CalendarAddModalContainer>
  );
};

export default CalendarAddModal;
