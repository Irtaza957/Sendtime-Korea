import React from 'react';

import { CheckboxCheck } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import * as Styled from './index.styles';

interface TextCheckboxProps {
  children: React.ReactNode;
  checked?: boolean;
  onClick: () => void;
}

const TextCheckbox = ({
  children,
  onClick,
  checked = false,
}: TextCheckboxProps) => {
  return (
    <Styled.Box>
      <Styled.CheckboxWrapper checked={checked} onClick={onClick}>
        <CustomIcon
          size={11}
          height={11}
          fill="none"
          stroke="white"
          margin={'0 0 1px 0'}
        >
          <CheckboxCheck />
        </CustomIcon>
      </Styled.CheckboxWrapper>

      <Styled.ContentContainer onClick={onClick}>
        {children}
      </Styled.ContentContainer>
    </Styled.Box>
  );
};

export default TextCheckbox;
