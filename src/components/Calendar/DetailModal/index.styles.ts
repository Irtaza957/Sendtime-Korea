import styled from '@emotion/styled';

export const DetailModalContainer = styled.div<{
  shadowed: boolean;
  isAbsolute: boolean;
  position: { x: number; y: number };
}>`
  position: ${({ isAbsolute }) => (isAbsolute ? 'absolute' : 'relative')};
  left: ${({ isAbsolute, position }) => isAbsolute && `${position.x}px`};
  top: ${({ isAbsolute, position }) => isAbsolute && `${position.y}px`};
  min-height: 185px;
  min-width: 260px;
  background: var(--white);
  border-radius: 3px;
  padding: 14px 14px 16px 14px;
  box-shadow: ${({ shadowed }) =>
    shadowed && '0px 2.4px 8.9px var(--gray-500)'};
  z-index: var(--modal-front);
  max-width: 300px;
`;

export const DetailModalNavigation = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 6px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: var(--regular);
  color: var(--gray-750);
  margin-bottom: 4px;
`;

export const Time = styled.h3`
  font-size: 11px;
  color: var(--gray-700);
`;

export const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid var(--gray-400);
  margin: 10px 0 15px 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
`;

export const IconWrapper = styled.div<{ minWidth: number }>`
  min-width: ${({ minWidth }) => minWidth && minWidth}px;
`;
