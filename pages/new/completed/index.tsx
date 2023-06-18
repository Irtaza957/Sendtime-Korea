import React from 'react';

import WithAuth from '@components/AuthRedirect';
import ReservationCompleted from '@pages/ReservationCompleted';

const Page = () => {
  return <ReservationCompleted />;
};

export default WithAuth(Page);
