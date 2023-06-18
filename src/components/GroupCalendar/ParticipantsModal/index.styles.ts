import styled from '@emotion/styled';

export const GroupNavContainer = styled.div`
  position: relative;
`;

export const ParticipantsContainer = styled.div`
  width: 370px;
  min-height: 250px;
  position: absolute;
  right: 0;
  bottom: -315px;
  z-index: var(--front);
  border-radius: 8px;
  background: var(--white);
  border: 1px solid var(--gray-200);
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 20px 0px #75879525;
`;

export const NonParticipantsContainer = styled(ParticipantsContainer)`
  width: 435px;
  min-height: 90px;
  bottom: -155px;
`;

export const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: var(--regular);
  margin-bottom: 10px;
  color: var(--gray-750);
`;

export const ModalContents = styled.div`
  font-size: 12px;
  font-weight: var(--normal);
  line-height: 1.6;
  color: var(--gray-600);
  margin-bottom: 10px;
`;

export const NonModalTitle = styled(ModalTitle)`
  margin-bottom: 0;
`;

export const NonModalContents = styled(ModalContents)`
  margin-bottom: 0;
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  gap: 8px;
  font-size: 13px;
`;

export const Dot = styled.span<{ color?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background: ${({ color }) => color || 'var(--gray-200'};
  margin-right: 4px;
  flex-shrink: 0;
`;

export const Participant = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  padding: 5px;
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  max-width: 150px;
  display: inline-block;
  overflow: hidden;
`;

export const Participants = styled.div`
  overflow: auto;
  max-height: 70px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(2, minmax(30px, 1fr));
`;
