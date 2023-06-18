import { USER_ID } from '@constants/account';
import { getLocalStorage } from '@utils/storage';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  const userId = getLocalStorage(USER_ID);

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
  window.gtag('set', { user_id: userId });
};

export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
