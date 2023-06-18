import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Linkify from 'react-linkify';
import { useRecoilValue } from 'recoil';

import {
  ProfileReactionData,
  SpaceProfileData,
  SpaceProfileImageConfig as SpaceProfileImageConfig,
  SpaceSupportedSocial,
} from '@api/space/SpaceApi';
import { coreUserState } from '@atoms/index';
import HackleTrack from '@components/HackleTrack';
import { USER_TOKEN } from '@constants/account';
import { HACKLE_KEYS } from '@constants/hackle';
import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import { locationContentWithNames } from '@utils/format';
import { SpaceSocialUtil } from '@utils/spaceUtils';
import { getLocalStorage } from '@utils/storage';

import { PageLink } from '../index.styles';

import * as Styled from './index.styles';

interface SpaceProfileCardProps {
  id: string;
  spaceId: string;
  reservationPageId?: string;
  title: string;
  subTitle?: string;
  description?: string;
  expandableDescription?: string;
  imageUrl?: string;
  imageConfig?: SpaceProfileImageConfig;
  tags: string[];
  color?: string;
  links?: SpaceProfileData['links'];
  supportedSocials?: SpaceSupportedSocial[];
  isDescriptionUsingHtml?: boolean;
  reactions: ProfileReactionData[];
  timeUnits?: number[];
  locations?: {
    id: string;
    name: string;
    type: string;
  }[];
  isExpanded?: boolean;
  primaryButtonLabel?: string;
  isMyCard?: boolean;
  onClickPrimaryButton?: () => void;
  onClickReaction?: (reaction: ProfileReactionData) => void;
  onClickMoreButton?: () => void;
  onClickEditButton?: () => void;
  showSendMessageButton?: boolean;
  onClickSendMessageButton?: () => void;
}

