import React from 'react';
import { useTranslation } from 'react-i18next';

import { PAGE_TYPE } from '@constants/utils';
import { useGroupReservation } from '@contexts/GroupReservationProvider';
import { useReservation } from '@contexts/ReservationProvider';

import { SubSection } from '../Common';
import { ThirdPageContainer } from '../index.styles';

interface ThirdPageProps {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
}

const ThirdPage = ({ type = PAGE_TYPE.personal }: ThirdPageProps) => {
  const { pageInfo, onToggleMasked, onToggleReminder } = useReservation();
  const {
    pageInfo: groupPageInfo,
    onToggleMasked: onGroupToggleMasked,
    onToggleReminder: onGroupToggleReminder,
  } = useGroupReservation();
  const { t } = useTranslation('createBookingPage');

  if (type === PAGE_TYPE.personal) {
    return (
      <ThirdPageContainer>
        <SubSection
          subTitle={t('hideEventInfo.title')}
          description={t('hideEventInfo.subtitle')}
          onClickToggle={onToggleMasked}
          active={pageInfo.masked}
        />

        <SubSection
          subTitle={t('remind.title')}
          description={t('remind.subtitle')}
          onClickToggle={onToggleReminder}
          active={pageInfo.reminder}
        />
      </ThirdPageContainer>
    );
  }

  if (type === PAGE_TYPE.group) {
    return (
      <ThirdPageContainer>
        <SubSection
          subTitle={t('hideEventInfo.title')}
          description={t('hideEventInfo.subtitle')}
          onClickToggle={onGroupToggleMasked}
          active={groupPageInfo.masked}
        />

        <SubSection
          subTitle={t('remind.title')}
          description={t('remind.subtitle')}
          onClickToggle={onGroupToggleReminder}
          active={groupPageInfo.reminder}
        />
      </ThirdPageContainer>
    );
  }

  return <></>;
};

export default ThirdPage;
