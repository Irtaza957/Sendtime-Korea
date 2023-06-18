type BlockType = {
  id: string;
  startTime: string;
  endTime: string;
};

type AttendeeType = {
  id: string;
  email: string;
  displayName: string;
  isOrganizer: boolean;
  optional: boolean;
};

type SyncCalendarRequestParams = 'GOOGLE' | 'OUTLOOK';

type onlineMeetingInfoType = {
  providerType: string;
  entryPoint: string;
};

type EventLocationType = {
  name: string;
  address: string;
  geoCoordinate: string;
};

type EventType = {
  id: string;
  calendarId: string;
  startDateTime: string;
  startTimeZone: 'Asia/Seoul';
  endDateTime: string;
  endTimeZone: 'Asia/Seoul';
  calendarName: string;
  summary: string;
  location: EventLocationType[];
  creator: {
    email: string;
    self: boolean;
  };
  attendees: AttendeeType[];
  onlineMeetingInfo: onlineMeetingInfoType[];
  allDay: boolean;

  // 안 쓰는 항목
  eventType: string;
  responseStatus: string;
  htmlLink: string;
  createDateTime: string;
  updateDateTime: string;
};

type GetWeeklyEventParams = {
  startDate: string;
  endDate: string;
};

type MakeBlockParams = {
  startTime: string;
  endTime: string;
};

type GetWeeklyEventsResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      startDate: string;
      endDate: string;
      timeZone: 'Asia/Seoul';
      events: EventType[];
      nonDisturbTime: BlockType[];
    }
  ];
};

type DeleteWeeklyEventsRequestParams = { calId: string; id: string };

type DeleteWeeklyEventResponse = {
  status: {
    code: number;
    message: string;
  };
};

type MakeBlockResponse = {
  status: {
    code: number;
    message: string;
  };
  results: BlockType[];
};

type DeleteBlockResponse = {
  status: {
    code: number;
    message: string;
  };
};

type CalendarSyncResponse = {
  status: {
    code: number;
    message: string;
  };
};

type CalendarPreviewParams = {
  startDate: string;
  endDate: string;
  masking: boolean;
  frontBufferTime: string;
  backBufferTime: string;
};

type PreviewEvent = { startTime: string; endTime: string; name: string };
type PreviewBlockedEvent = { id: string; startTime: string; endTime: string };

type MaskedType = {
  masking: true;
  events: Omit<PreviewEvent, 'name'>[];
  blockingTimes: PreviewBlockedEvent[];
};

type UnMaskedType = {
  masking: false;
  events: PreviewEvent[];
  blockingTimes: PreviewBlockedEvent[];
};

type CalendarPreviewResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [MaskedType | UnMaskedType];
};
