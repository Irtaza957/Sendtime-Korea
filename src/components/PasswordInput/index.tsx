import React, { useState } from 'react';

import { EyesClosed, EyesOpened } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import TextInput, { TextInputProps } from '../TextInput';

const PasswordInput = ({ value, onChange, ...rest }: TextInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevValue) => !prevValue);
  };

  return (
    <TextInput
      type={isPasswordVisible ? 'text' : 'password'}
      buttonContent={
        <CustomIcon
          viewBox={!isPasswordVisible ? '0 2 20 15' : '0 0 20 12'}
          size={20}
          height={!isPasswordVisible ? 15 : 12}
          fill="gray-700"
          stroke="none"
        >
          {!isPasswordVisible ? <EyesClosed /> : <EyesOpened />}
        </CustomIcon>
      }
      onClickButton={togglePasswordVisibility}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default PasswordInput;
