import { SIDEBAR_TYPE, SidebarType } from '@contexts/SidebarProvider';
import styled from '@emotion/styled';

export const SidebarItemContainer = styled.div`
  white-space: nowrap;
`;

export const ItemContainer = styled.button<{
  active?: boolean;
  sub?: boolean;
  sidebarType?: SidebarType;
}>`
  width: 100%;
  display: flex;
  justify-content: ${({ sub, sidebarType }) =>
    sidebarType === SIDEBAR_TYPE.BIG
      ? 'space-between'
      : sub
      ? 'flex-start'
      : 'center'};
  align-items: center;
  font-size: 12px;
  text-align: left;
  word-break: break-word;
  padding: ${({ sub, sidebarType }) =>
    `${
      sub
        ? '10px 30px 10px 55px'
        : sidebarType === SIDEBAR_TYPE.BIG
        ? '10px 30px'
        : '10px 0'
    }`};
  color: ${({ active }) => `var(--${active ? 'purple-500' : 'transparent'})`};

  &:hover {
    background: var(--gray-50);
  }
`;

export const SidebarBtnName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 220px;
  color: inherit;
`;

export const ContentContainer = styled.div`
  display: flex;
  color: var(--gray-750);
  align-items: center;
  font-size: 14px;
  gap: 5px;
`;

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

export const SubItemContainer = styled.div<{
  isSubNavOpen?: boolean;
  count?: number;
}>`
  height: 0;
  overflow: hidden;
  transition-delay: 1s;
  color: var(--gray-750);
  transition: all 0.1s cubic-bezier(0, 1.15, 1, 1);

  &.active {
    min-height: 35px;
    height: 100%;
    overflow: auto;
    max-height: calc(100vh - 555px);
  }
`;

export const NEW = styled.div`
  display: flex;
  padding: 3px 6px;
  background: var(--alert);
  color: var(--white);
  border-radius: 8px;
  font-size: 10px;
  margin-left: 70px;
  animation: 0.8s blink infinite alternate;
`;
