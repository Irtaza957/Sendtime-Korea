import React from 'react';

import WithAuth from '@components/AuthRedirect';
import SelectCalendar from '@pages/SelectCalendar';

const Page = () => {
  return <SelectCalendar />;
};

export default WithAuth(Page);
