type CustomCardType = {
  title: string;
  description: string;
  tags: string[];
  time: string;
  location: string[];
  like: number;
  shake: number;
  reservationPageUuid: string;
  buttonText: string;
  link: string;
  color: string;
  imageUrl?: string;
};

type CustomPageInfo = {
  companyName: string;
  description: string;
  logoUrl: string;
  phone: string;
  email: string;
  website: string;
  todayCount: number;
  reservationPageCards: CustomCardType[];
};

type CustomPageInfoResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [CustomPageInfo];
};

type CustomPageActionResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [];
};

type CustomPageActionParams = {
  customUrl: string;
  type: 'LIKE' | 'SHAKE';
  reservationPageUuid: string;
};
