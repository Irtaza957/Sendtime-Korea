import React from 'react';
import { useRouter } from 'next/router';

import useLoading from '@hooks/useLoading';
import Main from '@pages/Group/Main';

const Page = () => {
  const { query } = useRouter();
  const { groupId } = query;
  const { loadingView } = useLoading();

  if (typeof groupId === 'string') {
    return <Main groupId={`${groupId}`} />;
  }

  return <>{loadingView()}</>;
};

export default Page;
