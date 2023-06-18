import React, { InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import { Disconnect } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { ModifyButton } from '@pages/MyPage/index.styles';
import { logoUrl } from '@utils/images';

import {
  AccountContainer,
  CalendarAccount,
  CalendarContainer,
  CalendarInfo,
  CalendarType,
  Content,
  ContentDescription,
  ContentTitle,
  DisconnectAccount,
  Email,
  LogoContainer,
  NamedInputContainer,
  RestContainer,
} from './index.styles';

interface NamedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  highlightLabel?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const NamedInput = ({
  value,
  onChange,
  label,
  highlightLabel,
  type,
  ...rest
}: NamedInputProps) => {
  return (
    <NamedInputContainer>
      <label>
        {label}
        <span
          style={{ fontSize: '12px', marginLeft: '4px', color: 'var(--alert)' }}
        >
          {highlightLabel}
        </span>
      </label>
      <input type={type} value={value} onChange={onChange} {...rest} />
    </NamedInputContainer>
  );
};

interface SubContentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SubContent = ({ title, description, children }: SubContentProps) => {
  return (
    <div>
      <ContentTitle>{title}</ContentTitle>
      {description && <ContentDescription>{description}</ContentDescription>}
      <Content>{children}</Content>
    </div>
  );
};

export type AccountType = {
  calendarType: 'GOOGLE' | 'OUTLOOK';
  url: string;
  email: string;
  accountId: string;
  onClickDisconnectButton: (email: string, url: string, id: string) => void;
};

const ConnectedAccount = ({
  url,
  calendarType,
  email,
  accountId,
  onClickDisconnectButton,
}: AccountType) => {
  const { t } = useTranslation('accountSettingPage');

  return (
    <AccountContainer>
      <LogoContainer>
        <ImageContainer width={22}>
          <AutoHeightImage src={logoUrl(calendarType)} alt={calendarType} />
        </ImageContainer>
      </LogoContainer>
      <RestContainer>
        <CalendarAccount>
          <CalendarType>{calendarType}</CalendarType>
          <Email>{email}</Email>
        </CalendarAccount>
        <DisconnectAccount
          onClick={() => onClickDisconnectButton(email, url, accountId)}
        >
          <CustomIcon size={15.8} height={15.8} fill="gray-600" stroke="none">
            <Disconnect />
          </CustomIcon>
          {t('calendar.integratedCalendarList.deintegrate')}
        </DisconnectAccount>
      </RestContainer>
    </AccountContainer>
  );
};

interface CalendarSyncAccountProps {
  calendarType: 'GOOGLE' | 'OUTLOOK';
  email: string;
  handleModify?: () => void;
}

const CalendarSyncAccount = ({
  handleModify,
  calendarType,
  email,
}: CalendarSyncAccountProps) => {
  const { t } = useTranslation('accountSettingPage');

  return (
    <CalendarInfo>
      <CalendarContainer>
        <ImageContainer width={22}>
          <AutoHeightImage src={logoUrl(calendarType)} alt={calendarType} />
        </ImageContainer>
        {email} {t('calendar.eventIntegrated.calendarAccount')}
      </CalendarContainer>

      <ModifyButton onClick={handleModify}>
        {t('calendar.eventIntegrated.edit')}
      </ModifyButton>
    </CalendarInfo>
  );
};

export { CalendarSyncAccount, ConnectedAccount, NamedInput, SubContent };
