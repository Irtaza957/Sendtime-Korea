import React from 'react';

import { InfoCardContainer } from './index.styles';

interface InfoCardProps {
  content: string;
  button: React.ReactNode;
  maxBannerHeight: number;
  gridColumn: number;
}

const InfoCard = ({
  content,
  button,
  maxBannerHeight,
  gridColumn,
}: InfoCardProps) => {
  const splitted = content.split('\n');
  const withEnter = splitted.map((word, idx) => (
    <span key={idx}>
      {word} <br />
    </span>
  ));

  return (
    <InfoCardContainer
      maxBannerHeight={maxBannerHeight}
      gridColumn={gridColumn}
    >
      <div>{withEnter}</div>
      {button}
    </InfoCardContainer>
  );
};

export default InfoCard;
