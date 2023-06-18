import React from 'react';

import { AvailableTime } from '@pages/SetTime';

import SelectDay from '../SelectDay';

import { DayWrapper } from './index.styles';

interface SelectDayOfWeekProps {
  checked: AvailableTime[];
  onClickDay: (id: number) => void;
}

const SelectDayOfWeek = ({ checked, onClickDay }: SelectDayOfWeekProps) => {
  const findChecked = (id: number) => {
    const target = checked.find((value) => value.id === id);

    if (target) {
      return target.available;
    }

    return false;
  };

  return (
    <DayWrapper>
      {checked.map(({ id, day }, idx) => (
        <SelectDay
          key={idx}
          checked={findChecked(id)}
          content={`${day}요일`}
          onClick={() => onClickDay(id)}
        />
      ))}
    </DayWrapper>
  );
};

export default SelectDayOfWeek;
