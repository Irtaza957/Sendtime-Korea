import { SIDEBAR_TYPE, SidebarType } from '@contexts/SidebarProvider';
import styled from '@emotion/styled';

export const TopContainer = styled.div<{ isHoverAvailable?: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;

  /* ${({ isHoverAvailable }) =>
    !isHoverAvailable &&
    `position: fixed;
     width: auto;
     left: 0;
     animation: slideRight 300ms cubic-bezier(0.51,-0.01, 0, 1.01);
  `} */
`;

export const Resizer = styled.div`
  flex-basis: 4px;
  position: relative;
  z-index: 2;
  cursor: col-resize;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:active,
  &:hover {
    border-right: 3px solid var(--purple-200);
  }
`;

const SidebarContainer = styled.div`
  position: relative;
  min-width: 70px;
  max-width: 260px;

  height: 100%;
  flex-shrink: 0;
  background: var(--white);
  color: var(--gray-600);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 14px 0 var(--gray-200);
  z-index: var(--very-front);
  transition: all 0.15s cubic-bezier(0, 1.15, 1, 1);
  /* overflow-x: hidden; */
`;

const SidebarTop = styled.div<{ type?: SidebarType }>`
  padding: ${({ type }) =>
    type === SIDEBAR_TYPE.BIG
      ? '0 22px'
      : type === SIDEBAR_TYPE.SMALL
      ? '0'
      : '0'};
  margin-top: ${({ type }) =>
    type === SIDEBAR_TYPE.BIG
      ? '-4px'
      : type === SIDEBAR_TYPE.SMALL
      ? '15px'
      : '0'};
`;

const SidebarItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarProfileContainer = styled.div`
  width: 100%;
  display: flex;
`;

const SidebarTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarBottom = styled.div`
  height: fit-content;
`;

const SidebarSettingContainer = styled.div`
  width: 100%;
`;

const LogoContainer = styled.button`
  padding: 0 3.5px;
  margin: 17.25px 0;
  min-height: 50px;
  max-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & > div {
    max-height: 100px;
  }
`;

const SmallLogoContainer = styled.div`
  margin: 0;
  min-height: 50px;
  max-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const OpenIcon = styled.button`
  width: 25px;
  height: 25px;
  min-width: 25px;
  min-height: 25px;
  border-radius: 50%;
  background: var(--white);
  position: absolute;
  top: 56px;
  right: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--purple-100);
  /* background: var(--purple-50); */
  background: #eff1fa;

  &:hover {
    background: var(--purple-100);
  }
`;

export {
  LogoContainer,
  SidebarBottom,
  SidebarContainer,
  SidebarItemContainer,
  SidebarProfileContainer,
  SidebarSettingContainer,
  SidebarTop,
  SidebarTopContainer,
  SmallLogoContainer,
};
