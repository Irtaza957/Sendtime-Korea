import styled from '@emotion/styled';
import { Content } from '@pages/Reservation/index.styles';

export const AddButtonWrapper = styled.div`
  position: sticky;
  border-radius: 100px;
  z-index: var(--one);
  top: 0;
  padding: 0 20px 0 20px;
`;

export const DraggableContainer = styled.div`
  padding: 12px 0;
`;

export const ModalDimmedContainer = styled.section`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--very-front);
  overflow: hidden;
  position: fixed;
`;

export const Modal = styled.div`
  z-index: var(--very-front);
`;

export const QuestionWrapper = styled(Content)`
  padding: 0;
  min-width: auto;
  padding: 0 20px 0 20px;
  overflow: visible;
`;

export const AddQuestionModal = styled(Modal)`
  position: absolute;
  top: 3rem;
  @media (min-width: 768px) {
    left: 1.6rem;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Backdrop = styled.div<{ isBackground?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--very-front);
  background-color: ${({ isBackground }) => !isBackground && '#d9d9d940'};
`;
