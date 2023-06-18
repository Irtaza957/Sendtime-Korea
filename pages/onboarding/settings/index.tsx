import React from 'react';

import WithAuth from '@components/AuthRedirect';
import SetTime from '@pages/SetTime';

const Settings = () => {
  return <SetTime />;
};

export default WithAuth(Settings);
