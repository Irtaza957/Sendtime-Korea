import styled from '@emotion/styled';
import { REGION } from '@utils/language';

export const GuestReservationContainer = styled.section<{
  padding?: string;
  locale?: string;
}>`
  height: 100vh;
  min-height: 100vh;
  background-color: var(--gray-50);
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding: 40px 0px;
  gap: 36px;

  @media only screen and (min-width: 1280px) and (max-width: 1535px) {
    width: 90%;
  }

  section > div {
    .fc-toolbar-chunk {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;

      .fc-button-group {
        margin-left: 0;
      }
    }

    .fc-timegrid-event-harness-inset .fc-timegrid-event.my-event {
      /* opacity: 0.7; */

      .fc-event-main {
        background: var(--blue-800);
        overflow: hidden;
      }

      div {
        color: var(--white);
      }
    }
  }

  & > button:last-of-type {
    position: fixed;
    bottom: 25px;
    left: 0;
    width: calc(100% - 90px);
    margin: 0 45px;
    gap: 6px;
  }
`;

export const Left = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Right = styled.div<{ userSelectable?: boolean; locale?: string }>`
  position: relative;
  // height: calc(100vh - 125px);
  gap: 5px;
  display: flex;
  flex-direction: column;
  width: 70%;

  @media (max-width: 768px) {
    height: auto;
  }

  .custom {
    position: fixed;
    width: fit-content;
    height: fit-content;
    background-color: var(--purple-700);
    padding: 3px 5px;
    color: var(--white);
    z-index: 999;
    pointer-events: none;
  }

  .fc .fc-timegrid-now-indicator-arrow {
    border-color: black;
  }

  // This is used to remove extra layer from bottom
  .fc-scroller-liquid-absolute {
    bottom: -15px;
  }

  .fc-direction-ltr .fc-timegrid-now-indicator-arrow {
    border-top-color: transparent;
    border-bottom-color: transparent;
  }

  .fc-timegrid-now-indicator-line {
    /* Indicator */
    border-color: black;
  }

  .blocked-events .fc-event-main {
    background: var(--fc-guest-non-business-color) !important;
    background-color: var(--fc-guest-non-business-color) !important;
  }

  .blocked-events > *,
  .fc-timegrid-col-events
    .fc-timegrid-event.fc-v-event.fc-event.fc-event-start.fc-event-end.fc-event-future.blocked-events
    .fc-event-main {
    background: var(--fc-guest-non-business-color) !important;
    background-color: var(--fc-guest-non-business-color) !important;
  }

  .fc .fc-non-business {
    background: var(--fc-guest-non-business-color) !important;
  }
  // This is used to show unavailable when any selected event overlap any blocked event
  ${({ userSelectable, locale }) =>
    !userSelectable &&
    `.fc-highlight:before, .fc .fc-timegrid-col-bg .fc-highlight:before {
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
      color: var(--purple-500);
      font-weight: var(--semi-bold);
     
      ${
        locale?.includes(REGION.KO)
          ? `content: '시간 단위 초과';`
          : locale?.includes(REGION.EN)
          ? `content: 'Unavailable';`
          : `content: '시간 단위 초과';`
      }} 
    }`}/* 
  .calendar-events:hover:before,
  .fc-non-business:hover:before,
  .blocked-events:hover:before {
    background: #19173390;
    border-radius: 3px;
    content: '예약 불가';
    white-space: nowrap;
    position: absolute;
    z-index: 999999999;
    overflow: hidden;
    bottom: 0;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: var(--white);
    font-size: 12px;
    padding: 0 5px;
    width: 100%;
    height: 100%;
  } */
`;

export const PopUpBanner = styled.div<{ bgColor?: string; shadow?: string }>`
  width: 420px;
  border-radius: 10px;
  position: absolute;
  top: 25px;
  right: 0;
  z-index: var(--very-front);
  background: ${({ bgColor }) => `var(--${bgColor ?? 'blue-500-light'})`};
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  box-shadow: 0px 6px 10px 0px
    ${({ shadow }) => shadow ?? 'rgba(0, 114, 174, 0.33)'};

  & > div:nth-of-type(2) {
    margin: 0;
  }

  &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 12px solid
      ${({ bgColor }) => `var(--${bgColor ?? 'blue-500-light'})`};
    content: '';
    top: 20%;
    position: absolute;
    right: -15px;
    transform: translate(-20%, 0);
    rotate: 90deg;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;
`;

export const BannerTitle = styled.div<{ color?: string }>`
  font-size: 18px;
  color: ${({ color }) => `var(--${color ?? 'white'})`};
  font-weight: var(--regular);
`;

export const BannerContent = styled.div<{ color?: string }>`
  font-size: 14px;
  color: ${({ color }) => `var(--${color ?? 'white'})`};
  line-height: 1.5;
  font-weight: var(--normal);
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 62px;
  right: 10px;
  display: flex;
  font-size: 12px;
  gap: 7px;
  justify-content: center;
  align-items: center;
  z-index: var(--normal);
`;

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white);
  padding-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;

export const Info = styled.span`
  margin: 20px 0 30px 0;
  font-size: 14.5px;
  display: block;
  text-align: center;
`;

export const LanguageDropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// To be checked => Not used in @web/index.tsx
export const Container = styled.div`
  width: 80%;
  max-width: 350px;
  margin: 0 auto;
`;
