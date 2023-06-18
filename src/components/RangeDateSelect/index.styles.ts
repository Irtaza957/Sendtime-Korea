import styled from '@emotion/styled';

const RangeDateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  input {
    font-size: 15px;
  }
`;

const LineBox = styled.div`
  display: flex;
  width: fit-content;
  border: 1px solid var(--gray-200);
  border-radius: 4px;

  input {
    cursor: pointer;
    width: fit-content;
  }

  & * {
    border-color: var(--purple-200);
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

export { LineBox, RangeDateContainer };
