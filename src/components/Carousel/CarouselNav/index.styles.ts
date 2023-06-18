import styled from '@emotion/styled';

export const CarouselNavContainer = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 8px;
  padding: 20px 0;
`;

export const NavButton = styled.button<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  background: var(--gray-300);
  border-radius: 50%;

  &:hover {
    background: var(--purple-500);
  }

  ${({ active }) =>
    active &&
    `
    background: var(--purple-500);
  `}
`;
