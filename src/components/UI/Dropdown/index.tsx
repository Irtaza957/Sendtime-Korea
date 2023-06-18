import React, { useEffect, useRef, useState } from 'react';

import { ArrowDown } from '@Icon/Icons/Utils';

import * as Styled from './index.styles';

interface Dropdown {
  height: number;
  padding: number;
  options: Option[];
  selectedOption: Option;
  selectOptionHandler: (arg0: Option) => void;
}

interface Option {
  icon: JSX.Element;
  text: string;
  type: IFormQuestion['questionType'];
}

const Dropdown = ({
  height,
  padding,
  options,
  selectedOption,
  selectOptionHandler,
}: Dropdown) => {
  const dropdownRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [dropdown, setDropdown] = useState<boolean>(false);
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', closeSelectBox);
    return () => {
      document.removeEventListener('click', closeSelectBox);
    };
  }, []);
  const onSelectOption = (option: Option) => {
    selectOptionHandler(option);
    setDropdown(!dropdown);
  };
  return (
    <Styled.Container ref={dropdownRef}>
      <Styled.Box
        height={height}
        padding={padding}
        onClick={() => setDropdown(!dropdown)}
      >
        <Styled.SelectedText>
          <Styled.IconWrapper>{selectedOption.icon}</Styled.IconWrapper>
          <Styled.Text>{selectedOption.text}</Styled.Text>
        </Styled.SelectedText>
        <Styled.ArrowIcon isDropdown={dropdown}>
          <ArrowDown />
        </Styled.ArrowIcon>
      </Styled.Box>
      {dropdown && (
        <Styled.SelectboxContainer>
          <Styled.SelectBox>
            {options.map((option, index) => (
              <Styled.SelectedText
                key={index}
                onClick={() => onSelectOption(option)}
              >
                <Styled.IconWrapper>{option.icon}</Styled.IconWrapper>
                <Styled.Text>{option.text}</Styled.Text>
              </Styled.SelectedText>
            ))}
          </Styled.SelectBox>
        </Styled.SelectboxContainer>
      )}
    </Styled.Container>
  );
};

export default Dropdown;
