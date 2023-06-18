import React from 'react';

import WithAuth from '../../../src/components/AuthRedirect';
import ZoomBridge from '../../../src/pages/ZoomBridge';

const Page = () => {
  return <ZoomBridge />;
};

export default WithAuth(Page);
