import React from 'react';

import WithAuth from '@components/AuthRedirect';
import GroupNewReservationCompleted from '@pages/Group/New/Completed';

const Page = () => {
  return <GroupNewReservationCompleted />;
};

export default WithAuth(Page);
