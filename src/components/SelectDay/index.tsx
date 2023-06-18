import React from 'react';

import { Check } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import {
  CheckboxWrapper,
  SelectContainer,
  SelectContent,
} from './index.styles';

interface SelectDayProps {
  checked: boolean;
  content?: string;
  onClick?: () => void;
}

const SelectDay = ({ checked, content, onClick }: SelectDayProps) => {
  return (
    <SelectContainer type="button" onClick={onClick}>
      <CheckboxWrapper checked={checked}>
        <CustomIcon size={16} height={11} fill="none" stroke="white">
          <Check />
        </CustomIcon>
      </CheckboxWrapper>
      <SelectContent>{content}</SelectContent>
    </SelectContainer>
  );
};

export default SelectDay;
