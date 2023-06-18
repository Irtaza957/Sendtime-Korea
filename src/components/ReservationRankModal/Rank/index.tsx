import React from 'react';
import { useTranslation } from 'react-i18next';

import { Info, Rank, RankingContainer, Time } from './index.styles';

interface RankingProps {
  rank: string;
  time: string;
  size?: number;
  align?: string;
}

const Ranking = ({ rank, time, size = 14 }: RankingProps) => {
  const { t } = useTranslation('guestPage');

  return (
    <Info>
      <Rank>
        {rank}
        {t(`rank.${rank}`)}
      </Rank>
      <Time size={size}>{time}</Time>
    </Info>
  );
};

interface RankingsProps {
  contents: { time: string; priority: string }[];
}

const Rankings = ({ contents }: RankingsProps) => {
  return (
    <RankingContainer>
      {contents.map((content, idx) => (
        <Ranking key={idx} rank={content.priority} time={content.time} />
      ))}
    </RankingContainer>
  );
};

export { Ranking, Rankings };
