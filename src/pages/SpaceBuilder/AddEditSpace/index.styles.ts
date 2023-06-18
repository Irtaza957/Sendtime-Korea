import styled from '@emotion/styled';

export const NewSpaceWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: auto;
  background-color: var(--white);
  box-shadow: rgba(85, 106, 122, 0.145) 0px 6px 25px 0px;
  border-radius: 10px;
  padding: 10px 0px;
  @media screen and (max-width: 1280px) {
    padding: 10px 24px 10px 0px;
  }
  @media screen and (max-width: 1024px) {
    padding: 10px 0px;
    height: auto;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10px 16px 0 0;
  }
`;

export const NewSpaceContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 20px 0 0 0;
  padding: 0 0 4rem;
  width: 100%;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
`;

export const ButtonContainer = styled.div<{ padding?: string }>`
  display: flex;
  gap: 12px;
  padding: ${({ padding }) => (padding ? padding : '0px')};
  width: max-content;
  @media screen and (max-width: 768px) {
    margin: 10px 0 0 0;
  }
`;

export const MainButtonContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  gap: 7px;
`;
export const Link = styled.div`
  color: var(--purple-500);
  font-size: 14px;
  margin: 5px 0 0 0;
`;

export const ImageWrapper = styled.div`
  width: 300px;
  @media screen and (max-width: 1024px) {
    margin: 0.5rem 0 0;
    width: 100%;
    max-width: 300px;
  }
`;

export const QuestionContainer = styled.div`
  // flex-shrink: 0;
  max-width: 500px;
  width: 100%;
  @media screen and (max-width: 1024px) {
    padding: 0px 16px;
  }
`;

export const QuestionInnerContainer = styled.div``;

export const ContactQuestionTitle = styled.div`
  margin: 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
`;

export const ContactQuestionWrappers = styled.div<{ padding?: string }>`
  position: relative;
  padding: ${({ padding }) => (padding ? padding : '0 0 0 0')};
`;

export const InnerContainer = styled.div`
  width: 100%;
  margin: 10px auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px;
    margin: 0px auto;
  }
`;

export const SupportContainer = styled.div`
  width: max-content;
  display: flex;
  align-items: flex-start;
  justify-content: end;
  @media screen and (max-width: 1280px) {
    display: none;
  }
`;

export const SupportWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1px;
  height: 70vh;
`;

export const SupportText = styled.div`
  display: flex;
  font-size: 26px;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background: #6056db;
  width: 150px;
  height: 150px;
  text-align: center;
  cursor: pointer;
  padding: 0 20px;
  line-height: 1.3;
`;

export const PublishedOnDesktop = styled.div`
  display: block;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const PublishButton = styled.div<{ isValid: boolean }>`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background: ${({ isValid }) => (isValid ? '#6056db' : 'var(--gray-600)')};
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  cursor: pointer;
  padding: 20px;
  @media screen and (max-width: 768px) {
    display: flex;
    width: 92%;
    left: 50%;
    bottom: 10px;
    transform: translatex(-50%);
    padding: 10px 20px;
    border-radius: 12px;
  }
`;

export const PublishText = styled.div`
  color: #ffffff;
  font-size: 45px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const PublishDescription = styled.div`
  color: var(--white);
  font-size: 20px;
  margin-top: 4px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const IframeTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #131416;
`;

export const IframeContainer = styled.div`
  padding: 20px 0 0;
  max-height: 615px;
  height: 45vw;
  @media screen and (max-width: 768px) {
    padding: 16px 0;
    height: 60vh;
  }
  iframe {
    width: 100%;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: none;
  }
`;

export const AccessWithPassword = styled.div`
  width: 100%;
`;
