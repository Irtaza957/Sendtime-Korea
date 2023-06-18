import React, { useEffect, useState } from 'react';

import { ModalDefault } from '@pages/Group/Manage';

import { ParticipantsGrid } from './index.styles';
import Participant, { ParticipantsType } from './Participant';

interface ParticipantsProps {
  participantList: ParticipantsType[];
  invite?: boolean;
  groupId: string;
  refetch?: () => void;
}
const Participants = ({
  participantList,
  invite = false,
  groupId,
  refetch,
}: ParticipantsProps) => {
  const mDefault: ModalDefault[] = participantList.map((_, id) => ({
    id,
    checked: false,
  }));
  const [modalDefault, setModalDefault] = useState<ModalDefault[]>([]);

  useEffect(() => {
    setModalDefault(mDefault);
  }, [participantList]);

  return (
    <ParticipantsGrid>
      {participantList.map((p, idx) => (
        <Participant
          key={idx}
          {...p}
          invite={invite}
          /* 모달 관런 */
          modalDefault={modalDefault}
          setModalDefault={setModalDefault}
          modalIdx={idx}
          groupId={groupId}
          refetch={refetch}
        />
      ))}
    </ParticipantsGrid>
  );
};

export default Participants;
