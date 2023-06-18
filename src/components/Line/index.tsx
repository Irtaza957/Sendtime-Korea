import React from 'react';

import { Border, BorderContainer } from './index.styles';

interface LineProps {
  margin?: string;
  padding?: string;
}

const Line = ({ margin = '10px 0', padding = '0' }: LineProps) => {
  return (
    <BorderContainer margin={margin} padding={padding}>
      <Border />
    </BorderContainer>
  );
};

export default Line;
