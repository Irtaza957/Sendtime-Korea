import styled from '@emotion/styled';

// export const Preview = styled.div<{isReservationRanking?: boolean}>`
//   flex-grow: 1;
//   // min-width: 350px;
//   max-width: 450px;
//   background: var(--white);
//   border: 1px solid var(--gray-200);
//   border-radius: 5px;
//   gap: 5px;
//   box-shadow: 0 4px 15px 0 #292f3315;
//   height: 100%;

//   /* min-height: 740px; */
//   min-height: calc(100vh - 185px);
//   max-height: calc(100vh - 120px);
//   overflow: auto;
//   padding-top: 70px;
//   display: flex;
//   flex-direction: column;

//   @media (max-width: 1280px) {
//     background: var(--white);
//     min-height: inherit;
//     width: 100%;
//     padding-left: 20px;
//     padding-right: 20px;
//     min-height: 410px;
//     box-shadow: none;
//     border: none;
//     border-radius: 0;
//     margin: 0 auto;
//     position: relative;
//     overflow: hidden;

//     & > p:nth-of-type(1) {
//       border-bottom: none;
//       padding: 15px 0;
//       height: 100%;
//     }
//   }

//   @media (max-width: 1280px) {
//     // min-width: 360px;
//     // ${({isReservationRanking})=> isReservationRanking ? '' : 'margin-top: 4rem;'}
//   }
// `;

export const GuestreservationPreview = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 148px);
  flex-grow: 1;
  overflow: auto;
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  box-shadow: rgb(41 47 51 / 8%) 0px 4px 15px 0px;
  padding: 1.56rem 1.88rem;

  @media (max-width: 1280px) {
    width: 100%;
    max-height: 400px;
    min-width: 360px;
    box-shadow: none;
    border: none;
    border-radius: 0;
    position: relative;
    overflow: hidden;

    & > p:nth-of-type(1) {
      border-bottom: none;
      padding: 15px 0;
      height: 100%;
    }
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// export const ButtonContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 1.2rem;
//   position: absolute;
//   bottom: 0.5rem;
// `;

// export const MoreButton = styled.button`
//   font-weight: var(--normal);
//   font-size: 1rem;
//   color: var(--gray-900);
//   background: var(--white);
// `;

export const PreviewName = styled.h1`
  font-size: 20px;
  color: var(--gray-800);
  font-weight: var(--semi-bold);
  word-break: break-all;
`;

export const Warning = styled.p`
  font-size: 14px;
  color: var(--gray-600);
  padding: 12px 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const PreviewDescription = styled.div<{ isMoreClicked?: boolean }>`
  flex: 1 0 50px;
  overflow-y: auto;
  font-size: 14px;
  color: var(--gray-800);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  white-space: break-spaces;
  word-break: break-all;
  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 1280px) {
    margin-top: 0.8rem;
  }
`;

export const PreviewInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  font-size: 14px;
  gap: 0.3rem;
  p > div > div:first-of-type {
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

export const ScrollContainer = styled.div<{ maxHeight?: string }>`
  overflow: auto;
  max-height: ${({ maxHeight }) =>
    maxHeight ? maxHeight : 'calc(100vh - 300px);'};
`;

export const TimeZoneContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  section {
    // font-size: 15px;
    .showSearcjResultDesing {
      padding: 1em;
    }
  }
  @media (max-width: 768px) {
    .showSearcjResultDesing {
      max-height: 12.813em;
    }
  }
`;
export const ArrowIcon = styled.span<{ isDropdown: boolean }>`
  ${({ isDropdown }) =>
    isDropdown
      ? `transform: rotate(180deg); margin-top: 1px;`
      : `margin-top: -1px;`}
  @media(max-width: 1200px) {
    ${({ isDropdown }) =>
      isDropdown ? `margin-top: -3px;` : `margin-top: -5px;`}
  }
`;
