import React from 'react';

import AutoHeightImage from '@components/AutoHeightImage';
import { BASE_URL } from '@constants/baseUrl';

import { ContainerInner, ContainerOuter, ImageContainer } from './index.styles';

interface ContainerProps {
  maxWidth?: number;
  imageUrl?: string;
  padding?: string;
  children?: React.ReactNode;
  gap?: string;
}

const Container = ({
  maxWidth = 460,
  imageUrl,
  padding,
  children,
  gap,
}: ContainerProps) => {
  return (
    <ContainerOuter hasImageUrl={!!imageUrl}>
      {imageUrl && (
        <ImageContainer>
          <AutoHeightImage
            src={`${BASE_URL.image}${imageUrl}`}
            alt="sendtime-logo"
            priority
          />
        </ImageContainer>
      )}
      <ContainerInner maxWidth={maxWidth} padding={padding} gap={gap}>
        {children}
      </ContainerInner>
    </ContainerOuter>
  );
};

export default Container;
