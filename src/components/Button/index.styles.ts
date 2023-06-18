import styled from '@emotion/styled';

const AnimatedOuter = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-width: fit-content;
`;

const AnimatedBorder = styled.div<{ animated: boolean }>`
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  pointer-events: none;
  ${({ animated }) => animated && 'animation: pulse 1.5s infinite;'}
`;

const Button = styled.button<{
  size: string;
  bgColor: string;
  borderRadius?: number;
  padding?: string;
  width?: string;
  withBorder?: boolean;
  color?: string;
  borderColor?: string;
  align?: string;
  fontSize?: string;
  boxShadow?: string;
  hover?: boolean;
}>`
  background-color: ${({ bgColor }) => `var(--${bgColor})`};
  border-radius: ${({ borderRadius }) =>
    `${borderRadius ? borderRadius : 6}px`};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  min-width: fit-content;
  padding: ${({ padding }) => (padding ? padding : '10px 20px')};
  width: ${({ width }) => (width ? `${width}` : 'fit-content')};
  align-self: ${({ align }) => align && align};
  gap: 2px;
  box-shadow: ${({ boxShadow }) => boxShadow && boxShadow};
  border: ${({ withBorder, borderColor }) =>
    withBorder
      ? `1px solid var(--${borderColor ? borderColor : 'gray-300'})`
      : 'none'};

  &,
  & * {
    color: ${({ color }) => `var(--${color})`};
  }

  &:disabled {
    background-color: var(--gray-200);
    border-color: var(--gray-200);
    cursor: default;
  }

  &:not(:disabled):active {
    box-shadow: inset 0px 0px
      ${({ bgColor }) =>
        bgColor === 'white'
          ? '5px 2px var(--purple-100)'
          : '6px 0px #454545b8'};
    fill: ${({ color }) => `var(--${color})`};
  }

  &:not(:disabled):hover {
    ${({ bgColor, hover }) => {
      if (hover) {
        if (bgColor === 'white') {
          return `
              background: var(--purple-100-50); 
              border-color: var(--purple-500); 
  
              * {
                color: var(--purple-500);
              }
              `;
        }
        return `filter: brightness(0.85);`;
      }
    }}
  }

  ${({ size }) => {
    if (size === 'small') {
      return `
        padding: 6px 16px;
      `;
    } else if (size === 'medium') {
      return `
        padding: 10px 20px;
      `;
    } else if (size === 'big') {
      return `
        font-size: 16px;
        padding: 20px 38px;
        border-radius: 12px;
      `;
    }
  }};

  /* size를 override 하고싶을 때에 사용 */
  padding: ${({ padding }) => padding};
`;

export { AnimatedBorder, AnimatedOuter, Button };
