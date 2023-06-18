import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import { onboardingAPI, userInfoAPI } from '@api/user/UserInfo';
import { coreUserState } from '@atoms/index';
import StyledButton from '@components/Button';
import Container from '@components/Container';
import TextInput from '@components/TextInput';
import { REGEX } from '@constants/regex';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';
import * as Sentry from '@sentry/browser';

import { Alert } from '../../styles/common.styles';

import {
  Bottom,
  ContentWrapper,
  FormContainer,
  Label,
  MakeOwnUrlSection,
  SubDescription,
  SubmitSection,
  Title,
} from './index.styles';

const NEXT_ROUTE = ROUTES.ONBOARDING.INIT;

const MakeOwnUrl = () => {
  const [user, setUser] = useRecoilState(coreUserState);
  const router = useRouter();
  const { t } = useTranslation('onboarding');
  const { loadingView } = useLoading();

  const [value, setValue] = useState({
    privateUrl: '',
    alertMessage: <></>,
    validate: false,
  });

  const { mutate: updateUser, isLoading: isUserLoading } = useMutation(
    () => userInfoAPI.getCoreUserInfo(),
    {
      onSuccess: ({ data: { results } }) => {
        const [coreUser] = results;
        setUser(coreUser);
        router.push(NEXT_ROUTE);
      },
    }
  );

  const { mutate: sendCustomUrl, isLoading } = useMutation(
    (params: SetCustomUrlRequestParams) => onboardingAPI.setCustomUrl(params),
    {
      onSuccess: ({ data }) => {
        updateUser();
      },
      onError: (error: { message: string; code: number }) => {
        Sentry.captureException(error);

        let alert = error.message;
        if (error.code === 4111) {
          alert = t('setURL.duplicated');
        }
        setValue((prevValue) => ({
          ...prevValue,
          alertMessage: <Alert>{alert}</Alert>,
          validate: false,
        }));
      },
    }
  );

  const onChangePrivateUrl = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trim();

    if (withoutSpace === '') {
      setValue({
        privateUrl: '',
        alertMessage: <Alert>{t('message.EMPTY')}</Alert>,
        validate: false,
      });

      return;
    }

    if (withoutSpace !== '' && !withoutSpace.match(REGEX.ENGLISH_NUMBER_ONLY)) {
      setValue((prevValue) => ({
        ...prevValue,
        alertMessage: <Alert>{t('message.ENG_NUM')}</Alert>,
        validate: false,
      }));

      return;
    }

    if (withoutSpace.length >= 16) {
      setValue((prevValue) => ({
        ...prevValue,
        alertMessage: <Alert>{t('message.MAX_URL')}</Alert>,
        validate: false,
      }));

      return;
    }

    setValue((prevValue) => ({
      ...prevValue,
      privateUrl: withoutSpace,
      alertMessage: <></>,
      validate: true,
    }));
  };

  useEffect(() => {
    if (!user) return;
    if (!user.email || user.email !== '') {
      const [email, _] = (user.email || '@').split('@');
      const validatedEmail = email
        .replaceAll(',', '')
        .replaceAll('-', '')
        .replaceAll('_', '');

      if (!user.customUrl) {
        setValue((prevValue) => ({
          ...prevValue,
          privateUrl: validatedEmail,
          validate: true,
        }));

        return;
      }

      setValue((prevValue) => ({
        ...prevValue,
        privateUrl: user.customUrl,
        validate: true,
      }));
    }
  }, [user]);

  return (
    <MakeOwnUrlSection>
      <Container
        imageUrl="/logos/sendtime_logo.png"
        maxWidth={600}
        padding="50px 50px 100px 50px"
      >
        {(isLoading || isUserLoading) && loadingView()}
        <ContentWrapper>
          <SubDescription>{t('setURL.subtitle')}</SubDescription>
          <Title>{t('setURL.title')}</Title>
        </ContentWrapper>

        <FormContainer
          id="url-form"
          onSubmit={(e) => {
            e.preventDefault();
            sendCustomUrl({ customUrl: value.privateUrl });
          }}
        >
          <Label>sendtime.app/@</Label>
          <TextInput
            value={value.privateUrl}
            onChange={onChangePrivateUrl}
            placeholder="myURL"
            alert={value.alertMessage}
          />
        </FormContainer>

        <Bottom>
          <SubmitSection>
            <StyledButton
              padding="16px 60px"
              borderRadius={10}
              form="url-form"
              type="submit"
              disabled={!value.validate}
            >
              {t('setURL.next')}
            </StyledButton>
          </SubmitSection>
        </Bottom>
      </Container>
    </MakeOwnUrlSection>
  );
};

export default MakeOwnUrl;
