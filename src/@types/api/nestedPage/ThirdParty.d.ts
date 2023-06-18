type ReservationProposer = {
  name: string;
  organization: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  locale: string;
  allowKakao: boolean;
  allowEmail: boolean;
  allowProposalRemind: boolean;
  reminderStartDate: Date;
  reminderStartTime: string;
};

type ReservationAcceptor = {
  name: string;
  phone: string;
  email: string;
  locale: string;
  allowKakao: boolean;
  allowEmail: boolean;
  allowProposalRemind: boolean;
  reminderStartDate: Date;
  reminderStartTime: string;
};

type CreateThirdPartyParams = {
  uuid: string;
  bookingPageName: string;
  reservationProposer: ReservationProposer;
  reservationAcceptor: ReservationAcceptor;
};

type DeleteThirdPartyParams = {
  uuid: string;
  thirdPartyPageId: string;
};

type DeleteThirdPartyPageResponse = ResponseStatus;

type ReservationProposerResponse = ReservationProposer & {
  status:
    | 'SEND_SUCCEEDED'
    | 'SEND_FAILED'
    | 'REQUEST_COMPLETED'
    | 'SEND_UNABLE'
    | 'READY';
};

type ReservationAcceptorResponse = ReservationAcceptor & {
  status:
    | 'WAITING'
    | 'SEND_FAILED'
    | 'NEEDS_CONFIRMATION'
    | 'CONFIRMED'
    | 'SEND_UNABLE';
};

type CreateThirdPartyResponse = ResponseStatus & {
  results: [
    {
      id: string;
      createDateTime: string;
      updateDateTime: string;
      bookingPageName: string;
      reservationProposer: ReservationProposerResponse;
      reservationAcceptor: ReservationAcceptorResponse;
    }
  ];
};
