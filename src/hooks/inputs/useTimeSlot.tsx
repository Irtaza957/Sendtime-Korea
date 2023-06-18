import React, { MouseEvent, useState } from 'react';

import DailyTimeSelect from '@components/DailyTimeSelect';
import { Box, SubContainer } from '@components/Reservation/index.styles';
import { ENG_TO_KOR_SHORT_WD } from '@constants/time';
import { DailyTimes } from '@contexts/ReservationProvider';
import { AvailableTime, defaultChecked } from '@pages/SetTime';

const useTimeSlot = (defaultTimeSlot?: AvailableTime[]) => {
  const [availableDays, setAvailableDays] = useState(
    defaultTimeSlot ?? defaultChecked
  );

  const handleDayOfWeek = (targetDay: OpenTime['day']) => {
    setAvailableDays((prev) => {
      const copy = [...prev];
      const idx = copy.findIndex(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );
      const target = copy.find(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );

      if (target) {
        copy.splice(idx, 1, { ...target, available: !target.available });
      }

      return copy;
    });
  };

  const handleStartSelectBox = (
    event: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => {
    const newEndTime = event.currentTarget
      .innerText as unknown as DailyTimes['start'];

    setAvailableDays((prev) => {
      const copy = [...prev];
      const target = copy.find(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );
      const targetIdx = copy.findIndex(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );

      if (target) {
        const newTarget = { ...target, start: newEndTime };
        copy.splice(targetIdx, 1, newTarget);

        return copy;
      }

      return prev;
    });
  };

  const handleEndSelectBox = (
    event: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => {
    const newEndTime = event.currentTarget
      .innerText as unknown as DailyTimes['end'];

    setAvailableDays((prev) => {
      const copy = [...prev];
      const target = copy.find((c) => c.day === ENG_TO_KOR_SHORT_WD[targetDay]);
      const targetIdx = copy.findIndex(
        (c) => c.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );

      if (target) {
        const newTarget = { ...target, end: newEndTime };
        copy.splice(targetIdx, 1, newTarget);

        return copy;
      }

      return prev;
    });
  };

  const TimeSlotView = () => {
    return (
      <SubContainer>
        <Box>
          <DailyTimeSelect
            openTimes={availableDays}
            onClickCheckbox={handleDayOfWeek}
            onClickStartSelectBox={handleStartSelectBox}
            onClickEndSelectBox={handleEndSelectBox}
          />
        </Box>
      </SubContainer>
    );
  };
  return { availableDays, TimeSlotView };
};

export default useTimeSlot;
