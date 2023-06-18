import React, { useEffect, useRef } from 'react';

import { ModalContent } from '@pages/Group/Manage/MoreButtonWithModal';
import { Content } from '@pages/Group/Manage/MoreButtonWithModal/index.styles';

import { MoreMenuContents } from './index.styles';

interface MoreMenuProps {
  modalContents: ModalContent[];
  teamId: string;
  close?: () => void;
}

const MoreMenu = ({ modalContents, teamId, close }: MoreMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <MoreMenuContents>
      {(modalContents ?? []).map(
        ({ content, onClickContent, alert, disabled }, idx) => (
          <Content
            key={idx}
            ref={buttonRef}
            onBlur={() => close?.()}
            tabIndex={-1}
            onMouseDown={(e) => {
              e.stopPropagation();
              onClickContent(teamId);
            }}
            alert={alert}
            disabled={disabled}
          >
            {content}
          </Content>
        )
      )}
    </MoreMenuContents>
  );
};

export default MoreMenu;
