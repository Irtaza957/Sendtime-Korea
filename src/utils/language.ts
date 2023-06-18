import { NextRouter } from 'next/router';
import i18n from 'locales';

import { LNG } from '@constants/language';

export const KOR = '🇰🇷 한국어';
export const ENG = '🇺🇸 English';
export const TWN = '🇹🇼 Taiwan';
export const VNM = '🇻🇳 Vietnamese';

export const REGION = {
  EN: 'en',
  KO: 'ko',
  ZH: 'zh',
  VI: 'vi',
};

export const LANGUAGE = [
  { value: KOR, locale: LNG.ko },
  { value: KOR, locale: LNG.ko_KR },
  { value: TWN, locale: LNG.zh },
  { value: TWN, locale: LNG.zh_TW },
  { value: VNM, locale: LNG.vi },
  { value: VNM, locale: LNG.vi_VN },
  { value: ENG, locale: LNG.en },
  { value: ENG, locale: LNG.en_US },
  { value: ENG, locale: LNG.en_150 },
  { value: ENG, locale: LNG.en_AU },
  { value: ENG, locale: LNG.en_CA },
  { value: ENG, locale: LNG.en_GB },
  { value: ENG, locale: LNG.en_NZ },
  { value: ENG, locale: LNG.en_US_POSIX },
] as const;

const [lngSelectValues] = LANGUAGE.map(({ value }) => value);
export type LngKeyType = keyof typeof lngSelectValues;

// locale: English
export const detectLanguageLocale = (locale: string) => {
  if (locale === KOR) {
    return REGION.KO;
  }

  if (locale === ENG) {
    return REGION.EN;
  }

  if (locale === TWN) {
    return REGION.ZH;
  }

  if (locale === VNM) {
    return REGION.VI;
  }
  return REGION.KO;

  /* TODO: 완전히 같은 Locale 찾는 것 
  const target = LANGUAGE.find(({ value }) => value === locale);

  if (target) {
    return target.locale;
  }

  return LANGUAGE[0].locale;
  */
};

export const detectLanguageValue = (locale: string) => {
  if (locale.includes(REGION.EN)) {
    return ENG;
  }

  if (locale.includes(REGION.KO)) {
    return KOR;
  }

  if (locale.includes(REGION.ZH)) {
    return TWN;
  }

  if (locale.includes(REGION.VI)) {
    return VNM;
  }

  return KOR;

  /* TODO: 완전히 같은 Locale 찾는 것 
  const target = LANGUAGE.find(({ value }) => value === locale);

  if (target) {
    return target.value;
  }
  
  return LANGUAGE[0].value;
  */
};

export const setLanguageByLocale = (loc: string) => {
  if (loc.includes(REGION.EN)) {
    return ENG;
  }

  if (loc.includes(REGION.KO)) {
    return KOR;
  }

  if (loc.includes(REGION.ZH)) {
    return TWN;
  }

  if (loc.includes(REGION.VI)) {
    return VNM;
  }

  return KOR;

  /* TODO: 완전히 같은 Locale 찾는 것 
  const target = LANGUAGE.find(({ locale }) => locale === loc);

  if (target) {
    return target.value;
  }

  return LANGUAGE[0].value;
  */
};

export const updateRouteForLanguage = (router: NextRouter) => {
  if (router.locale == i18n.language) return;

  if (router.locales?.includes(i18n.language)) {
    router.replace(router.asPath, router.asPath, { locale: i18n.language });
  } else {
    if (router.locale === 'en') return;

    router.replace(router.asPath, router.asPath, {
      locale: 'en',
    });
  }
};
