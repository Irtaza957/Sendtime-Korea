import React, { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { KOR_TO_ENG_SHORT_WD, SELECT_TIME, TIME } from '@constants/time';
import { DailyTimes } from '@contexts/ReservationProvider';
import useTranslate from '@hooks/useTranslate';
import { AvailableTime } from '@pages/SetTime';
import { convertKorWeekday } from '@utils/format';
import { isTimeValid } from '@utils/time';

import SelectTextInput from '../SelectTextInput';
import TextCheckbox from '../TextCheckbox';

import {
  DailyTimeSelectContainer,
  DayTimeSelectContainer,
  Flex,
  Line,
  SelectAlertContainer,
  SelectTextInputWrapper,
  TextContent,
  TimeAlert,
} from './index.styles';

interface DayTimeSelectProps {
  weekday: typeof TIME['WEEKDAYS'][number];
  isEnabled: boolean;
  onClickCheckbox: () => void;
  onClickStartSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickEndSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  startValue: DailyTimes['start'] | string;
  endValue: DailyTimes['end'] | string;
}

const DayTimeSelect = ({
  weekday,
  isEnabled,
  onClickCheckbox,
  onClickStartSelectBox,
  onClickEndSelectBox,
  startValue,
  endValue,
}: DayTimeSelectProps) => {
  const { i18n } = useTranslate();
  const [isTimeAvailable, setIsTimeAvailable] = useState(true);

  const weekdayText = (weekday: typeof TIME.WEEKDAYS[number]) => {
    return convertKorWeekday(weekday);
  };
  useEffect(() => {
    setIsTimeAvailable(isTimeValid(startValue, endValue));
  }, [startValue, endValue]);

  const selectedValue = SELECT_TIME.map((value) => ({ value }));
  const { t } = useTranslation('onboarding');
  return (
    <DayTimeSelectContainer>
      <TextCheckbox onClick={onClickCheckbox} checked={isEnabled}>
        <TextContent>{weekdayText(weekday)}</TextContent>
      </TextCheckbox>
      <SelectAlertContainer>
        <Flex>
          <SelectTextInputWrapper>
            <SelectTextInput
              value={startValue}
              selectValues={selectedValue}
              onClickSelectBox={onClickStartSelectBox}
              inputPadding={2}
              disabled={!isEnabled}
            />
          </SelectTextInputWrapper>
          <Line />
          <SelectTextInputWrapper>
            <SelectTextInput
              value={endValue}
              selectValues={selectedValue}
              onClickSelectBox={onClickEndSelectBox}
              inputPadding={2}
              disabled={!isEnabled}
            />
          </SelectTextInputWrapper>
        </Flex>
        {!isTimeAvailable && (
          <TimeAlert>{t('timeSetting.availableTimeAlert')}</TimeAlert>
        )}
      </SelectAlertContainer>
    </DayTimeSelectContainer>
  );
};

interface DailyTimeSelectProps {
  openTimes: AvailableTime[];
  onClickCheckbox: (day: OpenTime['day']) => void;
  onClickStartSelectBox: (
    e: MouseEvent<HTMLButtonElement>,
    day: OpenTime['day']
  ) => void;
  onClickEndSelectBox: (
    e: MouseEvent<HTMLButtonElement>,
    day: OpenTime['day']
  ) => void;
}

const DailyTimeSelect = ({
  openTimes,
  onClickCheckbox,
  onClickStartSelectBox,
  onClickEndSelectBox,
}: DailyTimeSelectProps) => {
  const clickCheckbox = (day: typeof TIME.DAYS[number]) => {
    onClickCheckbox(KOR_TO_ENG_SHORT_WD[day]);
  };

  return (
    <DailyTimeSelectContainer>
      {openTimes.map(({ day, start, end, available }, index) => (
        <DayTimeSelect
          key={index}
          weekday={`${day}요일`}
          isEnabled={available}
          onClickCheckbox={() => clickCheckbox(day)}
          startValue={start}
          endValue={end}
          onClickStartSelectBox={(e) =>
            onClickStartSelectBox(e, KOR_TO_ENG_SHORT_WD[day])
          }
          onClickEndSelectBox={(e) =>
            onClickEndSelectBox(e, KOR_TO_ENG_SHORT_WD[day])
          }
        />
      ))}
    </DailyTimeSelectContainer>
  );
};

export default DailyTimeSelect;
