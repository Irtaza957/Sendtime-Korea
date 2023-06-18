import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { passwordApi } from '@api/user/Auth';
import AutoHeightImage from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import { EmailLogo } from '@components/SignUp/common/icon/EmailIcon';
import TextInput from '@components/TextInput';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';
import { validate } from '@utils/validation';

import * as Styled from './index.styles';

const ResetPasswordPage = () => {
  const { t } = useTranslation('password');
  const { loadingView } = useLoading();

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { mutate: sendResetEmail, isLoading } = useMutation(
    passwordApi.sendResetEmail,
    {
      onSuccess: () => {
        setEmailSent(true);
      },
      onError: (error: { code: number; message: string }) => {
        if (error.code === 4005) {
          alert(t('emailNotFound'));
          return;
        }
        alert(error.message);
      },
    }
  );

  const onClickResetButton = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!validate.email.form(email)) {
      alert(t('invalidEmail'));
      return;
    }
    sendResetEmail({ email });
  };

  return (
    <>
      <Styled.Container>
        <Styled.ContentWrapper>
          {isLoading && loadingView()}
          <Styled.LogoWrapper>
            <a href={ROUTES.MAIN}>
              <AutoHeightImage
                src={`${BASE_URL.image}/logos/sendtime_logo.png`}
                alt="sendtime-logo"
              />
            </a>
          </Styled.LogoWrapper>
          {emailSent ? (
            <Styled.FormContainer>
              <EmailLogo />
              <Styled.Section>
                <Styled.Title>{t('checkYourEmail')}</Styled.Title>
                <Styled.Msg>
                  <Trans
                    t={t}
                    i18nKey="emailSentTo"
                    values={{ email: email }}
                    components={{ email: <span /> }}
                  />
                  <br />
                  <br />
                  {t('clickOnTheLink')}
                </Styled.Msg>
              </Styled.Section>
            </Styled.FormContainer>
          ) : (
            <Styled.FormContainer onSubmit={onClickResetButton}>
              <Styled.Title>{t('resetPassword')}</Styled.Title>
              <TextInput
                label={t('yourEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
              />
              <StyledButton width="100%" onClickButton={onClickResetButton}>
                {t('resetPasswordButton')}
              </StyledButton>
            </Styled.FormContainer>
          )}
          <LanguageDropdown />
        </Styled.ContentWrapper>
      </Styled.Container>
    </>
  );
};

export default ResetPasswordPage;
