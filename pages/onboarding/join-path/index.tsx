import React from 'react';

import WithAuth from '@components/AuthRedirect';
import JoinPath from '@pages/JoinPath';

const Page = () => {
  return <JoinPath />;
};

export default WithAuth(Page);
