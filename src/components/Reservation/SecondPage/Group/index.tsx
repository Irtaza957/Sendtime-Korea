import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SubSection } from '@components/Reservation/Common';
import { Box, SubContainer } from '@components/Reservation/index.styles';
import SelectTextInput from '@components/SelectTextInput';
import { RESERVATION_TIME_OPTIONS_KR } from '@constants/time';
import { useGroupReservation } from '@contexts/GroupReservationProvider';
import useTimeSlot from '@hooks/inputs/useTimeSlot';
import { translateOptionSlot } from '@utils/format';

const GroupSecondPage = () => {
  const { t } = useTranslation('createGroupBookingPage');

  const { pageInfo, setPageInfo, onClickRankOptionTimeSelectBox } =
    useGroupReservation();

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
    </Box>
  );
};

export default GroupSecondPage;
