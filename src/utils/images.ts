import { BASE_URL } from '@constants/baseUrl';

const logoUrl = (calendarType: 'GOOGLE' | 'OUTLOOK') => {
  if (calendarType === 'GOOGLE') {
    return `${BASE_URL.image}/logos/google_logo.png`;
  }

  if (calendarType === 'OUTLOOK') {
    return `${BASE_URL.image}/logos/outlook_logo.png`;
  }

  return '';
};

export { logoUrl };
