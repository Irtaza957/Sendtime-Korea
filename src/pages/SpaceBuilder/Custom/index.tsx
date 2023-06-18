import React, { useCallback } from 'react';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import Iframe from 'react-iframe';

import StyledButton from '@components/Button';
import SideAreaContainer from '@components/SideAreaContainer';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { ROUTES } from '@constants/routes';
import useTranslate from '@hooks/useTranslate';
import { RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { REGION } from '@utils/language';

import * as Styled from './index.styles';

const CustomSpace = () => {
  const { t } = useTranslation('spaceBuilder');
  const { i18n } = useTranslate();

  const getEmbedNotionByLocale = useCallback(() => {
    return i18n.language.includes(REGION.KO) ? 'https://v2-embednotion.com/044db485460e4dbdaca7eafd59e0770d' : 'https://v2-embednotion.com/Personalize-your-space-927c4983a4e0458f91a0149c823f6cdd'
  }, [i18n.language]);


  return (
    <WithSidebarComponent>
      <SideAreaContainer>
        <Styled.BodyContainer>
          <Styled.HeaderContainer>
            <Styled.Heading>
              <Styled.Title>
                {t('custom.customSpaceTitle')}
              </Styled.Title>
            </Styled.Heading>
            <Styled.ButtonContainer padding="3px 0px">
              <StyledButton
                onClickButton={() => {
                  router.push(ROUTES.SPACE_BUILDER.SPACE);
                }}
              >
                {t('goBack')}
              </StyledButton>
            </Styled.ButtonContainer>
          </Styled.HeaderContainer>
          <Styled.InnerContainer padding="0px 10px 5px">
            <Styled.DescriptionContainer>
              <Styled.Description>{t('editPageAt')}</Styled.Description>
              <Styled.PageLink>{t('spaceHome')}</Styled.PageLink>
            </Styled.DescriptionContainer>
            <Styled.UrlContainer>
              <p>https://sendtime.io/space/@myevent</p>
              <CustomIcon
                size={7}
                height={17}
                fill="none"
                stroke="gray-600"
                viewBox="0 0 8 14"
              >
                <RightArrow />
              </CustomIcon>
            </Styled.UrlContainer>
          </Styled.InnerContainer>
          <Styled.Title margin="30px 0 0">
            {t('needMoreCustom')}
          </Styled.Title>
          <Styled.InnerContainer padding="5px 40px">
            <StyledButton>{t('contactSales')}</StyledButton>
            <Styled.IframeContainer>
              <Iframe
                url={getEmbedNotionByLocale()}
                width="100%"
                height="100%"
                display="block"
                position="relative"
              />
            </Styled.IframeContainer>
          </Styled.InnerContainer>
        </Styled.BodyContainer>
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default CustomSpace;
