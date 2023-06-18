import styled from '@emotion/styled';

export const ModalCoverContainer = styled.div`
  width: 100%;
  position: relative;
  min-width: 320px;

  & > div {
    min-height: 320px;
    max-height: 320px;
    overflow: hidden;
  }
`;

export const CoverTitle = styled.h1`
  width: 100%;
  white-space: pre-line;
  text-align: center;
  color: var(--gray-750);
  font-weight: var(--semi-bold);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: fit-content;
`;
