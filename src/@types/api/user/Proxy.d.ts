type ProxyLoginRequestParams = {
  teamId: string;
  memberId: string;
  activationLinkUuid: string;
};

type ProxyLoginResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      id: string;
      createDateTime: string;
      updateDateTime: string;
      name: string;
      phone: string;
      password: string;
      email: string;
      authorities: string[];
      enabled: true;
      blockingTimes: BlockingTime[];
      memberSetting: {
        calendarAccounts: CalendarAccount[];
        openTimes: OpenTime[];
        favoritePlaces: FavoritePlaces[];
        syncedCalendars: CalendarItem;
      };
      color: string;
      joinPath: string[];
      googleAttendeeEmail: string;
    }
  ];
};

type MemberCheckResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [boolean];
};
