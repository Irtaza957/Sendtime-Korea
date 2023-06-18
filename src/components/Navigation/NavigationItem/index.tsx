import React from 'react';

import { NavigationItemType } from '..';

import { Item, ItemContainer, LengthInfo, Noti } from './index.styles';

interface NavigationItemProps extends Omit<NavigationItemType, 'contents'> {
  selected: boolean;
  notification?: boolean;
}

const NavigationItem = ({
  title,
  onClick,
  selected,
  notification,
  showLength,
  dataLength,
}: NavigationItemProps) => {
  return (
    <ItemContainer onClick={onClick} selected={selected}>
      <Item>
        {title} {showLength && <LengthInfo>{dataLength}</LengthInfo>}
      </Item>
      {notification && <Noti />}
    </ItemContainer>
  );
};

export default NavigationItem;
