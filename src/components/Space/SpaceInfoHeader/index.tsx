import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Linkify from 'react-linkify';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';

import { SpaceContactPointData } from '@api/space/SpaceApi';
import { coreUserState } from '@atoms/index';
import AutoHeightImage from '@components/AutoHeightImage';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import { Icon } from '@iconify/react';
import { Fade, IconButton } from '@mui/material';
import { SPACE_MOBILE_WIDTH } from '@pages/Space/index.styles';

import { PageLink } from '../index.styles';
import SpaceContactPoint from '../SpaceContactPoint';

import * as Styled from './index.styles';
import UserProfile from './UserProfile';

interface SpaceInfoHeaderProps {
  title: string;
  userMenus: {
    icon: string;
    text: string;
    color?: string;
    onClick?: () => void;
  }[];
  description?: string;
  imageUrl?: string;
  contactPoints: SpaceContactPointData[];
  isScrolled?: boolean;
  onSpaceTitleClick?: () => void;
  onLoginClick?: () => void;
}

const SpaceInfoHeader = ({
  title,
  userMenus,
  description,
  imageUrl,
  contactPoints,
  isScrolled,
  onSpaceTitleClick,
  onLoginClick,
}: SpaceInfoHeaderProps) => {
  const user = useRecoilValue(coreUserState);
  const { t } = useTranslation('space');
  const isMobile = useMediaQuery({
    query: `(max-width: ${SPACE_MOBILE_WIDTH})`,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isUserMenuOpen = Boolean(userMenuAnchorEl);

  const closeExpandableHeader = () => {
    setIsExpanded(false);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closeUserMenu = () => {
    setUserMenuAnchorEl(null);
  };

  const closeAllPopups = () => {
    closeDrawer();
    closeUserMenu();
    closeExpandableHeader();
  };

  const openExpandableHeader = () => {
    closeAllPopups();
    if (!isMobile) return;
    setIsExpanded(!isExpanded);
  };

  const openDrawer = () => {
    closeAllPopups();
    setIsDrawerOpen(true);
  };

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    closeAllPopups();
    setUserMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Styled.ExpandedBackgroundOverlay
        onClick={closeExpandableHeader}
        expanded={isExpanded}
      />
      <Styled.HeaderContainer>
        <Styled.CardContentContainer showShadow={isScrolled || false}>
          {!isMobile && (
            <Styled.LogoContainer>
              <Styled.PoweredByText>PUBLISHED BY</Styled.PoweredByText>
              <Link href={ROUTES.SPACE_LANDING} passHref target="_blank">
                <a target="_blank">
                  <Styled.LogoImageWrapper>
                    <AutoHeightImage
                      src={`${BASE_URL.image}/logos/space_logo.png`}
                      alt="Space logo"
                    />
                  </Styled.LogoImageWrapper>
                </a>
              </Link>
            </Styled.LogoContainer>
          )}
          {isMobile && (
            <Styled.SpaceTitleContainer onClick={openExpandableHeader}>
              {imageUrl && (
                <Styled.SpaceProfileImageWrapper>
                  <Image
                    src={imageUrl}
                    width={'100%'}
                    height={'100%'}
                    objectFit="cover"
                    alt="profile image"
                  />
                </Styled.SpaceProfileImageWrapper>
              )}
              <Styled.CardTitle
                onClick={isMobile ? undefined : onSpaceTitleClick}
              >
                {title}
              </Styled.CardTitle>
              <Styled.ArrowDownIcon
                icon={
                  isExpanded ? 'ri:arrow-up-s-fill' : 'ri:arrow-down-s-fill'
                }
              />
            </Styled.SpaceTitleContainer>
          )}
          <Styled.RightNavContainer>
            {!user && (
              <Styled.OutlinedButton onClickButton={onLoginClick}>
                {t('addCardModal.login')}
              </Styled.OutlinedButton>
            )}
            {user && isMobile && (
              <>
                <IconButton
                  onClick={() => openDrawer()}
                  disableTouchRipple
                  sx={{ padding: 0 }}
                >
                  <Icon
                    icon="ic:round-menu"
                    width={28}
                    color="var(--gray-800)"
                  />
                </IconButton>
                <Styled.CustomizedSwipableDrawer
                  anchor="right"
                  open={isDrawerOpen}
                  onOpen={() => openDrawer()}
                  onClose={() => closeDrawer()}
                >
                  <Styled.UserProfileInDrawerWrapper>
                    <UserProfile user={user} />
                  </Styled.UserProfileInDrawerWrapper>
                  {(() => {
                    const menus = userMenus.map((userMenu, index) => (
                      <Styled.CustomizedMenuItem
                        key={index}
                        textColor={userMenu.color || 'var(--gray-700)'}
                        onClick={() => {
                          closeAllPopups();
                          userMenu.onClick?.();
                        }}
                        disableRipple
                      >
                        <Icon icon={userMenu.icon} width={20} />
                        {userMenu.text}
                      </Styled.CustomizedMenuItem>
                    ));
                    menus.splice(userMenus.length - 1, 0, <Styled.Spacer />);
                    return menus;
                  })()}
                </Styled.CustomizedSwipableDrawer>
              </>
            )}
            {user && !isMobile && (
              <>
                <UserProfile
                  user={user}
                  isUserMenuOpen={isUserMenuOpen}
                  onClick={openUserMenu}
                />
                <Styled.CustomizedMenu
                  anchorEl={userMenuAnchorEl}
                  open={isUserMenuOpen}
                  onClose={closeUserMenu}
                  TransitionComponent={Fade}
                  transitionDuration={200}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  autoFocus={false}
                >
                  {userMenus.map((userMenu, index) => (
                    <Styled.CustomizedMenuItem
                      key={index}
                      textColor={userMenu.color || 'var(--gray-700)'}
                      onClick={() => {
                        closeAllPopups();
                        userMenu.onClick?.();
                      }}
                      disableRipple
                    >
                      <Icon icon={userMenu.icon} width={20} />
                      {userMenu.text}
                    </Styled.CustomizedMenuItem>
                  ))}
                </Styled.CustomizedMenu>
              </>
            )}
            {!isMobile && <LanguageDropdown />}
          </Styled.RightNavContainer>
        </Styled.CardContentContainer>

        {isMobile && (
          <Styled.ExpandedContainer expanded={isExpanded}>
            <LanguageDropdown />
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
          </Styled.ExpandedContainer>
        )}
      </Styled.HeaderContainer>
    </>
  );
};

export default SpaceInfoHeader;
