import React from 'react';
import i18next from 'i18next';

import { BlockBox } from '../../../../styles/container/index.styles';

import {
  IndexContainer,
  IndexInfo,
  IndexNo,
  SatisfactionContainer,
} from './index.styles';

interface SatisfactionProps {
  upTo?: number;
  handleClick?: (idx: string) => void;
  checkedIdx: number;
}

const Satisfaction = ({
  upTo = 5,
  handleClick,
  checkedIdx,
}: SatisfactionProps) => {
  return (
    <SatisfactionContainer>
      {[...Array(upTo).keys()]
        .map((key) => key + 1)
        .map((idx) => (
          <BlockBox key={idx}>
            <IndexContainer>
              <IndexNo
                onClick={() => handleClick?.(`${idx}`)}
                checked={checkedIdx === idx}
              >
                {idx}
              </IndexNo>
              {idx === 1 && (
                <IndexInfo>{i18next.t('npsPage:npsBad')}</IndexInfo>
              )}
              {idx === upTo && (
                <IndexInfo>{i18next.t('npsPage:npsGood')}</IndexInfo>
              )}
            </IndexContainer>
          </BlockBox>
        ))}
    </SatisfactionContainer>
  );
};

export default Satisfaction;
