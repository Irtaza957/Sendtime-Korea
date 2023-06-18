import styled from '@emotion/styled';

export const LeaveButtonSection = styled.section`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;
  padding-top: 80px;
  gap: 12px;

  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const LeaveButton = styled.button`
  color: var(--gray-600);
`;
