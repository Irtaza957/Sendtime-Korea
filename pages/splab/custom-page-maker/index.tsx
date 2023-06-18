import React from 'react';

import WithAuth from '@components/AuthRedirect';
import MakeCustomPage from '@pages/CustomPage/MakeCustomPage';

const Page = () => {
  return <MakeCustomPage />;
};

export default WithAuth(Page);
