import React from 'react';
import Link from 'next/link';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { SpaceAPI } from '@api/space/SpaceApi';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';

import * as Styled from './index.styles';

const SpacePage = () => {
  const { t } = useTranslation('spaceBuilder');
  const { loadingView } = useLoading();

  const { isLoading, data: allSpaces = [] } = useQuery(
    'getAllSpacesKey',
    async () => {
      const { data } = await SpaceAPI.getAllSpaces();
      return data.results[0].spaceList;
    }
  );

  return (
    <WithSidebarComponent>
      <SideAreaContainer>
        <Styled.HeaderContainer>
          <Styled.Heading>
            <Title>{t('space.spacePageTitle')}</Title>
          </Styled.Heading>
          <Styled.ButtonContainer>
            <Styled.ButtonWrapper>
              <StyledButton
                onClickButton={() => {
                  if (router.locale?.includes('ko')) {
                    window.open(
                      'https://mesquite-asteroid-29f.notion.site/044db485460e4dbdaca7eafd59e0770d',
                      '_blank'
                    );
                  } else {
                    window.open(
                      'https://mesquite-asteroid-29f.notion.site/Personalize-your-space-927c4983a4e0458f91a0149c823f6cdd',
                      '_blank'
                    );
                  }
                }}
              >
                {t('space.needCustom')}
              </StyledButton>
              <StyledButton
                onClickButton={() => {
                  router.push(ROUTES.SPACE_BUILDER.NEW_SPACE);
                }}
              >
                {t('space.createEventSpace')}
              </StyledButton>
            </Styled.ButtonWrapper>
          </Styled.ButtonContainer>
        </Styled.HeaderContainer>
        <Styled.BodyContainer>
          <Styled.Text>{t('space.spaceCardTitle')}</Styled.Text>
          {isLoading && loadingView()}
          {allSpaces.length ? (
            allSpaces.map(({ title, handle, imageUrl }, index) => {
              return (
                <Styled.Box key={index}>
                  <Styled.InnerBox2>
                    <Link
                      href={{
                        pathname: `${ROUTES.SPACE}`,
                        query: { handle: handle },
                      }}
                      passHref
                    >
                      <Styled.InnerBox1 target="_blank">
                        <Styled.Circle>
                          {imageUrl && (
                            <ImageContainer>
                              <AutoHeightImage
                                src={imageUrl}
                                alt="deleted-page"
                              />
                            </ImageContainer>
                          )}
                        </Styled.Circle>
                        <Styled.SpaceTitle>{title}</Styled.SpaceTitle>
                      </Styled.InnerBox1>
                    </Link>
                    <StyledButton
                      bgColor="white"
                      color="purple-500"
                      withBorder={true}
                      borderColor="purple-500"
                      padding="8px 20px"
                      onClickButton={() => {
                        router.push({
                          pathname: `${ROUTES.SPACE_BUILDER.EDIT_SPACE}`,
                          query: { handle: handle },
                        });
                      }}
                    >
                      {t('space.edit')}
                    </StyledButton>
                  </Styled.InnerBox2>
                </Styled.Box>
              );
            })
          ) : (
            <Styled.NoResultFound>
              {t('space.noResultText')}
            </Styled.NoResultFound>
          )}
        </Styled.BodyContainer>
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default SpacePage;
