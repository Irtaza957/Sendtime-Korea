import React, { ReactNode } from 'react';

import StyledButton from '@components/Button';
import { Calendar } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { Content, NoData } from './index.styles';

interface NoDataViewProps {
  icon?: ReactNode;
  content: string;
  buttonText?: ReactNode;
  borderTop?: boolean;
}

const EmptyView = ({
  icon = (
    <CustomIcon
      size={100}
      height={100}
      viewBox="0 0 20 20"
      fill="gray-200"
      stroke="none"
    >
      <Calendar />
    </CustomIcon>
  ),
  content,
  buttonText,
  borderTop = false,
}: NoDataViewProps) => {
  return (
    <NoData borderTop>
      {icon}
      <Content>{content}</Content>
      {buttonText && <StyledButton>{buttonText}</StyledButton>}
    </NoData>
  );
};

export default EmptyView;
