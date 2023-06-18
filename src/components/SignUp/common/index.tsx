import React from 'react';

import StyledButton, { StyledButtonProps } from '@components/Button';

export const PrimaryButton = ({ children, ...props }: StyledButtonProps) => {
  return (
    <StyledButton
      {...props}
      width="100%"
      type="submit"
      padding="16px"
      borderRadius={5}
    >
      {children}
    </StyledButton>
  );
};
