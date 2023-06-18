import React from 'react';

import { PAGE_TYPE } from '@constants/utils';
import { toDateWithDash } from '@utils/time';

import GroupFirstPage from './Group';
import PersonalFirstPage from './Personal';

export const customDate = (startDate: Date, endDate: Date) => {
  // 밀리세컨즈를 제외하고 같은 날짜인지 확인하는 로직
  // (아니면 밀리세컨즈로 계산하기 때문에 같은 날짜라도 다른 시간으로 나옴)
  return {
    start: toDateWithDash(startDate),
    end: toDateWithDash(endDate),
  };
};

interface FirstPageProps {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
}

const FirstPage = ({ type = PAGE_TYPE.personal }: FirstPageProps) => {
  if (type === PAGE_TYPE.personal) {
    return <PersonalFirstPage />;
  }

  if (type === PAGE_TYPE.group) {
    return <GroupFirstPage />;
  }

  return <></>;
};

FirstPage.displayName = 'FirstPage';

export default FirstPage;
