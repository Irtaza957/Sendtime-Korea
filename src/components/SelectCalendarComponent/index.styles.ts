import styled from '@emotion/styled';

export const SelectCalendarContainer = styled.section`
  width: 100%;
`;

export const Title = styled.h1`
  margin-bottom: 16px;
`;

export const SubDescription = styled.p`
  font-weight: var(--normal);
  color: var(--gray-700);
  line-height: 1.4;
`;

export const CalendarListContainer = styled.div`
  width: 100%;
  margin: 40px 0 25px 0;
  display: flex;
  flex-direction: column;
  gap: 8.5px;
`;

export const CalendarButton = styled.button`
  display: flex;
  position: relative;
  align-items: stretch;
  width: 100%;
  justify-content: space-between;
  padding: 13.5px 11px 13.5px 16.7px;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  gap: 8px;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    `&:before {
        position: absolute;
        display: block;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: white;
        opacity: 0.6;
        cursor: default;
        z-index: 1;
      }
    `}
`;

export const IconContainer = styled.div`
  display: flex;
  min-height: 22px;
  min-width: 22px;
`;

export const CalendarContent = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  flex-direction: column;
  margin-right: 25px;
`;

export const CalendarName = styled.h2<{ disabled: boolean }>`
  display: inline-block;
  position: relative;
  font-size: 15px;
  width: fit-content;
  font-weight: 500;
  color: var(--gray-750);
  text-align: left;

  ${({ disabled }) =>
    disabled &&
    `
      &:after {
        display: block;
        position: absolute;
        content: 'COMING';
        font-size: 12px;
        font-weight: var(--normal);
        background-color: var(--purple-200);
        color: white;
        border-radius: 4px;
        padding: 4px 8px;
        top: -3px;
        right: 0;
        transform: translate(110%);
        z-index: 2;
      }
    `}
`;

export const CalendarDescription = styled.p`
  font-size: 14px;
  color: var(--gray-600);
  text-align: left;
`;

export const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
