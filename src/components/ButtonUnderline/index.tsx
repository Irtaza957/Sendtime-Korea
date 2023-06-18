import React from 'react';

import { LeftArrow, RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { StyledButtonUnderline } from './index.styles';

interface ButtonUnderlineProps {
  children: React.ReactNode;
  iconType?: 'right' | 'left';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonUnderline = ({
  children,
  onClick,
  iconType = 'right',
}: ButtonUnderlineProps) => {
  return (
    <StyledButtonUnderline onClick={onClick}>
      {iconType === 'left' && (
        <CustomIcon
          size={7}
          height={17}
          fill="none"
          stroke="gray-600"
          viewBox="0 0 8 14"
        >
          <LeftArrow />
        </CustomIcon>
      )}
      {children}
      {iconType === 'right' && (
        <CustomIcon
          size={7}
          height={17}
          fill="none"
          stroke="gray-600"
          viewBox="0 0 8 14"
        >
          <RightArrow />
        </CustomIcon>
      )}
    </StyledButtonUnderline>
  );
};

export default ButtonUnderline;
