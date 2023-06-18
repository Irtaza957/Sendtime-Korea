type GetNestedPageParams = {
  customPageId: string;
};

type NestedPageParams = {
  reservationPageName: string;
  reservationPageDescription: string;
  answers: AnswerType[];
};

type NestedPageEditParams = {
  reservationPageName: string;
  reservationPageDescription: string;
  answers: AnswerUpdateType[];
};

type CreateNestedPageParams = {
  uuid: string;
  params: NestedPageParams;
};

type EditNestedPageParams = {
  customPageId: string;
  params: NestedPageEditParams;
};

type DeleteNestedPageParams = {
  customPageId: string;
};

type GetNestedPageResponse = ResponseStatus & {
  results: [MyReservationCustomPage];
};

type EditNestedPageResponse = ResponseStatus & {
  results: [MyReservationCustomPage];
};

type CreateNestedPageResponse = ResponseStatus & {
  results: [MyReservationCustomPage];
};

type DeleteNestedPageResponse = ResponseStatus;
