import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SubSection } from '@components/Reservation/Common';
import { Box, SubContainer } from '@components/Reservation/index.styles';
import SelectTextInput from '@components/SelectTextInput';
import TextCheckbox from '@components/TextCheckbox';
import {
  RESERVATION_TIME_OPTIONS_KR,
  SELECT_SPARE_TIME_KR,
} from '@constants/time';
import { useReservation } from '@contexts/ReservationProvider';
import useTimeSlot from '@hooks/inputs/useTimeSlot';
import { translateOptionSlot, translateTime } from '@utils/format';

const PersonalSecondPage = () => {
  const {
    pageInfo,
    onClickSpareTimeBeforeCheckbox,
    onClickSpareTimeStartSelectBox,
    onClickSpareTimeNextCheckbox,
    onClickSpareTimeEndSelectBox,
    onClickRankOptionTimeSelectBox,
    setPageInfo,
  } = useReservation();
  const { t } = useTranslation('createBookingPage');

  const selectTimeUnit = SELECT_SPARE_TIME_KR.map((value) => ({
    text: translateTime(value),
    value,
  }));
  const reservationTime = RESERVATION_TIME_OPTIONS_KR.map((value) => ({
    text: translateOptionSlot(value),
    value,
  }));

  const { TimeSlotView, availableDays } = useTimeSlot(pageInfo.availableDays);

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      availableDays,
    }));
  }, [availableDays]);

  return (
    <Box gap={30}>
      <SubSection
        subTitle={t('timeSlotSetting.title')}
        description={t('timeSlotSetting.subtitle')}
      >
        <SubContainer>
          <Box width={52}>
            <SelectTextInput
              value={pageInfo.rankOption.selectInput}
              onClickSelectBox={onClickRankOptionTimeSelectBox}
              selectValues={reservationTime}
              scrollIntoView
            />
          </Box>
        </SubContainer>
      </SubSection>

      <SubSection
        subTitle={t('availability.title')}
        description={t('availability.subtitle')}
      >
        {TimeSlotView()}
      </SubSection>

      <SubSection
        subTitle={t('buffer.title')}
        description={t('buffer.subtitle')}
      >
        <SubContainer>
          <Box width={40} gap={6}>
            <TextCheckbox
              onClick={onClickSpareTimeBeforeCheckbox}
              checked={pageInfo.spareTime.before.checked}
            >
              {t('buffer.beforeEvent')}
            </TextCheckbox>
            <SelectTextInput
              value={pageInfo.spareTime.before.time}
              onClickSelectBox={onClickSpareTimeStartSelectBox}
              selectValues={selectTimeUnit}
              disabled={!pageInfo.spareTime.before.checked}
            />
          </Box>

          <Box width={40} gap={6}>
            <TextCheckbox
              onClick={onClickSpareTimeNextCheckbox}
              checked={pageInfo.spareTime.next.checked}
            >
              {t('buffer.afterEvent')}
            </TextCheckbox>
            <SelectTextInput
              value={pageInfo.spareTime.next.time}
              onClickSelectBox={onClickSpareTimeEndSelectBox}
              selectValues={selectTimeUnit}
              disabled={!pageInfo.spareTime.next.checked}
            />
          </Box>
        </SubContainer>
      </SubSection>
    </Box>
  );
};

export default PersonalSecondPage;
