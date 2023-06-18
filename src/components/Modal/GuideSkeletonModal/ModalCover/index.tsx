import React from 'react';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import { BASE_URL } from '@constants/baseUrl';

import { CoverTitle, ModalCoverContainer } from './index.styles';

interface ModalCoverProps {
  title?: string;
}
const ModalCover = ({ title }: ModalCoverProps) => {
  return (
    <ModalCoverContainer>
      <ImageContainer>
        <AutoHeightImage src={`${BASE_URL.image}/guide/group/congrats.gif`} />
      </ImageContainer>
      <CoverTitle>{title}</CoverTitle>
    </ModalCoverContainer>
  );
};

export default ModalCover;
