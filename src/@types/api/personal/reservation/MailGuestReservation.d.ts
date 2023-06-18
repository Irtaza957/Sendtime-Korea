type HostMailParams = {
  uuid: string;
  reservationId: string;
  force?: boolean;
};

type HostMailBody = {
  responseEmail?: string;
  reservationStartDateTime?: string;
  reservationEndDateTime?: string;
  responseType: 'CONFIRM' | 'EDIT' | 'CANCEL';
  responseMessage?: string;
  timezone?: Timezone;
};

type PostHostReservationResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      reservationId: string;
      createDateTime: string;
      updateDateTime: string;
    }
  ];
};
