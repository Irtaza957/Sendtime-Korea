import styled from '@emotion/styled';

const BetaSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  @media (max-width: 768px) {
    h1 {
      line-height: 1.2;
      font-size: 20px;
    }

    & > section > div:first-of-type {
      display: none;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SubDescription = styled.span`
  font-size: 14px;
  color: var(--gray-600);
  text-align: center;
  line-height: 1.4;
`;

const Title = styled.h1`
  text-align: center;
  line-height: 1.6;
`;

const FormContainer = styled.form<{ hasCustomInput?: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr min-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 0 20px;
  max-width: 650px;
  margin: 50px;

  & > div {
    & > div {
      ${({ hasCustomInput }) =>
        hasCustomInput && `border-color:var(--purple-500);`}

      padding: 6.5px;
      border-radius: 10px;
      padding-left: 20px;
      input {
        line-height: 1.6;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    margin-top: 10px;

    & > div {
      & > div {
        padding: 1.5px;
        border-radius: 10px;
        padding-left: 10px;
        input {
          line-height: 1.2;
          font-size: 14px;
        }
      }
    }
  }

  button {
    align-self: stretch;
  }
`;

const SubmitSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-right: 40px;
`;

const BetaLinkContainer = styled.div`
  margin-top: 30px;
`;

const ButtonContent = styled.p`
  font-size: 13px;
  color: var(--gray-700);
  font-weight: var(--normal);
`;

export {
  BetaLinkContainer,
  BetaSection,
  ButtonContent,
  ContentWrapper,
  FormContainer,
  SubDescription,
  SubmitSection,
  Title,
};
