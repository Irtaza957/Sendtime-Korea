type Group = {
  teamId: string;
  createDateTime: string;
  teamName: string;
};

type GetGroupListResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [Group[]];
};

type DeleteGroupResponse = {
  status: {
    code: number;
    message: string;
  };
};

type GroupMember = {
  memberId: string;
  createDateTime: string;
  updateDateTime: string;
  color: string;
  organization: string;
  role: string;
  department: string;
  memo: string;
  teamRole: string;
  leader: boolean;
  name: string;
};

type GroupDetail = {
  teamId: string;
  createDateTime: string;
  createMemberId: string;
  teamName: string;
  customUrl: string;
  teamDescription: string;
  calendarOpenPeriodString: string;
  calendarOpenPeriodDateTime: {
    startDateTime: string;
    endDateTime: string;
  };
  teamMembers: GroupMember[];
};

type GetGroupDetailsResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [GroupDetail];
};

type GetGroupWeeklyEventParams = {
  startDate: string;
  endDate: string;
  groupId: string;
  members: string;
};

type GroupEventType = {
  id: string;
  calendarType: string;
  calendarId: string;
  calendarName: string;
  startDateTime: string;
  startTimeZone: string;
  endDateTime: string;
  endTimeZone: string;
  htmlLink: string;
  summary: string;
  description: string;
  color: string;
  location: EventLocationType[];
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  attendees: AttendeeType[];
  onlineMeetingInfo: onlineMeetingInfoType[];
  allDay: false;
};

type GroupCalendarEvent = {
  masking: boolean;
  startDate: string;
  endDate: string;
  timeZone: string;
  events: GroupEventType[];
  nonDisturbTime: BlockType[];
};

type GetGroupWeeklyEventResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [GroupCalendarEvent];
};

type GetGroupCalendarPreviewParams = {
  team: string;
  startDate?: string;
  endDate?: string;
  displayOption?: string;
  frontBufferTimeString?: string;
  backBufferTimeString?: string;
  masking: boolean;
  creatorIds: string[];
  reservationPeriodInfo: ReservationPeriodInfo;
  timeUnit: string[];
  reservationAvailableRange: [
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType
  ];
};

type GroupCalendarPreview = {
  masking: boolean;
  events: [];
  blockingTimes: BlockingTime[];
};

type GetGroupCalendarPreviewResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [GroupCalendarPreview];
};

type MakeGroupBlockParams = {
  startTime: string;
  endTime: string;
  groupId: string;
};

type MakeGroupBlockResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      status: {
        code: 2000;
        message: 'OK';
      };
      results: [BlockingTime[]];
    }
  ];
};

type DeleteGroupBlockParams = {
  groupId: string;
  blockTimeId: string;
};

type DeleteGroupBlockResponse = {
  status: {
    code: number;
    message: string;
  };
};

type GroupCalendarSyncResponse = {
  status: {
    code: number;
    message: string;
  };
};
