import styled from '@emotion/styled';

const MakeOwnUrlSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  position: absolute;
  bottom: -70px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SubDescription = styled.span`
  font-size: 16px;
  color: var(--gray-700);
`;

const Title = styled.h1`
  text-align: center;
  line-height: 1.6;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 0 20px;
  margin-top: 30px;
`;

const SubmitSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
`;

export {
  Bottom,
  ContentWrapper,
  FormContainer,
  Label,
  MakeOwnUrlSection,
  SubDescription,
  SubmitSection,
  Title,
};
