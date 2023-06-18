import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { GroupSettings, ParticipantsSettings } from '@Icon/Icons/Group';
import { PlusWithBorder } from '@Icon/Icons/Utils';
import CustomIcon from '@Icon/index';

import GroupInvitation from '../Invitation';

import {
  Member,
  MemberContainer,
  MemberSidebarContainer,
  Name,
  Organization,
  PlusButton,
  SelectAll,
  Settings,
  SettingsButton,
  SidebarTitle,
  SidebarTop,
} from './index.styles';

interface MemberSidebarProps {
  members: GroupMember[];
  onMemberClick: (member: GroupMember) => void;
  onAllMemberClick: () => void;
  activeMembers: GroupMember[];
  groupId: string;
  teamName: string;
}

const MemberSidebar = ({
  members,
  onMemberClick,
  onAllMemberClick,
  activeMembers,
  groupId,
  teamName,
}: MemberSidebarProps) => {
  const router = useRouter();
  const { showModal, hideModal } = useNestedModal({
    type: 'custom',
    customModal: (
      <GroupInvitation groupId={groupId} handleClose={() => hideModal()} />
    ),
  });

  const handleInvitation = () => {
    showModal();
  };

  const handleMemberManage = () => {
    const url = ROUTES.GROUP.PARTICIPANTS.replace('[groupId]', groupId);
    router.push(url);
  };

  const handleGroupManage = () => {
    const url = ROUTES.GROUP.SETTINGS.replace('[groupId]', groupId);
    router.push(url);
  };
  const { t } = useTranslation('groupHome');

  return (
    <MemberSidebarContainer>
      <SidebarTop>
        <SidebarTitle>
          {t('sidebar.attendees')}
          <PlusButton onClick={handleInvitation}>
            <CustomIcon size={18} stroke="none" fill="purple-500">
              <PlusWithBorder />
            </CustomIcon>
          </PlusButton>
        </SidebarTitle>
        <SelectAll onClick={onAllMemberClick}>
          {members.length === activeMembers.length
            ? t('sidebar.allDeselect')
            : t('sidebar.allSelect')}
        </SelectAll>

        <MemberContainer>
          {(members ?? []).map((member, idx) => {
            const isActive = !!activeMembers.find(
              ({ memberId }) => memberId === member.memberId
            );

            return (
              <Member
                key={idx}
                onClick={() => onMemberClick(member)}
                active={isActive}
                color={member.color}
              >
                <Name>{member.name}</Name>
                <Organization>{member.organization}</Organization>
              </Member>
            );
          })}
        </MemberContainer>
      </SidebarTop>

      <Settings>
        <SettingsButton onClick={handleMemberManage}>
          <CustomIcon size={20} height={18} stroke="none" fill="gray-750">
            <ParticipantsSettings />
          </CustomIcon>
          {t('sidebar.memberSetting')}
        </SettingsButton>
        <SettingsButton onClick={handleGroupManage}>
          <CustomIcon size={20} height={16} stroke="none" fill="gray-750">
            <GroupSettings />
          </CustomIcon>
          {t('sidebar.groupSetting')}
        </SettingsButton>
      </Settings>
    </MemberSidebarContainer>
  );
};

export default MemberSidebar;
