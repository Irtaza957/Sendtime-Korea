import React from 'react';

import { Check } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { Box, CheckboxWrapper, ContentContainer } from './index.styles';

interface TextCheckboxProps {
  hasBackground?: boolean;
  children: React.ReactNode;
  checked?: boolean;
  onClick: () => void;
  small?: boolean;
}

const TextCheckbox = ({
  hasBackground = false,
  children,
  onClick,
  checked = false,
  small = false,
}: TextCheckboxProps) => {
  return (
    <Box small={small}>
      <CheckboxWrapper checked={checked} small={small} onClick={onClick}>
        <CustomIcon size={16} height={11} fill="none" stroke="white">
          <Check />
        </CustomIcon>
      </CheckboxWrapper>

      <ContentContainer
        hasBackground={hasBackground}
        small={small}
        onClick={onClick}
      >
        {children}
      </ContentContainer>
    </Box>
  );
};

export default TextCheckbox;
