import React, { FormEvent, MouseEvent } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Alert } from 'styles/common.styles';

import PasswordInput from '@components/PasswordInput';
import TextInput from '@components/TextInput';
import { ROUTES } from '@constants/routes';
import { SignUpFormValue } from '@hooks/useSignUp';

import { PrimaryButton } from '../common';
import {
  BottomDescriptionContainer,
  BottomDescriptionLink,
  FormContainer,
  Section,
  Title,
} from '../common/index.styles';

import * as Styled from './index.styles';

interface EmailPwFormProps {
  onSubmit: (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => void;
  signUpFormValue: SignUpFormValue;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailPwForm = ({
  onSubmit,
  signUpFormValue: { email, password },
  onChangeEmail,
  onChangePassword,
}: EmailPwFormProps) => {
  const { t } = useTranslation('signUp');

  return (
    <FormContainer onSubmit={onSubmit}>
      <Title>{t('emailPwStep.createYourAccount')}</Title>
      <Section>
        <TextInput
          label={t('emailPwStep.email')}
          value={email.text}
          onChange={onChangeEmail}
          placeholder={t('emailPwStep.emailPlaceholder')}
          alert={<Alert>{email.alertMessage}</Alert>}
          autoComplete="email"
          required
        />
        <PasswordInput
          label={t('emailPwStep.password')}
          value={password.text}
          onChange={onChangePassword}
          placeholder={t('emailPwStep.passwordPlaceholder')}
          alert={<Alert>{password.alertMessage}</Alert>}
          autoComplete="new-password"
          required
        />
        <Styled.AlertConatiner>
          {t('emailPwStep.yourPasswordMustContain')}
          <Styled.AlertText isPass={password.lengthValidated}>
            {t('emailPwStep.minimum8Characters')}
          </Styled.AlertText>
        </Styled.AlertConatiner>
      </Section>
      <PrimaryButton onClickButton={onSubmit}>
        {t('emailPwStep.next')}
      </PrimaryButton>
      <BottomDescriptionContainer>
        <Trans
          t={t}
          i18nKey="emailPwStep.alert"
          components={{
            terms: (
              <BottomDescriptionLink
                href={ROUTES.TERMS_OF_USE}
                target={'_blank'}
                rel="noreferrer"
              />
            ),
            privacy: (
              <BottomDescriptionLink
                href={ROUTES.PRIVACY_POLICY}
                target={'_blank'}
                rel="noreferrer"
              />
            ),
          }}
        />
      </BottomDescriptionContainer>
    </FormContainer>
  );
};

export default EmailPwForm;
