import React from 'react';

import WithAuth from '@components/AuthRedirect';
import AutoSigninCompleted from '@pages/SignIn/AutoSigninCompleted';

const Page = () => {
  return <AutoSigninCompleted />;
};

export default WithAuth(Page);
