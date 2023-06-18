import React, { ReactNode } from 'react';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';

import {
  ModalDataContainer,
  ModalDataImage,
  ModalDataTitle,
} from './index.styles';

interface ModalDataProps {
  title: ReactNode;
  imgUrl: string;
}

const ModalData = ({ title, imgUrl }: ModalDataProps) => {
  return (
    <ModalDataContainer>
      <ModalDataTitle>{title}</ModalDataTitle>
      <ModalDataImage>
        <ImageContainer>
          <AutoHeightImage src={imgUrl} alt="guideline" />
        </ImageContainer>
      </ModalDataImage>
    </ModalDataContainer>
  );
};

export default ModalData;
