import React from 'react';

import SelectTextInput, { TextInputProps } from '@components/SelectTextInput';

import { SmallSelectTextInputBox } from './index.styles';

const SmallSelectTextInput = ({ ...rest }: TextInputProps) => {
  return (
    <SmallSelectTextInputBox>
      <SelectTextInput {...rest} />
    </SmallSelectTextInputBox>
  );
};

export default SmallSelectTextInput;
