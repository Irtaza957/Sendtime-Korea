import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import MediaQuery from 'react-responsive';

import {
  groupCalendarAPI,
  GroupCalendarKeys,
} from '@api/group/calendar/GroupCalendar';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { USER_ID } from '@constants/account';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';
import { Icon } from '@iconify/react';
import { translateDateRange } from '@utils/format';
import { getLocalStorage, setSessionStorage } from '@utils/storage';

import GroupCalendarPage from '../Calendar';
import MemberSidebar from '../MemberSidebar';
import { GroupSection } from '../MemberSidebar/index.styles';

import { GroupContainer, GroupOpenPeriod, GroupTitle } from './index.styles';

const defaultGroupDetail: GroupDetail = {
  teamId: '',
  createDateTime: '',
  createMemberId: '',
  teamName: '',
  customUrl: '',
  teamDescription: '',
  calendarOpenPeriodString: '',
  calendarOpenPeriodDateTime: {
    startDateTime: '',
    endDateTime: '',
  },
  teamMembers: [],
};

interface MainProps {
  groupId: string;
}

const Main = ({ groupId }: MainProps) => {
  const router = useRouter();
  const { loadingView } = useLoading();

  const userId = getLocalStorage(USER_ID) ?? undefined;

  const [activeMembers, setActiveMembers] = useState<GroupMember[]>([]);

  const participants = activeMembers.map(({ memberId }) => memberId).join(',');

  useEffect(() => {
    setSessionStorage('g', groupId);

    if (participants) {
      setSessionStorage('p', participants);
    }
  }, [participants, groupId]);

  const {
    data: teamDetailData,
    isLoading,
    refetch: getTeamData,
  } = useQuery(
    GroupCalendarKeys.getGroupDetails(),
    () => groupCalendarAPI.getGroupDetails(groupId),
    {
      onSuccess: ({ data: { results } }) => {},
      onError: (error: Error) => {
        alert(error.message);
        router.push(ROUTES.GROUP.MANAGE);
      },
      enabled: groupId !== '',
    }
  );

  useEffect(() => {
    if (groupId) {
      getTeamData();
      setActiveMembers([]);
    }
  }, [groupId]);

  const teamDetails = teamDetailData?.data.results[0] || defaultGroupDetail;

  useEffect(() => {
    const me = teamDetails.teamMembers.find(
      ({ memberId }) => memberId === userId
    );

    if (!me) return;
    setActiveMembers([me]);
  }, [userId, teamDetails]);

  const handleMemberClick = (member: GroupMember) => {
    setActiveMembers((prev) => {
      const copy = [...prev];
      const targetMember = copy.find(
        ({ memberId }) => memberId === member.memberId
      );
      if (!targetMember) return [...prev, member];

      const filtered = copy.filter(
        ({ memberId }) => memberId !== member.memberId
      );
      return filtered;
    });
  };

  const handleAllMemberClick = () => {
    if (teamDetails.teamMembers.length === activeMembers.length) {
      setActiveMembers([]);
      return;
    }

    setActiveMembers(teamDetails.teamMembers);
  };
  const { t } = useTranslation('groupHome');

  return (
    <GroupContainer>
      {isLoading && loadingView()}
      <WithSidebarComponent padding="0">
        <SideAreaContainer padding="33px 0 0 170px">
          <MemberSidebar
            members={teamDetails.teamMembers}
            onMemberClick={handleMemberClick}
            onAllMemberClick={handleAllMemberClick}
            activeMembers={activeMembers}
            groupId={groupId}
            teamName={teamDetails.teamName}
          />
          <GroupSection>
            <Title margin="0 0 5px 0" notice={teamDetails.teamDescription}>
              <GroupTitle>
                {teamDetails.teamName}
                {t('title')}
                <MediaQuery minWidth={819}>
                  <GroupOpenPeriod>
                    <Icon icon="bx:calendar" color="#60666D" width={18} />
                    <span style={{ fontWeight: 'var(--normal)' }}>
                      {t('openDuration')}:{' '}
                    </span>
                    {translateDateRange(teamDetails.calendarOpenPeriodString)}
                  </GroupOpenPeriod>
                </MediaQuery>
              </GroupTitle>
            </Title>

            <GroupCalendarPage
              groupId={groupId}
              activeMembers={activeMembers}
              validRange={teamDetails.calendarOpenPeriodDateTime}
            />
          </GroupSection>
        </SideAreaContainer>
      </WithSidebarComponent>
    </GroupContainer>
  );
};

export default Main;
