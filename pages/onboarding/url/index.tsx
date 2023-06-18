import React from 'react';

import WithAuth from '@components/AuthRedirect';
import MakeOwnUrl from '@pages/MakeOwnUrl';

const Page = () => {
  return <MakeOwnUrl />;
};

export default WithAuth(Page);
