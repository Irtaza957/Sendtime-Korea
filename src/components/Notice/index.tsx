import React, { useState } from 'react';

import { DownArrow, NoticeIcon, UpArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { Content, Left, MoreButton, NoticeContainer } from './index.styles';

interface NoticeProps {
  content: string;
}

const Notice = ({ content }: NoticeProps) => {
  const [open, setOpen] = useState(false);

  const handleMore = () => {
    setOpen((prev) => !prev);
  };

  return (
    <NoticeContainer open={open}>
      <Left open={open}>
        <CustomIcon size={21} height={19} fill="gray-700" stroke="none">
          <NoticeIcon />
        </CustomIcon>
        <Content open={open}>{content}</Content>
      </Left>

      <MoreButton onClick={handleMore}>
        {open ? 'ㅤ접기' : '더보기'}
        <CustomIcon
          size={20}
          height={25}
          fill="none"
          stroke="gray-700"
          viewBox="0 0 15 5"
        >
          {open ? <UpArrow /> : <DownArrow />}
        </CustomIcon>
      </MoreButton>
    </NoticeContainer>
  );
};

export default Notice;
