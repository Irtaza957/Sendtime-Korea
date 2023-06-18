import styled from '@emotion/styled';

export const GroupParticipantContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 100px 0 50px 0;
  height: 100%;
`;

export const ParticipantsContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  border-radius: 10px;
  background: var(--white);
  width: 100%;
  padding: 30px 50px;
  gap: 12px;
  margin-bottom: 30px;
  position: relative;

  button:last-of-type {
    width: 80%;
    margin: 20px auto 0 auto;
  }
`;

export const HideButton = styled.button`
  display: flex;
  align-self: right;
  position: absolute;
  right: 25px;
  top: 20px;
  width: fit-content;
`;

export const MyInfoBox = styled.div<{ edit?: boolean }>`
  display: flex;
  ${({ edit }) =>
    edit &&
    `
    max-height: 300px;
    overflow: auto;
    `}
`;
