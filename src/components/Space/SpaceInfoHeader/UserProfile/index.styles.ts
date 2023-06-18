import styled from '@emotion/styled';
import { Icon } from '@iconify/react';

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export const UserProfileImageWrapper = styled.div<{ backgroundColor: string }>`
  width: 35px;
  height: 35px;
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};

  & > span {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white);
    font-size: 15px;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.span`
  line-height: 1;
  font-weight: 700;
  font-size: 15px;
  color: var(--gray-800);
`;

export const UserEmail = styled.span`
  line-height: 1;
  font-size: 12px;
  color: var(--gray-600);
`;

export const ArrowDownIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;
