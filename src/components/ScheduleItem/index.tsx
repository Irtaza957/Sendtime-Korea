import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

import useUserInfo from '@hooks/useUserInfo';
import {
  CancelSchedule,
  ChangeSchedule,
  CheckWithBorder,
  DownArrow,
  UpArrow,
} from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';
import {
  convertKoreanGoogleMeet,
  convertKorWeekday,
  translateDate,
  translateMeridiem,
  translateTime,
} from '@utils/format';

import {
  Box,
  ChangeButton,
  Changed,
  Contents,
  Date,
  Info,
  InfoTitle,
  LeftBox,
  Location,
  MoreButton,
  Option,
  Priority,
  PriorityBox,
  ScheduleItemContainer,
  Time,
  TimeUnit,
  Title,
  Wrapper,
} from './index.styles';

interface ScheduleItemProps {
  schedule: MyReservationManage;
  past?: boolean;
  pending?: boolean;
}

const RESERVATION_STATUS = {
  confirmed: 'CONFIRMED',
  declined: 'DECLINED',
  needsAction: 'NEEDS_ACTION',
};

const ScheduleItem = ({
  schedule,
  past = false,
  pending = false,
}: ScheduleItemProps) => {
  const router = useRouter();
  const { reservations } = schedule;
  const { t } = useTranslation('eventHistoryPage');
  const { userInfo } = useUserInfo();

  const newReservations = useMemo(
    () => reservations.map((r) => ({ id: nanoid(), ...r })),
    [reservations]
  );

  const newDateDayTimezone = (reservationDate: string) => {
    const [yyyy, mm, dd, day] = reservationDate.split(' ');
    let weekday = convertKorWeekday(day).toLowerCase();
    weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    return `${translateDate(`${yyyy} ${mm} ${dd}`, ' ')} ${weekday} ${
      userInfo?.timezone.timezone
    }`;
  };

  const [open, setOpen] = useState(
    newReservations.map(({ id }) => ({ [id]: false }))
  );

  const onMoreClick = (id: string, index: number) => {
    setOpen((prev) => {
      const copy = [...prev];
      copy[index] = { [id]: !copy[index]?.[id] };
      return copy;
    });
  };

  const onLinkClick = (link: string) => router.push(link || '');
  return (
    <ScheduleItemContainer>
      {newReservations.map((r, index) => {
        const has0 = (r.options ?? []).find(({ priority }) => priority === 0);
        const translatedOptions = r.options?.map((item) => {
          const [yyyy, mm, dd, day, time, timezone] = item.time.split(' ');
          const date = translateDate(`${yyyy} ${mm} ${dd}`, ' ');
          let weekday = convertKorWeekday(day[1]).toLowerCase();
          weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
          return {
            ...item,
            time: `${date} (${weekday}) ${time} ${timezone}`,
          };
        });
        const options = has0
          ? (translatedOptions ?? []).map((o) => ({
              ...o,
              priority: o.priority + 1,
            }))
          : translatedOptions ?? [];
        const opened = open.find((targetId) => targetId[r.id]);
        // const location = r.locations.filter((l) => l !== '').join(', ');

        const guestQuestionAnswers = r.answers.map((answer: Answers) => {
          let content;
          if (answer.questionType === 'RADIO') {
            content = answer.isContainEtc
              ? `${i18next.t('guestQuestionare:addQuestion.other')}: ${
                  answer.etcAnswer
                }`
              : answer.answers[0];
          } else if (answer.questionType === 'CHECK_BOX') {
            const newAnswers = answer.answers.map((ans) => {
              if (ans.includes('Other')) {
                return `${i18next.t('guestQuestionare:addQuestion.other')}: ${
                  answer.etcAnswer
                }`;
              }
              return ans;
            });
            content = newAnswers.join(', ');
          } else if (answer.questionType === 'FILE') {
            content = answer.answers.length > 0 ? answer.answers : '';
          } else {
            content = answer.answers.join(', ');
          }
          return {
            title: answer.questionTitle,
            contents: content,
            type: answer.questionType,
          };
        });
        const declined = r.reservationStatus === RESERVATION_STATUS.declined;
        const confirmed = r.reservationStatus === RESERVATION_STATUS.confirmed;
        const needsAction =
          r.reservationStatus === RESERVATION_STATUS.needsAction;
        const convertedTimeUnits = r.timeUnit.map((element) =>
          translateTime(element)
        );
        const TimeString =
          convertedTimeUnits.length <= 1
            ? convertedTimeUnits[0]
            : `${convertedTimeUnits.join(' / ')}`;
        const calculateTimeFromSlot = () => {
          const start = dayjs(r.startDateTime);
          const end = dayjs(r.endDateTime);
          const firstTime =
            parseInt(start.format('HH')) * 60 + parseInt(start.format('mm'));
          const secondTime =
            parseInt(end.format('HH')) * 60 + parseInt(end.format('mm'));
          const duration = secondTime - firstTime;
          if (duration >= 60) {
            return `${Math.floor(duration / 60)}${i18next.t(
              'eventHistoryPage:hour'
            )} ${
              duration % 60 > 0
                ? `${duration % 60}${i18next.t('eventHistoryPage:min')}`
                : ''
            }`;
          } else {
            return `${duration}${i18next.t('eventHistoryPage:min')}`;
          }
        };

        const onCancelClick = () => {
          onLinkClick(r.reservationCancelLink || '');
        };

        return (
          <React.Fragment key={index}>
            {!pending && <Date>{newDateDayTimezone(r.reservationDate)}</Date>}
            <Contents onClick={() => onMoreClick(r.id, index)} show cursor>
              {!pending && (
                <Time borderRight declined={declined}>
                  {translateMeridiem(r.time)}
                </Time>
              )}

              <Wrapper>
                <LeftBox padding="5px 15px" gap="5px">
                  <Title declined={declined}>
                    {r.type === 'TEAM' && (
                      <Icon
                        icon="ic:round-people"
                        color="#BFCBD9"
                        style={{ marginRight: '5px' }}
                        width="16px"
                      />
                    )}
                    {r.title}
                  </Title>

                  <Box flex alignItems="center">
                    {(r.options ?? [])?.length > 0 && (
                      <Option>
                        {t('option')} {r.options?.length}
                        {t('howmany')}{' '}
                      </Option>
                    )}
                    {!past && !pending ? (
                      <TimeUnit declined={declined}>
                        {calculateTimeFromSlot()}
                      </TimeUnit>
                    ) : (
                      <TimeUnit declined={declined}>{TimeString}</TimeUnit>
                    )}
                    {r.location?.name && (
                      <>
                        {', '}
                        {r.location.detail &&
                        r.location.detail.includes('meet.google.com') ? (
                          <Location
                            declined={declined}
                            isLink
                            onClick={() => onLinkClick(r.location.detail || '')}
                          >
                            Google Meet ({r.location.detail})
                          </Location>
                        ) : r.location.detail &&
                          r.location.detail.includes('zoom') ? (
                          <Location
                            declined={declined}
                            isLink
                            onClick={() => onLinkClick(r.location.detail || '')}
                          >
                            Zoom ({r.location.detail})
                          </Location>
                        ) : (
                          <Location declined={declined}>
                            {convertKoreanGoogleMeet(r.location.name)}
                          </Location>
                        )}
                      </>
                    )}
                  </Box>
                  {declined && (
                    <Changed type="cancel">{t('canceledEvent')}</Changed>
                  )}
                  {r.edited && !declined && (
                    <Changed type="edited">{t('editedEvent')}</Changed>
                  )}
                </LeftBox>

                <MoreButton>
                  <span>{t('seemMore')}</span>
                  <CustomIcon
                    size={18}
                    height={18}
                    viewBox="0 0 15 5"
                    fill="gray-600"
                    stroke="none"
                  >
                    {opened?.[r.id] ? <UpArrow /> : <DownArrow />}
                  </CustomIcon>
                </MoreButton>
              </Wrapper>
            </Contents>

            <Contents show={open[index]?.[r.id] || false} isDetail={true}>
              {!past && (
                <Time>
                  {(confirmed || needsAction) && (
                    <>
                      {pending ? (
                        <ChangeButton
                          color="blue-700"
                          onClick={() =>
                            onLinkClick(r.reservationConfirmLink || '')
                          }
                        >
                          <CustomIcon
                            size={16}
                            height={16}
                            fill="blue-700"
                            stroke="none"
                          >
                            <CheckWithBorder />
                          </CustomIcon>
                          {t('confirm')}
                        </ChangeButton>
                      ) : (
                        <ChangeButton
                          onClick={() =>
                            onLinkClick(r.reservationChangeLink || '')
                          }
                        >
                          <CustomIcon
                            size={16}
                            height={15}
                            fill="gray-750"
                            stroke="none"
                          >
                            <ChangeSchedule />
                          </CustomIcon>
                          {t('reschedule')}
                        </ChangeButton>
                      )}

                      <ChangeButton
                        color="cancel"
                        onClick={() => onCancelClick()}
                      >
                        <CustomIcon size={16} fill="cancel" stroke="none">
                          <CancelSchedule />
                        </CustomIcon>
                        {t('cancel')}
                      </ChangeButton>
                    </>
                  )}
                </Time>
              )}
              <Wrapper>
                <LeftBox padding="5px 30px" gap="8px">
                  {declined && (
                    <Info>
                      <Changed type="cancel">{t('reasonForCancel')}</Changed>
                      {r.message}
                    </Info>
                  )}
                  {r.edited && !declined && (
                    <Info>
                      <Changed type="edited">
                        {t('reasonForReschedule')}
                      </Changed>
                      {r.message}
                    </Info>
                  )}
                  {options.length > 0 && (
                    <Box margin="0 0 12px 0" gap="10px">
                      {options.map(({ priority, time }, idx) => {
                        return (
                          <PriorityBox key={idx} gap="6px" flex>
                            <Priority>
                              {priority}
                              {t('priority')}
                            </Priority>
                            <TimeUnit>{time}</TimeUnit>
                          </PriorityBox>
                        );
                      })}
                    </Box>
                  )}
                  {guestQuestionAnswers.map(
                    ({ title, contents, type }, idx) =>
                      contents && (
                        <Info key={idx}>
                          <InfoTitle>{title}</InfoTitle>
                          {type === 'FILE' ? (
                            <a target="blank" href={contents[1]}>
                              {contents[0]}
                            </a>
                          ) : (
                            contents
                          )}
                        </Info>
                      )
                  )}
                </LeftBox>
              </Wrapper>
            </Contents>
          </React.Fragment>
        );
      })}
    </ScheduleItemContainer>
  );
};

export default ScheduleItem;
