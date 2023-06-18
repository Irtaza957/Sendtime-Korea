import i18next from 'i18next';

import styled from '@emotion/styled';

export const DeleteButton = styled.button<{ is15Min?: boolean }>`
  position: absolute;
  left: 2.5px;
  top: ${({ is15Min }) => (is15Min ? '2px' : '3px')};
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 40px;

  &:hover {
    path {
      fill: var(--purple-100);
      stroke: var(--purple-600);
    }
  }
`;

export const BlockedButton = styled.div<{ is15Min?: boolean }>`
  padding: ${({ is15Min }) => (is15Min ? '1px 0 0 18px' : '2px 2px 2px 18px')};
  position: relative;
  width: 100%;
  overflow: hidden;
  color: var(--gray-700);
  cursor: pointer;
  z-index: var(--normal);
  min-height: 40px;
  justify-content: flex-start;
  display: flex;
  align-items: flex-start;
  text-align: left;
`;

const CalendarSection = styled.section<{
  date: string;
  enableModal: boolean;
  selectable: boolean;
  locale?: string;
  timeUnitCount?: number;
}>`
  width: 100%;
  /* min-width: 1024px; */
  min-width: 520px;
  height: 100%;
  font-size: 10px;
  position: relative;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    margin: 0 auto;
  }

  section:first-of-type {
    position: absolute;
    margin: 0;
    right: 0;
    top: 12px;
    display: flex;
    justify-content: flex-end;
  }

  button:disabled {
    cursor: default !important;
  }

  .fc-event-selected:before,
  .fc-event:focus:before {
    z-index: -1;
  }

  .fc-event-selected:after,
  .fc-event:focus:after {
    background: none;
    z-index: -1;
  }

  .fc .fc-bg-event {
    background: var(--fc-non-business-color);
    opacity: 1;
  }

  .fc .fc-timegrid-bg-harness {
    z-index: var(--modal-very-front) !important;
  }

  .fc-direction-ltr .fc-timegrid-col-events {
    z-index: 2;
  }

  .fc .fc-timegrid-now-indicator-container {
    z-index: var(--very-front) !important;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    margin: 1.5em 0;
  }

  .fc .fc-timegrid-now-indicator-arrow {
    border-color: black;
  }
  .fc-direction-ltr .fc-timegrid-now-indicator-arrow {
    border-top-color: transparent;
    border-bottom-color: transparent;
  }

  .fc-timegrid-now-indicator-line {
    /* Indicator */
    border-color: black;
  }

  .fc-toolbar-chunk button {
    margin-left: 0 !important;
  }

  /* Navigation */
  .fc .fc-toolbar-title {
    font-size: 20px;
    font-weight: var(--regular);
    color: var(--gray-800);
    margin-right: 10px;
    min-width: 240px;
  }

  .fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
    height: 95%;
    gap: 15px;

    @media (max-width: 768px) {
      margin: 0 20px;
    }
  }

  .fc-toolbar-chunk {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 820px) {
      flex-direction: column;
      align-items: flex-start;

      .fc-button-group {
        margin: 0;
        margin-top: 20px;
      }
    }
  }

  .reservation-events {
    div {
      overflow: hidden;
      color: var(--white);
    }
    background: var(--purple-500) !important;
  }

  .fc-timegrid-event-harness .reservation-events .fc-event-main {
    border: 0 !important;
    padding: 0 1px;
  }

  .fc-button.fc-button-primary:not(:disabled) {
    margin-left: 0;
    cursor: pointer;
    z-index: var(--normal);
    color: var(--gray-600);
  }

  .fc-button.fc-button-primary:not(:disabled):hover {
    color: var(--gray-800);
    background: var(--gray-50);
    border-color: var(--gray-700);
  }

  .fc .fc-button-primary.fc-today-button:disabled {
    color: var(--gray-500);
    border-color: var(--gray-200);
  }

  .fc-direction-ltr .fc-button-group > .fc-button {
    padding: 5px 7px;
    margin-right: 5px;
  }

  .fc-direction-ltr .fc-button-group > .fc-button,
  .fc-today-button {
    border-radius: 6px;
    background-color: var(--white);
    border: 1px solid var(--gray-400);
    color: var(--gray-800);
    margin-left: 0;
    font-size: 14px;
    min-width: fit-content;
  }

  .fc-today-button {
    padding: 5.5px 12px;
    margin-right: 5px;
  }

  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:focus {
    box-shadow: none;
    border-color: var(--gray-700);
    background: var(--gray-50);
  }

  .fc .fc-button .fc-icon {
    font-size: 20px;
    color: var(--gray-600);
  }

  /* 30분마다 줄 그어지는 것 해결*/
  .fc-timegrid-slots
    tr:nth-of-type(4n-2)
    .fc-timegrid-slot-lane.fc-timegrid-slot-minor {
    border-bottom: 0.5px solid var(--gray-200);
  }

  .fc-timegrid-axis-frame.fc-scrollgrid-shrink-frame.fc-timegrid-axis-frame-liquid {
    border-bottom: 0.5px solid var(--gray-500);
  }

  /* ------- Navigation 끝 ------- */
  /* Click Modal */
  .fc-theme-standard .fc-popover {
    border-radius: 3px;
    box-shadow: 0px 2.5px 20px 0 #292f3330;
    border: none;
  }

  /* ------- Click Modal ------- */
  .fc-daygrid-day-bottom {
    position: relative;
  }

  .fc-popover-header {
    height: 30px;
    border-radius: 3px 3px 0 0;
    background: var(--gray-50);
    border-bottom: 0.5px solid var(--gray-400);
  }

  .fc-event-main {
    position: relative;
    cursor: ${({ enableModal }) => (enableModal ? 'pointer' : 'default')};

    & > div {
      word-break: keep-all;
    }
  }

  /* ------- Click Modal 끝 ------- */
  .fc .fc-daygrid-more-link {
    position: absolute;
    right: 4px;
    background: var(--purple-400);
    color: var(--white);
    padding: 2px;
    border-radius: 2px;
    bottom: -3px;
    z-index: var(--very-front);
  }

  .fc-v-event {
    background-color: none !important;
  }

  /* 이벤트 */
  .fc-h-event .fc-event-main-frame,
  .fc-h-event .fc-event-main {
    cursor: pointer;
    background: var(--gray-400);
    padding: 1px;
    border: none;
    font-weight: var(--normal);
    color: var(--gray-800);
  }

  .fc-timegrid-event-harness:not(:first-of-type) {
    box-shadow: -1px 1px 5px #60666d35;
    border-radius: 4px;
  }

  .fc .fc-scrollgrid-sync-inner .fc-col-header-cell-cushion,
  .fc .fc-timegrid-slot-label-cushion {
    font-size: 12px;
  }

  /* 이벤트 border */
  .fc-timegrid-event-harness-inset .fc-timegrid-event.blocked-events {
    border: none;
    overflow: unset;
    border-radius: 4px;
    margin: 0px 1px -1px 0.5px;
  }

  .fc-timegrid-event-harness-inset .fc-timegrid-event.unavailable-events {
    border: none;
    border-radius: 0;
    border-top: 0.5px solid var(--unavailable);
    background: var(--none);

    &:hover {
      background-image: linear-gradient(
        55deg,
        var(--unavailable-100) 3.13%,
        var(--unavailable-50) 3.13%,
        var(--unavailable-50) 50%,
        var(--unavailable-100) 50%,
        var(--unavailable-100) 53.13%,
        var(--unavailable-50) 53.13%,
        var(--unavailable-50) 100%
      );
      background-size: 19.53px 27.9px;
      height: ${({ timeUnitCount }) => `${20.625 * (timeUnitCount ?? 0)}px;`};

      &:before {
        content: '예약 불가';
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: var(--unavailable);
      }
    }
  }

  .fc-timegrid-event-harness-inset .fc-timegrid-event.calendar-events {
    /* border: none; */
    overflow: unset;
    border-radius: 4px;
    /* margin: 1.5px 1.75px 0px 0.8px; */
    box-shadow: 0px 0px 4px 0px var(--gray-50);
    margin: 1px 1.75px 0px 0.8px;
    /* margin: 0 0; */
  }

  .fc-timegrid-event.fc-event-mirror,
  .fc-timegrid-more-link,
  .fc-direction-ltr .fc-daygrid-event.fc-event-end,
  .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    border: none;
    overflow: hidden;
    border-radius: 4px;
  }

  .fc-v-event .fc-event-title {
    white-space: pre;
  }

  .blocked-events > *,
  .fc-timegrid-col-events
    .fc-timegrid-event.fc-v-event.fc-event.fc-event-start.fc-event-end.fc-event-future.blocked-events
    .fc-event-main {
    background: var(--fc-non-business-color) !important;
    background-color: var(--fc-non-business-color) !important;
    overflow: hidden;
  }

  .blocked-events {
    margin: 0;
    border-radius: 0 !important;
  }

  .blocked-events .fc-event-main {
    border: 0.5px solid var(--gray-500) !important;
    border-radius: 0 !important;
    border-right: 0 !important;
    border-left: 0 !important;
    padding: 0 !important;
    margin: 0.25px 0px 0px -0.5px;
  }

  .fc-timegrid-slot.fc-timegrid-slot-label.fc-timegrid-slot-minor {
    padding: 4px;
  }

  .fc-day-disabled .fc-scrollgrid-sync-inner {
    @media (max-width: 1535px) {
      display: flex;
      justify-content: center;
    }
  }
   th .fc-scroller-harness .fc-scroller {
    overflow: hidden !important;
    background: var(--gray-50);
  }
  .fc-day-disabled .fc-scrollgrid-sync-inner:before {
    ${() => {
      return `content: ' ${i18next.t('common:notAvailable')}';`;
    }}
    font-size: 12px;
    color: var(--alert);
    font-weight: var(--normal);
    display: inline-block;
    padding: 2px 4px;
    z-index: 1;
    cursor: default;
    @media (max-width: 1535px) {
      ${() => {
        return `content: ' ${i18next.t('common:notAvailable')}';`;
      }}
    }
  }
  ${({ selectable }) =>
    selectable &&
    `.fc-timegrid-slot.fc-timegrid-slot-lane.fc-timegrid-slot-minor:hover {
    cursor: pointer;
    border-top: 1px solid var(--purple-500);
    z-index: 999999999999999;
  }`}

  .fc-day-disabled {
    .fc-timegrid-now-indicator-container {
      background: var(--gray-600-25) !important;
      background: var(--fc-guest-non-business-color) !important;
    }
  }

  .fc-timegrid-col-frame[data-id='disabled-area'] {
    pointer-events: none;
    z-index: var(--front);
    background: var(--white);
    cursor: default;
  }

  .fc .fc-non-business {
    background: var(--fc-guest-non-business-color);
    opacity: 0.8;
  }

  .calendar-events,
  .calendar-events > *,
  .fc-timegrid-event.fc-v-event.fc-event.fc-event-start.fc-event-end.fc-event-future.calendar-events
    .fc-event-main {
    background: var(--gray-400) !important;

    & > div {
      overflow: hidden;
    }
  }

  .fc-event-main {
    box-shadow: none !important;
    padding: 1px;
    border-radius: 1px;
  }

  .fc-timegrid-event-harness {
    box-shadow: none !important;
  }

  .fc-daygrid-block-event .fc-event-time,
  .fc-daygrid-block-event .fc-event-title {
    color: var(--gray-800);
  }

  .fc .fc-col-header-cell-cushion {
    /* 상단 날짜/요일에 관한 스타일 */
    font-weight: var(--normal);
  }

  .fc-highlight,
  .fc .fc-timegrid-col-bg .fc-highlight {
    background: var(--purple-200-50);
    border: 1px solid var(--purple-500);
    border-radius: 4px;

    background: var(--purple-200-50);
    border: 1pxsolidvar (--purple-500);
    border-radius: 2px;
    margin: 0.5px 1.2px 2px 0.5px;
    border: 1px solid var(--purple-500);
  }

  .fc-timegrid-event-harness-inset .fc-timegrid-event {
    background: var(--white);
    box-shadow: none;
    margin: 0px 1px 0px 0px;
  }

  .fc-direction-ltr .fc-timegrid-col-events {
    margin: -0.5px;
  }

  div.fc-timegrid-slots > table > tbody > tr:nth-of-type(4n) {
    border: 0;
    border-bottom: 0.5px solid var(--gray-500);
  }

  .fc-list-item:hover td:hover {
    background: var(--block-inner);
  }

  .fc-direction-ltr .fc-timegrid-slot-label-frame {
    /* 좌측 시간 관한 스타일 */
    text-align: left;
    padding: 4px 0 4px 2px;
  }

  .fc-day-sun .fc-scrollgrid-sync-inner {
    color: var(--alert);
  }

  .fc-theme-standard td,
  .fc-theme-standard th {
    /* 중앙 스케쥴 관한 스타일 */
    background: var(--white);
    border: 0;
    /* border-left: 0.5px solid var(--gray-400); */
  }

  .fc-timegrid-slot.fc-timegrid-slot-label.fc-scrollgrid-shrink {
    border-bottom: 0;
  }

  .fc .fc-timegrid-slot-minor {
    /* 좌측/중앙 30분마다 줄이 그어진 것에 관한 스타일 */
    border: 0;
  }

  .fc .fc-view-harness {
    /* min-width: 950px; */
    /* min-width: 680px; */
    min-width: 520px;
  }

  .fc-view-harness.fc-view-harness-active
    > div
    > table
    > thead
    > tr
    > th
    > div
    > div
    > table
    > thead
    > tr
    > th.fc-timegrid-axis {
    background: var(--gray-50);
    border: 0;
    border-right: 0.5px solid var(--gray-500);
  }

  colgroup col {
    width: 60px !important;
  }

  .fc td:last-of-type .fc-daygrid-day-frame {
    border-right: 0.5px solid var(--gray-500);
    border-bottom: 0.5px solid var(--gray-500);
  }

  .fc-col-header-cell.fc-day {
    border: 0;
    border-right: 0.5px solid var(--gray-500);
    padding: 4px;
    text-align: left;
    background: var(--gray-50);
  }

  .fc-col-header tr {
    border-bottom: 1.5px solid var(--gray-550);
  }

  .fc-theme-standard tr td:first-of-type {
    background: var(--gray-50);
  }

  .fc-theme-standard tr:nth-of-type(4n) td:first-of-type,
  .fc-theme-standard tr:nth-of-type(4n) th:first-of-type {
    /* 좌측 시간에 관한 스타일 */
    border: 0;
    border-bottom: 0.5px solid var(--gray-500);
  }

  .fc-v-event .fc-event-main-frame {
    padding: 2px;
  }

  // .fc-day-today .fc-scrollgrid-sync-inner .fc-col-header-cell-cushion::before {
  //   content: ${({ date }) => `'${date}'`};
  //   color: white;
  //   margin-right: 2px;
  //   background: var(--link-blue);
  //   height: 16px;
  //   width: 16px;
  //   border-radius: 50%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }

  .fc-day-today .fc-scrollgrid-sync-inner .fc-col-header-cell-cushion {
    display: flex;
    color: var(--link-blue);
    align-items: center;
  }

  .fc
    .fc-timegrid-axis-frame.fc-scrollgrid-shrink-frame.fc-timegrid-axis-frame-liquid {
    /* 좌측 종일 일정에 관한 스타일 */
    /* background: var(--white); */
    background: var(--gray-50);
    text-align: left;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 2px;
    padding-top: 2px;
    font-size: 12px;
    border-right: 0.5px solid var(--gray-500);
  }

  .fc .fc-timegrid-now-indicator-container {
    border-right: 0.5px solid var(--gray-500);
    z-index: 1;
    pointer-events: none;
  }

  .fc .fc-timegrid-divider .fc-cell-shaded,
  .fc tr:nth-of-type(2).fc-scrollgrid-section {
    /* 종일 일정과 일반 일정을 나누는 선에 대한 스타일 */
    display: none;
  }

  .fc-theme-standard .fc-scrollgrid {
    border: 0;
  }

  .hover-div {
    position: absolute;
    z-index: var(--front);
    cursor: pointer;
    background: #655ccb95;
    margin: 0px 0.6px 0 0.6px;
    pointer-events: none;
  }
`;

export { CalendarSection };
