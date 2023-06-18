type GuestReservationInfoParams = {
  url: string;
};

type ConfirmDetail = {
  confirm: boolean;
  reservationOptions: {
    startDateTime: string;
    endDateTime: string;
    priority: number;
  }[];
  startDateTime: string;
  endDateTime: string;
};

type OpenTimesType = [
  OpenTimeType,
  OpenTimeType,
  OpenTimeType,
  OpenTimeType,
  OpenTimeType,
  OpenTimeType,
  OpenTimeType
];

type HostInfoType = {
  confirmDetail: ConfirmDetail;
  hostName: string;
  reservationPageName: string;
  reservationPageType: 'PERSONAL';
  reservationPageSubType: ReservationSubType;
  reservationPageDescription: string;
  startDate: string;
  endDate: string;
  timeUnit: string[];
  openTimes: OpenTimesType;
  reservationPageOptionCount: 1 | 2 | 3;
  location: { id: string; name: string; type: string; checked: boolean }[];
  reservationAttendee: {
    department: string;
    email: string;
    name: string;
    organization: string;
    phone: string;
    role: string;
    locale: string;
  };
  timezone?: Timezone;
  hostTimezone?: Timezone;
  timezones?: Timezone[];
  form: {
    questions: FQuestion[];
  };
  answers?: Answers[];
};

type GuestReservationInfoResponse = ResponseStatus & {
  results: [HostInfoType];
};

type MobileGuestReservationCalendarInfoParams = {
  year: string;
  month: string;
};

type GuestReservationCalendarInfoParams = {
  startDate: string;
  endDate: string;
};

type MaskedEvent = {
  name: string;
  startTime: string;
  endTime: string;
};

type UnMaskedEvent = {
  name: string;
  startTime: string;
  endTime: string;
};

type BlockingTime = {
  id: string;
  startTime: string;
  endTime: string;
};

type GuestReservationCalendarInfoMasked = {
  masking: true /*  */;
  events: MaskedEvent[] /* 구글캘린더 */;
  blockingTimes: BlockingTime[] /** 여기 예약하지 마세요 */;
  unavailableTimes: string[];
};

type GuestReservationCalendarInfoUnMasked = {
  masking: false /*  */;
  events: UnMaskedEvent[] /* 구글캘린더 */;
  blockingTimes: BlockingTime[] /** 여기 예약하지 마세요 */;
  unavailableTimes: string[];
};

type HostCalendarInfoType =
  | GuestReservationCalendarInfoMasked
  | GuestReservationCalendarInfoUnMasked;

type GuestReservationCalendarInfoResponse = ResponseStatus & {
  results: [HostCalendarInfoType];
};

type AnswerType = {
  id?: string;
  questionId: string;
  questionType: IFormQuestion['questionType'];
  answers: string[];
  isContainEtc?: boolean;
  etcAnswer?: string;
};

type AnswerUpdateType = {
  id: string;
  questionId: string;
  answers: string[];
  isContainEtc?: boolean;
  etcAnswer?: string;
};

type FileUploadParams = binary;

type FileUploadResponse = ResponseStatus & {
  results: [string];
};

type CreateGuestReservationInfoParams = {
  reservationOptions: {
    startDateTime: string;
    endDateTime: string;
    // priority: 1 | 2 | 3;
    priority: number;
  }[];
  reservationAttendee: {
    name: string;
    organization: string;
    role: string;
    department: string;
    phone: string;
    email: string;
    locale: string;
  } | null;
  reservationLocation: {
    name: string;
    type: string /* TODO: Custom, Zoom,,,  */;
  };
  reservationPurpose: string;
  postscript: string;
  customPageId?: string;
  thirdPersonPageId?: string;
  timezone: Timezone;
  answers: AnswerType[];
};

type CreateMobileGuesrReservationInfoParams = {
  reservationOptions: {
    selectedDate: string;
    selectedTime: string;
    priority: number;
  }[];
  reservationAttendee: {
    name: string;
    organization: string;
    role: string;
    department: string;
    phone: string;
    email: string;
  };
  reservationLocation: {
    name: string;
    type: string;
  };
  reservationPurpose: string;
  postscript: string;
  timeUnit: string[];
  timezone: Timezone;
};

type MobileGuestReservationCalendarInfoResponse = ResponseStatus & {
  results: [
    {
      reservationId: string;
      createDateTime: string;
      updateDateTime: string;
    }
  ];
};

type GuestMobileCalendarInfo = {
  availableDateTimesData: {
    date: string;
    times: ReservationTime[];
  }[];
};

type ReservationTime = {
  startTime: string;
  endTime: string;
  startDateTime: string;
  endDateTime: string;
};

type GuestMobileReservationCalendarInfoResponse = ResponseStatus & {
  results: [GuestMobileCalendarInfo];
};

/* 맞춤 예약페이지 */

type CustomReservationResponse = ResponseStatus & {
  results: [
    {
      confirmDetail: ConfirmDetail;
      reservationOptions: {
        startDateTime: string;
        endDateTime: string;
        priority: number;
      }[];
      startDateTime: string;
      endDateTime: string;
      reservationPageName: string;
      reservationPageDescription: string;
      startDate: string;
      endDate: string;
      timeUnit: string[];
      reservationLocations: FavoritePlace[];
    }
  ];
};

/* 3자 조율 예약페이지 */

type ThirdPartyReservationResponse = ResponseStatus & {
  results: [HostInfoType];
};
