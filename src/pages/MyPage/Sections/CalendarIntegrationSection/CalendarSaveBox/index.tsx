import React from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarSyncAccount } from '@components/MyPageSubComponents';
import { useModal } from '@contexts/ModalProvider';
import useLoading from '@hooks/useLoading';
import useUserInfo from '@hooks/useUserInfo';
import {
  CalendarContainer,
  CalendarContentWrapper,
  Warning,
} from '@pages/MyPage/index.styles';
import PostCalendarModal from '@pages/MyPage/Modal/PostCalendarModal';

import { CalendarNameBox } from '..';

const CalendarSaveBox = () => {
  const { openModal } = useModal();
  const { userInfo } = useUserInfo();
  const { loadingView } = useLoading();
  const { t } = useTranslation('accountSettingPage');

  if (!userInfo) return loadingView();

  const onClickPostCalendarButton = () => {
    openModal(<PostCalendarModal accounts={userInfo.saveCalendarAccounts} />);
  };

  return (
    <CalendarContainer>
      <CalendarContentWrapper>
        {userInfo.saveCalendarAccounts
          ?.filter((account) =>
            account.sendtimeCalendars.some((calendar) => calendar?.saving)
          )
          .map((account) =>
            account.sendtimeCalendars?.length ? (
              account.sendtimeCalendars
                .filter(({ saving }) => saving)
                .map(({ id, calendarName }) => (
                  <CalendarContentWrapper key={id}>
                    <CalendarSyncAccount
                      calendarType={account.calendarType}
                      email={account.accountName}
                      handleModify={onClickPostCalendarButton}
                    />
                    <CalendarNameBox calendarName={calendarName} />
                  </CalendarContentWrapper>
                ))
            ) : (
              <Warning>{t('calendar.addToCalendar.warning')}</Warning>
            )
          )}
      </CalendarContentWrapper>
    </CalendarContainer>
  );
};

export default CalendarSaveBox;
