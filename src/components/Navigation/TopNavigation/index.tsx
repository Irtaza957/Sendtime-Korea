import React from 'react';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import NewTabLink from '@components/NewTabLink';
import Title from '@components/Title';
import { BASE_URL } from '@constants/baseUrl';

import { TopNavContainer } from './index.styles';

interface TopNavigationProps {
  title?: string;
}

const TopNavigation = ({ title }: TopNavigationProps) => {
  return (
    <TopNavContainer>
      <NewTabLink href="https://sendtime.app">
        <ImageContainer width={200}>
          <AutoHeightImage
            src={`${BASE_URL.image}/logos/sendtime_logo.png`}
            alt="sendtime-logo"
          />
        </ImageContainer>
      </NewTabLink>
      {title && <Title>{title}</Title>}
    </TopNavContainer>
  );
};

export default TopNavigation;
