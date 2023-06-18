import styled from '@emotion/styled';

export const TeamManageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const TableContainer = styled.div`
  margin-top: 25px;
  width: 100%;
`;

export const SortableHeaderSpan = styled.span`
  display: flex;
  gap: 5px;
  cursor: pointer;

  &:hover {
    margin: -5px;
    background: var(--gray-200);
    padding: 5px;
    border-radius: 8px;
  }
`;

export const TitleMain = styled.span`
  margin-left: 5px;
`;

export const GroupListTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  button {
    margin: 0 0 0 auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);

    button {
      margin-right: 10px;
    }
  }
`;

export const GroupTitle = styled.div`
  color: inherit;
  grid-column-start: 1;

  @media (max-width: 768px) {
    grid-column-start: 2;
  }
`;
