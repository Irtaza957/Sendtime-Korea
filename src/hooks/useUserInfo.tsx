import { ChangeEvent, MouseEvent, useState } from 'react';
import { ACCESS_TOKEN_COOKIE_KEY, cookie } from 'helper/TokenManager';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import {
  calendarSettingAPI,
  timeZoneAPI,
  TimezoneQueryKeys,
  userInfoAPI,
  UserInfoQueryKeys,
} from '@api/user/UserInfo';
import { timezoneState, userState } from '@atoms/index';
import * as Sentry from '@sentry/browser';

import useSnackbar from './useSnackbar';

const useUserInfo = () => {
  const c = cookie as unknown as { cookies: { st_access_token?: string } };
  const isLoggedIn = !!c.cookies[ACCESS_TOKEN_COOKIE_KEY];
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [timezones, setTimezones] = useRecoilState(timezoneState);
  const [customLocationInputValue, setCustomLocationInputValue] = useState('');
  const showSnackbar = useSnackbar();
  const { i18n } = useTranslation();

  const {
    data: userInfoData,
    refetch: refetchUserData,
    isLoading: isUserDataLoading,
  } = useQuery(UserInfoQueryKeys.get(), userInfoAPI.getInfo, {
    onSuccess: ({ data: { results } }) => setUserInfo(results[0]),
    onError: (error) => console.error(error),
    refetchOnWindowFocus: false,
    // cacheTime: 0,
    enabled: isLoggedIn ? true : false,
  });

  const { refetch: refetchTimezone, isLoading: isTimezoneLoading } = useQuery(
    TimezoneQueryKeys.get(),
    timeZoneAPI.getTimezones,
    {
      onSuccess: ({ data: { results } }) => setTimezones(results),
      onError: (error) => console.error(error),
    }
  );

  const { mutate: sendUserInfo } = useMutation(userInfoAPI.updateInfo, {
    onSuccess: ({ data: { results } }) => saveUserAdvanceSettings(),
    onError: (error) => {
      Sentry.captureException(error);
      console.error(error);
    },
  });

  const setName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevValue) => {
      if (!prevValue) return null;
      return {
        ...prevValue,
        name: target.value,
      };
    });
  };

  const setTimezone = (timezone: Timezone) => {
    setUserInfo((prevValue) => {
      if (!prevValue) return null;
      return {
        ...prevValue,
        timezone: timezone,
      };
    });
  };

  const setPhone = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevValue) => {
      if (!prevValue) return null;
      return {
        ...prevValue,
        phone: target.value,
      };
    });
  };

  const setLocation = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCustomLocationInputValue(target.value);
  };

  const addFavoritePlaces = () => {
    if (!customLocationInputValue.trim()) return;
    setUserInfo((prevValue) => {
      if (!prevValue) return null;
      return {
        ...prevValue,
        favoritePlaces: [
          ...prevValue.favoritePlaces,
          { id: nanoid(), name: customLocationInputValue },
        ],
      };
    });

    setCustomLocationInputValue('');
  };

  const deleteFavoritePlaces = (locationId: string) => {
    setUserInfo((prevValue) => {
      if (!prevValue) return null;

      const result = prevValue.favoritePlaces.filter(
        ({ id }) => locationId !== id
      );
      return { ...prevValue, favoritePlaces: result };
    });
  };

  const onClickDailyTimeCheckbox = (targetDay: OpenTime['day']) => {
    setUserInfo((prevValue) => {
      if (!prevValue) return null;

      const copy = [...prevValue.openTimes];
      const target = copy.find(({ day }) => day === targetDay);
      const targetIdx = copy.findIndex(({ day }) => day === targetDay);

      if (target) {
        copy.splice(targetIdx, 1, {
          ...target,
          available: !target.available,
        });

        return { ...prevValue, openTimes: copy };
      }

      return prevValue;
    });
  };

  const setDayStartTime = (
    { currentTarget }: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => {
    const time = currentTarget.innerText;
    setUserInfo((prevValue) => {
      if (!prevValue) return null;

      const copy = [...prevValue.openTimes];
      const target = copy.find(({ day }) => day === targetDay);
      const targetIdx = copy.findIndex(({ day }) => day === targetDay);

      if (target) {
        copy.splice(targetIdx, 1, {
          ...target,
          start: time,
        });

        return { ...prevValue, openTimes: copy };
      }

      return prevValue;
    });
  };

  const setDayEndTime = (
    { currentTarget }: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => {
    const time = currentTarget.innerText;
    setUserInfo((prevValue) => {
      if (!prevValue) return null;

      const copy = [...prevValue.openTimes];
      const target = copy.find(({ day }) => day === targetDay);
      const targetIdx = copy.findIndex(({ day }) => day === targetDay);

      if (target) {
        copy.splice(targetIdx, 1, {
          ...target,
          end: time,
        });

        return { ...prevValue, openTimes: copy };
      }

      return prevValue;
    });
  };

  const { mutate: setAdvancedSettings } = useMutation(
    ({ accepted, declined, tentative, needsAction }: AdvancedOptionsParams) =>
      calendarSettingAPI.setAdvancedSetting({
        accepted,
        declined,
        tentative,
        needsAction,
      }),
    {
      onSuccess: ({ data: { results } }) => refetchUserData(),
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  const saveUserInfo = () => {
    if (!userInfo) return;

    const userInfoToSend: UpdateMyPageRequestParams = {
      name: userInfo.name,
      phone: userInfo.phone,
      openTimes: userInfo.openTimes,
      favoritePlaces: userInfo.favoritePlaces.map(({ id, name }) => ({
        id,
        name,
      })),
      timezone: userInfo.timezone,
      locale: i18n.language,
    };

    sendUserInfo(userInfoToSend);
  };

  const saveUserAdvanceSettings = () => {
    if (!userInfo) return;

    const settings = {
      accepted: userInfo.syncOption.accepted,
      declined: userInfo.syncOption.declined,
      tentative: userInfo.syncOption.tentative,
      needsAction: userInfo.syncOption.needsAction,
    };

    setAdvancedSettings(settings);
  };

  const onSubmitUserInfo = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveUserInfo();

    showSnackbar({ message: '내 정보가 저장되었어요.' });
  };

  return {
    userInfo,
    setUserInfo,
    isUserDataLoading,
    refetchUserData,
    setName,
    setPhone,
    addFavoritePlaces,
    deleteFavoritePlaces,
    customLocationInputValue,
    setLocation,
    onClickDailyTimeCheckbox,
    setDayStartTime,
    setDayEndTime,
    saveUserInfo,
    onSubmitUserInfo,
    setAdvancedSettings,
    setTimezone,
    refetchTimezone,
    isTimezoneLoading,
    timezones,
  };
};

export default useUserInfo;
