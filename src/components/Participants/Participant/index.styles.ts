import styled from '@emotion/styled';

export const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px 20px 15px;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(166, 181, 198, 0.25);
  border: 1px solid var(--white);
  background: var(--white);
  page-break-inside: avoid;
  break-inside: avoid-column;
  cursor: pointer;

  &:hover {
    border-color: var(--gray-200);
    box-shadow: 0 3px 15px rgba(154, 169, 186, 0.5);
  }
`;

export const Profile = styled.div<{ color: string }>`
  max-width: 30px;
  max-height: 30px;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const ProfileName = styled.span`
  color: var(--gray-800);
  font-weight: var(--semi-bold);
`;

export const MyProfile = styled.div`
  display: flex;
`;

export const DetailInfo = styled.span`
  display: inline-block;
  background: var(--gray-200);
  border-radius: 10px;
  color: var(--gray-700);
  font-size: 10px;
  padding: 3px 6px;
  font-weight: var(--semi-bold);
`;

export const NameField = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
`;

export const Fields = styled.div<{ paddingLeft?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: ${({ paddingLeft }) => `${paddingLeft ?? 40}px`};
  gap: 2px;
  width: 100%;
  transition: visibility 500ms cubic-bezier(1, 0, 0.2, 1),
    max-height 500ms cubic-bezier(1, 0, 0.2, 1),
    opacity 500ms cubic-bezier(0.57, -0.45, 0.34, 1.24);

  &.show {
    visibility: visible;
    opacity: 1;
    max-height: 300px;
  }

  &.hide {
    visibility: hidden;
    opacity: 0;
    margin-top: 0;
    max-height: 0px;
  }
`;

export const Field = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 5px;

  &:not(:first-of-type) {
    margin-top: 5px;
  }
`;

export const Message = styled.div`
  padding: 10px;
  background: var(--gray-100);
  font-size: 13px;
  border-radius: 12px;
  line-height: 1.5;
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
`;

export const BottomField = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  padding: 0 12px;
`;

export const Category = styled.span`
  display: inline-block;
  color: var(--gray-600);
`;

export const InvitationButton = styled.button`
  background: var(--white);
  color: var(--gray-650);
  border: 1px solid var(--gray-650);
  width: fit-content;
  padding: 5px 8px;
  border-radius: 5px;
  align-self: end;

  &:hover {
    background: rgba(219, 219, 220, 0.5);
  }
`;
