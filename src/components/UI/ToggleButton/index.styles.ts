import styled from '@emotion/styled';

export const ToggleButtonOuter = styled.div<{
  active: boolean;
  width?: number;
  height?: number;
  borderRadius?: string;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
}>`
  width: ${({ width }) => (width ? `${width}px` : '40px')};
  height: ${({ height }) => (height ? `${height}px` : '20px')};
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  ${({ active }) =>
    active ? 'background: var(--purple-500);' : 'background: #F0EFFA;'}
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '15px'};
  cursor: pointer;
  position: relative;
  transition: all 0.1s cubic-bezier(0, 1.15, 1, 1);
`;

export const ToggleButtonInner = styled.div<{
  active: boolean;
  width?: number;
  height?: number;
  borderRadius?: string;
}>`
  width: ${({ width }) => (width ? `${width}px` : '16px')};
  height: ${({ height }) => (height ? `${height}px` : '16px')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '50%')};
  ${({ active }) =>
    active ? 'background: var(--white);' : 'background: #E0DEF5;'}
  position: absolute;
  left: ${({ active }) => `${active ? 22 : 2}px`};
  transition: all 0.1s cubic-bezier(0, 1.15, 1, 1);
`;
