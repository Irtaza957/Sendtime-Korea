import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import { SubSection, XButton } from '@components/Reservation/Common';
import {
  ArrowIcon,
  Box,
  Checkbox,
  CustomCheckbox,
  CustomIconWrapper,
  DeleteDuration,
  Duration,
  DurationBox,
  DurationContainer,
  DurationSubContainer,
  DurationTime,
  EmptySlotText,
  IconWrapper,
  LocationAddContainer,
  LocationAddTitle,
  MultipleCheckbox,
  MultipleText,
  Search,
  SearchBox,
  Selectbox,
  SelectboxTop,
  SelectTime,
  SelectTimeBox,
  Slider,
  Switch,
  Switchbox,
  TimeCheckbox,
  TimeText,
} from '@components/Reservation/index.styles';
import TextArea from '@components/TextArea';
import TextCheckbox from '@components/TextCheckbox';
import {
  LocationBox,
  LocationContent,
  MoreContent,
} from '@components/TextCheckbox/index.styles';
import TextInput from '@components/TextInput';
import { MAX_TIME_SLOTS, SELECT_TIME_KR } from '@constants/time';
import { useReservation } from '@contexts/ReservationProvider';
import useTerm from '@hooks/inputs/useTerm';
import { ArrowDown, CheckIcon, XCancel } from '@Icon/Icons/Utils';
import { translateLocation, translateTime } from '@utils/format';

