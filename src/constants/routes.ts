type ReservationRoutesType = {
  type: 'change' | 'confirm' | 'cancel';
  pageId?: string;
  reservationId?: string;
};

const ROUTES = {
  LANDING: {
    KO: 'https://landing.sendtime.io',
    EN: 'https://landing.sendtime.io/en',
  },
  MY_CALENDAR: '/mycalendar',
  MY_PAGE: '/mypage',
  MANAGE: {
    INDEX: '/manage',
    SCHEDULES: '/manage/schedules',
  },
  PASSWORD: { RESET: '/password/reset', NEW: '/password/new' },
  ONBOARDING: {
    INIT: '/onboarding',
    URL: '/onboarding/url',
    SELECT: {
      CALENDAR: '/onboarding/select/calendar',
      CATEGORY: '/onboarding/select/category',
    },
    SETTINGS: '/onboarding/settings',
    AUTO_SIGNIN_COMPLETED: '/signin/success',
    JOIN_PATH: '/onboarding/join-path',
  },
  EDIT: {
    RESERVATION: '/edit/reservation/*',
  },
  NEW: {
    RESERVATION: '/new/reservation',
    COMPLETED: '/new/completed',
  },
  USER: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    SIGN_UP_VERIFICATION: '/signup/verification',
    SIGN_OUT: '/signout',
  },
  GROUP: {
    MANAGE: '/group/manage',
    MAIN: '/group/main',
    INVITATION: '/group/invitation',
    NEW: '/group/new',
    NEW_COMPLETED: '/group/new/completed',
    PARTICIPATION: '/group/participation',
    SETTINGS: '/group/[groupId]/settings',
    PARTICIPANTS: '/group/[groupId]/participants',
  },
  NOT_FOUND: '/404',
  MAINTENANCE: '/maintenance',
  MAIN: '/',
  ACTIVATE: '/activate/*/*/*',
  GUEST_RESERVATION: {
    MAIN: '/reservation',
    CONTENT: '/reservation/contents',
    CANCEL: '/reservation/cancel',
  },
  BRIDGE: {
    SLACK: '/slack/bridge',
    SHEETS: '/syncbridge/sheets',
    ZOOM: '/zoom/bridge',
  },
  SECRET: {
    CUSTOM_PAGE_MAKER: '/splab/custom-page-maker',
    QR: '/splab/qr-list',
    QR_DETAIL: '/splab/qr-list/[id]',
  },
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',
  SPACE: '/space/[handle]',
  SPACE_LANDING: process.env.NEXT_PUBLIC_SPACE_LANGIND_URL || '/space',
  SPACE_BUILDER: {
    SPACE: '/space',
    NEW_SPACE: '/space/new',
    EDIT_SPACE: '/space/edit/[handle]',
    CUSTOM_SPACE: '/space/custom',
  },
};

const reservationRoutes = ({
  type,
  pageId,
  reservationId,
}: ReservationRoutesType) => {
  return {
    COMPLETED: `/reservation/${type}/complete?i=${pageId}&r=${reservationId}`,
  };
};

export { reservationRoutes, ROUTES };
