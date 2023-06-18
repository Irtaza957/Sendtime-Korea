import React from 'react';

import WithAuth from '../../../src/components/AuthRedirect';
import SlackBridge from '../../../src/pages/SlackBridge';

const Page = () => {
  return <SlackBridge />;
};

export default WithAuth(Page);
