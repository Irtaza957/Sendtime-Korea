import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSidebar } from '@contexts/SidebarProvider';
import {
  AllowFunc,
  BusinessHoursInput,
  DateSelectArg,
  EventClickArg,
  EventSourceInput,
  OverlapFunc,
} from '@fullcalendar/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { onMoreClick } from '@utils/calendar/utils';

import CalendarNavigation from '../CalendarNavigation';

import EventContent from './Events/Content';
import AllDayModal from './AllDayModal';
import DetailModal from './DetailModal';
import { CalendarSection } from './index.styles';

const CALENDAR_START_HEIGHT = 130;

export interface ModalContent {
  id: string;
  position: { x: number; y: number };
  title: string;
  time: { start: Date; end: Date };
  user: { name: string; email: string };
  location: string;
  category: string;
  onClickDelete: () => void;
}

export type AllDayEvent = Omit<ModalContent, 'position'>;

export interface AllDayModalContent {
  allDayEvents: AllDayEvent[];
  position: { x: number; y: number };
}

export const defaultModalContent = {
  id: '',
  position: { x: 0, y: 0 },
  title: '',
  time: { start: new Date(), end: new Date() },
  user: { name: '', email: '' },
  location: '',
  category: '',
  onClickDelete: () => {},
};

export const defaultAllDayModalContent = {
  allDayEvents: [],
  position: { x: 0, y: 0 },
};

interface CalendarProps {
  timeStart?: string;
  withNavigation?: boolean;
  events?: EventSourceInput;
  validRange?: { start: string | Date; end: string | Date };
  enableModal?: boolean;
  updateCalendar?: () => void;
  onDeleteCalendarEvent?: ({
    calId,
    id,
  }: DeleteWeeklyEventsRequestParams) => void;
  onSelectCalendarBlock?: (event: DateSelectArg) => void;
  onDeleteCalendarBlock?: (id: string) => void;
  businessHours?: BusinessHoursInput;
  hover?: boolean;
  selectable?: boolean;
  allDaySlot?: boolean;
  selectAllow?: AllowFunc;
  masking?: boolean;
  timeUnitCount?: number;
  selectOverlap?: OverlapFunc;
  onClickMakeReservationPage?: () => void;
  locale?: string;
  timezone?: string;
  nowTime?: string;
}

