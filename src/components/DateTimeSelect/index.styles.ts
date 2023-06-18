import styled from '@emotion/styled';

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  object-fit: cover;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  input {
    font-size: 12px;
  }
`;
const TimeBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 2.7rem;
  border-radius: 5px;
  input[type='text'] {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #131416;
  }
`;

const LineBox = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gray-300);
  width: 116px;
  height: 2.6rem;
  padding: 9px 14px 9px 14px;
  border-radius: 5px;
  background: #ffffff;

  input {
    cursor: pointer;
  }
  .root {
    align-text: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #131416;
  }
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::before {
    border-bottom-color: var(--purple-200);
  }

  .react-datepicker__tab-loop {
    width: 0;

    .react-datepicker__day--keyboard-selected {
      background: var(--purple-500);
    }

    .react-datepicker__day--selected {
      background: var(--purple-500);
    }

    .react-datepicker__header {
      background: var(--purple-50);
    }
  }

  .react-datepicker__navigation-icon--next::before {
    transform: none;
    left: -7px;
  }

  .react-datepicker__navigation-icon--previous::before {
    transform: rotate(180deg);
  }

  .react-datepicker__navigation-icon::before {
    background: url('https://storage.sendtime.app/icons/next.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-attachment: center;
    background-position: center;
    width: 15px;
    height: 15px;
    border: 0;
  }
`;

export { DateTimeContainer, LineBox, TimeBox };
