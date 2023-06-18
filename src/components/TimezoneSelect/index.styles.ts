import styled from '@emotion/styled';

export const Wrapper = styled.section`
  * {
    font-size: inherit;
  }
  width: 100%;

  &.top {
    position: relative;
    .timezoneContainer {
      position: absolute;
      width: 100%;
      bottom: calc(100% - 2em);
    }
    .showSearcjResultDesing {
      bottom: 100%;
    }
  }


  

  .currentGmtFont {
    font-size: 0.875em;
    font-weight: 400;
    line-height: 1.5em;
  }

  .showSearcjResultDesing {
    width: 100%;
    padding: 1.563em;
    box-shadow: 0 0.313em 1em 0.188em rgba(0, 0, 0, 0.1);
    border-radius: 0.313em;
    max-height: 16em;
    overflow-y: overlay;
    position: absolute;
    background: var(--white);
    z-index: var(--middle);
  }
  .showSearcjResultDesing {
    &::-webkit-scrollbar-track {
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      border-color: white;
    }
  }

  .showSearcjResultTwoDesing {
    margin: 0;
    border: 0.063em solid #ededed;
    width: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin-bottom: 0.625em;
    height: 2.813em;
  }

  .inputDesing {
    width: 97%;
    font-weight: var(--extra-light);
    margin-right: 1.25em;
    font-size: 0.875em;
    line-height: 1.5em;
  }

  .inputDesing::placeholder {
    font-size: inherit;
    line-height: inherit;
    color: #b7b7b7;
  }

  .icon-span {
    width: 3%;
    color: #ccc;
    font-size: 2.063em;
  }

  .timeZoneDiv {
    margin-left: 0.5em;
  }

  .timeZoneDivTwo {
    margin-right: 0.938em;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 1.375em;
    color: #6f6f6f;
    font-size: 0.813em;
    > div {
      word-break: break-all;
      padding-inline-end: 0.5em;
    }
    .span-am {
      white-space: nowrap;
    }
  }

  .span-name {
    margin-right: 0.313em;
  }

  .bold {
    font-weight: bold;
  }

  .normal {
    font-weight: normal;
  }

  .currentTimeCheck {
    font-size: 0.8em;
    font-weight: 400;
    line-height: 1.5em;
  }

  .timezoneContainer {
    position: relative;
  }
  @media (max-width: 768px) {
    .currentTimeCheck {
      display: none;
    }
    .showSearcjResultDesing {
      padding: .8em 0.5em;
      max-height: 13em;
    }
  }
`;

export const ArrowIcon = styled.span<{ isDropdown: boolean }>`
  ${({ isDropdown }) =>
    isDropdown ? `transform: rotate(180deg); margin-top: 5px;` : ``}
`;

export const Heading = styled.div<{page?: string}>`
  font-style: normal;
  font-weight: 400;
  font-size: ${({page}) => page === 'signup' ? '14px' : '1em'};
  line-height: ${({page}) => page === 'signup' ? '1' : '1.5em'};

  @media (max-width: 768px) {
    display: ${({page}) => page === 'signup' ? 'block' : 'none'};
  }
`;

export const TimezoneButton = styled.div<{page?: string}>`
  margin-top: 0.5em;
  margin-bottom: 0.3em;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #d8d8d8;
  padding: 0.75rem;
  display: flex;
  height: ${({page}) => page === 'signup' ? '55px' : '2.5rem'};
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    height: ${({page}) => page === 'signup' ? '47px' : '2.5rem'};
  }
`;
