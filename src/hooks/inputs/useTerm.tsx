import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import RadioButton from '@components/RadioButton';
import RangeDateSelect from '@components/RangeDateSelect';
import { customDate } from '@components/Reservation/FirstPage';
import {
  Box,
  ContentAlert,
  Flex,
  InfoSpan,
  RangeContainer,
  RangeDateContainer,
} from '@components/Reservation/index.styles';
import TextInput from '@components/TextInput';
import { PageInfoType } from '@contexts/ReservationProvider';

type TermDefaultChecked = 'custom' | 'days' | 'infinite';
const defaultData = (checked?: TermDefaultChecked) => {
  return {
    custom: {
      start: new Date(),
      end: dayjs().add(30, 'day').toDate(),
      checked: !checked ? true : checked === 'custom',
    },
    days: {
      start: new Date(),
      end: dayjs().add(30, 'day').toDate(),
      checked: checked === 'days',
    },
    infinite: {
      start: new Date(),
      end: new Date(),
      checked: checked === 'infinite',
    },
  };
};
const useTerm = (
  defaultValue?: PageInfoType['term'],
  checked?: TermDefaultChecked
) => {
  const [dayText, setDayText] = useState('30');
  const [term, setTerm] = useState(
    defaultValue ? defaultValue : defaultData(checked)
  );
  const { start, end } = customDate(term.custom.start, term.custom.end);
  const { t } = useTranslation('createBookingPage');

  const handleRadioButton = ({ currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (currentTarget.dataset.radio === 'custom') {
      setTerm((prev) => {
        return {
          ...prev,
          custom: { ...prev.custom, checked: true },
          days: { ...prev.days, checked: false },
          infinite: { ...prev.infinite, checked: false },
        };
      });
      return;
    }

    if (currentTarget.dataset.radio === 'days') {
      setTerm((prev) => {
        return {
          ...prev,
          custom: { ...prev.custom, checked: false },
          days: { ...prev.days, checked: true },
          infinite: { ...prev.infinite, checked: false },
        };
      });
      return;
    }

    if (currentTarget.dataset.radio === 'infinite') {
      setTerm((prev) => {
        return {
          ...prev,
          custom: { ...prev.custom, checked: false },
          days: { ...prev.days, checked: false },
          infinite: { ...prev.infinite, checked: true },
        };
      });
      return;
    }
  };

  const handleDayText = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim() === '' || parseInt(target.value) < 0) {
      setTerm((prev) => {
        return {
          ...prev,
          days: { ...prev.days, end: dayjs().toDate() },
        };
      });
      setDayText('0');

      return;
    }

    if (parseInt(target.value) > 999) {
      const newValue = target.value.slice(-3);
      setTerm((prev) => {
        return {
          ...prev,
          days: {
            ...prev.days,
            end: dayjs().add(parseInt(newValue), 'day').toDate(),
          },
        };
      });
      setDayText(newValue);

      return;
    }

    setDayText(target.value);
    setTerm((prev) => {
      return {
        ...prev,
        days: {
          ...prev.days,
          end: dayjs().add(Number(target.value), 'day').toDate(),
        },
      };
    });
  };

  const setStartTerm = (date: Date) => {
    setTerm((prev) => ({
      ...prev,
      custom: { ...prev.custom, start: date, checked: true },
    }));
  };

  const setEndTerm = (date: Date) => {
    setTerm((prev) => ({
      ...prev,
      custom: { ...prev.custom, end: date, checked: true },
    }));
  };

  const createDayText = () => {
    if (!defaultValue) return dayText;
    const start = dayjs(defaultValue.days.start);
    const end = dayjs(defaultValue.days.end);

    return end.diff(start, 'day').toString();
  };

  useEffect(() => {
    setTerm(defaultValue || defaultData(checked));
  }, [defaultValue]);

  const TermView = (alert = <></>) => {
    return (
      <RangeContainer>
        <Box>
          <Flex>
            <RadioButton
              checked={
                defaultValue ? defaultValue.custom.checked : term.custom.checked
              }
              onClick={handleRadioButton}
              data-radio="custom"
            >
              <RangeDateContainer
                disabled={
                  defaultValue
                    ? !defaultValue.custom.checked
                    : !term.custom.checked
                }
              >
                <RangeDateSelect
                  startTime={
                    defaultValue?.custom.start ||
                    dayjs(term.custom.start).toDate()
                  }
                  setStartTime={setStartTerm}
                  endTime={
                    defaultValue?.custom.end || dayjs(term.custom.end).toDate()
                  }
                  setEndTime={setEndTerm}
                  disabled={
                    defaultValue
                      ? !defaultValue.custom.checked
                      : !term.custom.checked
                  }
                />
              </RangeDateContainer>
            </RadioButton>
          </Flex>
          {term.custom.checked && +new Date(end) < +new Date(start) && (
            <ContentAlert>{t('dateRange.errorMessage')}</ContentAlert>
          )}
          {alert && alert}
        </Box>

        <Flex>
          <RadioButton
            checked={
              defaultValue ? defaultValue.days.checked : term.days.checked
            }
            data-radio="days"
            onClick={handleRadioButton}
          >
            <RangeDateContainer
              disabled={
                defaultValue ? !defaultValue.days.checked : !term.days.checked
              }
            >
              <InfoSpan>{t('dateRange.custom')}</InfoSpan>
              <TextInput
                type="number"
                value={createDayText()}
                onChange={handleDayText}
                disabled={
                  defaultValue ? !defaultValue.days.checked : !term.days.checked
                }
              />
              <InfoSpan>{t('dateRange.custom2')}</InfoSpan>
            </RangeDateContainer>
          </RadioButton>
        </Flex>

        <Flex>
          <RadioButton
            checked={
              defaultValue
                ? defaultValue.infinite.checked
                : term.infinite.checked
            }
            data-radio="infinite"
            onClick={handleRadioButton}
          >
            {t('dateRange.indefinite')}
          </RadioButton>
        </Flex>
      </RangeContainer>
    );
  };

  return { TermView, term };
};

export default useTerm;
