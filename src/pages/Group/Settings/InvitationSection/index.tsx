import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import usePreviewInput from '@hooks/inputs/usePreviewInput';
import { Section, SectionTitle } from '@pages/MyPage/index.styles';

import { Padding } from '../PageSection/index.styles';
import { GroupSettingInfoType } from '..';

interface InvitationSectionProps {
  defaultInfos: {
    customInputs: { id: string; value: string; required: boolean }[];
  };
  setGroupInfo: Dispatch<SetStateAction<GroupSettingInfoType>>;
}
const InvitationSection = ({
  defaultInfos,
  setGroupInfo,
}: InvitationSectionProps) => {
  const { CustomPreviewView, customInputs } = usePreviewInput(
    defaultInfos.customInputs
  );

  useEffect(() => {
    setGroupInfo((prev) => ({
      ...prev,
      customInputs,
    }));
  }, [customInputs]);

  const { t } = useTranslation('groupSettingPage');

  return (
    <Section padding="40px" gap={40}>
      <SectionTitle>{t('inviteSettingTitle')}</SectionTitle>
      <Padding>{CustomPreviewView()}</Padding>
    </Section>
  );
};

export default InvitationSection;
