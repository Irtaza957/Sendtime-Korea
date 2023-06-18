import React, { useEffect, useRef, useState } from 'react';

import { DownArrow, UpArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import SelectBox, { SelectedValuesType } from '../SelectBox';
import TextInput from '../TextInput';

import { Box, IconBox } from './index.styles';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  selectValues?: SelectedValuesType;
  prefixNode?: React.ReactNode;
  type?: string;
  value: string;
  inputPadding?: number;
  placeholder?: string;
  label?: string;
  buttonContent?: React.ReactNode;
  buttonDisabled?: boolean;
  alert?: React.ReactNode;
  startLocation?: number;
  validated?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSelectBox?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  scrollIntoView?: boolean;
  dropdownAbove?: boolean;
}

const SelectTextInput = ({
  onClickSelectBox,
  prefixNode,
  selectValues,
  value,
  onChange = () => {},
  type = 'text',
  placeholder = '',
  label,
  inputPadding,
  buttonContent,
  onClickButton,
  buttonDisabled = false,
  startLocation = 0,
  alert,
  scrollIntoView = false,
  dropdownAbove = false,
  ...rest
}: TextInputProps) => {
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const [showSelectBox, setShowSelectBox] = useState(false);

  useEffect(() => {
    if (showSelectBox && scrollIntoView) {
      selectBoxRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [showSelectBox]);

  const toggleSelectBox = () => {
    setShowSelectBox((prevState) => !prevState);
  };

  const closeSelectBox = () => {
    setShowSelectBox(false);
  };

  return (
    <Box>
      <TextInput
        type="text"
        prefixNode={prefixNode}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        inputPadding={inputPadding}
        buttonContent={buttonContent}
        onClickButton={onClickButton}
        buttonDisabled={buttonDisabled}
        alert={alert}
        onBlur={closeSelectBox}
        onClick={toggleSelectBox}
        readOnly
        {...rest}
      />
      <IconBox>
        <CustomIcon
          size={20}
          height={25}
          fill="none"
          stroke="black"
          viewBox="0 0 15 5"
          margin={label && '24px 0 0 0'}
        >
          {showSelectBox ? <UpArrow /> : <DownArrow />}
        </CustomIcon>
      </IconBox>
      <Box ref={selectBoxRef}>
        {showSelectBox && selectValues && (
          <SelectBox
            onMouseDown={onClickSelectBox}
            targetValue={value}
            selectValues={selectValues}
            boxCount={selectValues.length}
            dropdownAbove={dropdownAbove}
          />
        )}
      </Box>
    </Box>
  );
};

export default SelectTextInput;
