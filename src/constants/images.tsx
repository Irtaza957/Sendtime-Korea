import React from 'react';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import { Location } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';

import { BASE_URL } from './baseUrl';

const getIcon = (type: string) => {
  if (type === 'Zoom' || type === 'ZOOM') {
    return (
      <ImageContainer width={24}>
        <AutoHeightImage src={`${BASE_URL.image}/logos/zoom-logo.png`} />
      </ImageContainer>
    );
  }

  if (type === 'Google Meet' || type === 'MEET' || type === 'Meet') {
    return <Icon icon="logos:google-meet" width="24" />;
  }

  if (type === 'Microsoft Teams' || type === 'TEAMS' || type === 'Teams') {
    return <Icon icon="logos:microsoft-teams" width="24" />;
  }

  if (type === '전화 미팅' || type === 'PHONE' || type === 'Phone') {
    return <Icon icon="bxs:phone-call" width="24" color="#27AE60" />;
  }

  return (
    <CustomIcon size={20} height={25} fill="#F2994A" stroke="none">
      <Location />
    </CustomIcon>
  );
};

export { getIcon };
