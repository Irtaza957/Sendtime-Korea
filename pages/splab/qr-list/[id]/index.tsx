import React from 'react';

import WithAuth from '@components/AuthRedirect';
import QrPrintPage from '@pages/QrList/QrPrintPage';

const Page = () => {
  return <QrPrintPage />;
};

export default WithAuth(Page);
