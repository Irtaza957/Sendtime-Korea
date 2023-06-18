import styled from '@emotion/styled';

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: var(--regular);
  color: var(--gray-700);
`;

export const SubDescription = styled.p<{ fontColor?: string }>`
  font-size: 16px;
  color: ${({ fontColor }) =>
    fontColor ? `var(--${fontColor})` : 'var(--gray-700)'};
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  gap: 10px;

  button {
    flex: 1 0;
  }
`;

/** CalendarAddModal */
export const CalendarAddModalContainer = styled.div`
  width: 400px;
  height: 520px;
  padding: 48px 50px;
  background-color: var(--white);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 50px rgba(191, 203, 217, 0.15);
`;

export const OneButtonContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
  }
`;

/** DisconnectModal */
export const DisconnectModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 180px;
  padding: 25px 30px;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: 0px 2.4px 30px rgba(191, 203, 217, 0.15);
`;

export const DisconnectAccountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--gray-300);
  background-color: var(--gray-50);
  padding: 10px 30px;
  font-size: 14px;
`;

/** GetCalendarModal */
export const GetCalendarModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 50px;
  gap: 44px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border-radius: 15px;
  box-shadow: 0px 4px 50px rgba(191, 203, 217, 0.15);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin: 0;
`;

export const CalendarAccount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: var(--gray-750);
  font-weight: var(--regular);
  width: fit-content;
  margin: 0 auto 15px auto;
`;

export const CalendarWrapper = styled.div<{ length?: number }>`
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
      `box-shadow: 0 -20px 20px -20px #bfcbd9a8 inset; 
       border-radius: 5px;`
    }`};
`;

/** PostCalendarModal */
export const PostCalendarModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 580px;
  padding: 40px 0;
  background-color: var(--white);
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0px 4px 50px rgba(191, 203, 217, 0.15);
`;

export const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 60px;
  width: 100%;
  gap: 16px;

  input[type='text'] {
    background: inherit;
  }
`;

export const CalendarContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  border-top: 1px solid var(--gray-400);
  border-bottom: 1px solid var(--gray-400);
  background-color: var(--gray-50);
  padding-top: 20px;
  padding-bottom: 30px;
`;

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const AccountWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const RadioButton = styled.input`
  position: relative;
  width: 0px;
  height: 0px;
  margin-right: 17px;
  cursor: pointer;

  &:after {
    display: block;
    content: '';
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 1px solid var(--gray-400);
    position: absolute;
    left: 0;
    top: 0;
  }

  &:checked {
    &:after {
      display: block;
      content: '';
      width: 9px;
      height: 9px;
      border-radius: 50%;
      border: 5px solid var(--purple-500);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

export const RadioButtonLabel = styled.label`
  display: inline-flex;
  gap: 10px;
  color: var(--gray-750);
`;

/** WithdrawalModal */
export const WithdrawalModalContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  gap: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 50px rgba(191, 203, 217, 0.15);
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;
