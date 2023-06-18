import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Linkify from 'react-linkify';

import {
  SpaceContactPointData,
  SpaceProfileImageConfig,
} from '@api/space/SpaceApi';

import { PageLink } from '../index.styles';
import SpaceContactPoint from '../SpaceContactPoint';

import * as Styled from './index.styles';

interface SpaceInfoCardProps {
  title: string;
  todayViews: number;
  description?: string;
  imageUrl?: string;
  imageConfig?: SpaceProfileImageConfig;
  contactPoints: SpaceContactPointData[];
}

const SpaceInfoCard = ({
  title,
  todayViews,
  description,
  imageUrl,
  imageConfig,
  contactPoints,
}: SpaceInfoCardProps) => {
  const { t } = useTranslation('space');

  return (
    <Styled.CardContainer>
      <Styled.TopInfoContainer>
        <Styled.CardContainerTitle>
          {t('aboutTheEvent')}
        </Styled.CardContainerTitle>
        <Styled.ViewCount>
          Today <span>{todayViews}</span>
        </Styled.ViewCount>
      </Styled.TopInfoContainer>
      <Styled.CardContentContainer>
        {imageUrl && (
          <Styled.ImageWrapper
            width={imageConfig?.width}
            height={imageConfig?.height}
            borderRadius={imageConfig?.borderRadius}
          >
            <Image
              src={imageUrl}
              layout="fill"
              objectFit={imageConfig?.fitType || 'cover'}
              alt="profile image"
              objectPosition={'left'}
            />
          </Styled.ImageWrapper>
        )}
        <Styled.CardTitle>{title}</Styled.CardTitle>
        <Styled.Divider />
        <Styled.SpaceDescription>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText) => (
              <PageLink target="_blank" href={decoratedHref}>
                {decoratedText}
              </PageLink>
            )}
          >
            {description}
          </Linkify>
        </Styled.SpaceDescription>
        {contactPoints.length > 0 && (
          <Styled.ContactPointContainer>
            {contactPoints.map((contactPoint, index) => (
              <SpaceContactPoint
                key={index}
                type={contactPoint.type}
                value={contactPoint.value}
              />
            ))}
          </Styled.ContactPointContainer>
        )}
      </Styled.CardContentContainer>
    </Styled.CardContainer>
  );
};

export default SpaceInfoCard;
