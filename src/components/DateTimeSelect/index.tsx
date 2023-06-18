import React, { MouseEvent } from 'react';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';

import SelectTextInput from '@components/SelectTextInput';
import { SELECT_TIME_TPS } from '@constants/time';

import { DateTimeContainer, LineBox, TimeBox } from './index.styles';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface DateTimeSelectProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
  startTime: string;
  setStartTime: (e: MouseEvent<HTMLButtonElement>) => void;
  minStartDate?: Date;
  minEndDate?: Date;
  dateFormat?: string;
  disabled?: boolean;
}

const DateTimeSelect = ({
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  minStartDate = new Date(),
  minEndDate = new Date(new Date().setDate(new Date().getDate() + 7)),
  dateFormat = 'yyyy.MM.dd',
  disabled = false,
}: DateTimeSelectProps) => {
  const selectTimeUnit = SELECT_TIME_TPS.map((value) => ({ value }));
  return (
    <DateTimeContainer>
      <LineBox>
        <DatePicker
          className="root"
          selected={startDate}
          onChange={setStartDate}
          dateFormat={dateFormat}
          minDate={minStartDate}
          maxDate={minEndDate}
          locale="ko"
          disabled={disabled}
        />
      </LineBox>
      <TimeBox>
        <SelectTextInput
          size={10}
          inputPadding={2}
          value={startTime}
          selectValues={selectTimeUnit}
          onClickSelectBox={setStartTime}
        />
      </TimeBox>
    </DateTimeContainer>
  );
};

export default DateTimeSelect;
