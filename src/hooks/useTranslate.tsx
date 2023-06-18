import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import SmallSelectTextInput from '@components/SmallSelectTextInput';
import { LNG } from '@constants/language';
import styled from '@emotion/styled';
import {
  detectLanguageLocale,
  detectLanguageValue,
  ENG,
  KOR,
  setLanguageByLocale,
  TWN,
  updateRouteForLanguage,
  VNM,
} from '@utils/language';

import useUserInfo from './useUserInfo';

export const Dropdown = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: var(--semi-middle);
`;

export const LOCALES = [
  { value: KOR, locale: LNG.ko_KR },
  { value: ENG, locale: LNG.en_US },
  { value: TWN, locale: LNG.zh_TW },
  { value: VNM, locale: LNG.vi_VN },
];

const useTranslate = () => {
  const { t, i18n } = useTranslation('common');
  const [language, setLanguage] = useState(detectLanguageValue(i18n.language));
  const { userInfo, saveUserInfo } = useUserInfo();
  const router = useRouter();

  const toggleLocales = useCallback(
    (locale: string) => {
      const lng = detectLanguageValue(locale);

      i18n.changeLanguage(locale);
      setLanguage(lng);
    },
    [i18n]
  );

  const handleSelectBox = (e: MouseEvent<HTMLButtonElement>) => {
    const locale = detectLanguageLocale(e.currentTarget.innerText);
    const language = detectLanguageValue(e.currentTarget.innerText);

    setLanguage(language);
    toggleLocales(locale);
    saveUserInfo();

    updateRouteForLanguage(router);
  };

  useEffect(() => {
    const currentLanguage = setLanguageByLocale(i18n.language);
    i18n.changeLanguage(i18n.language.split('-')[0]);
    setLanguage(currentLanguage);

    updateRouteForLanguage(router);
  }, []);

  // useEffect(() => {
  //   if (userInfo) {
  //     const locale = userInfo.locale;
  //     if (locale) {
  //       toggleLocales(locale);
  //     }
  //   }
  // }, [userInfo]);

  const selectView = ({ dropdownAbove }: { dropdownAbove: boolean }) => {
    return (
      <Dropdown>
        <SmallSelectTextInput
          value={language}
          selectValues={LOCALES}
          onClickSelectBox={handleSelectBox}
          dropdownAbove={dropdownAbove}
        />
      </Dropdown>
    );
  };

  return {
    selectView,
    i18n,
    setLanguage,
    toggleLocales,
    handleSelectBox,
    updateRouteForLanguage,
    language,
  };
};

export default useTranslate;
