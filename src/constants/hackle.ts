export const HACKLE_KEYS = {
  /* [사용자 이벤트 - 페이지] 로 나뉘어 있음*/
  CLICK: {
    BETA: {
      SIGNUP: 'clicked_signUp_beta',
    },
    SIGNUP: {
      MAIN: 'clicked_signup_signup',
    },
    RESERVATION: {
      POPUP_BANNER: 'clicked_popupBannerSignup_ReservationPage',
      TOP_BANNER: 'clicked_topBannerSignup_ReservationPage',
    },
    SPACE: {
      REQUEST_MEETING: 'clicked_space_requestMeeting',
      REACTION: 'clicked_space_reaction',
      CREATE_CARD: 'clicked_space_createCard',
      CREATE_CARD_PRE_SHOW_NEXT: 'clicked_space_createCardPreShowNext',
      CREATE_CARD_SUBMIT: 'clicked_space_createCardSubmit',
      CREATE_CARD_LOGIN: 'clicked_space_createCardLogin',
      PROFILE_LINK: 'clicked_space_profileLink',
      POWERED_BY: 'clicked_space_poweredBy',
      CATEGORY: 'clicked_space_category',
    },
  },
  VIEW: {
    MY_CALENDAR: 'viewed_mycalendar',
    RESERVATION: 'viewed_reservation',
    SPACE: {
      MAIN: 'viewed_space',
      MODAL_FOR_VIEWING_LIMIT: 'viewed_space_modalForViewingLimit',
      MODAL_FOR_BOOKING_LIMIT: 'viewed_space_modalForBookingLimit',
    },
  },
};
