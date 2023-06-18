type QrList = {
  hostName: string;
  reservationPageName: string;
  url: string;
  createdDateTime: string;
};

type QrTableListResponse = ResponseStatus & {
  results: QrList[];
};
