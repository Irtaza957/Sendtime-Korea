import React from 'react';
import Linkify from 'react-linkify';

import AutoHeightImage from '@components/AutoHeightImage';
import useRoutes from '@hooks/useRoutes';
import { contentWithEnter } from '@utils/content';
import { translateTime } from '@utils/format';
import { locationContentWithNames } from '@utils/format';

import StyledButton from '../Button';
import { PreviewInfo } from '../Reservation/Common';

import {
  Bottom,
  CardDescription,
  CardImage,
  CardLike,
  CardLikeContainer,
  CardMoreInfo,
  CardTags,
  CardTitle,
  CustomCardSection,
  PageLink,
  TagsContainer,
  Top,
  TopStyle,
} from './index.styles';

interface CustomCardProps {
  cardInfo: CustomCardType;
  customUrl: string;
  onCardLikeClick: (reservationPageUuid: string) => void;
  onCardShakeClick: (reservationPageUuid: string) => void;
}

const CustomCard = ({
  cardInfo,
  onCardLikeClick,
  onCardShakeClick,
}: CustomCardProps) => {
  const {
    title,
    description,
    tags,
    time,
    location,
    like,
    shake,
    link,
    buttonText,
    color,
    imageUrl,
    reservationPageUuid,
  } = cardInfo;
  const { goTo } = useRoutes();

  return (
    <CustomCardSection>
      <TopStyle color={color} />
      {imageUrl && (
        <CardImage>
          <AutoHeightImage src={imageUrl} />
        </CardImage>
      )}
      <Top>
        <CardTitle>{title}</CardTitle>
        <TagsContainer>
          {tags.map((tag, idx) => (
            <CardTags key={idx}># {tag}</CardTags>
          ))}
        </TagsContainer>

        <CardDescription>
          {contentWithEnter(description).map((content, idx) => (
            <Linkify
              key={idx}
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <PageLink target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </PageLink>
              )}
            >
              <span
                key={idx}
                style={{ display: 'block', wordBreak: 'break-word' }}
              >
                {content}
              </span>
            </Linkify>
          ))}
        </CardDescription>

        <CardMoreInfo>
          <PreviewInfo iconType="time" content={translateTime(time)} />
          {!!location.length && (
            <PreviewInfo
              iconType="location"
              content={locationContentWithNames(location)}
            />
          )}
        </CardMoreInfo>
      </Top>

      <Bottom color={color}>
        <CardLikeContainer>
          <CardLike onClick={() => onCardLikeClick(reservationPageUuid)}>
            🧡 {like}
          </CardLike>
          <CardLike onClick={() => onCardShakeClick(reservationPageUuid)}>
            🤝 {shake}
          </CardLike>
        </CardLikeContainer>

        <StyledButton onClickButton={() => goTo(link)}>
          {buttonText}
        </StyledButton>
      </Bottom>
    </CustomCardSection>
  );
};

export default CustomCard;
