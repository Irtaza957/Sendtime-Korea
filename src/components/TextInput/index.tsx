import React from 'react';

import { Required } from '@components/TextInputWithLabel/index.styles';
import { isString } from '@utils/typeChecker';

import StyledButton from '../Button';

import {
  InputContainer,
  PrefixContainer,
  StyledInput,
  TextInputContainer,
  TextInputLabel,
} from './index.styles';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  prefixNode?: React.ReactNode;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  buttonContent?: React.ReactNode;
  onClickButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonDisabled?: boolean;
  inputPadding?: number;
  alert?: React.ReactNode;
  validated?: boolean;
  animated?: boolean;
  required?: boolean;
  height?: number | string;
}

const TextInput = ({
  type = 'text',
  prefixNode,
  value,
  onChange,
  placeholder = '',
  label,
  buttonContent,
  onClickButton,
  buttonDisabled = false,
  inputPadding = 10,
  alert,
  height,
  validated = true,
  animated = false,
  required = false,
  ...rest
}: TextInputProps) => {
  const hasTextContent = isString(buttonContent);

  return (
    <InputContainer>
      {label && (
        <TextInputLabel>
          {label}
          {required && <Required>*</Required>}
        </TextInputLabel>
      )}
      <TextInputContainer
        disabled={rest.disabled}
        validated={validated}
        animated={animated}
        height={height}
      >
        {prefixNode && <PrefixContainer>{prefixNode}</PrefixContainer>}
        <StyledInput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputPadding={inputPadding}
          isEmpty={true}
          {...rest}
        />
        {buttonContent && (
          <StyledButton
            onClickButton={onClickButton}
            disabled={buttonDisabled}
            bgColor={hasTextContent ? undefined : 'transparent'}
            padding={hasTextContent ? undefined : '10px'}
          >
            {buttonContent}
          </StyledButton>
        )}
      </TextInputContainer>
      {alert && alert}
    </InputContainer>
  );
};

export default TextInput;
