import styled from '@emotion/styled';

export const CodeBlock = styled.div`
  padding: 10px 20px;
  background: var(--gray-800);
  color: var(--white);
  width: 100%;
  font-size: 14px;
  font-family: 'Source Code Pro';
  white-space: pre;
  overflow-x: auto;
  max-width: 500px;

  &::-webkit-scrollbar-track {
    border-radius: 0;
  }
`;

export const PreviewBlock = styled.div`
  padding: 20px;
  background: var(--gray-50);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 16px;
  color: var(--gray-600);
`;
