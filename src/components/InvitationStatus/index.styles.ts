import styled from '@emotion/styled';

export const InvitationStatusContainer = styled.div``;

export const InvitationNotice = styled.div`
  background: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-bottom: 1px solid var(--gray-500);
  font-size: 15px;
  font-weight: var(--normal);
  color: var(--gray-650);
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
