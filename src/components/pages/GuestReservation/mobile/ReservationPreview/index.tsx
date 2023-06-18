import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
import useTranslate from '@hooks/useTranslate';
import { ArrowDown, CheckBox } from '@Icon/Icons/Utils';
import { translateTime } from '@utils/format';
import { locationContent } from '@utils/format';
import { REGION } from '@utils/language';
import { toEnMonthName } from '@utils/time';

import { PreviewInfo } from '../../../../Reservation/Common';

import * as Styled from './index.styles';

interface ReservationPreviewProp {
  pageInfo: HostInfoType;
  reservationRanking?: { time: string; priority: string }[];
  selectedTimezone?: Timezone;
  onTimeZoneSelected: (data: Timezone) => void;
  changeDurationInParent: (data: string) => void;
}

const ReservationPreview = ({
  pageInfo,
  selectedTimezone,
  onTimeZoneSelected,
  changeDurationInParent,
}: ReservationPreviewProp) => {
  const { i18n } = useTranslate();
  const { t } = useTranslation('guestPage');

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState(pageInfo.timeUnit[0]);
  const [temp, setTemp] = useState(pageInfo.timeUnit[0]);
  const [isMoreClicked, setIsMoreClicked] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const previewHeightRef = useRef<HTMLDivElement | null>(null);
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

  const showMore = () => {
    setIsMoreClicked(true);
  };

  const showLess = () => {
    setIsMoreClicked(false);
  };

  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeSelectBox);
    return () => {
      document.removeEventListener('click', closeSelectBox);
    };
  }, []);

  useEffect(() => {
    if (!previewHeightRef.current) return;
    if (previewHeightRef.current.getBoundingClientRect().height >= 100) {
      setShowMoreButton(true);
      return;
    }
    setShowMoreButton(false);
  }, [pageInfo]);

  const changeDuration = (time: string, index: number) => {
    setSelectedTime(time);
    setTemp(time);
    changeDurationInParent(time);
  };

  return (
    <>
      <Styled.Preview>
        <Styled.PreviewName>{pageInfo.reservationPageName}</Styled.PreviewName>
        <Styled.PreviewInfos>
          <PreviewInfo iconType="calendar" content={calendarContent()} />
          <PreviewInfo
            iconType="time"
            content={
              pageInfo.timeUnit.length > 1 ? (
                <SidebarDurationContainer ref={dropdownRef}>
                  <GuestDurationSubConatiner
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <SelectedTime>{translateTime(selectedTime)}</SelectedTime>
                    <IconWrapper style={{ margin: '5px 0 0 auto' }}>
                      <Styled.ArrowIcon isDropdown={dropdown}>
                        <ArrowDown />
                      </Styled.ArrowIcon>
                    </IconWrapper>
                  </GuestDurationSubConatiner>
                  {dropdown ? (
                    <SidebarSelectbox>
                      <SidebarSelectTimeBox>
                        {Object.values(pageInfo.timeUnit).map((time, index) => (
                          <SelectTime
                            key={index}
                            onClick={() => changeDuration(time, index)}
                          >
                            <SidebarTimeCheckbox>
                              {temp === time ? <CheckBox /> : null}
                            </SidebarTimeCheckbox>
                            <TimeText>{translateTime(time)}</TimeText>
                          </SelectTime>
                        ))}
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
          <PreviewInfo
            iconType="globe"
            content={
              <Styled.TimeZoneContainer>
                <TimezoneSelect
                  timezones={pageInfo.timezones || []}
                  selectedValue={selectedTimezone}
                  onMouseDown={onTimeZoneSelected}
                  dropDownPosition="bottom"
                />
              </Styled.TimeZoneContainer>
            }
          />
        </Styled.PreviewInfos>
        {pageInfo.reservationPageDescription && (
          <Styled.PreviewDescription
            ref={previewHeightRef}
            isMoreClicked={isMoreClicked}
          >
            {pageInfo.reservationPageDescription}
          </Styled.PreviewDescription>
        )}
        {showMoreButton ? (
          isMoreClicked ? (
            <Styled.ButtonContainerMore>
              <Styled.MoreButton onClick={showLess}>
                {t('mobile.showMore')}
              </Styled.MoreButton>
              {/* <ChevronRight /> */}
            </Styled.ButtonContainerMore>
          ) : (
            <Styled.ButtonContainer>
              <Styled.MoreButton onClick={showMore}>
                {t('mobile.showLess')}
              </Styled.MoreButton>
              {/* <ChevronUp /> */}
            </Styled.ButtonContainer>
          )
        ) : (
          <></>
        )}
      </Styled.Preview>
    </>
  );
};

export default ReservationPreview;
