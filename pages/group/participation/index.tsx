import React from 'react';

import WithAuth from '@components/AuthRedirect';
import GroupParticipation from '@pages/Group/Participation';

const Page = () => {
  return <GroupParticipation />;
};

export default WithAuth(Page);
