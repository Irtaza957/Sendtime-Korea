import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import { LineWithCenterText } from '@components/Line/index.styles';
import SystemMaintainanceModal from '@components/Modal/Custom/SystemMaintainanceModal';
import { ROUTES } from '@constants/routes';

import { PrimaryButton } from '../common';
import {
  BottomDescriptionContainer,
  BottomDescriptionLink,
  FormContainer,
  Section,
  Title,
} from '../common/index.styles';

import * as Styled from './index.styles';

interface SignUpStartPageProps {
  onSignUpWithEmailClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSignUpWithGoogleClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const StartStepForm = ({
  onSignUpWithEmailClick,
  onSignUpWithGoogleClick,
}: SignUpStartPageProps) => {
  const { t } = useTranslation('signUp');
  const [isUnderMaintainance, setIsUnderMaintainance] = useState(false)

  return (
    <FormContainer gap={40}>
      <Title>{t('startStep.signUp')}</Title>
      <Section gap={32}>
        <PrimaryButton onClickButton={onSignUpWithEmailClick}>
          {t('startStep.signUpWithEmail')}
        </PrimaryButton>
        <LineWithCenterText>OR</LineWithCenterText>
        <StyledButton
          width="100%"
          type="button"
          padding="16px"
          bgColor="white"
          color="purple-900"
          borderRadius={5}
          withBorder={true}
          icon={{
            icon: 'logos:google-icon',
          }}
          // onClickButton={onSignUpWithGoogleClick}
          onClickButton={() => setIsUnderMaintainance(true)}
        >
          <span
            style={{
              marginLeft: '10px',
            }}
          >
            {t('startStep.signUpWithGoogle')}
          </span>
        </StyledButton>
      </Section>
      <Styled.Bottom>
        <BottomDescriptionContainer primary>
          {t('startStep.alreadyHaveAnAccount')}
          <Link href={ROUTES.USER.SIGN_IN} passHref>
            <BottomDescriptionLink marginLeft={8}>
              {t('startStep.login')}
            </BottomDescriptionLink>
          </Link>
        </BottomDescriptionContainer>
      </Styled.Bottom>
      {isUnderMaintainance && <SystemMaintainanceModal closeModal={() => setIsUnderMaintainance(false)} />}
    </FormContainer>
  );
};

export default StartStepForm;
