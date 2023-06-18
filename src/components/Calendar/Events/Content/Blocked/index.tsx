import React from 'react';

import { BlockedButton, DeleteButton } from '@components/Calendar/index.styles';
import { XIcon } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

interface BlockedProps {
  time: string;
  is15Min: boolean;
  onDelete: () => void;
}

const Blocked = ({ time, is15Min, onDelete }: BlockedProps) => {
  return (
    <BlockedButton data-blocked="true" className="blocked-schedule">
      {time}
      <DeleteButton is15Min={is15Min} onClick={onDelete}>
        <CustomIcon
          size={16}
          scale={0.85}
          viewBox="1 1 14 14"
          fill="gray-100"
          stroke="gray-700"
        >
          <XIcon />
        </CustomIcon>
      </DeleteButton>
    </BlockedButton>
  );
};

export default Blocked;
