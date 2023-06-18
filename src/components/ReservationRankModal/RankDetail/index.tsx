import React from 'react';

import { Icon } from '@iconify/react';

import { Ranking } from '../Rank';

import { Bordered, RankDetailContainer } from './index.styles';

interface RankDetailProps {
  id: string;
  rank: number;
  time: string;
  onDelete: (id: string) => void;
  showLess?: boolean;
}

const RankDetail = ({ id, rank, time, onDelete }: RankDetailProps) => {
  return (
    <RankDetailContainer zIndex={rank + 1}>
      <Ranking rank={`${rank}`} time={time} size={12} />
      <Bordered onClick={() => onDelete(id)}>
        <Icon icon="eva:close-outline" width="30" height="20" />
      </Bordered>
    </RankDetailContainer>
  );
};

export default RankDetail;
