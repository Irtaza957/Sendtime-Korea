import React from 'react';

import WithAuth from '@components/AuthRedirect';
import QrList from '@pages/QrList';

const Page = () => {
  return <QrList />;
};

export default WithAuth(Page);
