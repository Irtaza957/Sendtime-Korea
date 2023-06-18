/* TODO: 타임 타입으로 변경 필요 */

type OpenTimeType = {
  day:
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY' /* here */;
  available: boolean /* here */;
  start: string /* here */;
  end: string /* here */;
  // prevTz: string | null;
  // extraBlocking?: boolean;
  // originalStart?: string;
  // originalEnd?: string;
  // blockingStart?: string;
  // blockingEnd?: string;
  // adjustment?: boolean;
};

type FQuestion = {
  id: string;
  type: IFormQuestion['questionType'];
  title: string;
  options?: string[];
  isContainEtc: boolean;
  isRequired: boolean;
  isExposed: boolean;
};

type CreateReservationParams = {
  reservationPageName: string;
  reservationPageType: 'PERSONAL' | 'TEAM';
  reservationPageDescription: string;
  reservationPeriodInfo: {
    isInfinite: boolean;
    startDateTime: string;
    endDateTime: string;
  };
  reservationLocations: {
    id: string;
    name: string;
    type: string;
  }[];
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
  frontBufferTime: string;
  backBufferTime: string;
  reservationPageOptionCount: number;
  masking: boolean;
  remind: boolean;
  blockingTimes: {
    startTime: string;
    endTime: string;
  }[];
  questions: FQuestion[];
};

type CreateReservationResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      customUrl: string;
      reservationPageUuid: string;
      reservationPageType: 'PERSONAL' | 'TEAM';
      reservationPageDescription: string;
      createDateTime: string;
      updateDateTime: string;
      createMemberId: string;
      updateMemberId: string;
    }
  ];
};

type GetReservationResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      hostName: string;
      favoritePlaces: {
        id: string;
        name: string;
        type: 'CUSTOM' | 'ZOOM' | 'MEET' | 'TEAMS' | 'SKYPE' | 'PHONE';
      }[];
      openTimes: OpenTimesType;
    }
  ];
};

type GetAllMyPagesParams = {
  type?: 'PERSONAL' | 'TEAM';
};

type GetAllMyPagesResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [MyReservations];
};

type MyReservations = {
  username: string;
  customUrl: string;
  reservationPages: MyReservation[];
};

type MyReservation = {
  pageType: 'PERSONAL' | 'TEAM';
  pageName: string;
  pageDescription: string;
  teamName: string;
  customUrl: string;
  uuid: string;
  createdAt: string;
  isActive: boolean;
  timeUnit: string[];
  locations: string[];
  optionCount: number;
  customPages: MyReservationCustomPage[];
  thirdPersonPages?: MyReservationThirdPersonPage[];
  groupId: string;
  attendees?: string[];
  questions: FQuestion[];
};

type MyReservationThirdPersonPage = {
  id: string;
  createDateTime: string;
  updateDateTime: string;
  reservationPageName: string;
  bookingPageName: string;
  reservationProposer: ReservationProposerResponse;
  reservationAcceptor: ReservationAcceptorResponse;
};

type MyReservationCustomPage = {
  id: string;
  reservationPageName: string;
  reservationPageDescription: string;
  isActive: boolean;
  answers: AnswerType[];
};

type DeleteMyPageResponse = {
  status: {
    code: number;
    message: string;
  };
};
