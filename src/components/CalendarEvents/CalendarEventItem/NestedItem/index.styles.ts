import styled from '@emotion/styled';

export const NestedItemContainer = styled.div<{ isActive?: boolean }>`
  margin-left: 30px;
  width: calc(100% - 30px);
  border-left: 10px solid var(--gray-300);
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: var(--white);

  border-bottom: 1px solid var(--gray-400);

  :not(:disabled):hover {
    ${({ isActive }) =>
      isActive &&
      `background: var(--gray-100);
      cursor: pointer;
    `}
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;
