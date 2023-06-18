import React from 'react';

import WithAuth from '@components/AuthRedirect';
import SyncSheetBridge from '@pages/Sync/Sheets';

const Page = () => {
  return <SyncSheetBridge />;
};

export default WithAuth(Page);
