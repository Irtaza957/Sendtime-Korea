import React, { MouseEvent } from 'react';

import { ToggleButtonInner, ToggleButtonOuter } from './index.styles';

interface ToggleButtonProps {
  onClick?: (e: MouseEvent<any>) => void;
  active: boolean;
}

const ToggleButton = ({ onClick, active }: ToggleButtonProps) => {
  return (
    <ToggleButtonOuter onClick={onClick} active={active}>
      <ToggleButtonInner active={active} />
    </ToggleButtonOuter>
  );
};

export default ToggleButton;
