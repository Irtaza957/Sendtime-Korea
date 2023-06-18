import { Dispatch, SetStateAction } from 'react';

import { AllDayModalContent } from '@components/Calendar';
import {
  formatDate,
  MoreLinkArg,
  VerboseFormattingArg,
} from '@fullcalendar/common';

type onMoreClickParams = {
  arg: MoreLinkArg;
  calendarDOMRect?: DOMRect;
  onClickDelete: (calendarId: string, currentEventId: string) => void;
  isModalOpen: boolean;
  setAllDayModalContent: Dispatch<SetStateAction<AllDayModalContent>>;
  setIsAllDayModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const onMoreClick = ({
  arg,
  calendarDOMRect,
  onClickDelete,
  isModalOpen,
  setAllDayModalContent,
  setIsAllDayModalOpen,
  setIsModalOpen,
}: onMoreClickParams) => {
  const { jsEvent, allSegs } = arg;
  const moreLink = jsEvent.target as HTMLAnchorElement;
  const moreLinkDOMRect = moreLink.getBoundingClientRect();

  if (!calendarDOMRect) return;

  const buttonTop = moreLinkDOMRect.top - calendarDOMRect.top;
  const horizontalCriteria = (calendarDOMRect.width * 3) / 4;

  const modalSide =
    (jsEvent as any).clientX < horizontalCriteria
      ? moreLinkDOMRect.right - calendarDOMRect.left + 10
      : moreLinkDOMRect.left - calendarDOMRect.left - 270;

  const newAllDayEvents = allSegs.map((seg) => {
    const currentEventId = seg.event._def.publicId;

    return {
      id: currentEventId,
      title: seg.event._def.title,
      time: {
        start: seg.event._instance?.range.start || new Date(),
        end: seg.event._instance?.range.end || new Date(),
      },
      user: {
        name: seg.event._def.extendedProps.user.name || '이름 없음',
        email: seg.event._def.extendedProps.user.email || '이메일 없음',
      },
      location: seg.event._def.extendedProps.location || '장소 없음',
      category: seg.event._def.extendedProps.category || '캘린더 없음',
      onClickDelete: () =>
        onClickDelete(seg.event._def.extendedProps.calendarId, currentEventId),
    };
  });

  setAllDayModalContent({
    allDayEvents: newAllDayEvents,
    position: { x: modalSide, y: buttonTop },
  });
  setIsAllDayModalOpen((prevState) => !prevState);

  if (isModalOpen) {
    setIsModalOpen(false);
  }

  return 'none';
};

type DateType = { mm: string; dd: string; yy: string };
export const createDayHeader = (
  args: VerboseFormattingArg,
  { mm, dd, yy }: DateType,
  locale?: string
) => {
  const { marker } = args.date;
  const month = formatDate(marker, { day: '2-digit' });
  const date = formatDate(marker, {
    weekday: 'narrow',
    locale,
  });
  const [m, d, y] = marker.toLocaleDateString('en-US').split('/');

  if (m === mm && d === dd && y === yy) {
    return `${date}`;
  }

  return `${month} ${date}`;
};
