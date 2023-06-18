import React, { ReactNode } from 'react';

import { Person } from '@Icon/Icons';
import {
  CalendarIcon,
  GlobeIcon,
  LocationIcon,
  TimeIcon,
} from '@Icon/Icons/Utils';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';
import { contentWithEnter } from '@utils/content';

import ToggleButton from '../ToggleButton';

import {
  Box,
  Description,
  DescriptionContainer,
  IconWrapper,
  PreviewInfoContainer,
  Required,
  SpanForBorder,
  SubTitle,
  SubTitleContainer,
  XButtonContainer,
} from './index.styles';

interface SubSectionProps {
  subTitle: string;
  description?: string;
  onClickToggle?: () => void;
  children?: ReactNode;
  active?: boolean;
  required?: boolean;
  gap?: number;
  isLabelFont?: boolean;
}

const SubSection = ({
  subTitle,
  description,
  onClickToggle,
  active,
  children,
  required = false,
  gap,
  isLabelFont = false,
}: SubSectionProps) => {
  return (
    <Box gap={gap}>
      <SubTitleContainer>
        <SubTitle isLabelFont={isLabelFont}>
          {subTitle}
          {required && <Required>*</Required>}
        </SubTitle>
        {onClickToggle && (
          <ToggleButton active={active ?? false} onClick={onClickToggle} />
        )}
      </SubTitleContainer>
      {description && (
        <DescriptionContainer>
          {contentWithEnter(description).map((content, idx) => (
            <Description key={idx}>{content}</Description>
          ))}
        </DescriptionContainer>
      )}
      {children}
    </Box>
  );
};

interface XButtonProps {
  onClick: () => void;
}

const XButton = ({ onClick }: XButtonProps) => {
  return (
    <XButtonContainer onClick={onClick}>
      <SpanForBorder>
        <Icon icon="eva:close-outline" width="30" height="20" />
      </SpanForBorder>
    </XButtonContainer>
  );
};

interface PreviewIconInfoProps {
  iconType: 'calendar' | 'time' | 'location' | 'host' | 'globe';
  content: React.ReactNode;
}

const PreviewInfo = ({ iconType, content }: PreviewIconInfoProps) => {
  return (
    <PreviewInfoContainer>
      <IconWrapper>
        {iconType === 'host' && (
          <span style={{ padding: '0 1.5px' }}>
            <CustomIcon size={18} fill="gray-750" stroke="none">
              <Person />
            </CustomIcon>
          </span>
        )}
        {iconType === 'calendar' && <CalendarIcon />}
        {iconType === 'time' && <TimeIcon />}
        {iconType === 'location' && <LocationIcon />}
        {iconType === 'globe' && <GlobeIcon />}
      </IconWrapper>

      {content}
    </PreviewInfoContainer>
  );
};

export { PreviewInfo, SubSection, XButton };
