type GoogleOrganizerOptionType = {
  id: string;
  email: string;
  name: string;
  isLinked: boolean;
};

type GetGroupReservationResponse = {
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
      googleOrganizerOptions: GoogleOrganizerOptionType[];
      calendarOpenPeriod: {
        startDate: string;
        endDate: string;
      };
    }
  ];
};

type DisplayOptionType = 'INTERSECTION' | 'UNION' | 'EMPTY';
type ReservationPeriodInfo = {
  isInfinite: boolean;
  startDateTime: string;
  endDateTime: string;
};
type CreateGroupReservationParams = {
  hostId?: string;
  reservationPageName: string;
  reservationPageType: 'PERSONAL' | 'TEAM';
  reservationPageDescription: string;
  reservationPeriodInfo: ReservationPeriodInfo;
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
  remind: boolean;
  blockingTimes: {
    startTime: string;
    endTime: string;
  }[];
  creatorIds: string[];
  googleOrganizerId: string;
  masking: boolean;
  displayOption?: DisplayOptionType; // UNION(합집합, 디폴트), INTERSECTION(교집합), EMPTY(빈 페이지)
  isDisplayBlockingTimes: boolean;
  questions: FQuestion[];
};

type CreateGroupReservationResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      customUrl: string;
      reservationPageUuid: string;
      reservationPageType: 'TEAM';
      reservationPageDescription: string;
      createDateTime: string;
      updateDateTime: string;
      createMemberId: string;
      updateMemberId: string;
    }
  ];
};

type PostGroupReservationEditResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      customUrl: string;
      reservationPageUuid: string;
      reservationPageType: string;
      reservationPageDescription: string;
      createDateTime: string;
      updateDateTime: string;
      createMemberId: string;
      updateMemberId: string;
    }
  ];
};

type GetGroupReservationEditDetailResponse = GetGroupReservationResponse;
