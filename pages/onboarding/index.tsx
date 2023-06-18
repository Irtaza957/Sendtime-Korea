import React from 'react';

import WithAuth from '@components/AuthRedirect';
import OnboadingInit from '@pages/OnboardingInit';

const Page = () => {
  return <OnboadingInit />;
};

export default WithAuth(Page);
