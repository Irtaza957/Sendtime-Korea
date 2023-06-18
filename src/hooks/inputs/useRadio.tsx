import React, { useState } from 'react';

import RadioButton from '@components/RadioButton';
import { SubSection } from '@components/Reservation/Common';
import TextCheckbox from '@components/TextCheckbox';
import { useGroupReservation } from '@contexts/GroupReservationProvider';
import styled from '@emotion/styled';

export type RadioInputType = {
  title: string;
  description?: string;
  dataInfo?: DisplayOptionType;
  allowBlockingTimesText?: string;
};

const RadioInfo = styled.span`
  display: inline-block;
  font-size: 13px;
  color: var(--gray-600);
  font-weight: var(--normal);
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  font-size: 16px;
  color: var(--gray-750);
`;

const CheckboxContainer = styled.div`
  margin: 8px 0 0 0;
`;
const CheckboxText = styled.div`
  color: var(--gray-600);
`;

const useRadio = (data: RadioInputType[], defaultDataInfo?: string) => {
  const { pageInfo } = useGroupReservation();
  const selectedData = data.map((d, idx) => ({
    ...d,
    selected: d.dataInfo === defaultDataInfo ?? idx === 0,
  }));
  const [selected, setSelected] = useState(selectedData);
  const [allowBlockingTimes, setAllowBlockingTimes] = useState(
    pageInfo.displayOption === 'EMPTY' ? pageInfo.isDisplayBlockingTimes : true
  );

  const handleRadio = (idx: number) => {
    if (idx === 0 || idx === 1) {
      setAllowBlockingTimes(false);
    }
    setSelected((prev) =>
      prev.map((p, id) => ({ ...p, selected: idx === id }))
    );
  };

  const RadioView = (title = '') => {
    return (
      <SubSection subTitle={title} gap={20}>
        {data.map(
          ({ title, description, dataInfo, allowBlockingTimesText }, idx) => (
            <RadioButton
              key={idx}
              checked={selected[idx].selected}
              onClick={() => handleRadio(idx)}
              data-radio={dataInfo}
            >
              <RadioContainer>
                {title}
                {description && <RadioInfo>{description}</RadioInfo>}
              </RadioContainer>
              {idx === 2 && selected[2].selected && (
                <CheckboxContainer onClick={(e) => e.stopPropagation()}>
                  <TextCheckbox
                    checked={allowBlockingTimes}
                    small
                    onClick={() => setAllowBlockingTimes(!allowBlockingTimes)}
                  >
                    <CheckboxText>{allowBlockingTimesText}</CheckboxText>
                  </TextCheckbox>
                </CheckboxContainer>
              )}
            </RadioButton>
          )
        )}
      </SubSection>
    );
  };

  return { RadioView, selected, allowBlockingTimes };
};

export default useRadio;
