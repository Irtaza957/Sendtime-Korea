import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SubSection } from '@components/Reservation/Common';
import useMainInput from '@hooks/inputs/useMainInput';
import { Section, SectionTitle } from '@pages/MyPage/index.styles';

import { Padding } from '../PageSection/index.styles';
import { GroupSettingInfoType } from '..';
interface InfoSectionType {
  defaultInfos: { title: string; description: string };
  setGroupInfo: Dispatch<SetStateAction<GroupSettingInfoType>>;
}
const InfoSection = ({ defaultInfos, setGroupInfo }: InfoSectionType) => {
  const { DescriptionView, description, TitleView, title } = useMainInput({
    defaultTitle: defaultInfos.title,
    defaultDescription: defaultInfos.description,
  });
  const { t } = useTranslation('groupSettingPage');

  useEffect(() => {
    setGroupInfo((prev) => ({
      ...prev,
      description: description,
      title: title.value,
    }));
  }, [title, description]);

  return (
    <Section gap={40} padding="40px">
      <SectionTitle>{t('infoTitle')}</SectionTitle>
      <Padding>
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
          {DescriptionView({})}
        </SubSection>
      </Padding>
    </Section>
  );
};

export default InfoSection;
