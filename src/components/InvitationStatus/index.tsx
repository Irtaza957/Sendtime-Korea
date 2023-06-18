import React from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import Participants from '@components/Participants';
import { ParticipantsType } from '@components/Participants/Participant';
import { useNestedModal } from '@contexts/NestedModalProvider';
import GroupInvitation from '@pages/Group/Invitation';

import { InvitationNotice, InvitationStatusContainer } from './index.styles';

interface InvitationStatusProps {
  invitationList: ParticipantsType[];
  groupId: string;
  refetch?: () => void;
}
const InvitationStatus = ({
  invitationList,
  groupId,
  refetch,
}: InvitationStatusProps) => {
  const { showModal, hideModal } = useNestedModal({
    type: 'custom',
    customModal: (
      <GroupInvitation groupId={groupId} handleClose={() => hideModal()} />
    ),
  });

  const { t } = useTranslation('memberSettingPage');

  return (
    <InvitationStatusContainer>
      <InvitationNotice>
        {t('guide.title')}
        <StyledButton
          borderRadius={50}
          padding="8px 15px"
          onClickButton={() => showModal()}
        >
          {t('guide.invite')}
        </StyledButton>
      </InvitationNotice>
      <Participants
        participantList={invitationList}
        groupId={groupId}
        refetch={refetch}
        invite
      />
    </InvitationStatusContainer>
  );
};

export default InvitationStatus;