const SpaceProfileCard = ({
  id,
  spaceId,
  reservationPageId,
  title,
  subTitle,
  description,
  expandableDescription,
  imageUrl,
  imageConfig,
  tags,
  color = 'var(--dark-blue)',
  links: originalLinks,
  supportedSocials,
  isDescriptionUsingHtml,
  reactions: originalReactions,
  timeUnits = [],
  locations = [],
  isExpanded,
  primaryButtonLabel,
  isMyCard,
  onClickPrimaryButton,
  onClickReaction,
  onClickMoreButton,
  onClickEditButton,
  showSendMessageButton,
  onClickSendMessageButton,
}: SpaceProfileCardProps) => {
  const userToken = getLocalStorage(USER_TOKEN);

  const { t } = useTranslation('space');
  const { t: tCommon } = useTranslation('common');
  const user = useRecoilValue(coreUserState);

  const [reactions, setReactions] = useState(originalReactions);

  const onClickReactionLocal = (
    reaction: ProfileReactionData,
    index: number
  ) => {
    if (isMyCard) {
      alert(t('alerts.cannotReactMyCard'));
      return;
    }
    onClickReaction?.(reaction);
    setReactions((prevReactions) => {
      const newReactions = [...prevReactions];
      newReactions[index] = {
        ...newReactions[index],
        count: newReactions[index].count + 1,
      };
      return newReactions;
    });
  };

  const links = useMemo(() => {
    if (!originalLinks || originalLinks.length <= 1) return originalLinks;
    const sortedLinks = [...originalLinks].sort(
      (a, b) =>
        (supportedSocials?.findIndex(
          (social) => social === SpaceSocialUtil.getSocialFromLabel(a.label)
        ) || 0) -
        (supportedSocials?.findIndex(
          (social) => social === SpaceSocialUtil.getSocialFromLabel(b.label)
        ) || 0)
    );
    return sortedLinks;
  }, [originalLinks, supportedSocials]);

  return (
    <Styled.ProfileCardContainer
      isExpandable={expandableDescription != null}
      hideBorder={isExpanded}
      isExpanded={isExpanded}
      highlightColor={isMyCard ? color : undefined}
    >
      <Styled.TopStyle color={color} />
      {imageUrl && (
        <Styled.ProfileImageWrapper
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
        </Styled.ProfileImageWrapper>
      )}
      <Styled.Top>
        <Styled.CardTitleContainer>
          <Styled.CardTitle>
            {title + (subTitle ? ` | ${subTitle}` : '')}
          </Styled.CardTitle>
          {links && (
            <Styled.LinksContainer>
              {links
                ?.filter((link) => link.url)
                ?.map((link, index) => (
                  <Styled.LinkButton
                    key={index}
                    href={link.url}
                    target="_blank"
                    title={link.label}
                  >
                    <HackleTrack
                      hackleEvent={{
                        key: HACKLE_KEYS.CLICK.SPACE.PROFILE_LINK,
                        properties: {
                          spaceId,
                          spaceProfileId: id,
                          spaceProfileTitle: title,
                          userId: user?.id || '',
                          userName: user?.name || '',
                          linkUrl: link.url,
                          linkLabel: link.label,
                          linkIconId: link.iconId,
                        },
                      }}
                    >
                      <Icon
                        icon={link.iconId}
                        width={link.size || 20}
                        height={link.size || 20}
                        color={link.color || 'var(--gray-700)'}
                      />
                    </HackleTrack>
                  </Styled.LinkButton>
                ))}
            </Styled.LinksContainer>
          )}
          {onClickEditButton && (
            <IconButton onClick={onClickEditButton} disableTouchRipple>
              <Icon
                icon="ic:outline-edit"
                width={24}
                height={24}
                color={color}
              />
            </IconButton>
          )}
        </Styled.CardTitleContainer>
        {tags.length > 0 && (
          <Styled.TagsContainer>
            {tags.map((tag, index) => (
              <Styled.CardTag key={index}># {tag}</Styled.CardTag>
            ))}
          </Styled.TagsContainer>
        )}
        {isDescriptionUsingHtml ? (
          <Styled.CardDescription
            isExpanded={isExpanded}
            dangerouslySetInnerHTML={{
              __html: (isExpanded ? expandableDescription : description) || '',
            }}
          />
        ) : (
          <Styled.CardDescription isExpanded={isExpanded}>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <PageLink target="_blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </PageLink>
              )}
            >
              {isExpanded ? expandableDescription : description}
            </Linkify>
          </Styled.CardDescription>
        )}
        {(timeUnits.length > 0 || locations.length > 0) && (
          <Styled.ReservationInfoListContainer>
            {timeUnits.length > 0 && (
              <Styled.ReservationInfoContainer>
                <Styled.ReservationInfoIcon icon="bx:time-five" />
                <Styled.ReservationInfoText>
                  {timeUnits
                    .map((timeUnit) => {
                      const hours = Math.floor(timeUnit / 60);
                      const minutes = timeUnit % 60;
                      const hourText =
                        hours > 0 ? `${hours}${tCommon('hour')}` : '';
                      const minuteText =
                        minutes > 0 ? `${minutes}${tCommon('min')}` : '';
                      return `${hourText} ${minuteText}`;
                    })
                    .join(', ')}
                </Styled.ReservationInfoText>
              </Styled.ReservationInfoContainer>
            )}
            {locations.length > 0 && (
              <Styled.ReservationInfoContainer>
                <Styled.ReservationInfoIcon
                  icon={'material-symbols:location-on-outline'}
                />
                <Styled.ReservationInfoText>
                  {locationContentWithNames(
                    locations.map((location) => location.name)
                  )}
                </Styled.ReservationInfoText>
              </Styled.ReservationInfoContainer>
            )}
          </Styled.ReservationInfoListContainer>
        )}
      </Styled.Top>
      {expandableDescription && !isExpanded && (
        <Styled.Bottom>
          <div />
          <Styled.MoreButton onClick={onClickMoreButton} color={color}>
            {t('more')}
            <Icon icon="ion:chevron-forward" width={20} />
          </Styled.MoreButton>
        </Styled.Bottom>
      )}

      {(reactions.length > 0 || reservationPageId) && (
        <Styled.Bottom>
          {reactions.length > 0 ? (
            <Styled.CardReactionContainer>
              {reactions.map((reaction, index) => {
                let emoji = '';
                switch (reaction.type) {
                  case 'HEART':
                    emoji = '🧡';
                    break;
                  case 'HAND_SHAKE':
                    emoji = '🤝';
                    break;
                }
                return (
                  <HackleTrack
                    key={reaction.type}
                    hackleEvent={{
                      key: HACKLE_KEYS.CLICK.SPACE.REACTION,
                      properties: {
                        spaceId,
                        spaceProfileId: id,
                        spaceProfileTitle: title,
                        userId: user?.id || '',
                        userName: user?.name || '',
                        reactionType: reaction.type,
                        reactionCount: reaction.count,
                      },
                    }}
                  >
                    <Styled.CardReaction
                      id={`gtm-space-profile-reaction-${reaction.type.toLowerCase()}`}
                      onClick={() => onClickReactionLocal(reaction, index)}
                    >
                      {`${emoji} ${reaction.count}`}
                    </Styled.CardReaction>
                  </HackleTrack>
                );
              })}
            </Styled.CardReactionContainer>
          ) : (
            <div />
          )}
          {reservationPageId && (
            <HackleTrack
              hackleEvent={{
                key: HACKLE_KEYS.CLICK.SPACE.REQUEST_MEETING,
                properties: {
                  spaceId,
                  spaceProfileId: id,
                  spaceProfileTitle: title,
                  reservationPageId,
                  reservationPageTitle: title,
                  userId: user?.id || '',
                  userName: user?.name || '',
                },
              }}
            >
              <Styled.MessageButtonWrapper>
                {!isMyCard && showSendMessageButton && (
                  <Styled.MessageIcon
                    borderColor={color}
                    onClick={onClickSendMessageButton}
                  >
                    <Icon
                      icon="iconoir:send-diagonal"
                      width="20"
                      height="20"
                      color={color}
                    />
                  </Styled.MessageIcon>
                )}

                <Styled.PrimaryButton
                  id={`gtm-space-profile-request-meeting`}
                  onClickButton={onClickPrimaryButton}
                  color={color}
                >
                  {primaryButtonLabel || t('requestMeeting')}
                </Styled.PrimaryButton>
              </Styled.MessageButtonWrapper>
            </HackleTrack>
          )}
        </Styled.Bottom>
      )}
    </Styled.ProfileCardContainer>
  );
};

export default SpaceProfileCard;
