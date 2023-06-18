import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import { ROUTES } from '@constants/routes';
import { Icon } from '@iconify/react';

import { FlexBox } from '../../../styles/container/index.styles';
import StyledButton from '../Button';

import { CalendarNavigationContainer, NavigationRight } from './index.styles';

interface CalendarNavigationProps {
  updateCalendar: () => void;
  syncAnimated?: boolean;
  onClickMakeReservationPage?: () => void;
  disableCreateReservationPage?: boolean;
}

const CalendarNavigation = ({
  syncAnimated = true,
  updateCalendar,
  onClickMakeReservationPage,
  disableCreateReservationPage,
}: CalendarNavigationProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const goReservationPage = () => {
    router.push(ROUTES.NEW.RESERVATION);
  };

  return (
    <CalendarNavigationContainer>
      <NavigationRight gap="5px">
        <StyledButton
          onClickButton={updateCalendar}
          color="gray-700"
          bgColor="white"
          padding="10px 14px"
          // animated={syncAnimated}
          withBorder
        >
          <FlexBox gap={5}>
            <Icon icon="mdi:calendar-sync" />
            <MediaQuery minWidth={821}> </MediaQuery>
            {t('buttons.calendarSync')}
          </FlexBox>
        </StyledButton>

        <StyledButton
          onClickButton={onClickMakeReservationPage || goReservationPage}
          color="white"
          padding="10px 14px"
          disabled={disableCreateReservationPage}
        >
          <FlexBox gap={5}>
            <Icon icon="mdi:calendar-clock" />
            <MediaQuery minWidth={821}> </MediaQuery>
            {t('buttons.createBookingPage')}
          </FlexBox>
        </StyledButton>
      </NavigationRight>
    </CalendarNavigationContainer>
  );
};

export default CalendarNavigation;
