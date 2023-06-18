import React from 'react';

import { PAGE_TYPE } from '@constants/utils';

import GroupSecondPage from './Group';
import PersonalSecondPage from './Personal';

interface SecondPageProps {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
}

const SecondPage = ({ type = PAGE_TYPE.personal }: SecondPageProps) => {
  if (type === PAGE_TYPE.personal) {
    return <PersonalSecondPage />;
  }

  if (type === PAGE_TYPE.group) {
    return <GroupSecondPage />;
  }

  return <></>;
};

export default SecondPage;
