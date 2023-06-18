import styled from '@emotion/styled';

const SignupContainer = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--gray-100);
  padding: 40px 40px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  gap: 50px;
`;

const LogoWrapper = styled.div`
  width: 200px;
`;

const MultiStepProgressBarWrapper = styled.div`
  width: 100%;
  padding: 0 60px;
`;

const ComponentCardWrapper = styled.div`
  width: 100%;
`;

export {
  ComponentCardWrapper,
  ContentWrapper,
  LogoWrapper,
  MultiStepProgressBarWrapper,
  SignupContainer,
};
