import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { passwordApi } from '@api/user/Auth';
import StyledButton from '@components/Button';
import Container from '@components/Container';
import PasswordInput from '@components/PasswordInput';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import TextInput from '@components/TextInput';
import { USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import useSignIn from '@hooks/useSignIn';
import { getLocalStorage } from '@utils/storage';
import { validate } from '@utils/validation';

import {
  AlertConatiner,
  AlertEmail,
  AlertText,
  FormContainer,
  InputContainer,
  PasswordSection,
  SubmitWrapper,
} from './index.styles';

const NewPassword = () => {
  const router = useRouter();
  const userToken = getLocalStorage(USER_TOKEN);
  const { t } = useTranslation('password');
  const { t: tSignUp } = useTranslation('signUp');
  const { logout } = useSignIn();
  const { email, teamId, activationLinkUuid } = router.query;
  const { value, onChangePassword, login } = useSignIn();

  useEffect(() => {
    if (userToken) logout();
  }, []);

  const { mutate: resetPassword } = useMutation(
    passwordApi.resetPasswordTeamMember,
    {
      onSuccess: () => {
        login({
          url: ROUTES.GROUP.PARTICIPATION,
          query: { groupId: teamId, isNew: true },
        });
        alert(t('passwordResetSuccess'));
      },
      onError: (e: { message: string }) => {
        alert(e.message);
      },
    }
  );

  const onSubmitClick = () => {
    resetPassword({
      password: value.password.text,
      activationLinkUuid: activationLinkUuid as string,
      teamId: teamId as string,
    });
  };

  return (
    <PasswordSection>
      <Container imageUrl="/logos/sendtime_logo.png">
        <FormContainer onSubmit={() => {}}>
          <InputContainer>
            <h1>{t('createNewPassword')}</h1>
            <TextInput
              label={t('yourEmail')}
              value={email as string}
              onChange={() => {}}
              alert={<AlertEmail>{t('wrongEmailAlert')}</AlertEmail>}
              disabled
            />
            <PasswordInput
              label={t('newPassword')}
              value={value.password.text}
              onChange={onChangePassword}
              placeholder={t('passwordPlaceholder')}
              alert={value.password.alertMessage}
              autoComplete="current-password"
            />
            <AlertConatiner>
              {tSignUp('emailPwStep.yourPasswordMustContain')}
              <AlertText isPass={false}>
                {tSignUp('emailPwStep.minimum8Characters')}
              </AlertText>
            </AlertConatiner>
            <SubmitWrapper>
              <StyledButton
                size="big"
                disabled={validate.password.length(value.password.text.length)}
                onClickButton={onSubmitClick}
              >
                {t('createNewPasswordButton')}
              </StyledButton>
            </SubmitWrapper>
          </InputContainer>
        </FormContainer>
      </Container>
      <div style={{ marginBottom: '40px' }}>
        <LanguageDropdown />
      </div>
    </PasswordSection>
  );
};

export default NewPassword;
