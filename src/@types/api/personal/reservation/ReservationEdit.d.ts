type reservationLocationType = {
  id: string;
  name: string;
  type: 'CUSTOM' | 'ZOOM' | 'MEET' | 'TEAMS' | 'SKYPE' | 'PHONE';
};

type ReservationEditBlockingTime = {
  startTime: string;
  endTime: string;
};

type ReservationEditDefaultDetails = {
  hostId: string;
  hostEmail: string;
  hostName: string;
  reservationPageType: 'PERSONAL' | 'TEAM';
  reservationPageName: string; //
  reservationPageDescription: string; //
  reservationPeriodInfo: {
    isInfinite: boolean;
    startDateTime: string;
    endDateTime: string;
  };
  timeUnit: string[];
  reservationAvailableRange: OpenTimesType;
  frontBufferTime: string;
  backBufferTime: string;
  reservationPageOptionCount: number;
  masking: boolean;
  remind: boolean;
  reservationLocations: reservationLocationType[];
  blockingTimes: ReservationEditBlockingTime[];
  googleOrganizerId?: string;
  googleOrganizerOptions?: GoogleOrganizerOptionType[];
  creatorIds?: string[];
  /* 지금 Edit을 personal이랑 같이 쓰고 있어서 옵셔널인 것.. */
  displayOption?: DisplayOptionType;
  isDisplayBlockingTimes: boolean;
  form: {
    questions: [];
  };
};

type GetReservationEditDetailResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [ReservationEditDefaultDetails];
};

type GetReservationActivationResponse = {
  status: {
    code: number;
    message: string;
  };
};

type PostReservationEditResponse = {
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
