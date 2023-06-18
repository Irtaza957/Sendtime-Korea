import styled from '@emotion/styled';

const ConfirmContainer = styled.div`
  background-color: var(--gray-50);
  width: 100%;
  min-height: 100vh;
  padding: 40px 0px;
  @media (max-width: 1024px) {
    background: var(--white);
  }
`;

const LanguageDropdownWrapper = styled.div`
  display: flex;
  width: 874px;
  margin: 0px auto 20px auto;
  padding: 0;
  justify-content: end;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0 24px;
    box-shadow: none;
  }
`;

const ConfirmWrapper = styled.div`
  background: var(--white);
  box-shadow: -1px 4px 9px rgba(0, 0, 0, 0.06);
  @media (max-width: 1024px) {
    width: 100%;
    padding: 36px 24px;
    box-shadow: none;
  }
  @media (min-width: 1024px) {
    width: 874px;
    margin: 0 auto;
    padding: 40px 0px;
  }
`;

const ContentWrapper = styled.div`
  width: 430px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    gap: 10px;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
`;

const HeaderTitle = styled.h1`
  width: 100%;
  color: #000000;
  font-size: 24px;
  font-weight: var(--normal);
  text-align: center;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const HeaderDescription = styled.p`
  color: #b5b5b5;
  line-height: 1.6;
  font-size: 16px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const TimeButton = styled.a`
  display: flex;
  justify-content: center;
  color: var(--gray-600);
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 40px;
  cursor: pointer;
  text-decoration: underline;
`;

const TimeZoneContainer = styled.div`
  margin: 32px 0px;
  color: black;
`;

const ConfirmationMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const ConfirmSubTitle = styled.h1`
  color: #000000;
  font-size: 25px;
  text-align: center;
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
  font-weight: var(--normal);
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ConfirmSubDescription = styled.p`
  color: #767676;
  line-height: 1.6;
  font-size: 15px;
  text-align: center;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ConfirmMessage = styled.div`
  width: 100%;
`;

const ConfirmButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  background: var(--purple-500);
`;

const Space = styled.span`
  width: 0.6rem;
`;

export {
  ConfirmationMessageContainer,
  ConfirmButtonContainer,
  ConfirmContainer,
  ConfirmMessage,
  ConfirmSubDescription,
  ConfirmSubTitle,
  ConfirmWrapper,
  ContentWrapper,
  HeaderDescription,
  HeaderTitle,
  HeaderWrapper,
  LanguageDropdownWrapper,
  Space,
  TimeButton,
  TimeZoneContainer,
};
