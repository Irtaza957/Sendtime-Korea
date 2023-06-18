import React from 'react';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';

import Line from '../Line';

import { LineBox, RangeDateContainer } from './index.styles';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface RangeDateSelectProps {
  startTime: Date;
  setStartTime: (date: Date) => void;
  minStartDate?: Date;
  endTime: Date;
  setEndTime: (date: Date) => void;
  minEndDate?: Date;

  dateFormat?: string;
  disabled?: boolean;
}

const RangeDateSelect = ({
  startTime,
  setStartTime,
  minStartDate = new Date(),
  endTime,
  setEndTime,
  minEndDate = new Date(),
  dateFormat = 'yyyy.MM.dd',
  disabled = false,
}: RangeDateSelectProps) => {
  return (
    <RangeDateContainer>
      <LineBox>
        <DatePicker
          selected={startTime}
          onChange={setStartTime}
          dateFormat={dateFormat}
          minDate={minStartDate}
          locale="ko"
          disabled={disabled}
        />
      </LineBox>

      <Line margin="0 5px" />

      <LineBox>
        <DatePicker
          selected={endTime}
          onChange={setEndTime}
          dateFormat={dateFormat}
          minDate={minEndDate}
          locale="ko"
          disabled={disabled}
        />
      </LineBox>
    </RangeDateContainer>
  );
};

export default RangeDateSelect;
