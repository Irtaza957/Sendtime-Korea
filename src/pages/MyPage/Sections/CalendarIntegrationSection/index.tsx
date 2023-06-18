import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { calendarSettingAPI } from '@api/user/UserInfo';
import StyledButton from '@components/Button';
import { ConnectedAccount, SubContent } from '@components/MyPageSubComponents';
import ToggleButton from '@components/ToggleButton';
import { useModal } from '@contexts/ModalProvider';
import useLoading from '@hooks/useLoading';
import useSnackbar from '@hooks/useSnackbar';
import useUserInfo from '@hooks/useUserInfo';
import { Calendar, Plus } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import {
  CalendarName,
  ConnectedAccountContainer,
  Section,
  SectionTitle,
  TitleContainer,
  ToggleContainer,
  ToggleList,
  Warning,
} from '@pages/MyPage/index.styles';
import CalendarAddModal from '@pages/MyPage/Modal/CalendarAddModal';
import DisconnectModal from '@pages/MyPage/Modal/DisconnectModal';
import GetCalendarModal from '@pages/MyPage/Modal/GetCalendarModal';
import * as Sentry from '@sentry/browser';
import { logoUrl } from '@utils/images';

import CalendarIntegrationBox from './CalendarIntegrationBox';
import CalendarSaveBox from './CalendarSaveBox';

const ADVANCED_OPTION = {
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  TENTATIVE: 'tentative',
  NEEDS_ACTION: 'needsAction',
} as const;

type keys = keyof typeof ADVANCED_OPTION;
type AdvancedOptionType = typeof ADVANCED_OPTION[keys];

export const CalendarNameBox = ({ calendarName }: { calendarName: string }) => {
  return (
    <CalendarName>
      <CustomIcon size={18} height={20} fill="purple-400" stroke="none">
        <Calendar />
      </CustomIcon>
      <span style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>
        {calendarName}
      </span>
    </CalendarName>
  );
};

const CalendarIntegrationSection = () => {
  const { t } = useTranslation('accountSettingPage');

  const { openModal, closeModal } = useModal();
  const { loadingView } = useLoading();
  const showSnackbar = useSnackbar();
  const { userInfo, setUserInfo, refetchUserData, setAdvancedSettings } =
    useUserInfo();

  const onToggleClick = (option: AdvancedOptionType) => {
    setUserInfo((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        syncOption: {
          ...prev.syncOption,
          [option]: !prev.syncOption[option],
        },
      };
    });

    if (!userInfo) return;

    setAdvancedSettings({
      ...userInfo.syncOption,
      [option]: !userInfo.syncOption[option],
    });

    showSnackbar({ message: i18next.t('accountSettingPage:message.save') });
  };

  const { mutate: disconnectCalendar } = useMutation(
    (id: string) => calendarSettingAPI.deleteCalendarAccount(id),
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

  const { mutate: setGetCalendar, isLoading: getCalendarLoading } = useMutation(
    (ids: UpdateSyncedCalendarRequestParams) =>
      calendarSettingAPI.setSyncedCalendar(ids),
    {
      onSuccess: () => {
        closeModal();
        refetchUserData();
      },
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    }
  );

  if (!userInfo) return loadingView();

  const onClickAddCalendarButton = () => {
    openModal(<CalendarAddModal />);
  };

  const onClickGetCalendarButton = (
    email: CalendarAccount['accountName'],
    calendars: CalendarItem[]
  ) => {
    openModal(
      <GetCalendarModal
        calendars={calendars}
        email={email}
        setGetCalendar={setGetCalendar}
      />
    );
  };

  const onClickDisconnectButton = (email: string, url: string, id: string) => {
    openModal(
      <DisconnectModal
        email={email}
        logoUrl={url}
        onDisconnectAccount={() => disconnectCalendar(id)}
      />
    );
  };

  return (
    <Section gap={40}>
      {getCalendarLoading && loadingView()}

      <TitleContainer>
        <SectionTitle>{t('calendar.title')}</SectionTitle>
        <StyledButton
          width="126px"
          bgColor="white"
          color="purple-500"
          borderRadius={50}
          borderColor="purple-500"
          onClickButton={onClickAddCalendarButton}
          withBorder
        >
          <CustomIcon size={12} fill="purple-500" stroke="none">
            <Plus />
          </CustomIcon>
          {t('calendar.addBtn')}
        </StyledButton>
      </TitleContainer>

      <SubContent title={t('calendar.integratedCalendarList.title')}>
        <ConnectedAccountContainer>
          {!userInfo.syncCalendarAccounts.length ? (
            <Warning>{t('calendar.integratedCalendarList.warning')}</Warning>
          ) : (
            userInfo.syncCalendarAccounts?.map(
              ({ id, calendarType, accountName }) => (
                <ConnectedAccount
                  key={id}
                  accountId={id}
                  url={logoUrl(calendarType)}
                  calendarType={calendarType}
                  email={accountName}
                  onClickDisconnectButton={onClickDisconnectButton}
                />
              )
            )
          )}
        </ConnectedAccountContainer>
      </SubContent>

      <SubContent
        title={t('calendar.eventIntegrated.title')}
        description={t('calendar.eventIntegrated.subtitle')}
      >
        {userInfo.syncCalendarAccounts?.map((account) => (
          <CalendarIntegrationBox
            key={account.id}
            account={account}
            onClickGetCalendarButton={onClickGetCalendarButton}
          />
        ))}
      </SubContent>

      <SubContent
        title={t('calendar.advanceSetting.title')}
        description={t('calendar.advanceSetting.subtitle')}
      >
        <ToggleList>
          <ToggleContainer>
            <ToggleButton
              onClick={() => onToggleClick('accepted')}
              active={userInfo?.syncOption.accepted}
            />
            <span>{t('calendar.advanceSetting.option.1')}</span>
          </ToggleContainer>

          <ToggleContainer>
            <ToggleButton
              onClick={() => onToggleClick('declined')}
              active={userInfo?.syncOption.declined}
            />
            <span>{t('calendar.advanceSetting.option.2')}</span>
          </ToggleContainer>

          <ToggleContainer>
            <ToggleButton
              onClick={() => onToggleClick('needsAction')}
              active={userInfo?.syncOption.needsAction}
            />
            <span>{t('calendar.advanceSetting.option.3')}</span>
          </ToggleContainer>

          <ToggleContainer>
            <ToggleButton
              onClick={() => onToggleClick('tentative')}
              active={userInfo?.syncOption.tentative}
            />
            <span>{t('calendar.advanceSetting.option.4')}</span>
          </ToggleContainer>
        </ToggleList>
      </SubContent>

      <SubContent
        title={t('calendar.addToCalendar.title')}
        description={t('calendar.addToCalendar.subtitle')}
      >
        {!userInfo.saveCalendarAccounts.length ? (
          <Warning>{t('calendar.addToCalendar.warning')}</Warning>
        ) : (
          <CalendarSaveBox />
        )}
      </SubContent>
    </Section>
  );
};

export default CalendarIntegrationSection;
