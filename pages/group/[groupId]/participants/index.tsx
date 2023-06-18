import React from 'react';

import WithAuth from '@components/AuthRedirect';
import ParticipantsManage from '@pages/Group/ParticipantsManage';

const Page = () => {
  return <ParticipantsManage />;
};

export default WithAuth(Page);
