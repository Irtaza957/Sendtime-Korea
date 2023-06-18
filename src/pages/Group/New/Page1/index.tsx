import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SubSection } from '@components/Reservation/Common';
import useMainInput from '@hooks/inputs/useMainInput';
import useTerm from '@hooks/inputs/useTerm';
import useTimeSlot from '@hooks/inputs/useTimeSlot';
import { Section } from '@pages/MyPage/index.styles';

import { GroupMakeInfoType } from '..';

interface GroupMakePage1 {
  groupInfo: GroupMakeInfoType;
  setGroupInfo: Dispatch<SetStateAction<GroupMakeInfoType>>;
}
const Page1 = ({ groupInfo, setGroupInfo }: GroupMakePage1) => {
  const { TermView, term } = useTerm(groupInfo.term, 'infinite');
  const { TimeSlotView, availableDays } = useTimeSlot(groupInfo.availableDays);
  const { TitleView, DescriptionView, title, description } = useMainInput({
    defaultTitle: groupInfo.title,
    defaultDescription: groupInfo.description,
  });

  useEffect(() => {
    setGroupInfo((prev) => ({
      ...prev,
      title: title.value,
      description: description,
      term,
      availableDays: availableDays,
    }));
  }, [title, description, term, availableDays]);

  const handleShare = () => {
    setGroupInfo((prev) => ({ ...prev, shareCalendar: !prev.shareCalendar }));
  };

  const { t } = useTranslation('createGroup');

  return (
    <Section gap={40} padding="40px 80px">
      <SubSection
        subTitle={t('name.title')}
        description={t('name.subtitle')}
        required
      >
        {TitleView({ autoFocus: true })}
      </SubSection>

      <SubSection
        subTitle={t('description.title')}
        description={t('description.subtitle')}
      >
        {DescriptionView({
          placeholder: t('description.placeholder'),
        })}
      </SubSection>

      <SubSection
        subTitle={t('duration.title')}
        description={t('duration.description')}
        required
      >
        {TermView()}
      </SubSection>

      <SubSection
        subTitle={t('availability.title')}
        description={t('availability.description')}
      >
        {TimeSlotView()}
      </SubSection>

      <SubSection
        subTitle={t('shareEventInfo.title')}
        description={t('shareEventInfo.description')}
        onClickToggle={handleShare}
        active={groupInfo.shareCalendar}
      />
    </Section>
  );
};

export default Page1;
