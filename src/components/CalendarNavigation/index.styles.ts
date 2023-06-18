import styled from '@emotion/styled';

const CalendarNavigationContainer = styled.section`
  width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;

  button {
    font-size: 14px;
    height: 100%;
    width: fit-content;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled(Box)`
  gap: 5px;
`;

const NavigationRight = styled(Box)<{ gap?: string }>`
  gap: ${({ gap }) => (gap ? gap : '10px')};

  button {
    padding: 8px 10px;
    width: 100%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NavigationLeft = styled.div`
  display: flex;
`;

const MonthTitle = styled.h1`
  color: var(--gray-800);
`;

const NavigationLeftWrapper = styled(Box)`
  gap: 10px;
`;

export {
  CalendarNavigationContainer,
  MonthTitle,
  NavigationLeft,
  NavigationLeftWrapper,
  NavigationRight,
  Wrapper,
};
