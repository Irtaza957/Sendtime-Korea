import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomSchedule } from '@pages/GuestEmail/Confirm';

import * as Styled from './index.styles';

interface ScheduleSelectProps {
  checkSchedule: CustomSchedule[];
  setCheckSchedule: Dispatch<SetStateAction<CustomSchedule[]>>;
}

const ScheduleSelect = ({
  checkSchedule,
  setCheckSchedule,
}: ScheduleSelectProps) => {
  const { t } = useTranslation('guestPage');

  const onClickRadioButton = (event: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { dataset },
    } = event;
    setCheckSchedule((prevState) => {
      const copy = [...prevState];
      const target = prevState.find(
        ({ priority }) => priority === Number(dataset.radio)
      );
      const targetIdx = prevState.findIndex(
        ({ priority }) => priority === Number(dataset.radio)
      );

      if (target) {
        const newTarget = { ...target, checked: true };
        const newSchedule = copy.map((schedule) => ({
          ...schedule,
          checked: false,
        }));
        newSchedule.splice(targetIdx, 1, newTarget);
        return newSchedule;
      }

      return prevState;
    });
  };

  useEffect(() => {
    const without0 = checkSchedule.find(({ priority }) => priority === 0);
    if (without0) {
      const newSchedule: CustomSchedule[] = checkSchedule.map((c) => ({
        ...c,
        priority: c.priority + 1,
      }));
      setCheckSchedule(newSchedule);
    }
  }, []);

  return (
    <Styled.ScheduleSelectContainer>
      {checkSchedule.map(
        ({ priority, startTime, endTime, time, checked, disabled }) => (
          <>
            <Styled.RankTimeContainer checked={checked} disabled={disabled}>
              <Styled.RadioButtonContainer
                data-radio={priority}
                disabled={disabled}
                onClick={!disabled ? onClickRadioButton : undefined}
              >
                <Styled.Rank checked={checked} disabled={disabled}>
                  {priority}
                  {t(`rank.${priority}`)}
                </Styled.Rank>
                <Styled.Time disabled={disabled}>{time}</Styled.Time>
                <Styled.RadioButtonOuter checked={checked} disabled={disabled}>
                  <Styled.RadioButtonInner
                    checked={checked}
                    disabled={disabled}
                  />
                </Styled.RadioButtonOuter>
              </Styled.RadioButtonContainer>
            </Styled.RankTimeContainer>
          </>
        )
      )}
    </Styled.ScheduleSelectContainer>
  );
};

export default ScheduleSelect;
