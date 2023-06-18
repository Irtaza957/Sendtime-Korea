import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyView from '@components/EmptyView';
import ScheduleItem from '@components/ScheduleItem';

export type ReservationManage = 'upcoming' | 'pending' | 'past';

interface ScheduleTabProps {
  data: MyReservationManage[];
  pending?: boolean;
  past?: boolean;
  upcoming?: boolean;
  searchValue?: string;
  handleSearchInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ScheduleTab = ({
  data,
  pending = false,
  past = false,
  upcoming = false,
  searchValue,
  handleSearchInput,
}: ScheduleTabProps) => {
  const { t } = useTranslation('eventHistoryPage');

  const content = () => {
    if (pending) {
      return t('pending.noEvent');
    }
    if (past) {
      return t('passed.noEvent');
    }
    if (upcoming) {
      return t('upcoming.noEvent');
    }

    return '';
  };

  return (
    <>
      {!data.length || !data[0].reservations.length ? (
        <EmptyView content={content()} />
      ) : (
        // <CalendarEventsContainer>
        //   <FilterContainer>
        //     <StyledButton
        //       icon={{ icon: 'mi:filter', width: 20 }}
        //       bgColor="white"
        //       color="gray-700"
        //       padding="5px 8px"
        //       boxShadow="0px 0px 4px 0px #75879525"
        //     >
        //       필터
        //     </StyledButton>
        //     {searchValue && handleSearchInput && (
        //       <Search
        //         value={searchValue}
        //         onChange={handleSearchInput}
        //         placeholder="예약 일정을 검색해주세요."
        //       />
        //     )}
        //   </FilterContainer>
        <>
          {data.map((d, idx) => (
            <ScheduleItem
              key={idx}
              schedule={d}
              pending={pending}
              past={past}
            />
          ))}
        </>
        // </CalendarEventsContainer>
      )}
    </>
  );
};

export default ScheduleTab;
