import React, {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { ModalDimmedContainer } from '@components/Modal/index.styles';

interface ModalProps {
  isModalOpen?: boolean;
  openModal: (children: ReactNode) => void;
  closeModal: () => void;
}

const defaultValue: ModalProps = {
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalProps>(defaultValue);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState<ReactNode>(<></>);

  const openModal = (children: ReactNode) => {
    setIsModalOpen(true);
    setModalContents(children);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onDimmerClick = (event: MouseEvent) => {
    if (event.currentTarget !== event.target) return;

    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}

      {isModalOpen && (
        <ModalDimmedContainer onClick={onDimmerClick}>
          {modalContents}
        </ModalDimmedContainer>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalProps => {
  return useContext<ModalProps>(ModalContext);
};

export default ModalProvider;
