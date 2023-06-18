import React from 'react';

import WithAuth from '@components/AuthRedirect';
import MyPage from '@pages/MyPage';

const Page = () => {
  return <MyPage />;
};

export default WithAuth(Page);
