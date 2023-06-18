import React from 'react';

import * as Styled from './index.styles';

interface SystemMaintainanceModalProps {
  title: string;
  description: string;
  closeModal?: () => void;
  children?: React.ReactNode;
}

const InformationModal = ({
  title,
  description,
  closeModal,
  children,
}: SystemMaintainanceModalProps) => {
  return (
    <Styled.ModalWrapper>
      <Styled.ModalContainer>
        <Styled.ModalHeader>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Icon onClick={closeModal}>&#10005;</Styled.Icon>
        </Styled.ModalHeader>
        <Styled.ModalContent>
          <Styled.InfoText>{description}</Styled.InfoText>
        </Styled.ModalContent>
        {children && <Styled.ModalFooter>{children}</Styled.ModalFooter>}
      </Styled.ModalContainer>
    </Styled.ModalWrapper>
  );
};

export default InformationModal;
