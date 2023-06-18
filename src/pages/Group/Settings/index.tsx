import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import {
  groupSettingAPI,
  GroupSettingKeys,
} from '@api/group/settings/settings';
import StyledButton from '@components/Button';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { ENG_TO_KOR_SHORT_WD } from '@constants/time';
import useGroup from '@hooks/useGroup';
import useLoading from '@hooks/useLoading';
import useSnackbar from '@hooks/useSnackbar';
import useTimeout from '@hooks/useTimeout';
import { MyPageContainer } from '@pages/MyPage/index.styles';
import { AvailableTime, defaultChecked } from '@pages/SetTime';
import * as Sentry from '@sentry/browser';
import { makeQueryString } from '@utils/etc';
import { korToEngWeekDay } from '@utils/time';

import DeleteSection from './DeleteSection';
import InfoSection from './InfoSection';
import InvitationSection from './InvitationSection';
import PageSection from './PageSection';

export interface GroupSettingInfoType {
  title: string;
  description: string;
  availableDays: AvailableTime[];
  locations: FavoritePlaces[];
  customInputs: { id: string; value: string; required: boolean }[];
}

const DEFAULT_OPEN_PERIOD = '1900.01.01 - 2999.01.01';
const defaultGroupInfo = {
  title: '',
  description: '',
  locations: [],
  availableDays: defaultChecked,
  customInputs: [],
};
const GroupSettingsPage = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const { group } = useGroup({ groupId });
  const { loadingView } = useLoading();
  const showSnackbar = useSnackbar();

  const [groupInfo, setGroupInfo] =
    useState<GroupSettingInfoType>(defaultGroupInfo);

  const { mutate: saveGroupInfo } = useMutation(
    () =>
      groupSettingAPI.updateInfo(makeQueryString(groupId), {
        teamName: groupInfo.title,
        teamDescription: groupInfo.description,
        favoritePlaces: groupInfo.locations.map((i) => ({
          id: i.id,
          name: i.name,
          type: 'CUSTOM',
        })),
        openTimes: groupInfo.availableDays.map(
          ({ day, start, end, available }) => ({
            day: korToEngWeekDay(day),
            start,
            end,
            available,
          })
        ) as unknown as CreateGroupParams['openTimes'],
        customFieldSettings: groupInfo.customInputs.map(
          ({ value, required }) => ({
            label: value,
            required,
          })
        ),
      }),
    {
      onSuccess: ({ data: { results } }) => {
        refetchGroupInfo();
        showSnackbar({ message: i18next.t('groupSettingPage:saved') });
      },
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  useTimeout(() => {
    saveGroupInfo();
    showSnackbar({ message: i18next.t('groupSettingPage:saved') });
  }, 10000);

  const {
    data,
    isLoading,
    refetch: refetchGroupInfo,
  } = useQuery(
    GroupSettingKeys.get(),
    () => groupSettingAPI.getSettings(makeQueryString(groupId)),
    {
      onSuccess: ({ data: { results } }) => {},
      enabled: !!groupId,
    }
  );

  const defaultInfo = data?.data.results[0];
  const { t } = useTranslation('groupSettingPage');

  const defaultData = {
    title: defaultInfo?.teamName ?? '',
    description: defaultInfo?.teamDescription ?? '',
    locations: defaultInfo?.favoritePlaces ?? [],
    availableDays:
      defaultInfo?.openTimes.map(({ day, start, end, available }, id) => ({
        id,
        day: ENG_TO_KOR_SHORT_WD[day],
        start,
        end,
        available,
      })) ?? defaultChecked,
    customInputs:
      (defaultInfo?.customFieldSettings ?? []).map((c) => ({
        id: nanoid(),
        value: c.label,
        required: c.required,
      })) ?? [],
  };

  if (!defaultInfo || isLoading) return <>{loadingView()}</>;

  const infoSectionDefault = {
    title: defaultData.title,
    description: defaultData.description,
  };
  const pageSectionDefault = {
    calendarOpenPeriod: {
      start: dayjs(defaultInfo?.calendarOpenPeriod.startDateTime).toDate(),
      end: dayjs(defaultInfo?.calendarOpenPeriod.endDateTime).toDate(),
    },
    availableDays: defaultData.availableDays,
    locations: defaultData.locations,
  };
  const pageInvitationDefault = {
    customInputs: defaultData.customInputs,
  };

  return (
    <WithSidebarComponent>
      {isLoading && loadingView()}
      <SideAreaContainer>
        <Title margin="0 0 33px 0">
          {defaultInfo?.teamName} {t('setting')}
        </Title>
        <MyPageContainer>
          <InfoSection
            setGroupInfo={setGroupInfo}
            defaultInfos={infoSectionDefault}
          />
          <PageSection
            setGroupInfo={setGroupInfo}
            defaultInfos={pageSectionDefault}
          />
          <InvitationSection
            setGroupInfo={setGroupInfo}
            defaultInfos={pageInvitationDefault}
          />
          <DeleteSection groupId={makeQueryString(groupId)} />
          <StyledButton onClickButton={() => saveGroupInfo()} borderRadius={50}>
            {i18next.t('groupSettingPage:saveBtn')}
          </StyledButton>
        </MyPageContainer>
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default GroupSettingsPage;
