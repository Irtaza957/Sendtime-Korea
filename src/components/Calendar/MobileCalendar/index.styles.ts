import styled from '@emotion/styled';

export const DotContainer = styled.span`
  display: inline-block;
  width: 4px;
  min-width: 4px;
  max-width: 4px;
  height: 4px;
  min-height: 4px;
  max-height: 4px;
  border-radius: 50%;
  background: var(--gray-750);
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
`;

export const MobileCalendarContainer = styled.div`
  position: relative;
`;

export const TimeButton = styled.button<{
  selected?: boolean;
  priority?: number;
  priorityName?: string;
}>`
  color: var(--mobile-active);
  border: 1.5px solid var(--mobile-button-border);
  padding: 10px 15px;
  border-radius: 6px;
  position: relative;

  ${({ selected, priority, priorityName }) =>
    selected &&
    priority !== -1 &&
    `
    border: 2px solid var(--mobile-active) ;
    background: #4B26E005;

    &:before {
      ${priorityName && `content: '${priority}${priorityName}';`}

      border-radius: 4px;
      font-size: 10px;
      padding: 2px 4px;
      background: var(--gray-300);
      color: var(--gray-700);
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  `}
`;

export const ConfirmReservationButtonContainer = styled.div`
  z-index: var(--middle);
  left: 0;
  position: fixed;
  bottom: 25px;
  width: calc(100% - 90px);
  margin: 0 45px;
  gap: 6px;

  button {
    width: 100%;
    box-shadow: 0 4px 10px 0 #00000025;
  }
`;

export const MobileCalendarSection = styled.section`
  .available {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 6px solid var(--white);
    background: var(--mobile-hover);
    color: var(--mobile-active);
    border-radius: 50%;
    height: 100%;
    font-weight: var(--bold);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    right: 0;
    bottom: 0;
  }

  .react-calendar__tile--now {
    .available {
      border: none;
    }
  }

  .available.selected {
    box-shadow: 0px 0px 0px 2px #5039dccc inset;
  }

  abbr[title] {
    text-decoration: none;
    font-size: 14px;
    font-weight: var(--normal);
  }

  abbr[title='일요일'] {
    color: var(--alert);
  }

  .react-calendar {
    border: none;
    width: 100%;
    max-width: 600px;
    aspect-ratio: auto 1 / 1;
    margin: 0 auto;
    padding: 0 5px;

    @media (max-width: 415px) {
      width: 320px;
    }

    @media (max-width: 376px) {
      width: 300px;
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    .react-calendar {
      width: 315px;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    abbr {
      color: var(--gray-500) !important;
      font-weight: var(--normal) !important;
    }
  }

  button:disabled {
    background: var(--white);

    abbr {
      color: #c4c4c4;
    }
  }

  .react-calendar__navigation {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    button {
      padding: 10px;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
  }

  .react-calendar__month_view {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .react-calendar__navigation__label__labelText {
    color: var(--gray-800);
    font-size: 15px;
  }

  .react-calendar__navigation button:disabled {
    background-color: var(--transparent);
  }

  .react-calendar__tile--now {
    background: var(--transparent);
    position: relative;
    border: 6px solid var(--white);
  }

  .react-calendar__tile {
    padding: 0;
    aspect-ratio: 1 / 1;
    position: relative;
    min-width: 40px;
    min-height: 40px;
  }

  .sunday {
    abbr {
      color: var(--alert);
    }
  }

  .react-calendar__tile:hover {
    background: none;
    border-radius: 0;
  }

  .react-calendar__tile--active {
    border: 6px solid var(--white) !important;
    background: var(--mobile-active) !important;
    border-radius: 50% !important;

    .available {
      border: 6px solid var(--mobile-active) !important;
      color: var(--white);
    }

    abbr {
      color: var(--white);
    }

    span {
      background: var(--white);
    }
  }

  .react-calendar .react-calendar__viewContainer button:enabled:hover {
    background: var(--mobile-active);
    border-radius: 50%;
    border: 6px solid var(--white) !important;

    & > * {
      color: var(--white);
    }

    .available {
      border: none;
    }
  }

  .react-calendar__navigation button:enabled:focus {
    background-color: var(--transparent);
  }

  // .react-calendar button:enabled:hover {
  //   border: 6px solid var(--white);

  //   .available {
  //     border: 6px solid var(--mobile-hover);

  //     @media (min-width: 766px) {
  //       border: 5px solid var(--white);
  //     }
  //   }
  // }

  // .react-calendar__tile:hover {
  //   border-radius: 50%;
  //   border: none;
  //   background: var(--mobile-hover);
  // }

  // .react-calendar__tile:focus {
  //   border-radius: 50%;
  //   border: 6px solid var(--white);
  //   background: var(--mobile-hover);

  //   .available {
  //     border: none !important;
  //   }
  // }

  // .react-calendar__tile:enabled:focus {
  //   background-color: none;
  // }

  // .react-calendar__tile--active:enabled:hover {
  //   background: none;
  // }

  //.react-calendar__tile--active:enabled:active
  // .react-calendar__tile--active:enabled {
  //   .available {
  //     border: none;
  //     color: var(--white);
  //   }
  // }

  // .react-calendar__tile--active:enabled:focus {
  //   border: 6px solid var(--white);
  //   background: var(--mobile-active);
  //   border-radius: 50%;

  //   abbr {
  //     color: var(--white);
  //   }

  //   .available {
  //     border: none;
  //     color: var(--white);
  //   }
  // }

  /* -------------------------------------------------------- */

  // .react-calendar__navigation button:enabled:focus,
  // .react-calendar__navigation button:enabled:hover {
  //   background-color: var(--mobile-hover);
  //   border: none;
  // }
`;

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;

  button {
    width: 100%;
    font-weight: var(--regular);

    &:hover {
      background-color: #4b26e010;
      border: 1.5px solid #4b26e0;
    }
  }
`;
