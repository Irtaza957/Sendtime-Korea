import styled from '@emotion/styled';

export const GroupContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const GroupTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 45px);
  height: fit-content;
  color: inherit;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 20px;
  }
`;

export const GroupOpenPeriod = styled.span`
  border: 1px solid var(--gray-400);
  padding: 5px 10px;
  background: var(--gray-100);
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  min-width: fit-content;
`;
