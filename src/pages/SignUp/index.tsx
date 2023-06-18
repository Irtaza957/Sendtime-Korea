import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { loginAPI } from '@api/user/Auth';
import AutoHeightImage from '@components/AutoHeightImage';
import MultiStepProgressBar from '@components/MultiStepProgressBar';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import EmailPwForm from '@components/SignUp/EmailPwForm';
import EmailVerificationForm from '@components/SignUp/EmailVerficationForm';
import StartStepForm from '@components/SignUp/StartStepForm';
import UserInfoForm from '@components/SignUp/UserInfoForm';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';
import useSignUp from '@hooks/useSignUp';

import * as Styled from './index.styles';

export interface SignUpPageProps {
  timezones: Timezone[];
}

const SignUpPage = ({ timezones }: SignUpPageProps) => {
  const {
    value,
    setValue,
    onChangeEmail,
    validateEmail,
    onChangePassword,
    validatePassword,
    onChangeName,
    validateName,
    onChangeTimezone,
    onChangePhone,
    validatePhone,
    signUp,
    signUpLoading,
  } = useSignUp({ timezones });
  const [currentProgress, setProgress] = useState(0);
  const { loadingView } = useLoading();
  const { t } = useTranslation('signUp');
  const router = useRouter();

  useEffect(() => {
    if (value.verificationEmailSent) {
      setValue({ ...value, verificationEmailSent: false });
      setProgress(3);
    }
  }, [value.verificationEmailSent]);

  useEffect(() => {
    if (value.alreadySignedUp) {
      setValue({
        ...value,
        alreadySignedUp: false,
        email: {
          ...value.email,
          alertMessage: t('alert.duplicatedEmail'),
        },
      });
      setProgress(1);
    }
  }, [value.alreadySignedUp]);

  const nextPage = (
    event?: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();

    switch (currentProgress) {
      case 1:
        if (!validateEmail() || !validatePassword()) {
          return;
        }
        break;
      case 2:
        if (!validateName() || !validatePhone()) {
          return;
        }
        signUp();
        return;
      case 3:
        signUp();
        return;
    }
    setProgress(currentProgress + 1);
  };

  const onClickGoogleSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { tags: tagsString = '' } = router.query;
    const tags = (tagsString as string).split(',');

    const urlParam = ROUTES.MY_CALENDAR;
    loginAPI.googleOAuth({
      state: {
        url: urlParam,
        tags,
      },
    });
  };

  const pages = [
    <StartStepForm
      key={0}
      onSignUpWithEmailClick={nextPage}
      onSignUpWithGoogleClick={onClickGoogleSignUp}
    />,
    <EmailPwForm
      key={1}
      onSubmit={nextPage}
      signUpFormValue={value}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
    />,
    <UserInfoForm
      key={2}
      onSubmit={nextPage}
      signUpFormValue={value}
      onChangeName={onChangeName}
      onChangeTimezone={onChangeTimezone}
      onChangePhone={onChangePhone}
      timezones={timezones}
    />,
    <EmailVerificationForm
      key={3}
      onButtonClick={nextPage}
      signUpFormValue={value}
    />,
  ];

  return (
    <Styled.SignupContainer>
      {signUpLoading && loadingView()}
      <Styled.ContentWrapper>
        <Styled.LogoWrapper>
          <a href={ROUTES.MAIN}>
            <AutoHeightImage
              src={`${BASE_URL.image}/logos/sendtime_logo.png`}
              alt="sendtime-logo"
            />
          </a>
        </Styled.LogoWrapper>
        {currentProgress !== 0 && (
          <Styled.MultiStepProgressBarWrapper>
            <MultiStepProgressBar
              currentProgress={currentProgress}
              maxProgress={pages.length - 1}
            />
          </Styled.MultiStepProgressBarWrapper>
        )}
        <Styled.ComponentCardWrapper>
          {pages[currentProgress]}
        </Styled.ComponentCardWrapper>
        <LanguageDropdown dropdownAbove />
      </Styled.ContentWrapper>
    </Styled.SignupContainer>
  );
};

export default SignUpPage;
