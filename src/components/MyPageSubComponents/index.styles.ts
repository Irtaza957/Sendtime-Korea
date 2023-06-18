import styled from '@emotion/styled';

export const NamedInputContainer = styled.div`
  height: 80px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-bottom: 8px;
    font-size: 14px;
  }

  input {
    width: 300px;
    height: 50px;
    border: 1px solid var(--gray-300);
    border-radius: 5px;
    padding: 14.5px 20px;
    font-size: 15px;
    color: var(--gray-800);

    &:disabled {
      background-color: var(--gray-100);
      color: var(--gray-600);
    }
  }
`;

export const ContentTitle = styled.h3`
  font-size: 16px;
  color: var(--gray-750);
  margin-bottom: 10px;
  font-weight: var(--regular);
`;

export const ContentDescription = styled.p`
  font-size: 13px;
  font-weight: var(--normal);
  color: var(--gray-600);
  margin-bottom: 6px;
  white-space: pre-line;
  line-height: 20px;
`;

export const Content = styled.div`
  margin-top: 10px;
`;

export const AccountContainer = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid var(--gray-400);
  background-color: var(--gray-50);
  display: flex;
`;

export const LogoContainer = styled.div`
  width: 56px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RestContainer = styled.div`
  display: flex;
  flex-grow: 1;
  border-left: 1px solid var(--gray-400);
  justify-content: space-between;
  padding: 17px 16px;
`;

export const Email = styled.span`
  color: var(--gray-750);
  font-weight: var(--regular);
  font-size: 15px;
`;

export const DisconnectAccount = styled.button`
  color: var(--gray-600);
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  height: 100%;

  svg {
    margin-right: 4px;
  }

  &:hover {
    color: var(--red);
    text-decoration: underline;

    svg path {
      fill: var(--red);
    }
  }
`;

DisconnectAccount.defaultProps = {
  type: 'button',
};

export const CalendarAccount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CalendarType = styled.span`
  color: var(--gray-700);
  font-weight: var(--regular);
  font-size: 14px;
`;

export const CalendarInfo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: var(--gray-750);
  font-size: 16px;
  font-weight: var(--regular);
  gap: 8px;
`;

export const CalendarContainer = styled.div`
  display: flex;
  gap: 8px;
`;
