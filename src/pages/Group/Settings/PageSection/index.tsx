import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import RangeDateSelect from '@components/RangeDateSelect';
import { SubSection } from '@components/Reservation/Common';
import { RangeDateContainer } from '@components/Reservation/index.styles';
import useLocation from '@hooks/inputs/useLocation';
import useTimeSlot from '@hooks/inputs/useTimeSlot';
import { Section, SectionTitle } from '@pages/MyPage/index.styles';
import { AvailableTime } from '@pages/SetTime';

import { GroupSettingInfoType } from '..';

import { Padding, PageSectionDate } from './index.styles';

interface PageSectionProps {
  defaultInfos: {
    calendarOpenPeriod: { start: Date; end: Date };
    availableDays: AvailableTime[];
    locations: FavoritePlace[];
  };
  setGroupInfo: Dispatch<SetStateAction<GroupSettingInfoType>>;
}
const PageSection = ({ defaultInfos, setGroupInfo }: PageSectionProps) => {
  const { TimeSlotView, availableDays } = useTimeSlot(
    defaultInfos.availableDays
  );
  const { LocationView, places } = useLocation(defaultInfos.locations);

  useEffect(() => {
    setGroupInfo((prev) => ({
      ...prev,
      availableDays,
    }));
  }, [availableDays]);

  useEffect(() => {
    setGroupInfo((prev) => ({
      ...prev,
      locations: places,
    }));
  }, [places]);

  const { t } = useTranslation('groupSettingPage');

  return (
    <Section gap={40} padding="40px">
      <SectionTitle>{t('settingTitle')}</SectionTitle>
      <Padding>
        <SubSection
          subTitle={t('duration.title')}
          description={t('duration.subtitle')}
        >
          <PageSectionDate>
            <RangeDateContainer disabled={true}>
              <RangeDateSelect
                startTime={defaultInfos.calendarOpenPeriod.start}
                endTime={defaultInfos.calendarOpenPeriod.end}
                setStartTime={() => {}}
                setEndTime={() => {}}
                disabled={true}
              />
            </RangeDateContainer>
          </PageSectionDate>
        </SubSection>

        <SubSection
          subTitle={t('location.title')}
          description={t('location.subtitle')}
        >
          {LocationView({})}
        </SubSection>

        <SubSection
          subTitle={t('availability.title')}
          description={t('availability.subtitle')}
        >
          {TimeSlotView()}
        </SubSection>
      </Padding>
    </Section>
  );
};

export default PageSection;
