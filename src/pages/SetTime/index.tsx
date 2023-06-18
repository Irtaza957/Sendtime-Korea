import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { onboardingAPI } from '@api/user/UserInfo';
import { ROUTES } from '@constants/routes';
import { KOR_TO_ENG_SHORT_WD, SELECT_TIME, TIME } from '@constants/time';
import { DailyTimes } from '@contexts/ReservationProvider';
import useLoading from '@hooks/useLoading';
import * as Sentry from '@sentry/browser';
import { isTimeValid } from '@utils/time';

import { ContentWrapper, Description, SubDescription } from './index.styles';

const NEXT_ROUTE = ROUTES.ONBOARDING.INIT;

interface FormTitleProps {
  description: string;
  subDescription: string;
}

const FormTitle = ({ description, subDescription }: FormTitleProps) => {
  return (
    <ContentWrapper>
      <Description>{description}</Description>
      <SubDescription>{subDescription}</SubDescription>
    </ContentWrapper>
  );
};

export type AvailableTime = {
  id: number;
  day: typeof TIME.DAYS[number];
  // start: DailyTimes['start'];
  // end: DailyTimes['end'];
  start: string;
  end: string;
  available: boolean;
};

const defaultAvailableTime: {
  start: DailyTimes['start'];
  end: DailyTimes['end'];
} = {
  start: '09:00',
  end: '18:00',
};

export const defaultChecked = TIME.DAYS.map((day, idx): AvailableTime => {
  if (day === '일' || day === '토') {
    return { id: idx, day, start: '09:00', end: '18:00', available: false };
  }

  return { id: idx, day, start: '09:00', end: '18:00', available: true };
});

const SetTime = () => {
  const router = useRouter();
  const [availableTime, setAvailableTime] = useState(defaultAvailableTime);
  const [checked, setChecked] = useState<AvailableTime[]>(defaultChecked);
  const [isTimeAvailable, setIsTimeAvailable] = useState(true);
  const { t } = useTranslation('onboarding');
  const { loadingView } = useLoading();

  const { mutate: setOpenTimes, isLoading } = useMutation(
    (params: SetOpenTimesRequestParams) => onboardingAPI.setOpenTimes(params),
    {
      onSuccess: () => {
        router.push(NEXT_ROUTE);
      },
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  useEffect(() => {
    setIsTimeAvailable(isTimeValid(availableTime.start, availableTime.end));
  }, [availableTime.start, availableTime.end]);

  const onClickDay = (id: number) => {
    setChecked((prevState) => {
      const copy = [...prevState];
      const idx = copy.findIndex((checked) => checked.id === id);
      const target = copy.find((checked) => checked.id === id);

      if (target) {
        copy.splice(idx, 1, { ...target, available: !target.available });
        return copy;
      }

      return copy;
    });
  };

  const onClickStartSelectBox = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newStartTime = event.currentTarget
      .innerText as unknown as DailyTimes['start'];
    setAvailableTime((prevState) => ({ ...prevState, start: newStartTime }));
  };

  const onClickEndSelectBox = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newEndTime = event.currentTarget
      .innerText as unknown as DailyTimes['end'];
    setAvailableTime((prevState) => ({ ...prevState, end: newEndTime }));
  };

  const onClickSkip = () => {
    const requestData = {
      start: defaultAvailableTime.start,
      end: defaultAvailableTime.end,
      availableDays: defaultChecked
        .filter((availableDay) => availableDay.available)
        .map((availableDay) => KOR_TO_ENG_SHORT_WD[availableDay.day]),
    };
    setOpenTimes(requestData);
  };

  useEffect(() => {
    onClickSkip(); // To remove this page temporarily
  }, []);

  const selectValues = SELECT_TIME.map((t) => ({ value: t }));
  return (
    <>{isLoading && loadingView()}</>
    // <Container
    //   imageUrl="/logos/sendtime_logo.png"
    //   maxWidth={700}
    //   padding="40px 50px"
    // >
    //   <TitleWrapper>
    //     <Title>{t('timeSetting.title')}</Title>
    //   </TitleWrapper>

    //   <Line margin="20px 0" />

    //   <FormWrapper>
    //     <FormField>
    //       <FormTitle
    //         description={t('timeSetting.availableTime')}
    //         subDescription={t('timeSetting.availableTimeDescription')}
    //       />
    //       <RangeSelect
    //         startValue={availableTime.start}
    //         selectStartValues={selectValues}
    //         onClickStartSelectBox={onClickStartSelectBox}
    //         endValue={availableTime.end}
    //         selectEndValues={selectValues}
    //         onClickEndSelectBox={onClickEndSelectBox}
    //       />
    //       {!isTimeAvailable && (
    //         <TimeAlert>{t('timeSetting.availableTimeAlert')}</TimeAlert>
    //       )}
    //     </FormField>

    //     <FormField>
    //       <FormTitle
    //         description={t('timeSetting.availableDay')}
    //         subDescription={t('timeSetting.availableDayDescription')}
    //       />

    //       <SelectDayOfWeek checked={checked} onClickDay={onClickDay} />
    //     </FormField>
    //   </FormWrapper>

    //   <BottomDescription>
    //     <SubDescription>{t('timeSetting.dontWorry')}</SubDescription>
    //   </BottomDescription>

    //   <Bottom>
    //     <ButtonUnderline onClick={onClickSkip}>
    //       {t('timeSetting.skip')}
    //     </ButtonUnderline>

    //     <SubmitSection>
    //       <StyledButton
    //         padding="16px 60px"
    //         borderRadius={10}
    //         disabled={false}
    //         onClickButton={() => {
    //           const requestData = {
    //             start: availableTime.start,
    //             end: availableTime.end,
    //             availableDays: checked
    //               .filter((availableDay) => availableDay.available)
    //               .map((availableDay) => KOR_TO_ENG_SHORT_WD[availableDay.day]),
    //           };
    //           setOpenTimes(requestData);
    //         }}
    //       >
    //         {t('timeSetting.next')}
    //       </StyledButton>
    //     </SubmitSection>
    //   </Bottom>
    // </Container>
  );
};

export default SetTime;
