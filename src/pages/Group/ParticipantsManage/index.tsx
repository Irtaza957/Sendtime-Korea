import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { GroupKeys, groupManageAPI } from '@api/group/invitation/Invitation';
import { coreUserState } from '@atoms/index';
import InvitationStatus from '@components/InvitationStatus';
import Navigation from '@components/Navigation';
import Participants from '@components/Participants';
import { ParticipantsType } from '@components/Participants/Participant';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { ROUTES } from '@constants/routes';
import useGroup from '@hooks/useGroup';
import useLoading from '@hooks/useLoading';
import { makeQueryString } from '@utils/etc';

const ParticipantsManage = () => {
  const router = useRouter();
  const user = useRecoilValue(coreUserState);
  const { groupId } = router.query;
  const { group } = useGroup({ groupId });
  const sGroupId = makeQueryString(groupId);
  const { loadingView } = useLoading();

  const {
    data: groupMemberList,
    refetch: refetchGroupMemberList,
    isLoading: isGroupMemberListLoading,
  } = useQuery(
    GroupKeys.getMembers(sGroupId),
    () => groupManageAPI.getMembers(sGroupId),
    {
      onSuccess: () => {},
      onError: (e: { message: string }) => {
        router.push(ROUTES.GROUP.MANAGE);
      },
    }
  );
  const { t } = useTranslation('memberSettingPage');

  const {
    data: invitationList,
    refetch: refetchInvitationList,
    isLoading: isInvitationListLoading,
  } = useQuery(GroupKeys.getInvitees(sGroupId), () =>
    groupManageAPI.getInvitees(sGroupId)
  );

  const members: ParticipantsType[] = (groupMemberList?.data.results ?? []).map(
    (m) => {
      if (m.memberId === user?.id) return { ...m, status: t('me') };
      return m;
    }
  );
  const myInfo = members.find(({ memberId }) => memberId === user?.id);
  const withoutMe = members.filter(({ memberId }) => memberId !== user?.id);

  const sortedMember = myInfo ? [myInfo, ...withoutMe] : members;

  const invitees: ParticipantsType[] = invitationList?.data.results ?? [];

  const items = [
    {
      title: t('tab.members'),
      onClick: refetchGroupMemberList,
      contents: (
        <Participants
          participantList={sortedMember}
          groupId={makeQueryString(groupId)}
          refetch={refetchGroupMemberList}
        />
      ),
      dataLength: members.length,
    },
    {
      title: t('tab.status'),
      onClick: refetchInvitationList,
      contents: (
        <InvitationStatus
          groupId={makeQueryString(groupId)}
          invitationList={invitees}
          refetch={refetchInvitationList}
        />
      ),
      dataLength: invitees.length,
    },
  ];

  if (isGroupMemberListLoading || isInvitationListLoading) {
    return <>{loadingView()}</>;
  }

  return (
    <WithSidebarComponent>
      <SideAreaContainer>
        <Title margin="0 0 33px 0">
          {t('title')} ({group?.teamName ?? ''})
        </Title>
        <Navigation navItems={items} pagination={false} />
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default ParticipantsManage;
