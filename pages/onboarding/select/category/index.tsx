import React from 'react';

import WithAuth from '@components/AuthRedirect';
import SelectCategory from '@pages/SelectCategory';

const Page = () => {
  return <SelectCategory />;
};

export default WithAuth(Page);
