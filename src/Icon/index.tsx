import React from 'react';

import { IconContainer, IconWithInfo, Info } from './index.styles';

interface IIcon {
  size: number;
  fill: string;
  stroke: string;
  strokeWidth?: string;
  height?: number;
  info?: string;
  viewBox?: string;
  scale?: number;
  transformOrigin?: 'top' | 'left' | 'bottom' | 'right' | 'center';
  children: React.ReactNode;
  margin?: string;
}

const CustomIcon = ({
  size,
  height,
  fill,
  viewBox,
  stroke,
  strokeWidth = '1',
  info,
  scale = 1,
  transformOrigin = 'center',
  children,
  margin = '0px 0px 0px 0px',
}: IIcon) => {
  return (
    <IconWithInfo>
      <IconContainer
        width={size * scale}
        height={height ? height * scale : size * scale}
        viewBox={
          viewBox
            ? viewBox
            : `0 0 ${size * scale} ${height ? height * scale : size * scale}`
        }
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform={`scale(${scale}, ${scale})`}
        transformOrigin={transformOrigin}
        margin={margin}
      >
        {children}
      </IconContainer>
      <Info fill={fill} stroke={stroke}>
        {info}
      </Info>
    </IconWithInfo>
  );
};

export default CustomIcon;
