import i18n, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import * as en from './en-US';
import * as ko from './ko-KR';
import * as vi from './vi-VN';
import * as zh from './zh-TW';

const defaultNS = 'common';
const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
  lookupLocalStorage: 'i18nextLng',
};
const resources: Resource = {
  'en-US': { ...en },
  en: { ...en },
  'en-150': { ...en },
  'en-AU': { ...en },
  'en-CA': { ...en },
  'en-GB': { ...en },
  'en-NZ': { ...en },
  'en-US-POSIX': { ...en },
  'ko-KR': { ...ko },
  'zh-TW': { ...zh },
  'vi-VN': { ...vi },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources,
    // lng: 'ko-KR', // 초기 설정 언어
    fallbackLng: {
      'en-US': ['en-US'], // 한국어 불러오는 것이 실패했을 경우 영문을 쓸 것
      zh: ['zh-TW'],
      vi: ['vi-VN'],
      default: ['ko-KR'],
    },
    debug: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    defaultNS,
    react: {
      // useSuspense: false,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'b', 'i'],
    },
  });

export default i18n;
