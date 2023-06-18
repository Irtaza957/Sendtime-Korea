import React from 'react';

import WithAuth from '@components/AuthRedirect';
import ReservationManage from '@pages/ReservationManage';

const Page = () => {
  return <ReservationManage />;
};

export default WithAuth(Page);
