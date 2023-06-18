import React from 'react';

import { EventContentArg } from '@fullcalendar/common';

import Blocked from './Blocked';
import Default from './Default';
import Masked from './Masked';

interface EventContentProps {
  arg: EventContentArg;
  masking: boolean;
  onDeleteCalendarBlock?: (publicId: string) => void;
}
const EventContent = ({
  arg,
  masking,
  onDeleteCalendarBlock,
}: EventContentProps) => {
  const { title, extendedProps, publicId, allDay } = arg.event._def;
  const { blocked, guestBlocked, calendarId } = extendedProps;

  if (arg.event._instance) {
    const { range } = arg.event._instance;
    const is15Min = +range.end - +range.start === 900000;

    if (blocked) {
      return (
        <Blocked
          time={arg.timeText}
          is15Min={is15Min}
          onDelete={() => onDeleteCalendarBlock?.(publicId)}
        />
      );
    }

    if (guestBlocked) return <></>;

    if (masking) {
      return <Masked time={arg.timeText} is15Min={is15Min} />;
    }

    return <Default time={arg.timeText} title={title} is15Min={is15Min} />;
  }

  return <></>;
};

export default EventContent;
