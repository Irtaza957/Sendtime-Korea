import React from 'react';

import useTranslate from '@hooks/useTranslate';

import { DropdownContainer } from './index.styles';

interface LanguageDropdownProps {
  position?: string;
  top?: string;
  dropdownAbove?: boolean;
  width?: string;
}

const LanguageDropdown = ({
  position,
  top,
  dropdownAbove = false,
  width,
}: LanguageDropdownProps) => {
  const { selectView } = useTranslate();

  return (
    <>
      <DropdownContainer position={position} top={top} width={width}>
        {selectView({ dropdownAbove })}
      </DropdownContainer>
    </>
  );
};

export default LanguageDropdown;
