import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import { calendarSettingAPI } from '@api/user/UserInfo';
import { coreUserState } from '@atoms/index';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import ButtonCheckbox from '@components/ButtonCheckbox';
import Container from '@components/Container';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import * as Sentry from '@sentry/browser';

import {
  Bottom,
  CalendarAccount,
  CalendarWrapper,
  ContentWrapper,
  SubDescription,
  Title,
} from './index.styles';

const NEXT_ROUTE = ROUTES.ONBOARDING.INIT;
const defaultCheckedCalendars = [{ id: '0', checked: false, calendarName: '' }];

const SelectCategory = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const user = useRecoilValue(coreUserState);
  const { t } = useTranslation('onboarding');

  const [isCategorySettingCompleted, setIsCategorySettingCompleted] =
    useState(false);

  const { mutate: setGetCalendar } = useMutation(
    (ids: UpdateSyncedCalendarRequestParams) =>
      calendarSettingAPI.setSyncedCalendar(ids),
    {
      onSuccess: () => setIsCategorySettingCompleted(true),
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  const [checkedCalendars, setCheckedCalendars] = useState(
    defaultCheckedCalendars
  );

  const onClickCheckbox = (id: string) => {
    setCheckedCalendars((prevState) => {
      const copy = [...prevState];
      const idx = copy.findIndex((checked) => checked.id === id);
      const target = copy.find((checked) => checked.id === id);

      if (target) {
        copy.splice(idx, 1, {
          ...target,
          id: target.id,
          checked: !target.checked,
        });
        return copy;
      }

      return copy;
    });
  };

  useEffect(() => {
    if (isCategorySettingCompleted) {
      if (!groupId) {
        router.push(NEXT_ROUTE);
        return;
      }

      router.push(
        {
          pathname: ROUTES.GROUP.PARTICIPATION,
          query: { groupId },
        },
        ROUTES.GROUP.PARTICIPATION
      );
    }
  }, [isCategorySettingCompleted]);

  useEffect(() => {
    if (!user) return;

    if (!user.calendarAccounts) {
      router.reload();
      return;
    }

    const calendars = user.calendarAccounts[0].sendtimeCalendars?.map(
      (calendar) => ({
        ...calendar,
        checked: false,
      })
    );
    if (calendars) {
      setCheckedCalendars(calendars);
    }
  }, [user]);

  return (
    <Container
      imageUrl="/logos/sendtime_logo.png"
      maxWidth={450}
      padding="40px 50px 80px 50px"
    >
      <ContentWrapper>
        <Title>{t('calendarCategory.title')}</Title>
        <SubDescription>{t('calendarCategory.description')}</SubDescription>

        <CalendarAccount>
          <ImageContainer width={24}>
            <AutoHeightImage
              src={`${BASE_URL.image}/logos/google_logo.png`}
              alt="구글 로고"
            />
          </ImageContainer>
          {t('calendarCategory.account', { email: user?.email })}
        </CalendarAccount>

        <CalendarWrapper length={checkedCalendars.length}>
          {checkedCalendars.map((checkedCalendar) => (
            <ButtonCheckbox
              key={checkedCalendar.id}
              content={checkedCalendar.calendarName}
              iconType="calendar"
              onClick={() => onClickCheckbox(checkedCalendar.id)}
              checked={checkedCalendar.checked}
            />
          ))}
        </CalendarWrapper>
      </ContentWrapper>

      <Bottom>
        <StyledButton
          onClickButton={() => {
            const ids = checkedCalendars
              .filter((calendar) => calendar.checked)
              .map((checkedCalendar) => checkedCalendar.id);
            setGetCalendar({ ids });
          }}
          padding="16px 123px"
        >
          {t('calendarCategory.integrate')}
        </StyledButton>
      </Bottom>
    </Container>
  );
};

export default SelectCategory;
