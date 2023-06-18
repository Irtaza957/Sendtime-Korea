import React from 'react';

import { Check } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';

import {
  CheckboxWrapper,
  Content,
  IconContentWrapper,
  IconWrapper,
  StyledButton,
} from './index.styles';

interface ButtonCheckboxProps {
  iconType?: 'calendar';
  content: string;
  checked?: boolean;
  onClick: () => void;
}

const MakeIcon = (type: string) => {
  if (type === 'calendar') {
    return <Icon icon="bx:calendar" color="#655CCB" />;
  }
};

const ButtonCheckbox = ({
  iconType,
  content,
  onClick,
  checked = false,
}: ButtonCheckboxProps) => {
  return (
    <StyledButton onClick={onClick}>
      <IconContentWrapper>
        <IconWrapper>{iconType && MakeIcon(iconType)}</IconWrapper>
        <Content>{content}</Content>
      </IconContentWrapper>

      <CheckboxWrapper checked={checked}>
        <CustomIcon size={16} height={11} fill="none" stroke="white">
          <Check />
        </CustomIcon>
      </CheckboxWrapper>
    </StyledButton>
  );
};

export default ButtonCheckbox;
