import React, { MouseEvent, ReactNode } from 'react';

import { Icon } from '@iconify/react';

import { AnimatedBorder, AnimatedOuter, Button } from './index.styles';

type ButtonClickEvent = (event: MouseEvent<HTMLButtonElement>) => void;

export interface StyledButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  form?: string;
  size?: 'small' | 'medium' | 'big';
  padding?: string;
  bgColor?: string;
  color?: string;
  width?: string;
  borderRadius?: number;
  disabled?: boolean;
  withBorder?: boolean;
  borderColor?: string;
  align?: 'auto' | 'center' | 'end';
  onClickButton?: ButtonClickEvent;
  animated?: boolean;
  fontSize?: string;
  boxShadow?: string;
  hover?: boolean;
  icon?: {
    icon?: string;
    customIcon?: ReactNode;
    color?: string;
    width?: number;
  };
  [prop: string]: unknown;
}

const StyledButton = ({
  children,
  type = 'button',
  size = 'medium',
  padding,
  bgColor = 'purple-500',
  color = 'white',
  width,
  withBorder = false,
  disabled = false,
  borderRadius,
  borderColor,
  align = 'auto',
  onClickButton = () => {},
  animated = false,
  icon,
  fontSize,
  boxShadow,
  hover = true,
  ...rest
}: StyledButtonProps) => {
  return (
    <>
      {animated ? (
        <AnimatedOuter>
          <AnimatedBorder animated={animated} />
          <Button
            onClick={onClickButton}
            type={type}
            size={size}
            padding={padding}
            color={color}
            width={width}
            bgColor={bgColor}
            disabled={disabled}
            withBorder={withBorder}
            borderRadius={borderRadius}
            borderColor={borderColor}
            align={align}
            fontSize={fontSize}
            boxShadow={boxShadow}
            {...rest}
          >
            {children}
          </Button>
        </AnimatedOuter>
      ) : (
        <Button
          onClick={onClickButton}
          type={type}
          size={size}
          padding={padding}
          color={color}
          width={width}
          bgColor={bgColor}
          disabled={disabled}
          withBorder={withBorder}
          borderRadius={borderRadius}
          borderColor={borderColor}
          align={align}
          fontSize={fontSize}
          boxShadow={boxShadow}
          hover={hover}
          {...rest}
        >
          {icon && icon.icon && (
            <Icon icon={icon.icon} color={icon.color} width={icon.width} />
          )}
          {icon && icon.customIcon && <>{icon.customIcon}</>}
          {children}
        </Button>
      )}
    </>
  );
};

export default StyledButton;
