import React, { ChangeEvent, useState } from 'react';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { calendarSettingAPI } from '@api/user/UserInfo';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import SelectTextInput from '@components/SelectTextInput';
import { useModal } from '@contexts/ModalProvider';
import useUserInfo from '@hooks/useUserInfo';
import { Calendar } from '@Icon//Icons/Utils';
import CustomIcon from '@Icon/index';
import * as Sentry from '@sentry/browser';
import { logoUrl } from '@utils/images';

import {
  AccountContainer,
  AccountWrapper,
  ButtonContainer,
  CalendarContainer,
  ContentWrapper,
  PaddingContainer,
  PostCalendarModalContainer,
  RadioButton,
  RadioButtonLabel,
  SubDescription,
  Title,
  TitleContainer,
} from './index.styles';

interface AccountRadioButton {
  account: CalendarAccount;
  selectedAccount: CalendarAccount;
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AccountRadioButton = ({
  account,
  selectedAccount,
  onSelect,
}: AccountRadioButton) => {
  return (
    <AccountWrapper>
      <RadioButton
        type="radio"
        value={account.accountName}
        checked={selectedAccount.accountName === account.accountName}
        onChange={onSelect}
      />
      <RadioButtonLabel>
        <ImageContainer width={20}>
          <AutoHeightImage
            src={logoUrl(account.calendarType)}
            alt={account.calendarType}
          />
        </ImageContainer>
        {account.accountName}
      </RadioButtonLabel>
    </AccountWrapper>
  );
};

interface PostCalendarModalProps {
  accounts: CalendarAccount[];
}

const PostCalendarModal = ({ accounts }: PostCalendarModalProps) => {
  const { refetchUserData } = useUserInfo();
  const { closeModal } = useModal();
  const { t } = useTranslation('accountSettingPage');

  const { mutate: setPostCalendar } = useMutation(
    (calendarId: string) => calendarSettingAPI.setSavingCalendar(calendarId),
    {
      onSuccess: () => {
        refetchUserData();
        closeModal();
      },
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  const defaultAccount =
    accounts.find((account) =>
      account.sendtimeCalendars.some((calendar) => calendar.saving)
    ) ?? accounts[0];

  const defaultCalendar =
    defaultAccount.sendtimeCalendars.find((calendar) => calendar.saving) ??
    defaultAccount.sendtimeCalendars[0];

  const [selectedAccount, setSelectedAccount] = useState(defaultAccount);
  const [selectedCalendar, setSelectedCalendar] = useState(defaultCalendar);

  const calendarsWithId = selectedAccount.sendtimeCalendars.map(
    (calendar, idx) => ({
      ...calendar,
      indexId: idx,
    })
  );

  const onSelectAccountRadioButton = (accountId: string) => {
    const targetAccount = accounts.find((account) => account.id === accountId);
    if (!targetAccount) return;

    setSelectedAccount(targetAccount);
    setSelectedCalendar(targetAccount.sendtimeCalendars[0]);
  };

  const selectCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = Number(event.currentTarget.dataset.id);

    // TODO: index로 id를 억지로 주고 있음. 서버에서 받은 string id로 선택하는 방법 고민해보기
    const targetCalendar = calendarsWithId.find(
      ({ indexId }) => indexId === targetId
    );

    if (!targetCalendar) return;
    setSelectedCalendar(targetCalendar);
  };

  const submitPostCalendar = () => {
    setPostCalendar(selectedCalendar.id);
  };

  return (
    <PostCalendarModalContainer>
      <PaddingContainer>
        <TitleContainer>
          <Title>{t('calendar.addToCalendar.warning')}</Title>
          <div>
            <SubDescription>
              {t('calendar.addToCalendar.subtitle')}
            </SubDescription>
          </div>
        </TitleContainer>
      </PaddingContainer>
      <ContentWrapper>
        <PaddingContainer>
          <AccountContainer>
            {accounts.map((account) => (
              <AccountRadioButton
                key={account.accountName}
                account={account}
                selectedAccount={selectedAccount}
                onSelect={() => onSelectAccountRadioButton(account.id)}
              />
            ))}
          </AccountContainer>
        </PaddingContainer>
        <CalendarContainer>
          <PaddingContainer>
            {t('calendar.addToCalendar.title')}
            <SelectTextInput
              prefixNode={
                <CustomIcon size={20} fill="purple-500" stroke="none">
                  <Calendar />
                </CustomIcon>
              }
              value={selectedCalendar.calendarName}
              selectValues={selectedAccount.sendtimeCalendars.map(
                (calendar) => ({ value: calendar.calendarName })
              )}
              onClickSelectBox={selectCalendar}
              inputPadding={6}
            />
          </PaddingContainer>
        </CalendarContainer>
      </ContentWrapper>
      <PaddingContainer>
        <ButtonContainer>
          <StyledButton
            onClickButton={closeModal}
            withBorder
            bgColor="white"
            borderColor="gray-550"
            color="gray-750"
            padding="12px"
          >
            {i18n.t('common:cancel')}
          </StyledButton>
          <StyledButton padding="12px" onClickButton={submitPostCalendar}>
            {t('calendar.addToCalendar.edit')}
          </StyledButton>
        </ButtonContainer>
      </PaddingContainer>
    </PostCalendarModalContainer>
  );
};

export default PostCalendarModal;
