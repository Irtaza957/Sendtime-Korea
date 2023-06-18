type GetCalendarRequestParams = {
  type: 'GOOGLE' | 'OUTLOOK';
  code: string;
};

type Calendar = {
  calendarId: string;
  calendarName: string;
};

type CalendarResult = {
  email: string;
  calendars: Calendar[];
};

type SyncCalendarResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [string];
};

type GetCalendarResponse = {
  status: {
    code: number;
    message: string;
  };
  results: CalendarResult[];
};

type UpdateCalendarRespoonse = {
  status: {
    code: number;
  };
};

type FirstGetCalendarResponse = {
  status: {
    code: number;
    message: string;
  };
};

type SyncSheetResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [string];
};

type IntegrateSheetsParams = {
  type: string;
  code: string;
  category: 'TEAM' | 'PERSONAL' | 'THIRD_PERSON';
};

type IntegrateSheetsResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [string];
};
