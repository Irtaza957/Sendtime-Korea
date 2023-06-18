import React from 'react';

import { contentWithEnter } from '@utils/content';

import StyledButton from '../Button';

import {
  Box,
  ContentLine,
  MiniConfirmModalContainer,
  ModalContent,
  Wrapper,
} from './index.styles';

interface MiniConfirmModalProps {
  content: string;
  buttonText?: string;
  onCloseClick?: () => void;
  onConfirmClick: () => void;
}

const MiniConfirmModal = ({
  content,
  onConfirmClick,
  onCloseClick,
  buttonText = '확인',
}: MiniConfirmModalProps) => {
  return (
    <MiniConfirmModalContainer>
      <Wrapper>
        <ModalContent>
          {contentWithEnter(content).map((content, idx) => (
            <ContentLine key={idx}>{content}</ContentLine>
          ))}
        </ModalContent>
      </Wrapper>

      <Box flex gap={10}>
        {onCloseClick && (
          <StyledButton
            padding="10px 25px"
            onClickButton={onCloseClick}
            borderColor="gray-600"
            bgColor="white"
            color="gray-800"
            withBorder
          >
            닫기
          </StyledButton>
        )}
        <StyledButton
          padding="10px 25px"
          onClickButton={onConfirmClick}
          bgColor="gray-600"
        >
          {buttonText}
        </StyledButton>
      </Box>
    </MiniConfirmModalContainer>
  );
};

export default MiniConfirmModal;
