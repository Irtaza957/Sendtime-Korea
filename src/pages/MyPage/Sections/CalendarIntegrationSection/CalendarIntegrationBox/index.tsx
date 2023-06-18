import React from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarSyncAccount } from '@components/MyPageSubComponents';
import {
  CalendarContainer,
  CalendarContentWrapper,
  Warning,
} from '@pages/MyPage/index.styles';

import { CalendarNameBox } from '..';

interface CalendarIntegrationBoxProps {
  account: CalendarAccount;
  onClickGetCalendarButton: (
    email: CalendarAccount['accountName'],
    calendars: CalendarItem[]
  ) => void;
}

const CalendarIntegrationBox = ({
  account,
  onClickGetCalendarButton,
}: CalendarIntegrationBoxProps) => {
  const { t } = useTranslation('accountSettingPage');

  return (
    <CalendarContainer key={account.id}>
      <CalendarContentWrapper>
        <CalendarSyncAccount
          calendarType={account.calendarType}
          email={account.accountName}
          handleModify={() =>
            onClickGetCalendarButton(
              account.accountName,
              account.sendtimeCalendars
            )
          }
        />
        {account.sendtimeCalendars?.length > 0 ? (
          account.sendtimeCalendars
            .filter(({ synced }) => synced)
            .map(({ id, calendarName }) => (
              <CalendarNameBox key={id} calendarName={calendarName} />
            ))
        ) : (
          <Warning>{t('calendar.integratedCalendarList.warning')}</Warning>
        )}
      </CalendarContentWrapper>
    </CalendarContainer>
  );
};

export default CalendarIntegrationBox;
