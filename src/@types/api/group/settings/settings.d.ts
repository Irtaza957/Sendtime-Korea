type FavoritePlace = {
  id: string;
  name: string;
  type: string;
  displayName: string;
};

type GetGroupSettingsResponse = ResponseStatus & {
  results: [
    {
      teamId: string;
      createDateTime: string;
      updateDateTime: string;
      updateMemberId: string;
      createMemberId: string;
      customUrl: string;
      teamName: string;
      teamDescription: string;
      calendarOpenPeriod: { startDateTime: string; endDateTime: string };
      favoritePlaces: FavoritePlace[];
      openTimes: [
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType
      ];
      customFieldSettings: CustomField[];
    }
  ];
};

type UpdateGroupSettingsParams = {
  teamName: string;
  teamDescription: string;
  favoritePlaces: { id: string; name: string; type: string }[];
  openTimes: [
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType,
    OpenTimeType
  ];
  customFieldSettings: CustomField[];
};
type UpdateGroupSettingsResponse = ResponseStatus & {
  results: [
    {
      teamId: string;
      createDateTime: string;
      updateDateTime: string;
      updateMemberId: string;
      createMemberId: string;
      customUrl: string;
      teamName: string;
      teamDescription: string;
      calendarOpenPeriod: string;
      favoritePlaces: FavoritePlace[];
      openTimes: [
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType,
        OpenTimeType
      ];
      customFieldSettings: CustomField[];
    }
  ];
};
