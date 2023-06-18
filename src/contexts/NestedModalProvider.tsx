import React, {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';

import DefaultModal from '@components/Modal/DefaultModal';
import { ModalDimmedContainer } from '@components/Modal/index.styles';

type StandardizedModalType = 'confirm' | 'delete' | 'alert';

export type StandardizedModalStackType = {
  id: string;
  type?: StandardizedModalType;
  title?: ReactNode;
  description: ReactNode;
  blockDimmerClick?: boolean;
  onDimmerClick?: () => void;
  buttonText?: {
    confirm?: string;
    alert?: string;
    delete?: string;
    oneButton?: string;
  };
  onClose: () => void;
  callback: (isConfirmed: boolean) => void;
};

type CustomModalStackType = {
  id: string;
  type?: 'custom';
  blockDimmerClick?: boolean;
  onDimmerClick?: () => void;
  customModal: ReactNode;
};

type ModalType = StandardizedModalStackType | CustomModalStackType;

interface ModalProps {
  modalStacks: ModalType[];
  addModal: (modal: ModalType) => void;
  removeModal: (id: string) => void;
  blockDimmerClick?: boolean;
}

const defaultValue: ModalProps = {
  modalStacks: [],
  addModal: () => {},
  removeModal: () => {},
};

const ModalContext = createContext<ModalProps>(defaultValue);

const NestedModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalStacks, setModalStacks] = useState<ModalType[]>([]);

  const handleAddModal = (modalNode: ModalType) => {
    setModalStacks((prevStates) => [...prevStates, modalNode]);
  };

  const handleRemoveModal = (targetId: string) => {
    setModalStacks((prevStates) =>
      prevStates.filter(({ id }) => id !== targetId)
    );
  };

  const handleDimmerClick = (
    event: MouseEvent<HTMLElement>,
    id: string,
    onDimmerClick?: () => void
  ) => {
    if (event.currentTarget !== event.target) return;

    handleRemoveModal(id);
    onDimmerClick?.();
  };

  const handleClickDimmedContainer = (
    e: MouseEvent<HTMLElement>,
    id: string,
    blockDimmerClick?: boolean,
    onDimmerClick?: () => void
  ) => {
    if (blockDimmerClick) return;
    handleDimmerClick(e, id, onDimmerClick); ///temporarey changes
  };

  return (
    <ModalContext.Provider
      value={{
        modalStacks,
        addModal: handleAddModal,
        removeModal: handleRemoveModal,
      }}
    >
      {children}
      {modalStacks.map((modal) => {
        if (!('customModal' in modal)) {
          const {
            id,
            callback,
            onClose,
            blockDimmerClick,
            onDimmerClick,
            ...rest
          } = modal;

          return (
            <ModalDimmedContainer
              key={id}
              onClick={(e) =>
                handleClickDimmedContainer(
                  e,
                  id,
                  blockDimmerClick,
                  onDimmerClick
                )
              }
            >
              {/* 여기는 사용하는 쪽에서 뭘 눌렀는지 알 수 있게 해줌 true or false */}
              <DefaultModal
                onSuccess={() => callback(true)}
                onClose={onClose}
                {...rest}
              />
            </ModalDimmedContainer>
          );
        }

        const { id, blockDimmerClick, customModal, onDimmerClick } = modal;
        return (
          <ModalDimmedContainer
            key={id}
            onClick={(e) =>
              handleClickDimmedContainer(e, id, blockDimmerClick, onDimmerClick)
            }
          >
            {customModal}
          </ModalDimmedContainer>
        );
      })}
    </ModalContext.Provider>
  );
};

export const useNestedModal = ({
  type = 'confirm',
  title,
  description,
  buttonText,
  customModal,
  blockDimmerClick = false,
  onDimmerClick,
  onCancelClick,
}: {
  type: StandardizedModalStackType['type'] | CustomModalStackType['type'];
  title?: ReactNode;
  description?: ReactNode;
  customModal?: ReactNode;
  blockDimmerClick?: boolean;
  onDimmerClick?: () => void;
  onCancelClick?: () => void;
  buttonText?: {
    confirm?: string;
    alert?: string;
    delete?: string;
  };
}) => {
  const { addModal, removeModal } = useContext<ModalProps>(ModalContext);
  const resolveRef = useRef<(value?: unknown) => void>(() => {});

  const id = useMemo(nanoid, []);

  const showModal = (checkValid?: (data: any) => Promise<boolean>) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;

      if (type !== 'custom') {
        addModal({
          id,
          type,
          title,
          description,
          blockDimmerClick,
          onDimmerClick,
          onClose: () => {
            onCancelClick?.();
            hideModal();
          },
          buttonText: buttonText,
          callback: async (isConfirmed) => {
            /* Modal에서 무언가를 받아서 Validate 하려고 할 때에 사용 */
            const isValidated = await checkValid?.(isConfirmed);
            if (isValidated || !checkValid) resolve(isConfirmed);
          },
        });
      }

      if (type === 'custom' && customModal) {
        addModal({
          id,
          type,
          blockDimmerClick,
          onDimmerClick,
          customModal: customModal || <></>,
        });
      }
    });
  };

  const hideModal = () => {
    resolveRef.current(false);
    removeModal(id);
  };

  return { showModal, hideModal };
};

export default NestedModalProvider;
