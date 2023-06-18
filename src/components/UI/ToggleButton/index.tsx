import React, { MouseEvent } from 'react';

import * as Styled from './index.styles';

interface ToggleButtonProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  active: boolean;
}

const ToggleButton = ({ onClick, active }: ToggleButtonProps) => {
  return (
    <Styled.ToggleButtonOuter onClick={onClick} active={active}>
      <Styled.ToggleButtonInner active={active} />
    </Styled.ToggleButtonOuter>
  );
};

export default ToggleButton;
