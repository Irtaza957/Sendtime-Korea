import React, { ReactNode, useEffect, useRef } from 'react';

import {
  DisabledText,
  SelectBoxContainer,
  SelectButtonItem,
} from './index.styles';

export type SelectedValuesType = readonly {
  text?: string;
  value: string;
  disabled?: boolean;
  disabledText?: ReactNode;
}[];
interface SelectBoxProps {
  targetValue?: string;
  selectValues: SelectedValuesType;
  boxCount?: number;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dropdownAbove?: boolean;
}

const SelectBox = ({
  targetValue,
  onMouseDown,
  boxCount = 5,
  selectValues,
  dropdownAbove,
}: SelectBoxProps) => {
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const customBoxCount = boxCount > 5 ? 5 : boxCount;

  useEffect(() => {
    if (selectBoxRef.current && buttonRef.current) {
      const selectBoxHeight = buttonRef.current.offsetHeight;

      const height =
        Number(buttonRef.current.dataset.id) * (selectBoxHeight - 0.5);
      selectBoxRef.current.scrollTo(0, height);
    }
  }, []);

  return (
    <SelectBoxContainer
      boxCount={customBoxCount}
      ref={selectBoxRef}
      dropdownAbove={dropdownAbove}
    >
      {selectValues.map(({ text, value, disabled, disabledText }, idx) => (
        <SelectButtonItem
          key={idx}
          data-id={idx}
          type="button"
          onMouseDown={onMouseDown}
          selected={value === targetValue}
          ref={value === targetValue ? buttonRef : null}
          isActive={!disabled}
          disabled={disabled}
        >
          {text ? text : value}

          {disabledText && disabled && (
            <DisabledText>{disabledText}</DisabledText>
          )}
        </SelectButtonItem>
      ))}
    </SelectBoxContainer>
  );
};

export default SelectBox;
