import React, { Dispatch, SetStateAction, useEffect } from 'react';

import usePreviewInput from '@hooks/inputs/usePreviewInput';
import { Section } from '@pages/MyPage/index.styles';

import { GroupMakeInfoType } from '..';

interface Page2Props {
  setGroupInfo: Dispatch<SetStateAction<GroupMakeInfoType>>;
}

const Page2 = ({ setGroupInfo }: Page2Props) => {
  const { CustomPreviewView, customInputs } = usePreviewInput();

  useEffect(() => {
    setGroupInfo((prev) => ({
      ...prev,
      customInputs,
    }));
  }, [customInputs]);

  return (
    <Section gap={40} padding="40px 80px" minWidth={685}>
      {CustomPreviewView()}
    </Section>
  );
};

export default Page2;
