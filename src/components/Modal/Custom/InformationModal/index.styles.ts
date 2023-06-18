import styled from '@emotion/styled';

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-800-70);
  z-index: var(--very-front);
  overflow: hidden;
  position: fixed;
  animation: opacity 0.3s ease-in-out forwards;

  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const ModalContainer = styled.div`
  background-color: var(--white);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: scroll;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: scale 0.3s ease-in-out forwards;

  &::-webkit-scrollbar {
    width: 0;
  }

  @keyframes scale {
    0% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.8rem 0;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;

export const Title = styled.div`
  color: black;
  text-align: center;
  width: 100%;
`;

export const Icon = styled.div`
  font-size: 1em;
  font-weight: 500;
  margin-right: 3px;
  cursor: pointer;
  color: black;
`;

export const ModalContent = styled.div`
  padding: 1.2rem;
`;

export const InfoText = styled.div`
  color: var(--gray-650);
  font-weight: 500;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.2rem 0.8rem 1.2rem;
  display: flex;
  justify-content: center;
  gap: 12px;
`;
