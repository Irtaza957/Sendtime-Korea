import React from 'react';
import Image, { ImageProps } from 'next/image';

import styled from '@emotion/styled';

export const ImageContainer = styled.div<{
  width?: number;
  minHeight?: number;
  margin?: string;
}>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  max-width: ${({ width }) => (width ? `${width}px` : '100%')};
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => (margin ? margin : '0 auto')};
`;

const AutoHeightImageWrapper = styled.div`
  width: 100%;
  position: relative;

  div {
    position: unset !important;
  }

  & > span {
    position: unset !important;
  }

  img {
    object-fit: contain !important;
    position: relative !important;
    height: auto !important;
  }
`;

const AutoHeightImage = ({ ...props }: ImageProps): React.ReactElement => {
  return (
    <AutoHeightImageWrapper>
      <Image
        layout="fill"
        className="autoImage"
        placeholder="blur"
        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8YAwAAdkBBSutzHcAAAAASUVORK5CYII="
        alt={props.alt}
        {...props}
      />
    </AutoHeightImageWrapper>
  );
};

export default AutoHeightImage;
