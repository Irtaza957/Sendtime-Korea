import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Linkify from 'react-linkify';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import Line from '@components/Line';
import {
  GuestDurationSubConatiner,
  IconWrapper,
  SelectedTime,
  SelectTime,
  SidebarDurationContainer,
  SidebarSelectbox,
  SidebarSelectTimeBox,
  SidebarTimeCheckbox,
  TimeText,
} from '@components/Reservation/index.styles';
import TimezoneSelect from '@components/TimezoneSelect';
import { BASE_URL } from '@constants/baseUrl';
import useTranslate from '@hooks/useTranslate';
import { ArrowDown, CheckBox } from '@Icon/Icons/Utils';
import { locationContent } from '@utils/format';
import { translateTime } from '@utils/format';
import { REGION } from '@utils/language';
import { toEnMonthName } from '@utils/time';

import { PreviewInfo } from '../../Reservation/Common';

import {
  ArrowIcon,
  ContentContainer,
  GuestreservationPreview,
  PreviewDescription,
  PreviewInfos,
  PreviewName,
  TimeZoneContainer,
  Warning,
} from './index.styles';

interface GuestReservationPreviewProp {
  pageInfo: HostInfoType;
  reservationRanking?: { time: string; priority: string }[];
  change?: boolean;
  calculateTimeBlockCount?: () => void | void;
  selectedTimezone?: Timezone;
  onTimeZoneSelected: (data: Timezone) => void;
  changeSelectedDuration: (data: string) => void;
  showTz?: boolean;
}

const GuestReservationPreview = ({
  pageInfo,
  calculateTimeBlockCount = () => void [],
  selectedTimezone,
  onTimeZoneSelected,
  changeSelectedDuration,
}: GuestReservationPreviewProp) => {
  const { i18n } = useTranslate();
  const { t } = useTranslation('guestPage');
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const calendarContent = () => {
    const [syy, smm, sdd] =
      pageInfo.startDate?.split('-') || ' - - '.split('-');
    const [eyy, emm, edd] = pageInfo.endDate?.split('-') || ' - - '.split('-');

    if (i18n.language.includes(REGION.KO)) {
      if (eyy >= '2999') return `무기한`;

      if (syy === eyy && smm === emm) {
        return `${syy}년 ${smm}월 ${sdd}일 - ${edd}일`;
      }

      if (syy === eyy) {
        return `${syy}년 ${smm}월 ${sdd}일 - ${emm}월 ${edd}일`;
      }

      return `${syy}년 ${smm}월 ${sdd}일 - ${eyy}년 ${emm}월 ${edd}일`;
    } else {
      const enSMM = toEnMonthName(+smm);
      const enEMM = toEnMonthName(+emm);

      if (eyy >= '2999') return `Indefinitely into the future`;

      if (syy === eyy && smm === emm) {
        return `${enSMM} ${sdd}th - ${edd}th, ${syy}`;
      }

      if (syy === eyy) {
        return `${enSMM} ${sdd}th - ${enEMM} ${edd}th, ${syy} `;
      }

      return `${enSMM} ${sdd}th ${syy} - ${enEMM} ${edd}th ${eyy}`;
    }
  };

  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setDropdown(false);
    }
  };

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState(pageInfo.timeUnit[0]);
  const [temp, setTemp] = useState(pageInfo.timeUnit[0]);

  useEffect(() => {
    document.addEventListener('click', closeSelectBox);
    return () => {
      document.removeEventListener('click', closeSelectBox);
    };
  }, []);

  const changeDuration = (time: string, index: number) => {
    setSelectedTime(time);
    setTemp(time);
    changeSelectedDuration(time);
  };

  useEffect(() => {
    calculateTimeBlockCount();
  }, [selectedTime]);

  return (
    <>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <GuestreservationPreview>
          <ContentContainer>
            <PreviewName>{pageInfo.reservationPageName}</PreviewName>
            <Warning>
              {t('preview.description')} <br />
            </Warning>
            <Line margin="0px" />

            <PreviewInfos>
              <PreviewInfo iconType="calendar" content={calendarContent()} />
              <PreviewInfo
                iconType="time"
                content={
                  pageInfo.timeUnit.length > 1 ? (
                    <SidebarDurationContainer ref={dropdownRef}>
                      <GuestDurationSubConatiner
                        onClick={() => setDropdown(!dropdown)}
                      >
                        <SelectedTime>
                          {translateTime(selectedTime)}
                        </SelectedTime>
                        <IconWrapper>
                          <ArrowIcon isDropdown={dropdown}>
                            <ArrowDown />
                          </ArrowIcon>
                        </IconWrapper>
                      </GuestDurationSubConatiner>
                      {dropdown ? (
                        <SidebarSelectbox>
                          <SidebarSelectTimeBox>
                            {Object.values(pageInfo.timeUnit).map(
                              (time, index) => (
                                <SelectTime
                                  key={index}
                                  onClick={() => changeDuration(time, index)}
                                >
                                  <SidebarTimeCheckbox>
                                    {temp === time ? <CheckBox /> : null}
                                  </SidebarTimeCheckbox>
                                  <TimeText>{translateTime(time)}</TimeText>
                                </SelectTime>
                              )
                            )}
                          </SidebarSelectTimeBox>
                        </SidebarSelectbox>
                      ) : null}
                    </SidebarDurationContainer>
                  ) : (
                    translateTime(pageInfo.timeUnit[0])
                  )
                }
              />
              {!!pageInfo.location.length && (
                <PreviewInfo
                  iconType="location"
                  content={locationContent(pageInfo.location)}
                />
              )}
            </PreviewInfos>

            <PreviewDescription>
              <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a
                    target="blank"
                    href={decoratedHref}
                    key={key}
                    style={{ color: 'var(--blue-700)' }}
                  >
                    {decoratedText}
                  </a>
                )}
              >
                {pageInfo.reservationPageDescription}
              </Linkify>
            </PreviewDescription>
          </ContentContainer>
          <TimeZoneContainer>
            <TimezoneSelect
              timezones={pageInfo.timezones || []}
              selectedValue={selectedTimezone}
              onMouseDown={onTimeZoneSelected}
              dropDownPosition="top"
            />
          </TimeZoneContainer>
        </GuestreservationPreview>
        <ImageContainer width={300}>
          <AutoHeightImage
            src={`${BASE_URL.image}/banners/powered_by_no_bg.png`}
            alt="powered_by_sendtime"
          />
        </ImageContainer>
      </div>
    </>
  );
};

export default GuestReservationPreview;
