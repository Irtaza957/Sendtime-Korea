import React from 'react';

import WithAuth from '@components/AuthRedirect';
import Manage from '@pages/Group/Manage';

const Page = () => {
  return <Manage />;
};

export default WithAuth(Page);
