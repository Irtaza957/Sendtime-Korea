import React, { ChangeEvent, useState } from 'react';
import i18next from 'i18next';
import { nanoid } from 'nanoid';

import StyledButton from '@components/Button';
import { SubContent } from '@components/MyPageSubComponents';
import { XButton } from '@components/Reservation/Common';
import TextInput from '@components/TextInput';
import {
  Location,
  LocationAddContainer,
  LocationBox,
  LocationContainer,
} from '@pages/MyPage/index.styles';

type LocationViewType = {
  title?: string;
  description?: string;
};
const useLocation = (defaultValue?: FavoritePlaces[]) => {
  const [places, setPlace] = useState<FavoritePlaces[]>(defaultValue ?? []);
  const [inputValue, setInputValue] = useState('');

  const addPlaces = () => {
    if (!inputValue.trim()) return;

    setPlace((prev) => {
      return [...prev, { id: nanoid(), name: inputValue }];
    });

    setInputValue('');
  };

  const deletePlaces = (locationId: string) => {
    setPlace((prev) => {
      const result = prev.filter(({ id }) => locationId !== id);
      return result;
    });
  };

  const setLocation = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const LocationView = ({ title, description }: LocationViewType) => {
    return (
      <SubContent title={title ?? ''} description={description}>
        <LocationAddContainer>
          <TextInput
            value={inputValue}
            onChange={setLocation}
            onKeyUp={(e) => {
              if (e.key === 'Enter') addPlaces();
            }}
            placeholder={i18next.t('groupSettingPage:location.placeholder')}
          />
          <StyledButton
            onClickButton={addPlaces}
            bgColor="white"
            color="purple-500"
            borderColor="purple-500"
            borderRadius={50}
            withBorder
          >
            {i18next.t('groupSettingPage:location.addBtn')}
          </StyledButton>
        </LocationAddContainer>

        <LocationBox>
          {places.map(({ id, name }) => (
            <LocationContainer key={id}>
              <Location>{name}</Location>
              <XButton onClick={() => deletePlaces(id)} />
            </LocationContainer>
          ))}
        </LocationBox>
      </SubContent>
    );
  };
  return { LocationView, places };
};

export default useLocation;
