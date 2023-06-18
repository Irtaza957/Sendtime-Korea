import styled from '@emotion/styled';

export const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const CheckboxWrapper = styled.div<{
  checked: boolean;
  width?: number;
  height?: number;
  borderRadius?: string;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
}>`
  width: ${({ width }) => (width ? `${width}px` : '20px')};
  height: ${({ height }) => (height ? `${height}px` : '20px')};
  min-width: 20px;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '3px')};
  border: 1px solid var(--purple-100);
  background: ${({ checked }) =>
    `var(--${checked ? 'purple-500' : '#E0DEF5'})`};
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
`;

export const ContentContainer = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  word-break: break-all;
  font-size: 14px;
`;
