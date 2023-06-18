import styled from '@emotion/styled';

import { Alert } from '../../styles/common.styles';

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 50px;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
`;

const Title = styled.h1`
  text-align: left;
  line-height: 1.4;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

const Description = styled.h2``;

const SubDescription = styled.span`
  font-weight: var(--normal);
  text-align: center;
  color: var(--purple-400);
`;

const SubmitSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &,
  & > * {
    color: var(--purple-400);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > div:nth-of-type(1),
  & > div:nth-of-type(3) {
    width: 48%;
  }

  & > div:nth-of-type(2) {
    width: 4%;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
`;

const FormField = styled.div<{ direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 15px;
`;

const TimeAlert = styled(Alert)`
  font-size: 11px;
  color: var(--alert);
  align-self: flex-start;
`;

export {
  Bottom,
  BottomDescription,
  ContentWrapper,
  Description,
  FormField,
  FormWrapper,
  SubDescription,
  SubmitSection,
  TimeAlert,
  Title,
  TitleWrapper,
  Wrapper,
};
