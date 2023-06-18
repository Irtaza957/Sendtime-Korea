import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { loginAPI } from '@api/user/Auth';
import AutoHeightImage from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { LineWithCenterText } from '@components/Line/index.styles';
import SystemMaintainanceModal from '@components/Modal/Custom/SystemMaintainanceModal';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import TextInput from '@components/TextInput';
import { USER_TOKEN } from '@constants/account';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';
import useSignIn from '@hooks/useSignIn';
import { getLocalStorage } from '@utils/storage';

import {
  AdditionalActionContainer,
  Bottom,
  FormContainer,
  InputContainer,
  RowContainer,
  SchedulingIllustrationContainer,
  SendtimeLogoContainer,
  SendtimeLogoMobileContainer,
  SignInContainer,
  SignInLeftSection,
  SignInRightSection,
  StyledSpan,
  SubmitWrapper,
  Title,
} from './index.styles';

const AUTO_LOGIN = {
  TRUE: 't',
};

const SignInPage = () => {
  const router = useRouter();
  const { a: auto, groupId, url } = router.query;
  const { value, onChangeEmail, onChangePassword, login, loginLoading } =
    useSignIn();
  const { loadingView } = useLoading();
  const { t } = useTranslation('signIn');
  const [isUnderMaintainance, setIsUnderMaintainance] = useState(false);

  const userToken = getLocalStorage(USER_TOKEN);
  useEffect(() => {
    if (!groupId && userToken) {
      router.push(ROUTES.MY_CALENDAR);
      return;
    }
  }, []);

  const onClickLoginButton = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (auto === AUTO_LOGIN.TRUE) {
      login({ url: ROUTES.ONBOARDING.AUTO_SIGNIN_COMPLETED });
      return;
    }

    if (url && typeof url === 'string') {
      login({ url });
      return;
    }

    if (groupId) {
      login({
        url: ROUTES.GROUP.PARTICIPATION,
        query: { groupId },
      });
      return;
    }

    login({ url: ROUTES.MY_CALENDAR });
  };

  const onClickGoogleLoginButton = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    let urlParam = ROUTES.MY_CALENDAR;
    const queryParam = { ...router.query };
    if (groupId) {
      urlParam = ROUTES.GROUP.PARTICIPATION;
      queryParam.groupId = groupId;
    } else if (auto === AUTO_LOGIN.TRUE) {
      urlParam = ROUTES.ONBOARDING.AUTO_SIGNIN_COMPLETED;
    } else if (url && typeof url === 'string') {
      urlParam = url;
    }

    loginAPI.googleOAuth({
      state: {
        url: urlParam,
        query: queryParam,
      },
    });
  };

  const onUnderMaintainance = () => {
    setIsUnderMaintainance(true);
  };

  return (
    <RowContainer>
      <SignInLeftSection>
        <SendtimeLogoContainer>
          <Link href={ROUTES.MAIN} passHref>
            <AutoHeightImage
              src={`${BASE_URL.image}/logos/sendtime_logo.png`}
              alt="sendtime-logo"
              priority
            />
          </Link>
        </SendtimeLogoContainer>
        <SchedulingIllustrationContainer>
          <AutoHeightImage
            src={`${BASE_URL.image}/backgrounds/scheduling_illustration.svg`}
          />
        </SchedulingIllustrationContainer>
      </SignInLeftSection>
      <SignInRightSection>
        <SendtimeLogoMobileContainer>
          <Link href={ROUTES.MAIN} passHref>
            <AutoHeightImage
              src={`${BASE_URL.image}/logos/sendtime_logo.png`}
              alt="sendtime-logo"
              priority
            />
          </Link>
        </SendtimeLogoMobileContainer>
        <SignInContainer>
          {loginLoading && loadingView()}
          <FormContainer onSubmit={onClickLoginButton}>
            <Title>{t('logIn')}</Title>
            <InputContainer>
              <TextInput
                label={t('email')}
                value={value.email.text}
                onChange={onChangeEmail}
                placeholder={t('emailPlaceholder')}
                alert={value.email.alertMessage}
                autoComplete="email"
              />
              <TextInput
                type="password"
                label={t('password')}
                value={value.password.text}
                onChange={onChangePassword}
                placeholder={t('passwordPlaceholder')}
                alert={value.password.alertMessage}
                autoComplete="new-password"
              />
              <SubmitWrapper>
                <StyledButton
                  type="submit"
                  padding="16px"
                  fontSize="16px"
                  borderRadius={5}
                  disabled={
                    value.password.validated && value.email.validated
                      ? false
                      : true
                  }
                  onClickButton={onClickLoginButton}
                >
                  {t('logIn')}
                </StyledButton>
              </SubmitWrapper>
              <LineWithCenterText>{t('or')}</LineWithCenterText>
              <SubmitWrapper>
                <StyledButton
                  type="button"
                  padding="16px"
                  bgColor="white"
                  color="purple-900"
                  borderRadius={5}
                  withBorder={true}
                  // onClickButton={onClickGoogleLoginButton}
                  onClickButton={onUnderMaintainance}
                  icon={{
                    icon: 'logos:google-icon',
                  }}
                >
                  <span
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    {t('logInWithGoogle')}
                  </span>
                </StyledButton>
              </SubmitWrapper>
            </InputContainer>
            <Bottom>
              <AdditionalActionContainer>
                {t('noAccount')}
                <Link href={ROUTES.USER.SIGN_UP} passHref>
                  <StyledSpan>{t('signUp')}</StyledSpan>
                </Link>
              </AdditionalActionContainer>
              <AdditionalActionContainer>
                {t('lostPassword')}
                <Link href={ROUTES.PASSWORD.RESET} passHref>
                  <StyledSpan>{t('getNewPassword')}</StyledSpan>
                </Link>
              </AdditionalActionContainer>
            </Bottom>
            <LanguageDropdown dropdownAbove />
          </FormContainer>
        </SignInContainer>
      </SignInRightSection>
      {isUnderMaintainance && <SystemMaintainanceModal closeModal={() => setIsUnderMaintainance(false)} />}
    </RowContainer>
  );
};

export default SignInPage;
