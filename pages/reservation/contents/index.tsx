import React from 'react';

import WithAuth from '@components/AuthRedirect';
import ReservationContents from '@pages/GuestReservation/ReservationContents';

const Page = () => {
  return <ReservationContents />;
};

export default WithAuth(Page);
