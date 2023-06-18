import React, { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import { SIDEBAR_TYPE, SidebarType } from '@contexts/SidebarProvider';
import { SubNavActiveType } from '@contexts/SidebarProvider';
import {
  LogOut,
  ManageSchedules,
  MyCalendar,
  Reservation,
  Settings,
  Space,
  TeamCalendar,
} from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import {
  ContentContainer,
  IconContainer,
  ItemContainer,
  SidebarBtnName,
  SidebarItemContainer,
  SubItemContainer,
} from './index.styles';

type IconType =
  | 'my-calendar'
  | 'team-calendar'
  | 'space'
  | 'reservation'
  | 'manageSchedules'
  | 'settings'
  | 'logout';

type Sidebar = {
  id: string;
  name: string;
};

interface SidebarItemProps {
  content: string;
  iconType?: IconType;
  sidebarType?: SidebarType;
  active?: boolean;
  isSubNavOpen?: boolean;
  onClickItem?: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickSubNavItem?: (event: MouseEvent<HTMLButtonElement>) => void;
  subSidebar?: Sidebar[] /* TODO: 추후 api Response에 따라 바꾸어두기*/;
  subItemActive?: SubNavActiveType;
}

const IconDiv = (type: IconType, active: boolean) => {
  if (type === 'team-calendar') {
    return (
      <IconContainer>
        <CustomIcon
          size={24}
          height={21}
          fill={`${active ? 'purple-500' : 'gray-700'}`}
          stroke="none"
        >
          <MyCalendar />
        </CustomIcon>
      </IconContainer>
    );
  }

  if (type === 'my-calendar') {
    return (
      <IconContainer>
        <CustomIcon
          size={24}
          fill={`${active ? 'purple-500' : 'gray-700'}`}
          stroke="none"
        >
          <TeamCalendar />
        </CustomIcon>
      </IconContainer>
    );
  }

  if (type === 'space') {
    return (
      <IconContainer>
        <CustomIcon
          size={24}
          fill={`${active ? 'purple-500' : 'gray-700'}`}
          stroke="none"
        >
          <Space />
        </CustomIcon>
      </IconContainer>
    );
  }

  if (type === 'reservation') {
    return (
      <IconContainer>
        <CustomIcon
          size={24}
          fill={`${active ? 'purple-500' : 'gray-700'}`}
          stroke="none"
        >
          <Reservation />
        </CustomIcon>
      </IconContainer>
    );
  }

  if (type === 'manageSchedules') {
    return (
      <IconContainer>
        <CustomIcon
          size={20}
          fill={`${active ? 'purple-500' : 'gray-700'}`}
          stroke="none"
        >
          <ManageSchedules />
        </CustomIcon>
      </IconContainer>
    );
  }

  if (type === 'settings') {
    return (
      <IconContainer>
        <CustomIcon
          size={20}
          fill={`${active ? 'purple-500' : 'gray-700'}`}
          stroke="none"
        >
          <Settings />
        </CustomIcon>
      </IconContainer>
    );
  }

  if (type === 'logout') {
    return (
      <IconContainer>
        <CustomIcon
          size={15}
          height={18}
          fill={`${active ? 'purple-500' : 'gray-700'}`}
          stroke="none"
        >
          <LogOut />
        </CustomIcon>
      </IconContainer>
    );
  }
};

const SidebarItem = ({
  content,
  sidebarType,
  iconType,
  onClickItem,
  isSubNavOpen = false,
  subSidebar,
  onClickSubNavItem,
  subItemActive,
  active = false,
}: SidebarItemProps) => {
  const itemCount = subSidebar?.length || 0;
  const router = useRouter();
  const { groupId } = router.query;

  return (
    <SidebarItemContainer>
      <ItemContainer onClick={onClickItem} sidebarType={sidebarType}>
        <ContentContainer>
          {iconType && IconDiv(iconType, active)}
          {sidebarType === SIDEBAR_TYPE.BIG && (
            <>
              <span
                style={{ color: `${active ? 'var(--purple-500' : 'inherit'}` }}
              >
                {content}

                {/* 런칭 한정 */}
              </span>
            </>
          )}
        </ContentContainer>
      </ItemContainer>

      {subItemActive && sidebarType === SIDEBAR_TYPE.BIG && (
        <SubItemContainer
          className={isSubNavOpen ? 'active' : ''}
          count={itemCount}
        >
          {(subSidebar ?? []).map(({ id, name }, idx) => (
            <ItemContainer
              key={idx}
              sub={true}
              data-id={id}
              data-name={name}
              active={groupId === id || subItemActive[id]}
              onClick={onClickSubNavItem}
            >
              <SidebarBtnName>{name}</SidebarBtnName>
            </ItemContainer>
          ))}
        </SubItemContainer>
      )}
    </SidebarItemContainer>
  );
};

export default SidebarItem;
