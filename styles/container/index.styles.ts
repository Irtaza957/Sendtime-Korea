import styled from '@emotion/styled';

export const FlexBox = styled.div<{
  gap?: number;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  margin?: string;
  padding?: string;
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  gap: ${({ gap }) => `${gap}px`};
  margin: ${({ margin }) => `${margin}`};
  padding: ${({ padding }) => `${padding}`};
  width: 100%;
`;

export const BlockBox = styled(FlexBox)`
  flex-direction: column;
`;
