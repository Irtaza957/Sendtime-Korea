type ThirdPartyReservation = CommonScheduleReservation & {
  blame: string;
};

type ThirdPartyHostInfoResponse = ResponseStatus & {
  results: [
    {
      totalCount: number;
      page: number;
      reservationsByDate: [
        {
          reservationDate: string;
          reservations: ThirdPartyReservation[];
        }
      ];
    }
  ];
};
