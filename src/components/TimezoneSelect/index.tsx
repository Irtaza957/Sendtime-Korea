import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNestedModal } from '@contexts/NestedModalProvider';
import { ArrowDown, SearchIcon } from '@Icon/Icons/Utils';
import { getMatchBrowserTimezone } from '@utils/time';

import { ArrowIcon, Heading, TimezoneButton, Wrapper } from './index.styles';

interface TimezoneSelectProps {
  selectedValue?: Timezone;
  onMouseDown: (data: Timezone) => void;
  dropDownPosition?: string;
  timezones: Timezone[];
  confirmChange?: boolean;
  page?: string;
}

const TimezoneSelect = ({
  selectedValue,
  onMouseDown,
  dropDownPosition,
  timezones,
  confirmChange,
  page,
}: TimezoneSelectProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [timeZoneList, setTimeZoneList] = useState(timezones);
  const [selectedTimezone, setSelectedTimezone] = useState(selectedValue);
  const isFirstMounted = useRef(false);
  const { t } = useTranslation('common');
  const { showModal, hideModal } = useNestedModal({
    type: 'confirm',
    title: t('timezone.saveConfirmTitle'),
    description: t('timezone.saveConfirmDescription'),
  });

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    initializeTimezone(timezones);
  }, []);

  const initializeTimezone = (timezoneList: Timezone[]) => {
    if (!selectedTimezone || !selectedTimezone.timezone) {
      const selectedTimezone = getMatchBrowserTimezone(timezoneList);
      getCurrentGmt(selectedTimezone);
    } else {
      getCurrentGmt(selectedTimezone);
    }
  };

  let searchResult: Timezone[] = [];

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          toggleSearch(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const onChangeTimezone = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    searchResult = [];
    if (value === '') {
      searchResult = timezones;
    } else {
      timezones.filter((post) => {
        const lowerCaseValue = value.toLowerCase();
        const lowerCaseItemName = post.name.toLowerCase();
        const lowerCaseItemZone = post.timezone.toLowerCase();
        if (
          lowerCaseItemName.includes(lowerCaseValue) ||
          lowerCaseItemZone.includes(lowerCaseValue)
        ) {
          searchResult.push(post);
        }
      });
    }
    setTimeZoneList(searchResult);
  };

  const getDateTime = (timezone: string) => {
    return new Date().toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const getCurrentGmt = async (data: Timezone) => {
    if (confirmChange && isFirstMounted.current) {
      const isConfirm = await showModal();
      if (isConfirm) {
        hideModal();
        if (onMouseDown) onMouseDown(data);
        setSelectedTimezone(data);
        toggleSearch(false);
      }
    } else {
      if (onMouseDown) onMouseDown(data);
      setSelectedTimezone(data);
      toggleSearch(false);
    }
    isFirstMounted.current = true;
  };

  const toggleSearch = (value: boolean) => {
    if (value) {
      setTimeZoneList(timezones);
    }
    setShowSearch(value);
  };

  const getTimezoneLabel = (timezone: Timezone | undefined) => {
    if (timezone)
      return (timezone.name || '').split(' ')[0] + ' ' + timezone.timezone;
    else return 'N/A';
  };

  return (
    <Wrapper className={dropDownPosition} ref={wrapperRef}>
      <Heading page={page}>Timezone</Heading>
      <TimezoneButton page={page} onClick={() => toggleSearch(!showSearch)}>
        <p className="currentGmtFont">{getTimezoneLabel(selectedTimezone)}</p>
        <ArrowIcon isDropdown={showSearch}>
          <ArrowDown />
        </ArrowIcon>
      </TimezoneButton>

      {showSearch ? (
        <div className="timezoneContainer">
          <div className="showSearcjResultDesing">
            <div className="showSearcjResultTwoDesing">
              <input
                onChange={(e) => onChangeTimezone(e)}
                placeholder="Search by city or timezone "
                className="inputDesing"
              />
              <SearchIcon />
            </div>
            <div className="timeZoneDiv">
              {timeZoneList && timeZoneList.length ? (
                timeZoneList.map((item: Timezone) => {
                  const name = item.name.split(' ')[0];
                  const timeZone = item.timezone;

                  return (
                    <div
                      key={'timezone-item-' + item.id}
                      className={'timeZoneDivTwo '}
                      onClick={() => getCurrentGmt(item)}
                    >
                      <div>
                        <span className="span-name">{name}</span>
                        <span className="span-timeZone">{timeZone}</span>
                      </div>
                      <span className="span-am">{getDateTime(timeZone)}</span>
                    </div>
                  );
                })
              ) : (
                <div className={'timeZoneDivTwo '}>
                  <div>
                    <span className="span-name">No Timezone Found</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <p className="currentTimeCheck">
        Your Timezone is set to {getTimezoneLabel(selectedTimezone)}
      </p>
    </Wrapper>
  );
};

export default TimezoneSelect;
