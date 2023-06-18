import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import TopNavigation from '@components/Navigation/TopNavigation';

import { GroupParticipantContainer } from './index.styles';
import MainInfo from './MainInfo';

const GroupParticipation = () => {
  const router = useRouter();
  const { groupId, isNew } = router.query;

  useEffect(() => {
    if (!groupId) {
      alert('초대받지 않은 사용자입니다. 다시 시도해주세요.');
      router.back();
    }
  }, []);

  return (
    <>
      <TopNavigation />
      <GroupParticipantContainer>
        <MainInfo
          groupId={typeof groupId === 'string' ? groupId : ''}
          isNew={isNew}
        />
      </GroupParticipantContainer>
    </>
  );
};

export default GroupParticipation;
