import styled from '@emotion/styled';

const Box = styled.div<{ inputPadding: string; overflow: string }>`
  border-radius: 5px;
  border: 1px solid var(--gray-300);
  overflow: hidden;
  width: 100%;
  background: var(--white);

  textarea {
    width: 100%;
    height: 100%;
    padding: ${({ inputPadding }) =>
      inputPadding ? `${inputPadding}` : '16px'};
    font-size: 14px;
    resize: none;
    overflow: ${({ overflow }) => (overflow ? `${overflow}` : 'auto')};

    &::placeholder {
      color: var(--gray-800-30);
    }
  }
`;

export { Box };