const Calendar = ({
  timeStart = '08:00:00',
  events,
  updateCalendar = () => {},
  validRange,
  businessHours,
  onDeleteCalendarEvent,
  onSelectCalendarBlock,
  onDeleteCalendarBlock,
  selectAllow,
  hover = false,
  masking = false,
  selectable = true,
  allDaySlot = true,
  withNavigation = true,
  enableModal = true,
  timeUnitCount = 0,
  selectOverlap,
  onClickMakeReservationPage,
  locale = 'ko',
  timezone,
  nowTime,
}: CalendarProps) => {
  const { t } = useTranslation('calendar');
  const [mm, dd, yy] = new Date().toLocaleDateString('en-US').split('/');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] =
    useState<ModalContent>(defaultModalContent);
  const [isAllDayModalOpen, setIsAllDayModalOpen] = useState(false);
  const [allDayModalContent, setAllDayModalContent] =
    useState<AllDayModalContent>(defaultAllDayModalContent);
  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarWrapperRef = useRef<HTMLElement | null>(null);
  const hoverDivCountRef = useRef(0);
  const [forceCalendarRerender, setForceCalendarRerender] = useState(false);
  const { sidebarWidth } = useSidebar();
  const { width } = useWindowDimensions();
  const [customTimeUnitCount, setCustomTimeUnitCount] = useState(0);

  const buttonText = {
    today: t('today'),
    month: '월',
    week: '주',
    day: '일',
  };
  useEffect(() => {
    setForceCalendarRerender(true);
  }, [sidebarWidth]);

  useEffect(() => {
    setIsModalOpen(false);
  }, [width]);

  useEffect(() => {
    if (!calendarRef.current) return;
    calendarRef.current.getApi().scrollToTime(timeStart);
  }, [timeStart]);

  const $cal = (attribute: string) => {
    return calendarWrapperRef.current?.querySelector(attribute);
  };

  const $$cal = (attribute: string) => {
    return calendarWrapperRef.current?.querySelectorAll(attribute);
  };

  const handleMouseOver = (event: any) => {
    const target = event.currentTarget as HTMLElement;
    const DAYS = 7;

    const { width, height } = $cal('.fc-day')?.getBoundingClientRect() || {
      width: 0,
      height: 0,
    };

    /* 요청불가 hover 불가능하게 변경하기 */
    const disabledArea = [
      ...(target
        .closest('.fc-timegrid-body')
        ?.querySelector('.fc-timegrid-cols')
        ?.querySelectorAll('td.fc-day-disabled') || []),
    ];

    const disabledAreas = (disabledArea ?? []).map((area) =>
      area.querySelectorAll('.fc-timegrid-col-frame')
    );

    (disabledAreas ?? []).forEach((area) => {
      area.forEach((a) => a.setAttribute('data-id', 'disabled-area'));
    });
    /* 여기까지 */

    const tableWidth =
      $cal('.fc-timegrid-body')?.getBoundingClientRect().width || 0;
    const timeGridWidth =
      $cal('.fc-timegrid-axis')?.getBoundingClientRect().width || 0;

    const hoverCount =
      target.closest('td')?.querySelectorAll('.hover-div').length || 0;

    if (target?.classList.contains('hover-div')) return;
    if (hoverCount >= 1) return;

    const X = event.offsetX!;

    const dayWidth = (tableWidth - timeGridWidth) / DAYS;
    const ranges = new Array(DAYS + 1)
      .fill(0)
      .map((a, idx) => a + dayWidth * idx);

    const idx = ranges.findIndex(
      (_, idx) => ranges[idx] <= X && X <= ranges[idx + 1]
    );

    const widthStart = +idx * dayWidth;
    target.style.position = 'relative';

    const hoverDiv = document.createElement('div');
    hoverDiv.setAttribute('class', 'hover-div');
    hoverDiv.style.width = `${width - 2}px`;
    hoverDiv.style.height = `${19.8125 * customTimeUnitCount}px`;
    hoverDiv.style.left = `${widthStart}px`;

    if (hoverDivCountRef.current === 0) {
      target.appendChild(hoverDiv);
      hoverDivCountRef.current += 1;
    }
  };

  const handleMouseOut = (event: any) => {
    const target = event.currentTarget as HTMLElement;
    const div = target.querySelector('.hover-div');

    if (div) {
      target.removeChild(div);
      hoverDivCountRef.current -= 1;
    }
  };

  useEffect(() => {
    if (!hover || !calendarWrapperRef.current) return;

    const tds = $$cal('.fc-timegrid-slots table tbody tr td');

    tds?.forEach((day: Element) => {
      if (day.classList.contains('fc-timegrid-slot-label')) return;

      /* 마우스오버시 hover div 만들기 */
      /* Event 타입 지정해줘야함 */
      day.addEventListener('mouseover', handleMouseOver);
      day.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      const tds = $$cal('.fc-timegrid-slots table tbody tr td');
      tds?.forEach((day) => {
        day.removeEventListener('mouseover', handleMouseOver);
        day.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [hover, forceCalendarRerender, customTimeUnitCount]);

  const closeAllDayModal = () => {
    setIsAllDayModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickDeleteCalendarEvent = async (calId: string, id: string) => {
    await onDeleteCalendarEvent?.({ calId, id });

    closeModal();
  };

  const calendarEventClick = ({ event, el, jsEvent }: EventClickArg) => {
    if (!enableModal) return;

    const { publicId, title, extendedProps } = event._def;
    const { user, location, category, blocked, calendarId } = extendedProps;
    if (blocked) return;

    const eventDOMRect = el.getBoundingClientRect();
    const calendarDOMRect = calendarWrapperRef.current?.getBoundingClientRect();
    if (!calendarDOMRect) return;

    // 캘린더 event의 top이 캘린더 위쪽 바깥으로 튀어나가있으면 마우스 위치에 따라 모달을 띄우고, 아니면 event의 top에 맞춰 띄운다.
    const eventTop = eventDOMRect.top - calendarDOMRect.top;
    const modalTop =
      eventTop - CALENDAR_START_HEIGHT < 0
        ? jsEvent.clientY - calendarDOMRect.top
        : eventTop;
    // 마우스 클릭 위치가 캘린더 전체의 3/4를 넘어가면 모달을 왼쪽에, 아니면 오른쪽에ㅏ 띄운다.
    const horizontalCriteria = (calendarDOMRect.width * 3) / 4;
    const modalSide =
      jsEvent.clientX < horizontalCriteria
        ? eventDOMRect.right - calendarDOMRect.left + 10
        : eventDOMRect.left - calendarDOMRect.left - 270;

    const newModalContent = {
      id: publicId,
      position: { x: modalSide, y: modalTop },
      title,
      time: {
        start: event._instance?.range?.start || new Date(),
        end: event._instance?.range?.end || new Date(),
      },
      // time: { start: new Date(), end: new Date() },
      user: {
        name: user?.name || '이름 없음',
        email: user?.email || '이메일 없음',
      },
      location: location || '장소 없음',
      category: category || '캘린더 없음',
      onClickDelete: () => onClickDeleteCalendarEvent(calendarId, publicId),
    };

    if (modalContent.id === publicId) {
      setIsModalOpen((prevState) => !prevState);
    } else {
      setIsModalOpen(true);
    }
    if (isAllDayModalOpen) {
      setIsAllDayModalOpen(false);
    }

    setModalContent(newModalContent);
  };

  useEffect(() => {
    setCustomTimeUnitCount(timeUnitCount);
  }, [timeUnitCount]);

  const selectDate = (event: any) => {
    onSelectCalendarBlock?.(event);
  };

  //Date indexing and time picker issue
  // useEffect(() => {
  //   if (userInfo && userInfo.timezone) {
  //     setCurrentTime(toTzDateTime(new Date(), userInfo.timezone.timezone))
  //     setCurrentTz(userInfo?.timezone?.timezone);
  //   }
  // }, [userInfo, userInfo?.timezone])

  // useEffect(() => {
  //   setForceCalendarRerender(false);
  //   const timer = setTimeout(() => {
  //     setForceCalendarRerender(true);
  //   }, 200);
  //   () => clearTimeout(timer);
  // }, [currentTime, currentTz])

  return (
    <>
      {forceCalendarRerender && (
        <CalendarSection
          date={dd}
          ref={calendarWrapperRef}
          enableModal={enableModal}
          selectable={selectable}
          timeUnitCount={timeUnitCount}
          locale={locale}
        >
          {withNavigation && (
            <CalendarNavigation updateCalendar={updateCalendar} />
          )}

          <FullCalendar
            ref={calendarRef}
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            locale={locale}
            timeZone={timezone}
            selectMinDistance={0}
            selectLongPressDelay={150}
            businessHours={businessHours ? businessHours : []}
            selectConstraint={businessHours ? 'businessHours' : {}}
            scrollTime={timeStart}
            scrollTimeReset={false}
            eventTimeFormat={{ hour: 'numeric', minute: '2-digit' }}
            moreLinkClick={(arg) => {
              onMoreClick({
                arg,
                calendarDOMRect:
                  calendarWrapperRef.current?.getBoundingClientRect(),
                onClickDelete: () => {},
                isModalOpen,
                setAllDayModalContent,
                setIsAllDayModalOpen,
                setIsModalOpen,
              });
            }}
            select={selectDate}
            events={events}
            eventClick={calendarEventClick}
            eventContent={(arg) => (
              <EventContent
                arg={arg}
                masking={masking}
                onDeleteCalendarBlock={onDeleteCalendarBlock}
              />
            )}
            slotDuration="00:15:00"
            headerToolbar={{
              // left: 'title prev,next today dayGridMonth,timeGridWeek,timeGridDay',
              left: 'title prev,next,today',
              center: '',
              right: '',
            }}
            slotLabelInterval="01:00"
            slotLabelFormat={{ hour: 'numeric', hour12: true }}
            allDayText={allDaySlot ? t('allday') : ''}
            validRange={validRange && validRange}
            // dayHeaderFormat={(arg) =>
            //   createDayHeader(arg, { mm, dd, yy }, locale)
            // }
            // dayHeaderFormat={(arg) =>
            //   myFunc(arg)
            // }
            buttonText={buttonText}
            selectable={selectable}
            selectOverlap={
              selectOverlap ? selectOverlap : (event) => event.allDay
            }
            editable={false}
            dayMaxEventRows={3} /* 종일 일정 max */
            moreLinkContent={({ shortText }) => shortText}
            // nowIndicator
            // now={nowTime}
            allDaySlot={allDaySlot}
            selectAllow={selectAllow ? selectAllow : undefined}
            eventOverlap
            unselectCancel="blocked-events"
          />
          {isModalOpen && enableModal && (
            <DetailModal
              position={modalContent.position}
              title={modalContent.title}
              time={modalContent.time}
              user={modalContent.user}
              location={modalContent.location}
              category={modalContent.category}
              onClickClose={closeModal}
              onClickDelete={modalContent.onClickDelete}
            />
          )}
          {isAllDayModalOpen && enableModal && (
            <AllDayModal
              onClickClose={closeAllDayModal}
              allDayEvents={allDayModalContent.allDayEvents}
              position={allDayModalContent.position}
            />
          )}
        </CalendarSection>
      )}
    </>
  );
};

export default Calendar;
