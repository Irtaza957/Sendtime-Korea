export const defaultHostInfo: Omit<HostInfoType, 'form'> & {
  form: { questions: IFormQuestion[] };
} = {
  hostName: '',
  reservationPageName: '\n',
  reservationPageType: 'PERSONAL',
  reservationPageSubType: 'GENERAL',
  reservationPageDescription: '',
  startDate: '',
  endDate: '',
  timeUnit: ['30분'],
  openTimes: [
    {
      day: 'SUNDAY',
      available: false,
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'MONDAY',
      available: true,
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'TUESDAY',
      available: true,
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'WEDNESDAY',
      available: true,
      start: '09:00',
      end: '18:00',
    },
    {
      day: 'THURSDAY',
      available: true,
      start: '09:00',
      end: '15:00',
    },
    {
      day: 'FRIDAY',
      available: true,
      start: '11:00',
      end: '18:00',
    },
    {
      day: 'SATURDAY',
      available: false,
      start: '09:00',
      end: '18:00',
    },
  ],

  reservationPageOptionCount: 1,
  location: [],
  reservationAttendee: {
    department: '',
    email: '',
    name: '',
    organization: '',
    phone: '',
    role: '',
    locale: '',
  },
  confirmDetail: {
    confirm: false,
    reservationOptions: [],
    startDateTime: '',
    endDateTime: '',
  },
  form: {
    questions: [] as IFormQuestion[],
  },
};

export const defaultTimezone: Timezone = {
  id: '',
  name: '',
  timezone: '',
};
