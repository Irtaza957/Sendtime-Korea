import styled from '@emotion/styled';

export const AllDayModalContainer = styled.div<{
  position: { x: number; y: number };
}>`
  position: absolute;
  left: ${({ position }) => `${position.x}px`};
  top: ${({ position }) => `${position.y}px`};
  height: 520px;
  max-height: 520px;
  display: flex;
  flex-direction: column;
  min-width: 275px;
  background: var(--white);
  border-radius: 3px;
  box-shadow: 0px 2.4px 8.9px var(--gray-500);
  z-index: var(--modal-front);
  overflow: auto;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  border-top: 0.5px solid var(--gray-550);
`;

export const AllDayModalNavigation = styled.div`
  background-color: var(--gray-50);
  border-bottom: 0.5px solid var(--gray-550);
  width: 100%;
  min-height: 36px;
  height: 36px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: var(--regular);
  color: var(--gray-750);
`;
