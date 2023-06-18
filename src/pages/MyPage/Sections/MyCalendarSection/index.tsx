import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import DailyTimeSelect from '@components/DailyTimeSelect';
import { SubContent } from '@components/MyPageSubComponents';
import { XButton } from '@components/Reservation/Common';
import TextInput from '@components/TextInput';
import TimezoneSelect from '@components/TimezoneSelect';
import { ENG_TO_KOR_SHORT_WD } from '@constants/time';
import useAutosaveUserInfo from '@hooks/useAutosaveUserInfo';
import useLoading from '@hooks/useLoading';
import useUserInfo from '@hooks/useUserInfo';
import {
  ButtonContainer,
  Location,
  LocationAddContainer,
  LocationBox,
  LocationContainer,
  Section,
  SectionTitle,
} from '@pages/MyPage/index.styles';
import { AvailableTime } from '@pages/SetTime';

interface MyCalendarSectionProps {
  onClickSaveButton: () => void;
}

const MyCalendarSection = ({ onClickSaveButton }: MyCalendarSectionProps) => {
  const {
    userInfo,
    addFavoritePlaces,
    deleteFavoritePlaces,
    customLocationInputValue,
    setLocation,
    onClickDailyTimeCheckbox,
    setDayStartTime,
    setDayEndTime,
    setTimezone,
    timezones,
    saveUserInfo,
  } = useUserInfo();

  const { t } = useTranslation('accountSettingPage');

  useEffect(() => {
    saveUserInfo();
  }, [userInfo?.timezone]);

  const { loadingView } = useLoading();
  useAutosaveUserInfo();

  if (!userInfo) return loadingView();

  return (
    <>
      <Section gap={30}>
        <SectionTitle>{t('myCalendarSetting.title')}</SectionTitle>

        <TimezoneSelect
          timezones={timezones || []}
          selectedValue={userInfo.timezone}
          onMouseDown={setTimezone}
          confirmChange={true}
        />

        <SubContent
          title={t('myCalendarSetting.availability.title')}
          description={t('myCalendarSetting.availability.subtitle')}
        >
          <DailyTimeSelect
            openTimes={userInfo.openTimes.map(
              (openTime) =>
                ({
                  ...openTime,
                  day: ENG_TO_KOR_SHORT_WD[openTime.day],
                } as AvailableTime)
            )}
            onClickCheckbox={onClickDailyTimeCheckbox}
            onClickStartSelectBox={setDayStartTime}
            onClickEndSelectBox={setDayEndTime}
          />
        </SubContent>

        <SubContent
          title={t('myCalendarSetting.favPlace.title')}
          description={t('myCalendarSetting.favPlace.subtitle')}
        >
          <LocationAddContainer>
            <TextInput
              value={customLocationInputValue}
              onChange={setLocation}
              inputPadding={50}
              onKeyUp={(e) => {
                if (e.key === 'Enter') addFavoritePlaces();
              }}
              placeholder={t('myCalendarSetting.favPlace.placeholder')}
            />
            <StyledButton
              onClickButton={addFavoritePlaces}
              bgColor="white"
              color="purple-500"
              borderColor="purple-500"
              borderRadius={50}
              withBorder
            >
              {t('myCalendarSetting.favPlace.addBtn')}
            </StyledButton>
          </LocationAddContainer>

          <LocationBox>
            {userInfo.favoritePlaces.map(({ id, name }) => (
              <LocationContainer key={id}>
                <Location>{name}</Location>
                <XButton onClick={() => deleteFavoritePlaces(id)} />
              </LocationContainer>
            ))}
          </LocationBox>
        </SubContent>
      </Section>
      <ButtonContainer>
        <div />
        <StyledButton
          onClickButton={onClickSaveButton}
          borderRadius={50}
          padding="10px 20px"
          align="end"
          type="submit"
        >
          {t('save')}
        </StyledButton>
      </ButtonContainer>
    </>
  );
};

export default MyCalendarSection;
