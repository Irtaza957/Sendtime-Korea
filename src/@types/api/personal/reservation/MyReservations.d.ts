type GetMyReservationParams = {
  limit: number;
  page: number;
};

type reservationProposerType = {
  name: string;
  organization: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  locale: string;
  status: string;
  allowKakao: boolean;
  allowEmail: boolean;
  allowProposalRemind: boolean;
};
type reservationAcceptorType = {
  phone: string;
  name: string;
  email: string;
  locale: string;
  status: string;
  allowKakao: boolean;
  allowEmail: boolean;
  allowProposalRemind: boolean;
};

type ReservationType = 'PERSONAL' | 'TEAM';
type ReservationSubType = 'THIRD_PERSON' | 'GENERAL' | 'CUSTOM';
type ReservationStatus = 'CONFIRMED' | 'DECLINED' | 'NEEDS_ACTION';
type Answers = {
  id: string;
  memberId: string;
  reservationId: string;
  questionId: string;
  questionType: IFormQuestion['questionType'];
  questionTitle: string;
  answers: string[];
  isContainEtc: boolean;
  etcAnswer: string;
  createdAt: Date;
  updatedAt: Date;
};
type CommonScheduleReservation = {
  reservationId: string;
  type: ReservationType;
  subType: ReservationSubType;
  reservationStatus: ReservationStatus;
  title: string;
  timeUnit: string[];
  startDateTime: string;
  endDateTime: string;
  location: {
    name: string;
    detail: string;
  };
  edited: boolean;
  reservationDate: string;
  time: string; // Upcoming & Past
  locations: string[];
  answers: Answers[];
};

type ScheduleReservation = CommonScheduleReservation & {
  options?: { priority: number; time: string }[]; // Pending
  reservationChangeLink?: string; // Upcoming
  reservationConfirmLink?: string; // Pending
  reservationCancelLink?: string; // Upcoming & Pending
  message?: string;
  team?: {
    name: string;
    members: { name: string }[];
  };
  // reservationAcceptor?: reservationAcceptorType;
  // reservationProposer?: reservationProposerType;
};

type MyReservationManage = {
  reservations: ScheduleReservation[];
};

type GetReservationResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      totalCount: number;
      page: number;
      reservations: ScheduleReservation[];
    }
  ];
};
