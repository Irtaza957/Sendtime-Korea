import styled from '@emotion/styled';

export const MoreMenuContents = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 8px;
  width: 150px;
  position: absolute;
  right: 0;
  box-shadow: 0 4px 20px 0 #75879540;
  z-index: var(--front);

  button:not(:last-of-type) {
    border-bottom: 1px solid var(--gray-300);
  }
  transform: translate(-30%, 25%);

  &:hover {
    overflow: hidden;
  }
`;
