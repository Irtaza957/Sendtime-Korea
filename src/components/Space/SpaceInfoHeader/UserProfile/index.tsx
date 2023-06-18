import React, { MouseEvent } from 'react';

import * as Styled from './index.styles';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    color?: string;
  };
  isUserMenuOpen?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const UserProfile = ({ user, isUserMenuOpen, onClick }: UserProfileProps) => {
  return (
    <Styled.UserContainer onClick={onClick}>
      <Styled.UserProfileImageWrapper
        backgroundColor={user?.color || 'var(--purple-400)'}
      >
        <span>{user.name[0]}</span>
      </Styled.UserProfileImageWrapper>
      <Styled.UserInfoContainer>
        <Styled.UserName>{user.name}</Styled.UserName>
        <Styled.UserEmail>{user.email}</Styled.UserEmail>
      </Styled.UserInfoContainer>
      {isUserMenuOpen !== undefined && (
        <Styled.ArrowDownIcon
          icon={isUserMenuOpen ? 'ri:arrow-up-s-fill' : 'ri:arrow-down-s-fill'}
        />
      )}
    </Styled.UserContainer>
  );
};

export default UserProfile;
