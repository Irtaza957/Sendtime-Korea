import styled from '@emotion/styled';

const Box = styled.div`
  position: relative;
  width: 100%;

  input[type='text'] {
    cursor: pointer;
    width: 92%;
    text-overflow: ellipsis;
  }
`;

const IconBox = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
`;

export { Box, IconBox };
