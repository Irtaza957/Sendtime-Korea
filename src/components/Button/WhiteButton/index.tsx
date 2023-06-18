import React, { ReactNode } from 'react';
import i18next from 'i18next';

import { Icon } from '@iconify/react';

import StyledButton from '..';

interface WhiteButtonProps {
  buttonText?: ReactNode;
  onClick?: () => void;
  width?: string;
  color?: string;
  icon?: { icon: string; color?: string; width?: number };
}

const WhiteButton = ({
  buttonText = i18next.t('common:cancel'),
  onClick,
  width = '100px',
  color,
  icon,
}: WhiteButtonProps) => {
  return (
    <StyledButton
      onClickButton={onClick}
      withBorder
      borderRadius={50}
      bgColor="white"
      color={color ? color : 'gray-750'}
      borderColor={color ? color : 'gray-550'}
      width={width}
    >
      {icon && <Icon icon={icon.icon} color={icon.color} width={icon.width} />}
      {buttonText}
    </StyledButton>
  );
};

export default WhiteButton;