const PersonalFirstPage = () => {
  const { t, i18n } = useTranslation('createBookingPage');
  const {
    pageInfo,
    setPageInfo,
    onChangePageInfoTitle,
    onChangePageInfoDescription,
    onChangeCustomLocation,
    onClickAddLocation,
    customLocation,
    onClickCustomLocationCheckbox,
    onClickDeleteLocation,
    onClickCheckbox,
    isValidated,
    isAnimated,
  } = useReservation();

  const { TermView, term } = useTerm(pageInfo.term);

  const allTimeUnit = SELECT_TIME_KR.map((value) => {
    return {
      text: translateTime(value),
      value,
    };
  });
  const [selectedTimeUnits, setSelectedTimeUnits] = useState(
    pageInfo.timeIndex
  );
  const [search, setSearch] = useState<string>('');
  const [multiple, setMultiple] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const isFirstMounted = useRef(false);
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const checkboxClickHandler = (durationValue: string) => {
    if (multiple) {
      if (selectedTimeUnits.includes(durationValue)) {
        const tempArray = [...selectedTimeUnits];
        const index = tempArray.indexOf(durationValue);
        tempArray.splice(index, 1);
        setSelectedTimeUnits(() => tempArray);
      } else {
        if (selectedTimeUnits.length < MAX_TIME_SLOTS) {
          setSelectedTimeUnits((prevState) => [...prevState, durationValue]);
        }
      }
    } else {
      if (!selectedTimeUnits.includes(durationValue)) {
        setSelectedTimeUnits([durationValue]);
      }
    }
  };

  const deleteDuration = (
    event: React.MouseEvent<HTMLDivElement>,
    durationValue: string
  ) => {
    event.stopPropagation();
    if (selectedTimeUnits.includes(durationValue)) {
      const tempArray = [...selectedTimeUnits];
      const index = tempArray.indexOf(durationValue);
      tempArray.splice(index, 1);
      setSelectedTimeUnits(() => tempArray);
    }
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
    setSelectedTimeUnits(() => pageInfo.timeIndex);
    if (pageInfo.timeIndex.length > 1) {
      setMultiple(true);
    }
  }, [pageInfo.timeIndex]);

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      term,
    }));
  }, [term]);

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      timeIndex: selectedTimeUnits,
    }));
  }, [selectedTimeUnits]);

  useEffect(() => {
    if (isFirstMounted.current) {
      if (!multiple && selectedTimeUnits.length > 1) {
        setSelectedTimeUnits((prevState) => [prevState[0]]);
      }
    } else {
      isFirstMounted.current = true;
    }
  }, [multiple]);

  return (
    <Box gap={30}>
      <SubSection subTitle={t('bookingPageName.title')} required>
        <TextInput
          value={pageInfo.title}
          onChange={onChangePageInfoTitle}
          validated={isValidated.firstPage.title}
          animated={isAnimated.firstPage}
        />
      </SubSection>

      <SubSection subTitle={t('description.title')}>
        <TextArea
          value={pageInfo.description}
          onChange={onChangePageInfoDescription}
          placeholder={t('description.placeholder')}
        />
      </SubSection>

      <SubSection
        subTitle={t('dateRange.title')}
        description={t('dateRange.subtitle')}
      >
        {TermView()}
      </SubSection>
      <SubSection
        subTitle={t('duration.title')}
        description={t('duration.subtitle')}
        required
      >
        <DurationContainer ref={dropdownRef}>
          <DurationSubContainer
            isEmpty={!selectedTimeUnits.length ? true : false}
            onClick={() => setDropdown(!dropdown)}
          >
            <Duration>
              {selectedTimeUnits.length ? (
                selectedTimeUnits.map((duration, index) => (
                  <DurationBox key={index}>
                    <DurationTime>{translateTime(duration)}</DurationTime>
                    <DeleteDuration
                      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                        deleteDuration(event, duration)
                      }
                    >
                      <XCancel />
                    </DeleteDuration>
                  </DurationBox>
                ))
              ) : (
                <EmptySlotText>{t('duration.emptyMessage')}</EmptySlotText>
              )}
            </Duration>
            <IconWrapper>
              <ArrowIcon isDropdown={dropdown}>
                <ArrowDown />
              </ArrowIcon>
            </IconWrapper>
          </DurationSubContainer>
          {dropdown ? (
            <Selectbox>
              <SelectboxTop>
                <SearchBox>
                  <Search
                    placeholder={t('duration.inputBoxPlaceHolder')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </SearchBox>
                <Switchbox>
                  <MultipleText>{t('duration.toggleTitle')}</MultipleText>
                  <Switch>
                    <Checkbox
                      type="checkbox"
                      onClick={() => setMultiple(!multiple)}
                    />
                    <Slider isMultiple={multiple} />
                  </Switch>
                </Switchbox>
              </SelectboxTop>
              <SelectTimeBox>
                {allTimeUnit
                  .filter((item) => {
                    return search.toLowerCase() === ''
                      ? item
                      : item.value.toLowerCase().includes(search.toLowerCase());
                  })
                  .map((duration, index) => (
                    <SelectTime
                      key={index}
                      onClick={() => checkboxClickHandler(duration.value)}
                    >
                      {multiple ? (
                        <MultipleCheckbox
                          isChecked={selectedTimeUnits.includes(duration.value)}
                        >
                          <CustomIconWrapper>
                            <CheckIcon />
                          </CustomIconWrapper>
                        </MultipleCheckbox>
                      ) : (
                        <TimeCheckbox
                          isChecked={selectedTimeUnits.includes(duration.value)}
                        />
                      )}
                      <TimeText>{duration.text}</TimeText>
                    </SelectTime>
                  ))}
              </SelectTimeBox>
            </Selectbox>
          ) : null}
        </DurationContainer>
      </SubSection>

      <SubSection
        subTitle={t('location.title')}
        description={t('location.subtitle')}
      >
        <LocationAddContainer>
          <LocationAddTitle>{t('location.customField.title')}</LocationAddTitle>
          <TextInput
            value={customLocation.content}
            onChange={onChangeCustomLocation}
            placeholder={t('location.customField.placeholder')}
          />
          <StyledButton
            onClickButton={onClickAddLocation}
            bgColor="white"
            color="purple-500"
            borderColor="purple-500"
            borderRadius={50}
            withBorder
          >
            {t('location.addButton')}
          </StyledButton>
        </LocationAddContainer>

        <LocationBox>
          {(pageInfo.location ?? []).map(({ id, content, checked }) => (
            <CustomCheckbox key={id} width="auto">
              <TextCheckbox
                onClick={() => onClickCustomLocationCheckbox(id)}
                checked={checked}
                hasBackground
              >
                {content}
              </TextCheckbox>
              <XButton onClick={() => onClickDeleteLocation(id)} />
            </CustomCheckbox>
          ))}

          {(pageInfo.online ?? []).map(({ id, content, icon, checked }) => (
            <TextCheckbox
              key={id}
              onClick={() => onClickCheckbox(id)}
              checked={checked}
            >
              {icon}
              <LocationContent>
                <p style={{ flexShrink: 0 }}>{translateLocation(content)}</p>
                {content === 'Google Meet' && (
                  <MoreContent>{t('location.googleMeetGuide')}</MoreContent>
                )}
                {content === 'Zoom' && (
                  <MoreContent>{t('location.zoomGuide')}</MoreContent>
                )}
              </LocationContent>
            </TextCheckbox>
          ))}
        </LocationBox>
      </SubSection>
    </Box>
  );
};

export default PersonalFirstPage;
