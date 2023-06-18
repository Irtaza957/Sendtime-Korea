import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Linkify from 'react-linkify';
import { QRCode } from 'react-qrcode-logo';

import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import { Icon } from '@iconify/react';

import { PageLink } from '../../index.styles';
import * as Styled from '../index.styles';

import * as StyledForPrint from './index.styles';

interface SpaceProfileCardForPrintProps {
  reservationPageId?: string;
  title: string;
  subTitle?: string;
  description?: string;
  expandableDescription?: string;
  imageUrl?: string;
  tags: string[];
  color?: string;
  isDescriptionUsingHtml?: boolean;
  isExpanded?: boolean;
  onClickMoreButton?: () => void;
}

const SpaceProfileCardForPrint = ({
  reservationPageId,
  title,
  subTitle,
  description,
  expandableDescription,
  imageUrl,
  tags,
  color,
  isDescriptionUsingHtml,
  isExpanded,
  onClickMoreButton,
}: SpaceProfileCardForPrintProps) => {
  const { t } = useTranslation('space');
  const router = useRouter();

  const {
    width: widthQuery,
    height: heightQuery,
    textScale: textScaleQuery,
    imageScale: imageScaleQuery,
    qrScale: qrScaleQuery,
    borderRadius: borderRadiusQuery,
    topDecorationHeight: topDecorationHeightQuery,
    contentGap: contentGapQuery,
    descriptionLines: descriptionLinesQuery,
  } = router.query;

  const width = widthQuery === undefined ? 120 : parseInt(widthQuery as string);
  const height =
    heightQuery === undefined ? 185 : parseInt(heightQuery as string);
  const textScale =
    textScaleQuery === undefined ? 1 : parseFloat(textScaleQuery as string);
  const imageScale =
    imageScaleQuery === undefined ? 1 : parseFloat(imageScaleQuery as string);
  const qrScale =
    qrScaleQuery === undefined ? 1 : parseFloat(qrScaleQuery as string);
  const borderRadius =
    borderRadiusQuery === undefined
      ? 10
      : parseInt(borderRadiusQuery as string);
  const topDecorationHeight =
    topDecorationHeightQuery === undefined
      ? 3
      : parseInt(topDecorationHeightQuery as string);
  const contentGap =
    contentGapQuery === undefined ? 5 : parseInt(contentGapQuery as string);
  const descriptionLines =
    descriptionLinesQuery === undefined
      ? 10
      : parseInt(descriptionLinesQuery as string);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  return (
    <StyledForPrint.ProfileCardContainerForPrint
      isExpandable={expandableDescription != null}
      hideBorder={isExpanded}
      isExpanded={isExpanded}
      $width={width}
      $height={height}
      $textScale={textScale}
      $borderRadius={borderRadius}
    >
      <StyledForPrint.TopStyleForPrint
        color={color}
        $height={topDecorationHeight}
      />
      {imageUrl && imageScale !== 0 && (
        <StyledForPrint.ProfileImageWrapperForPrint $imageScale={imageScale}>
          <Image
            src={imageUrl}
            width={'100%'}
            height={'100%'}
            objectFit="cover"
            layout="fill"
            alt="profile image"
          />
        </StyledForPrint.ProfileImageWrapperForPrint>
      )}
      <StyledForPrint.TopForPrint $gap={contentGap}>
        <StyledForPrint.CardTitleForPrint>
          {title + (subTitle ? ` | ${subTitle}` : '')}
        </StyledForPrint.CardTitleForPrint>
        {tags.length > 0 && (
          <Styled.TagsContainer>
            {tags.map((tag, index) => (
              <StyledForPrint.CardTagForPrint key={index}>
                # {tag}
              </StyledForPrint.CardTagForPrint>
            ))}
          </Styled.TagsContainer>
        )}
        {isDescriptionUsingHtml ? (
          <StyledForPrint.CardDescriptionForPrint
            isExpanded={isExpanded}
            dangerouslySetInnerHTML={{
              __html: (isExpanded ? expandableDescription : description) || '',
            }}
            $lines={descriptionLines}
          />
        ) : (
          <StyledForPrint.CardDescriptionForPrint
            isExpanded={isExpanded}
            $lines={descriptionLines}
          >
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <PageLink target="_blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </PageLink>
              )}
            >
              {isExpanded ? expandableDescription : description}
            </Linkify>
          </StyledForPrint.CardDescriptionForPrint>
        )}
      </StyledForPrint.TopForPrint>
      {expandableDescription && !isExpanded && (
        <Styled.Bottom>
          <div />
          <Styled.MoreButton onClick={onClickMoreButton} color={color}>
            {t('more')}
            <Icon icon="ion:chevron-forward" width={20} />
          </Styled.MoreButton>
        </Styled.Bottom>
      )}

      {reservationPageId && (
        <StyledForPrint.QRCodeWrapper>
          <QRCode
            value={`${origin}${ROUTES.GUEST_RESERVATION.MAIN}?i=${reservationPageId}`}
            size={120 * qrScale}
            quietZone={0}
            qrStyle="dots"
            eyeRadius={2}
            logoImage={`${BASE_URL.image}/logos/sendtime_logo_small.png`}
            logoWidth={60 * qrScale}
            logoOpacity={0.3}
          />
        </StyledForPrint.QRCodeWrapper>
      )}
    </StyledForPrint.ProfileCardContainerForPrint>
  );
};

export default SpaceProfileCardForPrint;
