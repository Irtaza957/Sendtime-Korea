import styled from '@emotion/styled';

export const NoData = styled.div<{ borderTop?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  gap: 20px;
  height: 70vh;
  width: 100%;
  ${({ borderTop }) => borderTop && 'border-top: 1px solid var(--gray-500)'}
`;

export const Content = styled.div`
  color: var(--gray-550);
  white-space: pre;
  text-align: center;
  line-height: 1.6;
`;
