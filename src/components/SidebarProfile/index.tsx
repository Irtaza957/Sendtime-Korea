import React from 'react';

import { SIDEBAR_TYPE, SidebarType } from '@contexts/SidebarProvider';

import {
  Name,
  PrivateURL,
  ProfileContainer,
  ProfileDetails,
  ProfileImage,
} from './index.styles';

interface SidebarProfileProps {
  name: string;
  privateURL: string;
  bgColor: string /* 서버에서 저장된 값 */;
  type?: SidebarType;
}

const SidebarProfile = ({
  name,
  type = SIDEBAR_TYPE.BIG,
  privateURL,
  bgColor,
}: SidebarProfileProps) => {
  return (
    <ProfileContainer type={type}>
      <ProfileImage bgColor={bgColor}>
        <span>{name[0]}</span>
      </ProfileImage>
      {type === SIDEBAR_TYPE.BIG && (
        <ProfileDetails>
          <Name>{name}</Name>
          <PrivateURL>{privateURL}</PrivateURL>
        </ProfileDetails>
      )}
    </ProfileContainer>
  );
};

export default SidebarProfile;
