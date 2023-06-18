import React, { useState } from 'react';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import ButtonCheckbox from '@components/ButtonCheckbox';
import { BASE_URL } from '@constants/baseUrl';
import { useModal } from '@contexts/ModalProvider';

import {
  ButtonContainer,
  CalendarAccount,
  CalendarWrapper,
  ContentWrapper,
  GetCalendarModalContainer,
  SubDescription,
  Title,
  TitleContainer,
} from './index.styles';

const GetCalendarModal = ({
  calendars,
  email,
  setGetCalendar,
}: {
  calendars: CalendarItem[];
  email: string;
  setGetCalendar: (ids: UpdateSyncedCalendarRequestParams) => void;
}) => {
  const defaultCalendars = calendars.map((calendar) => ({
    ...calendar,
    checked: calendar.synced,
  }));
  const [calendarList, setCalendarList] = useState(defaultCalendars);
  const { closeModal } = useModal();
  const { t } = useTranslation('accountSettingPage');

  const onClickCheckbox = (id: string) => {
    setCalendarList((prevState) => {
      const copy = [...prevState];
      const idx = copy.findIndex((item) => item.id === id);
      const target = copy.find((item) => item.id === id);

      if (target) {
        copy.splice(idx, 1, { ...target, checked: !target.checked });
        return copy;
      }

      return copy;
    });
  };

  const submitGetCalendars = () => {
    const ids = calendarList
      .filter((calendar) => calendar.checked)
      .map((calendar) => calendar.id);
    setGetCalendar({ ids });
    closeModal();
  };

  return (
    <GetCalendarModalContainer>
      <TitleContainer>
        <Title>{t('calendar.eventIntegrated.title')}</Title>
        <div>
          <SubDescription>
            {t('calendar.eventIntegrated.subtitle')}
          </SubDescription>
        </div>
      </TitleContainer>

      <ContentWrapper>
        <CalendarAccount>
          <ImageContainer width={24}>
            <AutoHeightImage
              src={`${BASE_URL.image}/logos/google_logo.png`}
              alt="구글 로고"
            />
          </ImageContainer>
          <span style={{ display: 'inline-block' }}>
            {email} {t('calendar.eventIntegrated.calendarAccount')}
          </span>
        </CalendarAccount>

        <CalendarWrapper length={calendarList.length ?? 0}>
          {calendarList.map(({ id, calendarName, checked }, idx) => (
            <ButtonCheckbox
              key={idx}
              content={calendarName}
              iconType="calendar"
              onClick={() => onClickCheckbox(id)}
              checked={checked}
            />
          ))}
        </CalendarWrapper>
      </ContentWrapper>
      <ButtonContainer>
        <StyledButton
          onClickButton={closeModal}
          withBorder
          bgColor="white"
          borderColor="gray-550"
          color="gray-750"
          padding="12px 64px"
        >
          {i18n.t('common:cancel')}
        </StyledButton>
        <StyledButton padding="12px 64px" onClickButton={submitGetCalendars}>
          {t('calendar.eventIntegrated.edit')}
        </StyledButton>
      </ButtonContainer>
    </GetCalendarModalContainer>
  );
};

export default GetCalendarModal;
