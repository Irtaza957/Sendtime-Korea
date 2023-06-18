import React from 'react';

import { Check } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { MultiSelectBox, Selected } from './index.styles';

interface MultiSelectInputProps {
  content: string;
  selected?: boolean;
  onClick?: () => void;
}

const MultiSelectInput = ({
  content,
  selected,
  onClick,
}: MultiSelectInputProps) => {
  return (
    <MultiSelectBox onClick={onClick} selected={selected}>
      <div>{content}</div>

      {selected && (
        <Selected>
          <CustomIcon size={16} height={11} fill="none" stroke="white">
            <Check />
          </CustomIcon>
        </Selected>
      )}
    </MultiSelectBox>
  );
};

export default MultiSelectInput;
