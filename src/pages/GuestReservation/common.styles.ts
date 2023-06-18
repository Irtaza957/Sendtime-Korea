import styled from '@emotion/styled';

export const Box = styled.div<{ flex?: boolean; margin?: string }>`
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  gap: 20px;
  width: 100%;
  margin: ${({ margin }) => (margin ? margin : '')};
  & > div {
    margin-bottom: 8px;
    & > div > div {
      padding: 2px 0;
      & input {
        padding: 10px 0 10px 10px;
      }
    }
  }

  @media (max-width: 1280px) {
    display: block;

    & > div {
      display: block;

      h3 {
        justify-content: flex-start;
      }
    }
  }
`;

export const Width = styled(Box)`
  width: 100%;
`;

export const GridBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px 20px;
`;
