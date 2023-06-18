import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Linkify from 'react-linkify';

import { PAGE_TYPE } from '@constants/utils';
import { GroupPageInfoType } from '@contexts/GroupReservationProvider';
import { PageInfoType } from '@contexts/ReservationProvider';
import { ArrowDown, CheckBox } from '@Icon/Icons/Utils';
import { locationContentWithNames, translateTime } from '@utils/format';
import { rangeDate } from '@utils/time';

import { PreviewInfo } from '../Common';
import {
  ArrowIcon,
  Duration,
  IconWrapper,
  Preview,
  PreviewDescription,
  PreviewInfos,
  PreviewName,
  SelectedTime,
  SelectTime,
  SidebarDurationContainer,
  SideBarDurationSubConatiner,
  SidebarSelectbox,
  SidebarSelectTimeBox,
  SidebarTimeCheckbox,
  TimeText,
  Warning,
} from '../index.styles';

interface FirstPagePreviewProp {
  pageInfo: PageInfoType | GroupPageInfoType;
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
}

const FirstPagePreview = ({ pageInfo, type }: FirstPagePreviewProp) => {
  const { t } = useTranslation('createBookingPage');
  const [previewLocations, setPreviewLocations] = useState('');
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const makeTermContent = () => {
    if (pageInfo.term.custom.checked) {
      if (!pageInfo.term.infinite.checked) {
        return rangeDate(
          pageInfo.term.custom.start,
          pageInfo.term.custom.end,
          '.'
        );
      }

      return '';
    }

    if (pageInfo.term.days.checked) {
      if (!pageInfo.term.infinite.checked) {
        return rangeDate(pageInfo.term.days.start, pageInfo.term.days.end, '.');
      }

      return '';
    }

    if (pageInfo.term.infinite.checked === true) {
      return t('dateRange.indefinite');
    }

    return '';
  };

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState(pageInfo.timeIndex[0]);
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setDropdown(false);
    }
  };
  const onClickRadioCheckbox = (time: string) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    document.addEventListener('click', closeSelectBox);
    return () => {
      document.removeEventListener('click', closeSelectBox);
    };
  }, []);

  useEffect(() => {
    const checkedLocations = pageInfo.location.filter(
      ({ content, checked }) => checked && content
    );
    const checkedOnline = pageInfo.online.filter(
      ({ content, checked }) => checked && content
    );

    setPreviewLocations(
      locationContentWithNames(
        checkedLocations.concat(checkedOnline).map(({ content }) => content)
      )
    );
  }, [pageInfo.location, pageInfo.online]);

  useEffect(() => {
    setSelectedTime(pageInfo?.timeIndex[0]);
  }, [pageInfo.timeIndex]);

  return (
    <Preview>
      <PreviewName>{pageInfo.title}</PreviewName>
      <Warning>{t('preview.subtitle')}</Warning>

      <PreviewInfos>
        <PreviewInfo iconType="calendar" content={makeTermContent()} />
        <PreviewInfo
          iconType="time"
          content={
            pageInfo.timeIndex.length > 1 ? (
              <SidebarDurationContainer ref={dropdownRef}>
                <SideBarDurationSubConatiner
                  onClick={() => setDropdown(!dropdown)}
                >
                  <Duration>
                    <SelectedTime>{translateTime(selectedTime)}</SelectedTime>
                  </Duration>
                  <IconWrapper>
                    <ArrowIcon isDropdown={dropdown} isFristPageDropDown={true}>
                      <ArrowDown />
                    </ArrowIcon>
                  </IconWrapper>
                </SideBarDurationSubConatiner>
                {dropdown ? (
                  <SidebarSelectbox>
                    <SidebarSelectTimeBox>
                      {(pageInfo.timeIndex as string[]).map((time, index) => (
                        <SelectTime
                          key={index}
                          onClick={() => onClickRadioCheckbox(time)}
                        >
                          <SidebarTimeCheckbox>
                            {time === selectedTime ? <CheckBox /> : null}
                          </SidebarTimeCheckbox>
                          <TimeText>{translateTime(time)}</TimeText>
                        </SelectTime>
                      ))}
                    </SidebarSelectTimeBox>
                  </SidebarSelectbox>
                ) : null}
              </SidebarDurationContainer>
            ) : (
              translateTime(pageInfo.timeIndex[0])
            )
          }
        />
        {previewLocations && (
          <PreviewInfo iconType="location" content={previewLocations} />
        )}
      </PreviewInfos>
      <PreviewDescription>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a
              target="blank"
              href={decoratedHref}
              key={key}
              style={{ color: 'var(--purple-500)' }}
            >
              {decoratedText}
            </a>
          )}
        >
          {pageInfo.description}
        </Linkify>
      </PreviewDescription>
    </Preview>
  );
};

export default FirstPagePreview;
