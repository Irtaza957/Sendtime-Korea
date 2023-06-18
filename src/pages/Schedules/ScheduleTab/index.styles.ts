import styled from '@emotion/styled';

export const CalendarEventsContainer = styled.div`
  padding: 5px 0;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  & > button {
    flex-basis: 10%;
    min-width: 60px;
    max-width: 70px;
  }

  & > div {
    flex-basis: 40%;
    min-width: 250px;
  }
`;
