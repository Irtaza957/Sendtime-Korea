import React, { KeyboardEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Navigation from '@components/Navigation';
import SideAreaContainer from '@components/SideAreaContainer';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { FROM_BRIDGE } from '@constants/account';
import useSnackbar from '@hooks/useSnackbar';
import useUserInfo from '@hooks/useUserInfo';
import { getLocalStorage, removeFromLocalStorage } from '@utils/storage';

import AccountSection from './Sections/AccountSection';
import CalendarIntegrationSection from './Sections/CalendarIntegrationSection';
import MyCalendarSection from './Sections/MyCalendarSection';
import ServiceIntegrationSection from './Sections/ServiceIntegrationSection';
import { Main } from './index.styles';

const MyPage = () => {
  const { saveUserInfo } = useUserInfo();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation('accountSettingPage');
  const { t: tCommon } = useTranslation('common');

  useEffect(() => {
    const isFromBridge = getLocalStorage(FROM_BRIDGE);
    if (!isFromBridge) return;

    if (isFromBridge === 'true') {
      removeFromLocalStorage(FROM_BRIDGE);
    }
  }, []);

  const preventEnterSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return false;
    }
  };

  const saveInfo = () => {
    saveUserInfo();
    showSnackbar({ type: 'default', message: t('message.save') });
  };

  const myPageItem = [
    {
      title: t('account.title'),
      contents: <AccountSection onClickSaveButton={saveInfo} />,

      onClick: (data?: any) => {},
      dataLength: 1,
    },
    {
      title: t('calendar.title'),
      contents: <CalendarIntegrationSection />,
      onClick: (data?: any) => {},
      dataLength: 1,
    },
    {
      title: t('serviceIntegration.title'),
      contents: <ServiceIntegrationSection />,
      onClick: (data?: any) => {},
      dataLength: 1,
    },
    {
      title: t('myCalendarSetting.title'),
      contents: <MyCalendarSection onClickSaveButton={saveInfo} />,
      onClick: (data?: any) => {},
      dataLength: 1,
    },
    // {
    //   title: '구독/결제',
    //   contents: <AccountSection />,
    //   onClick: (data?: any) => {},
    //   dataLength: 1,
    // },
  ];

  return (
    <Main>
      <WithSidebarComponent>
        <SideAreaContainer>
          <Title margin="0 0 33px 0">{tCommon('nav_items.MY_PAGE')}</Title>
          <Navigation navItems={myPageItem} pagination={false} />
          {/* 
          <MyPageContainer
          // onSubmit={onSubmitUserInfo}
          // onKeyDown={preventEnterSubmit}
          /> */}
        </SideAreaContainer>
      </WithSidebarComponent>
    </Main>
  );
};

export default MyPage;
