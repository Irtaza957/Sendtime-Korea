import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { groupManageAPI } from '@api/group/invitation/Invitation';
import ReservationNavigationBar from '@components/ReservationNavigationBar';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { ROUTES } from '@constants/routes';
import { Radio } from '@contexts/ReservationProvider';
import usePagination from '@hooks/usePagination';
import useUserInfo from '@hooks/useUserInfo';
import { reservationPeriodInfo } from '@pages/Reservation';
import { AvailableTime, defaultChecked } from '@pages/SetTime';
import { korToEngWeekDay } from '@utils/time';

import { NewGroupContainer } from './index.styles';
import Page1 from './Page1';

export type GroupMakeInfoType = {
  title: string;
  description: string;
  term: { custom: Radio; days: Radio; infinite: Radio };
  availableDays: AvailableTime[];
  shareCalendar: boolean;
  customInputs: { id: string; value: string; required: boolean }[];
};

const PAGE_COUNT = 1;
const MakeNewGroup = () => {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const { page, goPrevPage, goNextPage } = usePagination();
  const { t } = useTranslation('createGroup');

  const [groupInfo, setGroupInfo] = useState<GroupMakeInfoType>({
    title: '',
    description: '',
    term: {
      custom: {
        start: new Date(),
        end: dayjs().add(30, 'day').toDate(),
        checked: false,
      },
      days: {
        start: new Date(),
        end: dayjs().add(30, 'day').toDate(),
        checked: false,
      },
      infinite: { start: new Date(), end: new Date(), checked: true },
    },
    availableDays: defaultChecked,
    shareCalendar: true,
    customInputs: [],
  });

  const { mutate: createGroup } = useMutation(
    () => {
      const openTimes = groupInfo.availableDays.map(
        ({ day, start, end, available }) => ({
          day: korToEngWeekDay(day),
          start,
          end,
          available,
        })
      ) as unknown as CreateGroupParams['openTimes'];

      return groupManageAPI.create({
        teamName: groupInfo.title,
        teamDescription: groupInfo.description,
        calendarOpenPeriodInfo: reservationPeriodInfo(groupInfo.term, userInfo),
        openTimes,
        masking: !groupInfo.shareCalendar,
        customFieldSettings: groupInfo.customInputs.map(
          ({ value, required }) => ({ label: value, required })
        ),
      });
    },
    {
      onSuccess: ({ data: { results } }) => {
        const groupInfo = results[0];
        const { teamName, teamId } = groupInfo;

        router.push(
          {
            pathname: ROUTES.GROUP.NEW_COMPLETED,
            query: { groupName: teamName, groupId: teamId },
          },
          ROUTES.GROUP.NEW_COMPLETED
        );
      },
    }
  );

  const prevPageCallback = () => {
    const isConfirmed = confirm(t('message.leavePageWarning'));

    if (isConfirmed) {
      router.push(ROUTES.GROUP.MANAGE);
    }
  };

  return (
    <WithSidebarComponent padding="0">
      <SideAreaContainer>
        <Title>{t('title')}</Title>

        <NewGroupContainer>
          <ReservationNavigationBar
            currentStep={page}
            maxStep={PAGE_COUNT}
            isLast={page === PAGE_COUNT}
            // onClickNext={page !== 2 ? () => goNextPage() : createGroup}
            onClickNext={createGroup}
            onClickBack={() => goPrevPage(1, prevPageCallback)}
            isNextButtonDisabled={!groupInfo.title}
          />
          <Page1 groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
          {/* {page === 2 && <Page2 setGroupInfo={setGroupInfo} />} */}
        </NewGroupContainer>
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default MakeNewGroup;
