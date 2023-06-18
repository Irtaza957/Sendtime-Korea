import React from 'react';

import TextInput, { TextInputProps } from '../TextInput';

import { Required, TextInputContainer, Title } from './index.styles';

interface TextInputWithLabelProps extends TextInputProps {
  title: string;
  required?: boolean;
}

const TextInputWithLabel = ({
  title,
  required,
  ...rest
}: TextInputWithLabelProps) => {
  return (
    <TextInputContainer>
      <Title>
        {title}
        {required && <Required>*</Required>}
      </Title>

      <TextInput {...rest} />
    </TextInputContainer>
  );
};

export default TextInputWithLabel;
