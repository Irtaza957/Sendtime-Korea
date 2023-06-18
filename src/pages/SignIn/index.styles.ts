import { ImageContainer } from '@components/AutoHeightImage';
import styled from '@emotion/styled';
const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  background-color: var(--white);
`;

const SignInLeftSection = styled.section`
  display: flex;
  flex: 2 1 0;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--gray-100);
  padding: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SendtimeLogoContainer = styled(ImageContainer)`
  width: 200px;
  cursor: pointer;

  @media (max-width: 1200px) {
    width: 180px;
  }
`;

const SchedulingIllustrationContainer = styled(ImageContainer)`
  width: 400px;

  @media (max-width: 1200px) {
    width: 350px;
  }
`;

const PromotionTitle = styled.h1`
  color: var(--purple-500);
  font-weight: 700;
  font-size: 30px;
  text-align: center;
  line-height: 1;
`;

const PromotionText = styled.h2`
  color: var(--gray-700);
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
`;

const SignInRightSection = styled.section`
  display: flex;
  flex: 3 1 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SendtimeLogoMobileContainer = styled(ImageContainer)`
  display: none;
  width: 150px;
  margin-bottom: 30px;
  margin-top: 80px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SignInContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 550px;
  gap: 60px;
  padding: 45px 50px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const Title = styled.h1`
  font-weight: var(--regular);
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 40px 0;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StyledSpan = styled.span`
  color: var(--purple-500);
  text-decoration: underline;
  font-weight: var(--normal);
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;
`;

const AdditionalActionContainer = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: var(--purple-800);
  text-align: center;
`;

export {
  AdditionalActionContainer,
  Bottom,
  FormContainer,
  InputContainer,
  PromotionText,
  PromotionTitle,
  RowContainer,
  SchedulingIllustrationContainer,
  SendtimeLogoContainer,
  SendtimeLogoMobileContainer,
  SignInContainer,
  SignInLeftSection,
  SignInRightSection,
  StyledSpan,
  SubmitWrapper,
  Title,
  Wrapper,
};
