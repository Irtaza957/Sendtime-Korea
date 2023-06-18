import React, { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';

import { More } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { ModalDefault } from '..';

import {
  Content,
  MoreButton,
  MoreButtonContainer,
  MoreModalContents,
} from './index.styles';

export type ModalContent = {
  content: ReactNode;
  onClickContent: (data: any) => void;
  alert?: boolean;
  disabled?: boolean;
};

interface MoreButtonWithModalProps {
  modalIdx: number;
  modalContents?: ModalContent[];
  targetId: string;
  modalDefault: ModalDefault[];
  setModalDefault: Dispatch<SetStateAction<ModalDefault[]>>;
}

const MoreButtonWithModal = ({
  modalIdx,
  modalContents,
  targetId,
  modalDefault,
  setModalDefault,
}: MoreButtonWithModalProps) => {
  const handleMoreClick = (id: number) => {
    setModalDefault((prevState) => {
      const target = prevState.find((p) => p.id === id);
      const targetArray = prevState.map((s, idx) => ({
        ...s,
        checked: target?.checked ? !target.checked : idx === id,
      }));

      return targetArray;
    });
  };

  const handleMoreButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    handleMoreClick(id);
  };

  return (
    <MoreButtonContainer>
      <MoreButton onClick={(e) => handleMoreButtonClick(e, modalIdx)}>
        <CustomIcon
          size={30}
          height={30}
          viewBox="0 0 30 30"
          fill="none"
          stroke="gray-750"
        >
          <More />
        </CustomIcon>
      </MoreButton>
      {modalDefault[modalIdx]?.checked && (
        <MoreModalContents>
          {(modalContents ?? []).map(
            ({ content, onClickContent, alert, disabled }, idx) => (
              <Content
                key={idx}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onClickContent(targetId);
                }}
                alert={alert}
                disabled={disabled}
              >
                {content}
              </Content>
            )
          )}
        </MoreModalContents>
      )}
    </MoreButtonContainer>
  );
};

export default MoreButtonWithModal;
