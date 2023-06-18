import React from 'react';

import * as Styled from './index.styles';

interface MultiStepProgressBarProps {
  currentProgress: number;
  maxProgress: number;
}

const MultiStepProgressBar = ({
  currentProgress,
  maxProgress,
}: MultiStepProgressBarProps) => {
  return (
    <Styled.Container>
      {Array.from({ length: maxProgress }).map((_, index) => (
        <Styled.Step
          key={index}
          isActive={currentProgress - 1 >= index}
          index={index}
        />
      ))}
    </Styled.Container>
  );
};

export default MultiStepProgressBar;
