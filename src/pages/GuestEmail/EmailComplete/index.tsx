import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';

import {
  ChannelContainer,
  ChannelTitle,
  ChannelWrapper,
  CompleteContainer,
  CompletedTitle,
  Container,
  Content,
  FlexBox,
} from './index.styles';

interface ChannelProps {
  type: 'email' | 'slack' | 'ceo';
}

export const Channel = ({ type }: ChannelProps) => {
  const { t } = useTranslation('guestPage');

  return (
    <ChannelContainer>
      <ImageContainer width={40}>
        <AutoHeightImage
          src={`${BASE_URL.image}/icons/${type}.png`}
          alt={type}
        />
      </ImageContainer>
      <ChannelTitle>
        {type === 'email' && (
          <Link href="mailto:help@splab.dev" passHref>
            <span style={{ cursor: 'pointer' }}>
              {t('emailComplete.cs.email')}
              <br />
              help@splab.dev
            </span>
          </Link>
        )}

        {type === 'slack' && (
          <Link
            href="https://sendtimecommunity.slack.com/join/shared_invite/zt-1fkz6a45w-ZaOyBeBWccqkNh7PsmIDfw#/shared-invite/email"
            passHref
          >
            <span style={{ cursor: 'pointer' }}>
              {t('emailComplete.cs.slack')}
              <br />
              {'ㅤㅤㅤㅤㅤ'}
            </span>
          </Link>
        )}
        {type === 'ceo' && (
          <Link href="tel:1600-4138" passHref>
            <span style={{ cursor: 'pointer' }}>
              {t('emailComplete.cs.phone')}
              <br />
              1600-4138
            </span>
          </Link>
        )}
      </ChannelTitle>
    </ChannelContainer>
  );
};

interface EmailCompletedProps {
  type?: 'confirm' | 'cancel' | 'change';
}

const EmailCompleted = ({ type = 'confirm' }: EmailCompletedProps) => {
  const { t } = useTranslation('guestPage');
  const router = useRouter();

  const reservationType = () => {
    if (type === 'confirm') {
      return t('emailComplete.type.confirm');
    }

    if (type === 'cancel') {
      return t('emailComplete.type.cancel');
    }

    if (type === 'change') {
      return t('emailComplete.type.change');
    }

    return '';
  };

  return (
    <CompleteContainer>
      <Container>
        <ImageContainer width={120}>
          <AutoHeightImage
            src={`${BASE_URL.image}/icons/new_done.gif`}
            alt="sendtime-logo"
          />
        </ImageContainer>
        <CompletedTitle>{reservationType()}</CompletedTitle>

        <Content>
          {t('emailComplete.content.leading')}
          <br />
          {t('emailComplete.content.middle')}
          <br />
          {t('emailComplete.content.trailing')}
        </Content>

        <ChannelWrapper>
          <Channel type="email" />
          <Channel type="slack" />
          <Channel type="ceo" />
        </ChannelWrapper>

        <FlexBox>
          <StyledButton
            onClickButton={() => router.push(ROUTES.MY_CALENDAR)}
            width="150px"
            padding="15px 0"
          >
            {t('emailComplete.button.home')}
          </StyledButton>
          <StyledButton
            onClickButton={() => router.push(ROUTES.MANAGE.SCHEDULES)}
            width="150px"
            padding="15px 0"
          >
            {t('emailComplete.button.schedule')}
          </StyledButton>
        </FlexBox>
      </Container>
    </CompleteContainer>
  );
};

export default EmailCompleted;
