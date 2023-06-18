import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { loginAPI, passwordApi } from '@api/user/Auth';
import AutoHeightImage from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import PasswordInput from '@components/PasswordInput';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useLoading from '@hooks/useLoading';
import useSignIn from '@hooks/useSignIn';
import { validate } from '@utils/validation';

import * as Styled from './../index.styles';

const ResetPasswordVerificationPage = () => {
  const router = useRouter();
  const { emailToken, email, url, ...query } = router.query;
  const { t } = useTranslation('password');
  const { t: tSignUp } = useTranslation('signUp');
  const { loadingView } = useLoading();
  const { showModal: showSuccessModal } = useNestedModal({
    type: 'alert',
    title: t('passwordResetSuccess'),
    description: t('passwordResetSuccessDescription'),
  });
  const { saveLoginInfo } = useSignIn();

  const [password, setPassword] = useState({
    text: '',
    lengthValidated: false,
  });

  const goToNextPage = () => {
    router.push({
      pathname: (url as string) || ROUTES.USER.SIGN_IN,
      query,
    });
    if (!url) showSuccessModal();
  };

  const { mutate: login, isLoading: isLoginLoading } = useMutation(
    loginAPI.login,
    {
      onSuccess: (data) => {
        const { accessToken, userInfo } = data.data.results[0];
        saveLoginInfo(accessToken, userInfo);
        goToNextPage();
      },
      onError: (error: { message: string }) => {
        alert(error.message);
      },
    }
  );

  const { mutate: createNewPassword, isLoading } = useMutation(
    passwordApi.createNewPassword,
    {
      onSuccess: () => {
        if (email) {
          login({
            email: email as string,
            password: password.text,
          });
          return;
        }
        goToNextPage();
      },
      onError: (error: { message: string }) => {
        alert(error.message);
      },
    }
  );

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      text: e.target.value,
      lengthValidated: !validate.password.length(e.target.value.length),
    });
  };

  const onClickResetButton = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    createNewPassword({ password: password.text, token: emailToken as string });
  };

  return (
    <>
      <Styled.Container>
        <Styled.ContentWrapper>
          {(isLoading || isLoginLoading) && loadingView()}
          <Styled.LogoWrapper>
            <a href={ROUTES.MAIN}>
              <AutoHeightImage
                src={`${BASE_URL.image}/logos/sendtime_logo.png`}
                alt="sendtime-logo"
              />
            </a>
          </Styled.LogoWrapper>
          <Styled.FormContainer onSubmit={onClickResetButton}>
            <Styled.Title>{t('createNewPassword')}</Styled.Title>
            <PasswordInput
              label={t('newPassword')}
              value={password.text}
              onChange={onPasswordChange}
              placeholder={t('passwordPlaceholder')}
            />
            <Styled.AlertConatiner>
              {tSignUp('emailPwStep.yourPasswordMustContain')}
              <Styled.AlertText isPass={password.lengthValidated}>
                {tSignUp('emailPwStep.minimum8Characters')}
              </Styled.AlertText>
            </Styled.AlertConatiner>
            <StyledButton
              width="100%"
              onClickButton={onClickResetButton}
              disabled={!password.lengthValidated}
            >
              {t('createNewPasswordButton')}
            </StyledButton>
          </Styled.FormContainer>
          <LanguageDropdown />
        </Styled.ContentWrapper>
      </Styled.Container>
    </>
  );
};

export default ResetPasswordVerificationPage;
