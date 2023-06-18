import React from 'react';
import dayjs from 'dayjs';

import { People, TrashBin } from '@Icon//Icons/Utils';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';
import { convertKorWeekday, translateDate } from '@utils/format';
import { FORMAT } from '@utils/time';

import {
  Content,
  ContentContainer,
  DetailModalContainer,
  DetailModalNavigation,
  IconWrapper,
  SplitLine,
  Time,
  Title,
} from './index.styles';

interface DetailModalProps {
  shadowed?: boolean;
  isClosable?: boolean;
  isAbsolute?: boolean;
  position?: { x: number; y: number };
  title: string;
  time: { start: Date; end: Date };
  user: {
    name: string;
    email: string;
  };
  location: string;
  category: string;
  onClickClose?: () => void;
  onClickDelete: () => void;
}

const DetailModal = ({
  shadowed = true,
  isClosable = true,
  isAbsolute = true,
  position,
  title,
  time,
  user,
  location,
  category,
  onClickClose = () => {},
  onClickDelete,
}: DetailModalProps) => {
  const startDate = dayjs(time.start).subtract(9, 'hours').format(FORMAT.YMDd);
  const endDate = dayjs(time.end).subtract(9, 'hours').format(FORMAT.YMDd);

  const [syyyy, smm, sDD, sdd] = startDate.split(' ');
  const translatedStartDate =
    translateDate(syyyy + ' ' + smm + ' ' + sDD, ' ') +
    ` (${convertKorWeekday(sdd[1])})`;
  const [eyyyy, emm, eDD, edd] = endDate.split(' ');
  const translatedEndDate =
    translateDate(eyyyy + ' ' + emm + ' ' + eDD, ' ') +
    ` (${convertKorWeekday(edd[1])})`;

  return (
    <DetailModalContainer
      isAbsolute={isAbsolute}
      position={position || { x: 0, y: 0 }}
      shadowed={shadowed}
    >
      <DetailModalNavigation>
        <button onClick={onClickDelete} style={{ marginBottom: '3px' }}>
          <CustomIcon
            size={14}
            height={10}
            viewBox="0 0 9 16"
            scale={1.2}
            fill="gray-600"
            stroke="none"
          >
            <TrashBin />
          </CustomIcon>
        </button>
        {isClosable && (
          <button onClick={onClickClose}>
            <Icon
              icon="eva:close-outline"
              width="20"
              height="20"
              color="gray-600"
            />
          </button>
        )}
      </DetailModalNavigation>
      <Title>{title}</Title>
      {/* TODO: 종일 일정인 경우(isAllDay)에는 날짜만 표현해주기 */}
      <Time>{`${translatedStartDate} ~ ${translatedEndDate}`}</Time>
      <SplitLine />
      <ContentContainer>
        <Content>
          <CustomIcon
            size={18}
            height={16}
            viewBox="0 0 12 10"
            fill="gray-600"
            stroke="none"
          >
            <People />
          </CustomIcon>
          {user.name}
        </Content>
        <Content>
          <IconWrapper minWidth={18}>
            <Icon
              icon="ic:outline-place"
              width="18"
              min-width="18"
              color="gray-600"
            />
          </IconWrapper>
          {location}
        </Content>
        <Content>
          <IconWrapper minWidth={18}>
            <Icon
              icon="bx:calendar"
              width="18"
              min-width="18"
              color="gray-600"
            />
          </IconWrapper>
          {category}
        </Content>
      </ContentContainer>
    </DetailModalContainer>
  );
};

export default DetailModal;
