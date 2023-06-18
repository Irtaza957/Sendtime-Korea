import styled from '@emotion/styled';

import { BlockBox } from '../../../styles/container/index.styles';

const ReservationRankModalContainer = styled(BlockBox)`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: var(--front);
  gap: 6px;
  min-width: 310px;
  width: fit-content;
  margin: 0 auto;

  button {
    align-self: center;
  }
`;

export const ModalContents = styled(BlockBox)<{
  height?: number;
  showLess: boolean;
  contentLength: number;
}>`
  height: ${({ height }) => (height !== 0 ? `${height}px` : 'auto')};
  position: relative;
  transition: all 100ms ease-in;

  ${
    ({ contentLength, showLess }) => {
      if (showLess) {
        return [...Array(contentLength).keys()].map((key, idx) => {
          if (key % 2 === 0) {
            return `
              & > div:nth-of-type(${key + 1}) { 
                top: -6px;
                transform: rotate(${-key * 1.5 * Math.random()}deg);
              }`;
          }
          return `
            & > div:nth-of-type(${key + 1}) { 
              top: -6px;
              transform: rotate(${key * 1.5 * Math.random()}deg);
            }`;
        });
      }

      return [...Array(contentLength).keys()].map(
        (key) => `
          & > div:nth-of-type(${key + 1}) { 
            top: ${key * 50}px;
          }`
      );
    }

    // );

    // if (showLess) {
    //   return `${zIndex * 50 - 100}px`;
    // }
    // return `${zIndex * 1 + 1}px`;
  }};
`;

export const IconContainer = styled.button`
  width: fit-content;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const IconBackground = styled.div`
  background: var(--white);
  width: 70%;
  height: 70%;
  border-radius: 50%;
  z-index: -1;
  position: absolute;
  box-shadow: 0px 4px 10px 0 #34455225;
`;

const SelectCompletedButton = styled.button`
  min-width: 250px;
  width: 250px;
  height: 50px;
  background-color: var(--purple-500);
  border-radius: 10px;
  box-shadow: 0px 4px 15px 0px #34455225;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-weight: var(--regular);
  margin: 0 auto;

  &:disabled {
    cursor: default;
    background-color: #dbdbdc;
  }
`;

export { ReservationRankModalContainer, SelectCompletedButton };
