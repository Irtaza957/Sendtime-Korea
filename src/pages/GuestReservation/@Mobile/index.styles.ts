import styled from '@emotion/styled';

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white);
  padding-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;

const MobileLanguageDropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 24px 24px 0px 24px;
`;

const MobileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const OptionsWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  z-index: 1;
`;

const Header = styled.span`
  margin: 20px 0 30px 0;
  font-size: 14.5px;
  display: block;
  text-align: center;
`;

export {
  CalendarWrapper,
  Header,
  MobileContainer,
  MobileContentWrapper,
  MobileLanguageDropdownWrapper,
  OptionsWrapper,
};
