import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AllDayModalContent,
  defaultAllDayModalContent,
  defaultModalContent,
  ModalContent,
} from '@components/Calendar';
import AllDayModal from '@components/Calendar/AllDayModal';
import DetailModal from '@components/Calendar/DetailModal';
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
import useUserInfo from '@hooks/useUserInfo';
import { XIcon } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { onMoreClick } from '@utils/calendar/utils';
import { FORMAT, setBeforeMidnight, setMidnight } from '@utils/time';
import { toTzDateTime } from '@utils/time';

import CalendarNavigation from '../CalendarNavigation';

import { GroupNavContainer } from './ParticipantsModal/index.styles';
import { GroupCalendarSection } from './index.styles';
import ParticipantsModal from './ParticipantsModal';

const CALENDAR_START_HEIGHT = 130;

export const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currentBrowserTime = toTzDateTime(new Date(), browserTimezone);

interface GroupCalendarProps {
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
  groupParticipants?: GroupMember[];
  groupId: string;
  locale?: string;
  timezone?: string;
}

const GroupCalendar = ({
  timeStart = '08:00:00',
  events,
  updateCalendar = () => {},
  businessHours,
  onDeleteCalendarEvent,
  onSelectCalendarBlock,
  onDeleteCalendarBlock,
  selectAllow,
  validRange,
  hover = false,
  masking = false,
  selectable = true,
  allDaySlot = true,
  withNavigation = true,
  enableModal = true,
  timeUnitCount = 0,
  selectOverlap,
  groupParticipants,
  groupId,
  locale = 'ko',
  timezone = 'pst',
}: GroupCalendarProps) => {
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
  const [isMakeReservationModalOpen, setIsMakeReservationModalOpen] =
    useState(false);
  const [forceCalendarRerender, setForceCalendarRerender] = useState(false);
  const { sidebarWidth } = useSidebar();
  const { userInfo } = useUserInfo();
  const [currentTime, setCurrentTime] = useState(currentBrowserTime);
  const isFirstMounted = useRef(true);
  // const { showModal } = useNestedModal({
  //   type: 'alert',
  //   title: '캘린더 공개 기간 만료',
  //   description:
  //     '캘린더 공개 기간이 만료된 그룹입니다. \n 캘린더 공개 기간 이후의 예약은 \n 해당 그룹으로 접수받을 수 없습니다. \n 그룹을 새롭게 생성해주세요.',
  // });
  const buttonText = {
    today: t('today'),
    month: '월',
    week: '주',
    day: '일',
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceCalendarRerender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [sidebarWidth]);

  useEffect(() => {
    if (!calendarRef.current) return;
    calendarRef.current.getApi().scrollToTime(timeStart);
  }, [timeStart]);

  useEffect(() => {
    setIsMakeReservationModalOpen(false);
  }, [groupId]);

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
    hoverDiv.style.height = `${(height - 7.5) * timeUnitCount}px`;
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
      tds?.forEach((day) => {
        day.removeEventListener('mouseover', handleMouseOver);
        day.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [hover]);

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

    const {
      publicId,
      title,
      extendedProps: { user, location, category, blocked, calendarId },
    } = event._def;
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
    // 마우스 클릭 위치가 캘린더 전체의 3/4를 넘어가면 모달을 왼쪽에, 아니면 오른쪽에 띄운다.
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

  const formatValidRange = () => {
    if (validRange) {
      const start = setMidnight(validRange.start).format(FORMAT.YMDHms);
      const end = setBeforeMidnight(validRange.end).format(FORMAT.YMDHms);
      return { start, end };
    }
  };

  const handleMakeReservationPage = () => {
    // if (setBeforeMidnight() < dayjs(validRange?.end)) {
    //   showModal();
    //   return;
    // }

    setIsMakeReservationModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (userInfo && userInfo.timezone) {
      setCurrentTime(toTzDateTime(new Date(), userInfo.timezone.timezone));
    }
  }, [userInfo?.timezone]);

  // This hook should be called only once
  useEffect(() => {
    if (isFirstMounted.current && userInfo && userInfo.timezone) {
      isFirstMounted.current = false;
      setForceCalendarRerender(false);
      const timer = setTimeout(() => {
        setForceCalendarRerender(true);
      }, 200);
      () => clearTimeout(timer);
    }
  }, [currentTime]);
  return (
    <>
      {forceCalendarRerender && (
        <GroupCalendarSection
          date={dd}
          ref={calendarWrapperRef}
          enableModal={enableModal}
          selectable={selectable}
        >
          {withNavigation && (
            <GroupNavContainer>
              <CalendarNavigation
                updateCalendar={updateCalendar}
                syncAnimated={false}
                onClickMakeReservationPage={handleMakeReservationPage}
              />
              {isMakeReservationModalOpen && (
                <ParticipantsModal
                  participants={groupParticipants || []}
                  groupId={groupId}
                />
              )}
            </GroupNavContainer>
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
            select={(event) => onSelectCalendarBlock?.(event)}
            events={events}
            eventClick={calendarEventClick}
            eventContent={(arg) => {
              const { title, extendedProps, publicId, allDay } = arg.event._def;
              const { blocked, guestBlocked, calendarId, calColor } =
                extendedProps;
              if (arg.event._instance) {
                const { range } = arg.event._instance;
                const { end, start } = range;

                if (blocked) {
                  return (
                    <div
                      data-blocked="true"
                      className="blocked-schedule"
                      style={{
                        padding:
                          +end - +start === 900000
                            ? '1px 0 0 18px'
                            : '2px 2px 2px 18px',
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        color: 'var(--gray-700)',
                      }}
                    >
                      {arg.timeText}
                      <span
                        style={{
                          position: 'absolute',
                          left: '2px',
                          top: +end - +start === 900000 ? '2px' : '3px',
                        }}
                        onClick={() => onDeleteCalendarBlock?.(publicId)}
                      >
                        <CustomIcon
                          size={16}
                          scale={0.85}
                          viewBox="1 1 14 14"
                          fill="gray-100"
                          stroke="gray-700"
                        >
                          <XIcon />
                        </CustomIcon>
                      </span>
                    </div>
                  );
                }

                if (guestBlocked) {
                  return <></>;
                }

                if (masking) {
                  const { range } = arg.event._instance;
                  const { end, start } = range;

                  return (
                    <div
                      className="masked-schedule"
                      style={{
                        padding: +end - +start === 900000 ? '0px' : '2px',
                        position: 'relative',
                      }}
                    >
                      {arg.timeText}
                    </div>
                  );
                }

                return (
                  <div
                    data-blocked="false"
                    className="schedule"
                    style={{
                      padding: +end - +start === 900000 ? '0px 2px' : '1px 2px',
                      height: '100%',
                      width: '100%',
                      background: `${calColor}30`,
                      borderRadius: '3px',
                    }}
                  >
                    <div style={{ whiteSpace: 'pre', lineHeight: 1.5 }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          background: calColor,
                          borderRadius: '50%',
                          marginRight: '2px',
                        }}
                      />
                      {title}
                    </div>
                    <div style={{ whiteSpace: 'pre' }}>{arg.timeText}</div>
                  </div>
                );
              }
            }}
            slotDuration="00:15:00"
            headerToolbar={{
              left: 'title prev,next,today',
              center: '',
              right: '',
            }}
            // customButtons={{
            //   custom1: {
            //     text: '동기화',
            //     click: () => {},
            //   },
            //   custom2: {
            //     text: '만들기',
            //     click: () => {},
            //   },
            // }}
            slotLabelInterval="01:00"
            slotLabelFormat={{
              hour: 'numeric',
              hour12: true,
            }}
            allDayText={allDaySlot ? t('allday') : ''}
            validRange={formatValidRange()}
            // dayHeaderFormat={(arg) =>
            //   createDayHeader(arg, { mm, dd, yy }, locale)
            // }
            buttonText={buttonText}
            selectable={selectable}
            selectOverlap={
              selectOverlap ? selectOverlap : (event) => event.allDay
            }
            editable={false}
            dayMaxEventRows={3} /* 종일 일정 max */
            moreLinkContent={({ shortText }) => shortText}
            nowIndicator
            now={currentTime}
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
        </GroupCalendarSection>
      )}
    </>
  );
};

export default GroupCalendar;
