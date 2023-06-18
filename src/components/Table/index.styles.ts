import styled from '@emotion/styled';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-top: 1px solid var(--gray-550);
  border-bottom: 0.5px solid var(--gray-550);
  color: var(--gray-800);

  @media (max-width: 768px) {
    * {
      font-size: 12px;
    }
  }
`;

export const TableHead = styled.thead`
  font-weight: var(--normal);
  border-bottom: 1px solid var(--gray-550);
`;

export const TableHeadSection = styled.th<{ width?: number }>`
  display: flex;
  width: ${({ width }) => (width ? width : '100%')};
  gap: 4px;
  font-weight: var(--regular);
  color: var(--gray-800);
`;

export const TableSection = styled.span<{ width?: number }>`
  display: inline-flex;
  width: ${({ width }) => (width ? width : '100%')};
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

export const TableRow = styled.tr<{ nth?: number; cell?: boolean }>`
  display: flex;
  padding: 16px;
  font-size: 14px;
  font-weight: var(--normal);
  gap: 15px;
  cursor: pointer;

  span {
    color: var(--gray-800);

    &:first-of-type {
      font-weight: var(--regular);
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  ${({ cell }) =>
    cell &&
    `
    &:hover {
      background-color: var(--gray-100);
    }`}
`;

export const TableBody = styled.tbody`
  background: var(--white);

  tr {
    border-bottom: 1px solid var(--gray-300);
    gap: 15px;

    &:last-child {
      border-bottom: none;
    }
  }
`;
