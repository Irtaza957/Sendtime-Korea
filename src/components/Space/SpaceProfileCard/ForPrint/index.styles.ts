import styled from '@emotion/styled';

import {
  CardDescription,
  CardTag,
  CardTitle,
  ProfileCardContainer,
  ProfileImageWrapper,
  Top,
  TopStyle,
} from '../index.styles';

export const ProfileCardContainerForPrint = styled(ProfileCardContainer)<{
  $width: number;
  $height: number;
  $textScale: number;
  $borderRadius: number;
}>`
  width: ${({ $width }) => `${$width}mm`};
  min-width: ${({ $width }) => `${$width}mm`};
  max-width: ${({ $width }) => `${$width}mm`};
  height: ${({ $height }) => `${$height}mm`};
  min-height: ${({ $height }) => `${$height}mm`};
  max-height: ${({ $height }) => `${$height}mm`};
  box-shadow: none;
  font-size: ${({ $textScale }) => `${$textScale * 10}pt`};
  border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};

  @media print {
    width: ${({ $width }) => `${$width}mm`};
    min-width: ${({ $width }) => `${$width}mm`};
    max-width: ${({ $width }) => `${$width}mm`};
    height: ${({ $height }) => `${$height}mm`};
    min-height: ${({ $height }) => `${$height}mm`};
    max-height: ${({ $height }) => `${$height}mm`};
    box-shadow: none;
    font-size: ${({ $textScale }) => `${$textScale * 10}pt`};
    border-radius: ${({ $borderRadius }) => `${$borderRadius}px`};
  }
`;

export const TopStyleForPrint = styled(TopStyle)<{
  $height: number;
}>`
  height: ${({ $height }) => `${$height}mm`};
`;

export const ProfileImageWrapperForPrint = styled(ProfileImageWrapper)<{
  $imageScale: number;
}>`
  position: relative;
  width: ${({ $imageScale }) => `${$imageScale * 40}mm`};
  max-width: ${({ $imageScale }) => `${$imageScale * 40}mm`};
  height: ${({ $imageScale }) => `${$imageScale * 40}mm`};
  max-height: ${({ $imageScale }) => `${$imageScale * 40}mm`};
  border-radius: ${({ $imageScale }) => `${$imageScale * 40}px`};
`;

export const TopForPrint = styled(Top)<{
  $gap: number;
}>`
  gap: ${({ $gap }) => `${$gap}mm`};
`;

export const CardTitleForPrint = styled(CardTitle)`
  color: black;
  font-size: 2.2em;
  flex: unset;
`;

export const CardTagForPrint = styled(CardTag)`
  color: var(--gray-900);
  font-size: 1.2em;
`;

export const CardDescriptionForPrint = styled(CardDescription)<{
  $lines: number;
}>`
  color: black;
  font-size: 1.15em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $lines }) => $lines};

  &:hover {
    overflow: hidden;
  }
`;

export const QRCodeWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
