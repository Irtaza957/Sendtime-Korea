import styled from '@emotion/styled';

const InfoCardContainer = styled.div<{
  maxBannerHeight?: number;
  gridColumn: number;
}>`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 14px;
  font-weight: var(--semi-bold);
  width: 98%;
  min-width: 100%;
  max-height: ${({ maxBannerHeight }) => `${maxBannerHeight || 100}px`};
  border-radius: 10px;
  background: var(--gray-50);
  color: var(--gray-750);

  border: 1px solid var(--gray-500);
  gap: 15px;
  grid-row: 2/2;
  grid-column: 1 / ${({ gridColumn }) => gridColumn + 2};
  line-height: 1.5;
  align-self: center;

  button {
    gap: 5px;
  }

  @media only screen and (min-width: 1601px) and (max-width: 2000px) {
    grid-column: 1/4 !important;
    ${({ gridColumn }) => gridColumn === 1 && `grid-column: 1/3 !important;`}
  }

  @media only screen and (min-width: 1201px) and (max-width: 1600px) {
    grid-column: 1/3 !important;
  }

  @media only screen and (max-width: 1200px) {
    grid-column: 1/2 !important;
  }

  @media (max-width: 1200px) {
    grid-row: 2/2;
    grid-column: 1/1;
    flex-direction: column;
    padding: 15px 5px;
    max-height: fit-content;
    text-align: center;
    max-width: 320px;
  }

  @media (max-width: 768px) {
    max-width: 340px;
  }
`;

export { InfoCardContainer };
