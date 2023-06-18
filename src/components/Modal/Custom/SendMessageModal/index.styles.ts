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
  max-width: 450px;
  width: 100%;
  max-height: 80vh;
  overflow-y: scroll;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

  @media only screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: unset;
    height: calc(100vh - 64px);
    max-height: unset;
    animation: slide 0.3s ease-in-out forwards;
  }

  @keyframes slide {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

export const InnerContainer = styled.div``;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  font-weight: 700;
  color: var(--gray-800);
  border-bottom: 1px solid var(--gray-500);
`;

export const Title = styled.div``;

export const Icon = styled.div`
  font-size: 1.4em;
  font-weight: 500;
  margin-right: 3px;
  cursor: pointer;
`;

export const ModalBody = styled.div``;

export const ModalTopSection = styled.div`
  border-bottom: 1px solid var(--gray-500);
  padding: 1.2rem 1rem;
`;

export const ModalBottomSection = styled.div`
  padding: 1.2rem 1rem;
`;

export const InfoText = styled.div`
  text-align: center;
  color: var(--gray-650);
  font-weight: 500;
`;

export const ReceiverInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  color: var(--gray-800);
  margin: 1.2rem 0 0;
`;

export const UserTitle = styled.div`
  background-color: var(--gray-100);
  padding: 0.5em 0.7em;
  border-radius: 1rem;
  width: max-content;
  color: var(--gray-750);
  font-size: 14px;
`;

export const Label = styled.p`
  font-weight: 500;
  color: var(--gray-800);
`;

export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const TextLength = styled.p`
  font-weight: 500;
  color: var(--gray-300);
`;

export const Text = styled.p<{ width?: string }>`
  font-weight: 500;
  color: var(--gray-650);
  max-width: ${({ width }) => (width ? width : 'auto')};
  width: 100%;
  text-align: center;
  line-height: 26px;
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UnorderedListItem = styled.li`
  width: max-content;
  list-style-type: disc;
`;

export const TextArea = styled.textarea`
  border: 1px solid var(--gray-300);
  padding: 12px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  resize: none;
  height: 125px;

  &::placeholder {
    color: #8f98a3;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3px;
  margin: 2rem 0 0.5rem;
`;

export const Button = styled.button<{
  bgColor?: string;
  width?: string;
  color?: string;
}>`
  padding: 14px 6px;
  border-radius: 4px;
  color: ${({ color }) => (color ? color : 'white')};
  width: ${({ width }) => (width ? width : 'max-content')};
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : 'var(--purple-500)'};
  font-size: 14px;
  font-weight: 600;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  gap: 8px;
`;
