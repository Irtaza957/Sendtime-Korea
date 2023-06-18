import styled from '@emotion/styled';

export const DeleteContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
`;

export const Delete = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  gap: 20px;

  & > div {
    min-width: unset;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;
