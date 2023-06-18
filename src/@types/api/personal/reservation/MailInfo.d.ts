type GetMailInfoRequest = {
  pageId: string;
  reservationId: string;
};

type MailInfo = {
  reservationOptions: {
    startDateTime: string;
    endDateTime: string;
    priority: 1 | 2 | 3;
  }[];
  startDateTime: string;
  endDateTime: string;
  reservationPageName: string;
  reservationPageDescription: string;
  startDate: string;
  endDate: string;
  timeUnit: string[];
  location: {
    id: string;
    name: string;
    type: string;
    displayName: string;
  }[];
  subType: ReservationSubType;
  timezone: {
    id: string;
    name: string;
    timezone: string;
  };
};

type GetMailInfoResponse = ResponseStatus & {
  results: [MailInfo];
};
