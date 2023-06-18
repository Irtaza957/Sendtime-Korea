import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import ScheduleSelect from '@components/ScheduleSelect';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import TimezoneSelect from '@components/TimezoneSelect';
import useMainInput from '@hooks/inputs/useMainInput';
import useDebounce from '@hooks/useDebounce';
import useLoading from '@hooks/useLoading';
import useTranslate from '@hooks/useTranslate';
import { RightArrow } from '@Icon//Icons';
import CustomIcon from '@Icon/index';
import { rangeTime } from '@utils/time';

import { CustomSchedule } from '../Confirm';

import * as Styled from './index.styles';

interface ReselectProps {
  authenticated?: boolean;
  mailInfo: MailInfo;
  pageId: string;
  reservationId: string;
  selectedTimezone: Timezone;
  onTimeZoneSelected: (data: Timezone) => void;
  timezones: Timezone[];
}

const Reselect = ({
  authenticated,
  mailInfo,
  pageId,
  reservationId,
  selectedTimezone,
  onTimeZoneSelected,
  timezones,
}: ReselectProps) => {
  const router = useRouter();
  const { t } = useTranslation('guestPage');
  const { i18n } = useTranslate();
  const { DescriptionView, description } = useMainInput({});
  const { debounce } = useDebounce();
  const { loadingView } = useLoading();

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
        checked: false,
        disabled:
          dayjs(mailInfo.startDateTime).isSame(dayjs(option.startDateTime)) &&
          dayjs(mailInfo.startDateTime).isSame(dayjs(option.startDateTime)),
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

  // const { mutate: editReservationInfo, isLoading } = useMutation(
  //   ({ uuid, reservationId }: HostMailParams) =>
  //     mailHostInfoAPI.createHostReservation(
  //       { uuid, reservationId },
  //       {
  //         reservationStartDateTime: checkSchedule.find(({ checked }) => checked)
  //           ?.startTime,
  //         reservationEndDateTime: checkSchedule.find(({ checked }) => checked)
  //           ?.endTime,
  //         responseType: 'EDIT',
  //       }
  //     ),
  //   {
  //     onSuccess: ({ data: { results } }) => {
  //       router.push(
  //         reservationRoutes({
  //           type: 'change',
  //           customUrl,
  //           pageId,
  //           reservationId,
  //         }).COMPLETED
  //       );
  //     },
  //   }
  // );

  const handleReselectClick = () => {
    router.push({
      pathname: `/reservation/change`,
      query: {
        i: pageId,
        r: reservationId,
        tz: selectedTimezone.timezone,
        change: 'true',
        start: checkSchedule.find(({ checked }) => checked)?.startTime,
        end: checkSchedule.find(({ checked }) => checked)?.endTime,
      },
    });
  };

  useEffect(() => {
    setCheckSchedule(makeSchedules(selectedTimezone.timezone));
  }, [selectedTimezone, i18n.language]);
  return (
    <Styled.ReselectContainer>
      <Styled.LanguageDropdownWrapper>
        <LanguageDropdown />
      </Styled.LanguageDropdownWrapper>
      <Styled.ReselectWrapper>
        <Styled.ContentWrapper>
          <Styled.HeaderWrapper>
            <Styled.HeaderTitle>{t('reselect.title')}</Styled.HeaderTitle>
            <Styled.HeaderDescription>
              {t('reselect.description.leading')}
              {t('reselect.description.trailing')}
            </Styled.HeaderDescription>
          </Styled.HeaderWrapper>
          <ScheduleSelect
            checkSchedule={checkSchedule}
            setCheckSchedule={setCheckSchedule}
          />
          <Styled.TimeZoneContainer>
            <TimezoneSelect
              selectedValue={selectedTimezone}
              onMouseDown={onTimeZoneSelected}
              dropDownPosition="top"
              timezones={timezones}
            />
          </Styled.TimeZoneContainer>
          {mailInfo.subType !== 'THIRD_PERSON' && (
            <Styled.TimeButton
              onClick={() =>
                router.push(
                  `/reservation/change?i=${pageId}&r=${reservationId}&tz=${selectedTimezone.timezone}`
                )
              }
            >
              {t('noTimeBtn')}
              <Styled.Space />
              <CustomIcon
                size={6}
                height={10}
                fill="none"
                stroke="purple-500"
                viewBox="0 0 8 14"
                margin="2px 0px 0px 0px"
              >
                <RightArrow />
              </CustomIcon>
            </Styled.TimeButton>
          )}
          <Styled.ReselectButtonContainer>
            <StyledButton
              onClickButton={handleReselectClick}
              bgColor="purple-500"
              color="white"
              borderColor="purple-500"
              disabled={!checkSchedule.find(({ checked }) => checked)}
              withBorder
              fontSize="15px"
              padding="16px"
              width="100%"
            >
              {t('reselect.button')}
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
          </Styled.ReselectButtonContainer>
        </Styled.ContentWrapper>
      </Styled.ReselectWrapper>
    </Styled.ReselectContainer>
  );
};

export default Reselect;
