import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { onboardingAPI } from '@api/user/UserInfo';
import Container from '@components/Container';
import SelectCalendarComponent from '@components/SelectCalendarComponent';
import { FROM_BRIDGE } from '@constants/account';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';
import { getLocalStorage, removeFromLocalStorage } from '@utils/storage';

import { SelectCalendarWrapper, Skip } from './index.styles';

const NEXT_ROUTE = ROUTES.ONBOARDING.INIT;

const SelectCalendar = () => {
  const router = useRouter();
  const { t } = useTranslation('onboarding');
  const { loadingView } = useLoading();

  useEffect(() => {
    const isFromBridge = getLocalStorage(FROM_BRIDGE);
    if (!isFromBridge) return;

    if (isFromBridge === 'true') {
      removeFromLocalStorage(FROM_BRIDGE);

      router.push(ROUTES.ONBOARDING.SELECT.CATEGORY);
    }
  }, []);

  const { mutate: skipCalendarSyncing, isLoading } = useMutation(
    onboardingAPI.syncCalendar,
    {
      onSuccess: () => {
        router.push(NEXT_ROUTE);
      },
    }
  );

  const onClickSkip = () => {
    skipCalendarSyncing();
  };

  return (
    <Container
      imageUrl="/logos/sendtime_logo.png"
      maxWidth={450}
      padding="40px 50px 80px 50px"
    >
      {isLoading && loadingView()}
      <SelectCalendarWrapper>
        <SelectCalendarComponent />
      </SelectCalendarWrapper>

      <button onClick={onClickSkip}>
        <Skip>{t('integrateCalendar.skip')}</Skip>
      </button>
    </Container>
  );
};

export default SelectCalendar;
