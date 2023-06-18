import styled from '@emotion/styled';

const CancelPageContainerWithLanguage = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 40px 0px;
  margin: 0 auto;
  align-items: flex-end;
  gap: 20px;

  @media screen and (min-width: 786px) and (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const LanguageDropdownWrapper = styled.div`
  @media (max-width: 1024px) {
    margin-right: 20px;
  }
`;

const CancelPageContainer = styled.section<{ padding?: string }>`
  width: 100%;
  display: flex;
  height: 100vh;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0px;
  }
`;

const CancelContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0px;
  }
`;

// Left Side
const CancelLeftSideWrapper = styled.div`
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
const CancelRightSideWrapper = styled.div`
  width: 70%;
  height: calc(100% - 60px);
  background: var(--white);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: 1536px) {
    width: 70%;
  }

  @media screen and (min-width: 1024px) and (max-width: 1536px) {
    width: 60%;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const HeaderTitle = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  color: var(--gray-800);
  font-size: 18px;
  font-weight: var(--regular);
  margin-bottom: 10px;
`;

const HeaderDescription = styled.p`
  font-size: 14px;
  font-weight: var(--normal);
  color: var(--gray-600);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UpdateButton = styled.button`
  background-color: var(--alert);
  color: var(--white);
  border: 1px solid var(--alert);
  border-radius: 50px;
  font-size: 14px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  min-width: fit-content;
  padding: 10px 20px;
`;

export {
  ButtonContainer,
  CancelContentWrapper,
  CancelLeftSideWrapper,
  CancelPageContainer,
  CancelPageContainerWithLanguage,
  CancelRightSideWrapper,
  HeaderDescription,
  HeaderTitle,
  HeaderWrapper,
  LanguageDropdownWrapper,
  UpdateButton,
};
