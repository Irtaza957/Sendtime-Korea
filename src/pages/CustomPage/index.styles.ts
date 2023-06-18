import styled from '@emotion/styled';

export const CustomPageSection = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background: var(--white);
  position: relative;
`;

export const MainImageWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--middle);

  & > span {
    width: 100% !important;
    height: 160px !important;
    box-shadow: 0px 0px 15px 2px #003d7617;

    img {
      object-fit: cover;
    }
  }
`;

export const CardsWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 85px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  position: relative;
  z-index: var(--front);

  @media (max-width: 768px) {
    padding: 40px 0px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: hidden;
    padding: 50px 0;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    align-items: center;
  }
`;

export const CardsContentWrapper = styled.div`
  width: max-content;
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CompanyCardWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const LanguageDropdownWrapper = styled.div`
  margin-bottom: 20px;
`;

export const CardSection = styled.div<{
  cardCount: number;
  maxCardHeight?: number;
  gap?: number;
  maxHeight?: number;
}>`
  display: grid;
  flex-direction: column;
  z-index: var(--middle);
  grid-gap: ${({ gap }) => `${gap ?? 25}px`};
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: ${({ maxCardHeight }) => `${maxCardHeight ?? 550}px`};
  position: relative;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1580px;
  height: max-content;

  @media only screen and (min-width: 1601px) and (max-width: 2000px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1260px;
  }

  @media only screen and (min-width: 1201px) and (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 940px;
  }

  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 660px;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 340px;
    margin: 0 auto;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border: 2px solid var(--gray-400);
    background: var(--gray-400);
  }

  ::-webkit-scrollbar-track {
    background: var(--transparent);
  }

  @media only screen and (max-width: 768px) {
    height: auto;
    min-height: unset;
    max-height: unset;
  }
`;

export const NetworkPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: auto;

  & span {
    font-size: 14px;
  }
`;

export const CodeTitle = styled.div`
  font-size: 20px;
  font-weight: var(--semi-bold);
`;
