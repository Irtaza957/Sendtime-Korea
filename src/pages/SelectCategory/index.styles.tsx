import styled from '@emotion/styled';

const ContentWrapper = styled.section`
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 16px;
`;

const SubDescription = styled.p`
  font-weight: var(--regular);
  color: var(--gray-700);
  line-height: 1.4;
`;

const CalendarAccount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: var(--gray-750);
  font-weight: var(--normal);
  margin: 42px 0 16px 0;

  & > div {
    margin: 0;
  }
`;

const CalendarWrapper = styled.div<{ length?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow: auto;

  ${({ length }) =>
    `${
      length &&
      length > 3 &&
      `box-shadow: 0 -20px 20px -20px #bfcbd961 inset; 
       border-radius: 5px;`
    }`};
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  margin: 0 auto;
  position: absolute;
  bottom: -70px;
`;

export {
  Bottom,
  CalendarAccount,
  CalendarWrapper,
  ContentWrapper,
  SubDescription,
  Title,
};
