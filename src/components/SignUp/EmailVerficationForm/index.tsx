import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { SignUpFormValue } from '@hooks/useSignUp';

import { PrimaryButton } from '../common';
import { EmailLogo } from '../common/icon/EmailIcon';
import { FormContainer, Section, Title } from '../common/index.styles';

import * as Styled from './index.styles';

interface EmailVerificationFormProps {
  onButtonClick: () => void;
  signUpFormValue: SignUpFormValue;
}

const EmailVerificationForm = ({
  onButtonClick,
  signUpFormValue: { email },
}: EmailVerificationFormProps) => {
  const { t } = useTranslation('signUp');

  return (
    <FormContainer>
      <EmailLogo />
      <Section>
        <Title>{t('emailVerificationStep.checkYourEmail')}</Title>
        <Styled.Msg>
          <Trans
            t={t}
            i18nKey="emailVerificationStep.emailSentTo"
            values={{ email: email.text }}
            components={{ email: <span /> }}
          />
          <br />
          <br />
          {t('emailVerificationStep.clickOnTheLink')}
        </Styled.Msg>
      </Section>

      <PrimaryButton
        bgColor="white"
        color="purple-900"
        withBorder={true}
        onClickButton={onButtonClick}
      >
        {t('emailVerificationStep.resendEmail')}
      </PrimaryButton>
    </FormContainer>
  );
};

export default EmailVerificationForm;
