import React from 'react';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { LinkAPI } from '@api/personal/calendar/LinkCalendar';
import AutoHeightImage from '@components/AutoHeightImage';
import { PREVIOUS_PATH } from '@constants/account';
import { BASE_URL } from '@constants/baseUrl';
import { RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import * as Sentry from '@sentry/browser';
import { setLocalStorage } from '@utils/storage';

import {
  ArrowContainer,
  CalendarButton,
  CalendarContent,
  CalendarDescription,
  CalendarListContainer,
  CalendarName,
  IconContainer,
  SelectCalendarContainer,
  SubDescription,
  Title,
} from './index.styles';

type CalendarType = {
  logoUrl: string;
  calendarType: 'Outlook' | 'Google';
  calendarName: string;
  description: string;
};

const calendars: CalendarType[] = [
  {
    logoUrl: `${BASE_URL.image}/logos/google_logo.png`,
    calendarType: 'Google',
    calendarName: i18next.t('onboarding:calendarName.google'),
    description: 'G-mail, G Suite',
  },
  {
    logoUrl: `${BASE_URL.image}/logos/outlook_logo.png`,
    calendarType: 'Outlook',
    calendarName: i18next.t('onboarding:calendarName.outlook'),
    description: 'Outlook 2007 and higher, with Windows 7 and higher',
  },
];

const SelectCalendarComponent = () => {
  const router = useRouter();

  const linkCalendar = (calendarType: 'Outlook' | 'Google') => {
    const type =
      calendarType.toUpperCase() as unknown as SyncCalendarRequestParams;
    setLocalStorage(PREVIOUS_PATH, router.pathname);
    connectCalendar(type);
  };

  const { mutate: connectCalendar } = useMutation(
    (type: SyncCalendarRequestParams) => LinkAPI.syncCalendar(type),
    {
      onSuccess: ({ data: { results } }) => {
        const [redirectURL] = results;

        router.push(redirectURL);
      },
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  const { t } = useTranslation('onboarding');

  return (
    <SelectCalendarContainer>
      <Title>{t('integrateCalendar.title')}</Title>
      <SubDescription>{t('integrateCalendar.subtitle')}</SubDescription>
      <CalendarListContainer>
        {/* <button onClick={() => linkCalendar?.('Google')}>
          <Image
            src={`${BASE_URL.image}/logos/google_signin.png`}
            alt="google-signin-logo"
            width={300}
            height={65}
          />
        </button> */}

        {calendars.map(
          ({ calendarType, logoUrl, calendarName, description }) => (
            <CalendarButton
              key={calendarType}
              onClick={() => linkCalendar?.(calendarType)}
              disabled={calendarType === 'Outlook'}
            >
              <IconContainer>
                <AutoHeightImage src={logoUrl} alt={calendarType} />
              </IconContainer>
              <CalendarContent>
                <CalendarName disabled={calendarType === 'Outlook'}>
                  {calendarName}
                </CalendarName>
                <CalendarDescription>{description}</CalendarDescription>
              </CalendarContent>
              <ArrowContainer>
                <CustomIcon
                  size={7}
                  height={14}
                  fill="purple-700"
                  stroke="none"
                >
                  <RightArrow />
                </CustomIcon>
              </ArrowContainer>
            </CalendarButton>
          )
        )}
      </CalendarListContainer>
    </SelectCalendarContainer>
  );
};

export default SelectCalendarComponent;
