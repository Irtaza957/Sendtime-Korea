import React from 'react';

import WithAuth from '@components/AuthRedirect';
import MakeNewGroup from '@pages/Group/New';

const Page = () => {
  return <MakeNewGroup />;
};

export default WithAuth(Page);
