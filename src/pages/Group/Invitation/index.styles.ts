import styled from '@emotion/styled';

export const GroupInvitationContainer = styled.div`
  max-width: 1000px;
`;

export const InvitationContainer = styled.div`
  border-radius: 8px;
`;

export const PeopleContainer = styled.div`
  min-height: 300px;
  max-height: 300px;
  overflow: auto;
  max-width: 580px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  button {
    display: flex;
    gap: 5px;
  }
`;

export const InvitationTitle = styled.div`
  font-size: 15px;
  color: var(--gray-700);
`;

export const GapBox = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => `${gap ? gap : 0}px`};
`;

export const InviteTitleArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--gray-600);
`;
