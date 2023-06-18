import React from 'react';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { externalServicesAPI } from '@api/integrations/ExternalServices';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useUserInfo from '@hooks/useUserInfo';
import {
  CardDescription,
  Image,
  IntegrationButton,
  IntegrationButtonContainer,
  Section,
  SectionTitle,
} from '@pages/MyPage/index.styles';
import * as Sentry from '@sentry/browser';
import { contentWithEnter } from '@utils/content';

import { BlockBox } from '../../../../../styles/container/index.styles';

const ServiceIntegrationSection = () => {
  const { userInfo } = useUserInfo();
  const router = useRouter();
  const { showModal } = useNestedModal({
    type: 'alert',
    description: `Google Meet는 구글 캘린더 연동 시, 
    해당 계정으로 자동으로 연동됩니다. 
    Google Meet 연동을 원하시면 
    상단의 "캘린더 연동" > "캘린더 추가하기"를 클릭해 
    구글 연동을 부탁드립니다.`,
  });

  const { mutate: disconnectSlack } = useMutation(
    externalServicesAPI.disconnectSlack,
    {
      onSuccess: () => {
        alert('슬랙 연동이 해제되었습니다.');
      },
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  const onClickSlackButton = () => {
    const origin = process.env.NEXT_PUBLIC_SLACK_INTEGRATION_REDIRECT_URI;
    router.push(
      `https://slack.com/oauth/v2/authorize?client_id=2542285566400.3744361228576&scope=incoming-webhook&user_scope=&redirect_uri=${origin}/slack/bridge`
    );
  };

  const onClickGroupSheetButton = () => {
    router.push({
      pathname: ROUTES.BRIDGE.SHEETS,
      query: { category: 'TEAM' },
    });
  };

  const onClickThirdPartySheetButton = () => {
    router.push({
      pathname: ROUTES.BRIDGE.SHEETS,
      query: { category: 'THIRD_PERSON' },
    });
  };

  const onClickPersonalSheetButton = () => {
    router.push({
      pathname: ROUTES.BRIDGE.SHEETS,
      query: { category: 'PERSONAL' },
    });
  };

  const onClickZoomButton = () => {
    process.env.VERCEL_ENV === 'production'
      ? alert('Coming Soon!')
      : router.push(
          `https://zoom.us/oauth/authorize?client_id=KfvZmFhPQDeEsOMoU9wDoA&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_ZOOM_INTEGRATION_REDIRECT_URI}`
        );
  };

  const DATA = [
    {
      title: i18next.t('accountSettingPage:serviceIntegration.slack.title'),
      src: '/icons/slack.png',
      description: i18next.t(
        'accountSettingPage:serviceIntegration.slack.subtitle'
      ),
      onClick: onClickSlackButton,
      onDisconnectClick: disconnectSlack,
      integrated: userInfo?.integrationStatus.slack,
    },
    {
      title: i18next.t('accountSettingPage:serviceIntegration.zoom.title'),
      src: '/logos/zoom-logo.png',
      description: i18next.t(
        'accountSettingPage:serviceIntegration.zoom.subtitle'
      ),
      onClick: onClickZoomButton,
      onDisconnectClick: () => {},
      integrated: userInfo?.integrationStatus.zoom,
    },
    {
      title: i18next.t(
        'accountSettingPage:serviceIntegration.googleMeet.title'
      ),
      src: '/icons/google-meet.png',
      description: i18next.t(
        'accountSettingPage:serviceIntegration.googleMeet.subtitle'
      ),
      onClick: () => showModal(),
      onDisconnectClick: () => {},
      integrated: userInfo?.integrationStatus.meet,
    },
    {
      title: i18next.t(
        'accountSettingPage:serviceIntegration.googleSheet.title'
      ),
      src: '/icons/spreadsheets.png',
      description: i18next.t(
        'accountSettingPage:serviceIntegration.googleSheet.subtitle'
      ),
      onClick: onClickGroupSheetButton,
      onDisconnectClick: () => {},
      integrated: userInfo?.integrationStatus.googleGroupSheets,
    },
    {
      title: i18next.t(
        'accountSettingPage:serviceIntegration.googleSheet2.title'
      ),
      src: '/icons/spreadsheets.png',
      description: i18next.t(
        'accountSettingPage:serviceIntegration.googleSheet2.subtitle'
      ),
      onClick: onClickThirdPartySheetButton,
      onDisconnectClick: () => {},
      integrated: userInfo?.integrationStatus.googleThirdPersonSheets,
    },
    {
      title: i18next.t(
        'accountSettingPage:serviceIntegration.googleSheet3.title'
      ),
      src: '/icons/spreadsheets.png',
      description: i18next.t(
        'accountSettingPage:serviceIntegration.googleSheet3.subtitle'
      ),
      onClick: onClickPersonalSheetButton,
      onDisconnectClick: () => {},
      integrated: userInfo?.integrationStatus.googlePersonalSheets,
    },
  ];

  const makeContent = (description: string) => {
    return contentWithEnter(description).map((content, idx) => (
      <CardDescription key={idx}>{content}</CardDescription>
    ));
  };

  const { t } = useTranslation('accountSettingPage');

  return (
    <Section gap={25}>
      <SectionTitle>{t('serviceIntegration.title')}</SectionTitle>
      <IntegrationButtonContainer>
        {DATA.map(
          ({
            title,
            src,
            description,
            onClick,
            integrated,
            onDisconnectClick,
          }) => (
            <IntegrationButton onClick={onClick} key={title}>
              <BlockBox alignItems="flex-start">
                <Image>
                  <ImageContainer width={42} minHeight={42}>
                    <AutoHeightImage
                      src={`${BASE_URL.image}${src}`}
                      alt={title}
                    />
                  </ImageContainer>
                </Image>
                <h3>{title}</h3>
                <p>{makeContent(description)}</p>
              </BlockBox>

              {integrated && (
                <StyledButton
                  borderRadius={10}
                  padding="5px 10px"
                  bgColor="purple-50"
                  color="purple-600"
                >
                  {t('serviceIntegration.integrated')}
                </StyledButton>
              )}
            </IntegrationButton>
          )
        )}
      </IntegrationButtonContainer>
    </Section>
  );
};

export default ServiceIntegrationSection;
