import styled from '@emotion/styled';

export const MyCalendarContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100%;

  & > div > section > section:first-of-type {
    height: 96%;
    min-width: auto;
  }

  @media (max-width: 768px) {
    section {
      .fc .fc-view-harness {
        min-width: auto;
      }

      .fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
        margin: 0;
      }
    }

    @media (max-width: 425px) {
      section {
        .fc-col-header-cell.fc-day {
          padding: 4px 0;
        }

        .fc .fc-timegrid-axis-cushion,
        .fc .fc-timegrid-slot-label-cushion {
          font-size: 11px;
        }

        .fc-direction-ltr .fc-timegrid-slot-label-frame {
          width: fit-content;
        }

        .fc-timegrid-slot.fc-timegrid-slot-label.fc-scrollgrid-shrink {
          width: fit-content;
        }
      }
    }
  }
`;

export const CalendarLoading = styled.div`
  color: var(--white);
  text-align: center;
  line-height: 1.6;
`;

export const ArcadeEmbed = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: var(--very-front);
  display: flex;
  justify-content: center;
  align-items: center;

  iframe {
    margin: 0 auto;
  }
`;

export const NoticeBannerContainer = styled.div`
  width: 100%;
  min-height: 40px;
  max-width: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
  max-height: 40px;

  &:hover button {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    a {
      margin: 0 auto;
    }
  }
`;

export const NoticeBanner = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: var(--gray-200);
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: var(--semi-bold);
  color: var(--gray-750);
  font-size: 13px;

  animation: 15s linear 1s infinite slideTopInfinite;

  &:hover {
    box-shadow: 0px 2px 8px #9b98a226;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 7px 12px;
  }
`;

export const BannerText = styled.span`
  @media (max-width: 768px) {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 425px) {
    max-width: 220px;
  }
`;
