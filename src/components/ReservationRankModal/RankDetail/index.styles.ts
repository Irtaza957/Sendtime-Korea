import styled from '@emotion/styled';

export const RankDetailContainer = styled.div<{
  zIndex: number;
}>`
  min-width: 310px;
  background: var(--white);
  border-radius: 4px;
  border: 1px solid var(--gray-200);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 20px 0px #75879525;

  ${({ zIndex }) => zIndex && `z-index: ${100 - zIndex};`}
  position: absolute;
  transition: all 100ms ease-in;

  top: ${({ zIndex }) => `${zIndex * 50}px`};
`;

export const Bordered = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  border-left: 1px solid var(--gray-400);
`;
