import StyledButton from '@components/Button';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import {
  drawerClasses,
  Menu,
  menuClasses,
  MenuItem,
  SwipeableDrawer,
} from '@mui/material';

const TRANSITION_DURATION = 0.2;
const headerHorizontalPadding = `calc(var(--space-page-horizontal-padding) + var(--space-content-horizontal-padding))`;
const defaultShadow = '0px 4px 8px rgba(19, 20, 22, 0.05)';

export const ExpandedBackgroundOverlay = styled.div<{ expanded?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--middle);
  background-color: rgba(0, 0, 0, 0.5);

  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  pointer-events: ${({ expanded }) => (expanded ? 'auto' : 'none')};
  transition: opacity ${TRANSITION_DURATION}s ease-in-out;
`;

export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: var(--front);
  pointer-events: none;
`;

export const CardContentContainer = styled.div<{ showShadow: boolean }>`
  height: var(--space-header-height);
  display: flex;
  padding: 0 ${headerHorizontalPadding};
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: ${({ showShadow }) =>
    showShadow ? '1px solid transparent' : '1px solid var(--gray-200)'};
  box-shadow: ${({ showShadow }) =>
    showShadow ? defaultShadow : '0px 4px 8px rgba(19, 20, 22, 0)'};
  pointer-events: auto;
  transition: all ${TRANSITION_DURATION}s ease-in-out;
  position: relative;
  gap: 12px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PoweredByText = styled.span`
  color: #514d7e;
  font-size: 12px;
`;

export const SpaceTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const LogoImageWrapper = styled.div`
  width: 88px;
  padding: 4px;
`;

export const SpaceProfileImageWrapper = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const CardTitle = styled.h1`
  max-height: 100%;
  overflow: hidden;
  font-size: 16px;
  font-weight: var(--semi-bold);
  color: var(--gray-800);
  cursor: pointer;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ArrowDownIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

export const RightNavContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
`;

export const OutlinedButton = styled(StyledButton)`
  background-color: white;
  color: var(--purple-500) !important;
  border: 1px solid var(--purple-500);
  font-weight: 600;
`;

export const CustomizedSwipableDrawer = styled(SwipeableDrawer)`
  z-index: var(--front);

  & .${drawerClasses.paper} {
    box-shadow: ${defaultShadow};
    padding: 20px 0;
  }
`;

export const UserProfileInDrawerWrapper = styled.div`
  padding: 16px;
`;

export const Spacer = styled.div`
  flex-grow: 1;
  border-top: 1px solid var(--gray-100);
`;

export const CustomizedMenu = styled(Menu)`
  z-index: var(--front);

  & .${menuClasses.paper} {
    box-shadow: ${defaultShadow};
    border: 1px solid var(--gray-100);
  }

  & .${menuClasses.list} {
    padding: 0;
  }
`;

export const CustomizedMenuItem = styled(MenuItem)<{ textColor?: string }>`
  font-family: inherit;
  font-weight: 600;
  font-size: 15px;
  gap: 8px;
  color: ${({ textColor }) => textColor || 'var(--gray-700)'};
  padding-top: 12px;
  padding-bottom: 12px;
  border-top: 1px solid var(--gray-100);

  &:first-child {
    border-top: none;
  }

  & > svg {
    color: ${({ textColor }) => textColor || 'var(--gray-700)'};
  }
`;

export const ExpandedContainer = styled.div<{ expanded?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 4px 12px rgba(19, 20, 22, 0.18);
  gap: 24px;
  background-color: white;

  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  pointer-events: ${({ expanded }) => (expanded ? 'auto' : 'none')};
  transition: opacity ${TRANSITION_DURATION}s ease-in-out;
`;

export const SpaceDescription = styled.div`
  font-size: 14px;
  font-weight: var(--normal);
  color: var(--gray-750);
  line-height: 1.7;
  white-space: pre-line;
  padding: 0 10px;
  max-height: 50vh;
  overflow-y: auto;
`;

export const ContactPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
