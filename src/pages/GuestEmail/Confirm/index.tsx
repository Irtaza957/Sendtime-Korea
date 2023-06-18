import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { mailHostInfoAPI } from '@api/personal/reservation/MailGuestReservation';
import StyledButton from '@components/Button';
import ScheduleSelect from '@components/ScheduleSelect';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import TimezoneSelect from '@components/TimezoneSelect';
import { reservationRoutes, ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useMainInput from '@hooks/inputs/useMainInput';
import useDebounce from '@hooks/useDebounce';
import useLoading from '@hooks/useLoading';
import useTranslate from '@hooks/useTranslate';
import { RightArrow } from '@Icon//Icons';
import CustomIcon from '@Icon/index';
import * as Sentry from '@sentry/browser';
import { rangeTime, toTzDateTime } from '@utils/time';

import * as Styled from './index.styles';

/* 0은 서버에서 잘못 들어감.. */
export type Schedule = {
  priority: number;
  startTime: string;
  endTime: string;
  disabled: boolean;
};

export type CustomSchedule = Schedule & { time: string; checked: boolean };

export const data: Schedule[] = [
  {
    priority: 1,
    startTime: '2022-06-20T20:00:00+09:00',
    endTime: '2022-06-20T22:00:00+09:00',
    disabled: false,
  },
];

interface ConfirmProps {
  authenticated?: boolean;
  mailInfo: MailInfo;
  pageId: string;
  reservationId: string;
  selectedTimezone: Timezone;
  onTimeZoneSelected: (data: Timezone) => void;
  timezones: Timezone[];
}

const Confirm = ({
  mailInfo,
  pageId,
  reservationId,
  selectedTimezone,
  onTimeZoneSelected,
  timezones,
}: ConfirmProps) => {
  const router = useRouter();
  const { t } = useTranslation('guestPage');
  const { i18n } = useTranslate();
  const { debounce } = useDebounce();
  const { loadingView } = useLoading();
  const { DescriptionView, description } = useMainInput({});
  const { showModal, hideModal } = useNestedModal({
    type: 'confirm',
    title: t('alert.doubleBooked.alreadyDone'),
    description: t('alert.doubleBooked.continue'),
    buttonText: { confirm: t('alert.doubleBooked.buttonText') },
  });
  const isFirstMounted = useRef(false);
  const makeSchedules = (timezone: string) => {
    const schedules: CustomSchedule[] = mailInfo.reservationOptions.map(
      (option, idx) => ({
        time: rangeTime(
          new Date(option.startDateTime),
          new Date(option.endDateTime),
          i18n.language,
          timezone
        ),
        priority: option.priority,
        startTime: option.startDateTime,
        endTime: option.endDateTime,
        checked: idx === 0 ? true : false,
        disabled: false,
      })
    );
    return schedules;
  };
  useEffect(() => {
    if (isFirstMounted.current) {
      onTimeZoneSelected(mailInfo.timezone);
    } else {
      isFirstMounted.current = true;
    }
  }, []);
  const [checkSchedule, setCheckSchedule] = useState(
    makeSchedules(selectedTimezone.timezone)
  );

  const { mutate: confirmReservation, isLoading } = useMutation(
    ({ force }: Omit<HostMailParams, 'uuid' | 'reservationId'>) => {
      const schedule = checkSchedule.find(({ checked }) => checked);
      return mailHostInfoAPI.createHostReservation(
        { uuid: pageId, reservationId, force },
        {
          reservationStartDateTime: toTzDateTime(
            schedule?.startTime as string,
            selectedTimezone.timezone
          ),
          reservationEndDateTime: toTzDateTime(
            schedule?.endTime as string,
            selectedTimezone.timezone
          ),
          responseType: 'CONFIRM',
          responseMessage: description,
          timezone: selectedTimezone,
        }
      );
    },
    {
      onSuccess: () => {
        router.push(
          reservationRoutes({
            type: 'confirm',
            pageId,
            reservationId,
          }).COMPLETED
        );
      },
      onError: (error: RequestError) => {
        Sentry.captureException(error);

        if (error.code === 4407) {
          showModal(async () => {
            await confirmReservation({ force: true });
            hideModal();
            return true;
          });
          return;
        }

        if (error.code === 4403) {
          alert(t('alert.confirm.alreadyDone'));
        } else {
          alert(error.message);
        }

        window.location.replace(ROUTES.MY_CALENDAR);
      },
    }
  );

  const onClickConfirm = () => {
    debounce(() => confirmReservation({}), 500);
  };

  useEffect(() => {
    setCheckSchedule(makeSchedules(selectedTimezone.timezone));
  }, [selectedTimezone, i18n.language]);

  return (
    <Styled.ConfirmContainer>
      {isLoading && loadingView()}
      <Styled.LanguageDropdownWrapper>
        <LanguageDropdown />
      </Styled.LanguageDropdownWrapper>
      <Styled.ConfirmWrapper>
        <Styled.ContentWrapper>
          <Styled.HeaderWrapper>
            <Styled.HeaderTitle>{t('confirm.title')}</Styled.HeaderTitle>
            <Styled.HeaderDescription>
              {t('confirm.description.leading')}
              {t('confirm.description.trailing')}
            </Styled.HeaderDescription>
          </Styled.HeaderWrapper>
          <ScheduleSelect
            checkSchedule={checkSchedule}
            setCheckSchedule={setCheckSchedule}
          />
          <Styled.TimeButton
            onClick={() =>
              router.push({
                pathname: ROUTES.GUEST_RESERVATION.CANCEL,
                query: {
                  i: pageId,
                  r: reservationId,
                  tz: selectedTimezone.timezone,
                },
              })
            }
          >
            {t('noTimeBtn')}
          </Styled.TimeButton>
          <Styled.TimeZoneContainer>
            <TimezoneSelect
              selectedValue={selectedTimezone}
              onMouseDown={onTimeZoneSelected}
              timezones={timezones}
            />
          </Styled.TimeZoneContainer>
          <Styled.ConfirmationMessageContainer>
            <Styled.ConfirmSubTitle>
              {t('confirmMessage.title')}
            </Styled.ConfirmSubTitle>
            <Styled.ConfirmSubDescription>
              {t('confirmMessage.subtitle')}
            </Styled.ConfirmSubDescription>
            <Styled.ConfirmMessage>
              {DescriptionView({
                placeholder: t('confirmMessage.placeholder'),
              })}
            </Styled.ConfirmMessage>
          </Styled.ConfirmationMessageContainer>
          <Styled.ConfirmButtonContainer>
            <StyledButton
              onClickButton={onClickConfirm}
              bgColor="purple-500"
              color="white"
              fontSize="15px"
              padding="16px"
              width="100%"
              align="center"
            >
              {t('confirm.button')}
              <Styled.Space />
              <CustomIcon
                size={6}
                height={10}
                fill="none"
                stroke="white"
                viewBox="0 0 8 14"
                margin="3px 0px 0px 0px"
              >
                <RightArrow />
              </CustomIcon>
            </StyledButton>
          </Styled.ConfirmButtonContainer>
        </Styled.ContentWrapper>
      </Styled.ConfirmWrapper>
    </Styled.ConfirmContainer>
  );
};

export default Confirm;
