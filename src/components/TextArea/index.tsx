import React from 'react';

import { TextInputLabel } from '@components/TextInput/index.styles';
import { Required } from '@components/TextInputWithLabel/index.styles';

import { Box } from './index.styles';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
  label?: string;
  required?: boolean;
  inputPadding?: string;
  overflow?: string;
}

const TextArea = ({
  value,
  onChange,
  rows = 5,
  placeholder,
  label,
  inputPadding = '16px',
  overflow = 'auto',
  required = false,
  ...rest
}: TextAreaProps) => {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <TextInputLabel>
          {label}
          {required && <Required>*</Required>}
        </TextInputLabel>
      )}
      <Box inputPadding={inputPadding} overflow={overflow}>
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          {...rest}
        />
      </Box>
    </div>
  );
};

export default TextArea;
