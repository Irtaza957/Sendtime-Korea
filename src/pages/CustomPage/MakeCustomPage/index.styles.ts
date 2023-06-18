import styled from '@emotion/styled';

export const MakeCustomPageContainer = styled.div`
  width: 100%;
  padding: 100px 0 50px 0;
  overflow: auto;
  height: 100%;

  h3 {
    min-width: fit-content;
  }

  > div {
    width: 100%;
  }
`;

export const Flex = styled.div<{ marginLeft?: number }>`
  display: flex;
  width: 100%;
  font-size: 14px;
  gap: 8px;

  label {
    display: inline-block;
    min-width: fit-content;
    margin-left: ${({ marginLeft }) => `${marginLeft || 36}px`};
  }
`;

export const InputContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
`;
