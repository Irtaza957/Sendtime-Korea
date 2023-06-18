import styled from '@emotion/styled';

export const GRContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding: 20px 0px;

  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 20px;
    background: var(--white);
  }
`;

export const CtaButtonsWrapper = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const GRContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0px;
  }
`;

export const GRContentLeftSideWrapper = styled.div`
  width: 30%;
  height: 100%;

  @media screen and (min-width: 1536px) {
    width: 30%;
  }

  @media screen and (min-width: 1024px) and (max-width: 1536px) {
    width: 40%;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
`;

// Right Side
export const GRContentRightSideWrapper = styled.div`
  width: 70%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media screen and (min-width: 1024px) and (max-width: 1536px) {
    width: 60%;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
`;

export const GRContentRightSideInnerWrapper = styled.div`
  height: 100%;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  overflow: auto;

  @media (max-width: 1024px) {
    padding: 0px;
    padding-bottom: 80px;
    overflow: unset;
    gap: 20px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
`;

export const SubTitle = styled.h1`
  font-size: 20px;
  color: var(--gray-800);
  font-weight: var(--semi-bold);
  word-break: break-all;
`;

export const SubDescription = styled.p`
  color: #8f98a3;
  font-size: 16px;
`;

export const LocationSubTitle = styled.h2`
  margin: 20px 0px;
  font-weight: var(--regular);
  color: var(--gray-750);
`;

export const FormSubtitle = styled.h2`
  margin: 0px 0px 20px 0px;
  font-weight: var(--regular);
  color: var(--gray-750);
`;

export const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LocationWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: ${({ width }) => (width ? width : '100%')};
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const MeetAlert = styled.span`
  font-size: 12px;
  color: var(--gray-600);
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;

export const ButtonContent = styled.span`
  display: inline-flex;
`;

export const Box = styled.div<{ flex?: boolean; margin?: string }>`
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  ${({ flex }) => flex && `flex-direction: column;`}
  gap: 20px;
  width: 100%;
  ${({ margin }) => margin && margin};
`;

export const FixedNextButton = styled.div`
  position: fixed;
  bottom: 25px;
  left: 0;
  width: calc(100% - 90px);
  margin: 0 45px;
  gap: 6px;
`;

export const FileErrorModalContainer = styled.section`
  width: 100%;
  height: 100%;
  top: 46px;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: transparent;
  z-index: var(--very-front);
  overflow: hidden;
  position: fixed;
`;
