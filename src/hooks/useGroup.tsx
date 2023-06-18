import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import {
  groupCalendarAPI,
  GroupCalendarKeys,
} from '@api/group/calendar/GroupCalendar';

type useGroupProps = {
  groupId: string | string[] | undefined;
};
const useGroup = ({ groupId }: useGroupProps) => {
  const router = useRouter();
  const { data: groupList } = useQuery(
    GroupCalendarKeys.getList(),
    groupCalendarAPI.getList,
    {
      onError: (error) => console.error(error),
      enabled: !!groupId,
    }
  );
  const groups = groupList?.data.results[0];
  const group = groups?.find(({ teamId }) => teamId === groupId);

  // if (!checkQuery(groupId)) {
  //   alert('문제가 생겼습니다. 다시 시도해주세요.');
  //   router.back();
  // }

  return { group };
};

export default useGroup;
