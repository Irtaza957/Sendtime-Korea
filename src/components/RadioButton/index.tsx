import React, { MouseEvent } from 'react';

import {
  RadioButtonChild,
  RadioButtonContainer,
  RadioButtonInner,
  RadioButtonOuter,
} from './index.styles';

interface RadioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const RadioButton = ({
  checked,
  onClick,
  children,
  disabled = false,
  ...rest
}: RadioButtonProps) => {
  return (
    <RadioButtonContainer>
      <RadioButtonOuter
        checked={checked}
        onClick={disabled ? () => {} : onClick}
        disabled={disabled}
        {...rest}
      >
        <RadioButtonInner disabled={disabled} />
      </RadioButtonOuter>
      <RadioButtonChild onClick={disabled ? () => {} : onClick} {...rest}>
        {children && children}
      </RadioButtonChild>
    </RadioButtonContainer>
  );
};

export default RadioButton;
