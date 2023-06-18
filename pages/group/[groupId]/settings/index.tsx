import React from 'react';

import WithAuth from '@components/AuthRedirect';
import GroupSettingsPage from '@pages/Group/Settings';

const Page = () => {
  return <GroupSettingsPage />;
};

export default WithAuth(Page);
