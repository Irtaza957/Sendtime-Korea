import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import lottie from 'lottie-web-light';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import { ImageContainer } from '@components/AutoHeightImage';
import Line from '@components/Line';
import Nps from '@components/Nps';
import TextInput from '@components/TextInput';
import { ROUTES } from '@constants/routes';
import usePreventGoBack from '@hooks/usePreventGoBack';
import { UserInfoForRedirectToSignUp } from '@hooks/useSignUp';
import useTimeout from '@hooks/useTimeout';
import present from '@Icon/lottie/present.json';
import { decodeBase64Json } from '@utils/encoding';

import { BlockBox } from '../../../../styles/container/index.styles';

import {
  CompleteContainer,
  CompletedTitle,
  Container,
  Content,
  EmailAlert,
  EmailBoxTitle,
  EmailContainer,
} from './index.styles';

const Completed = () => {
  const router = useRouter();
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation('guestPage');
  usePreventGoBack();
  const { info } = router.query;

  const defaultUserInfo: UserInfoForRedirectToSignUp = info
    ? decodeBase64Json(info as string)
    : {};

  const [userInfo, setUserInfo] =
    useState<UserInfoForRedirectToSignUp>(defaultUserInfo);

  useEffect(() => {
    if (!lottieRef.current) return;

    lottie.loadAnimation({
      container: lottieRef.current,
      loop: true,
      animationData: present,
      renderer: 'svg',
      autoplay: true,
    });
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  useTimeout(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 2000);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const onSignUpButtonClick = () => {
    router.push({
      pathname: ROUTES.USER.SIGN_UP,
      query: {
        info: Buffer.from(JSON.stringify(userInfo)).toString('base64'),
        tags: encodeURI(['viral-reservation-completed'].join(',')),
      },
    });
  };

  return (
    <BlockBox
      margin="40px auto"
      style={{ maxWidth: '500px' }}
      gap={20}
      ref={scrollRef}
    >
      <CompleteContainer>
        <Container>
          <ImageContainer width={240}>
            <div ref={lottieRef} />
          </ImageContainer>
          <CompletedTitle>{t('completed.title')}</CompletedTitle>
          <Content>{t('completed.description')}</Content>
        </Container>
      </CompleteContainer>
      <CompleteContainer>
        <EmailContainer>
          <EmailBoxTitle>{t('completed.emailBoxTitle')}</EmailBoxTitle>
          <TextInput
            value={userInfo.email ?? ''}
            onChange={onEmailChange}
            style={{ flexGrow: 1 }}
            buttonContent={t('completed.button')}
            onClickButton={onSignUpButtonClick}
            placeholder={t('signUp:emailPwStep.emailPlaceholder')}
            alert={<EmailAlert>{t('completed.emailBoxHelpText')}</EmailAlert>}
          />
        </EmailContainer>
      </CompleteContainer>
      <MediaQuery maxWidth={768}>
        <Line />
      </MediaQuery>
      <Nps />
    </BlockBox>
  );
};

export default Completed;
