import styled from '@emotion/styled';
import {
  CompletedTitle,
  Content,
} from '@pages/GuestReservation/Completed/index.styles';

export const Main = styled.main`
  display: flex;
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const BrandazineContainer = styled.div`
  width: 780px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: normal;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BaseSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--white);
  box-shadow: 2px 4px 20px rgba(166, 181, 198, 0.2);
  border-radius: 15px;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

export const BrandazineSection = styled(BaseSection)`
  padding: 54px 160px 36px 160px;
  margin: 50px 0 120px 0;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 56px;

  @media (max-width: 768px) {
    margin-top: 50px;
    gap: 12px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: var(--semi-bold);
  color: var(--gray-750);

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 300px) {
    font-size: 22px;
  }
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: var(--normal);
  color: var(--gray-700);

  @media (max-width: 768px) {
    text-align: center;
    width: 220px;
    font-size: 16px;
    word-break: keep-all;
  }
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 32px;

    h2 {
      font-size: 16px;
      font-weight: var(--regular);
    }
  }
`;

export const CategoryInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  transform: translateX(85px);
  margin-top: 160px;
  width: 100%;

  @media (max-width: 768px) {
    transform: translateX(0);

    button {
      width: 100%;
      height: 46px;
    }
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  gap: 8px;
  font-size: 16px;
`;

export const SendtimeLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

/** MinorCompletePage */
export const CompleteContainer = styled.div`
  box-shadow: 2px 4px 40px 0 #00000012;
  border: 1px solid var(--gray-300);
  border-radius: 15px;
  background: var(--white);
  overflow: hidden;
  display: flex;
  padding: 53px 0;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  height: 100%;
  max-height: 450px;

  @media (max-width: 768px) {
    max-height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  button {
    height: 46px;
    width: 150px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CompleteTitle = styled(CompletedTitle)`
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const CompleteContent = styled(Content)`
  margin-bottom: 12px;
`;

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 40px;
  }
`;
