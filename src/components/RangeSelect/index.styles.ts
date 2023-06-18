import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > div:nth-of-type(1),
  & > div:nth-of-type(3) {
    width: 48%;
  }

  & > div:nth-of-type(2) {
    width: 4%;
  }
`;

export { Wrapper };
