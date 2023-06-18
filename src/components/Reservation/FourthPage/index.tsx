import React from 'react';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import { PAGE_TYPE } from '@constants/utils';
import { useGroupReservation } from '@contexts/GroupReservationProvider';
import { useReservation } from '@contexts/ReservationProvider';

import FirstPagePreview from '../FirstPage/FirstPagePreview';
import { FourthPageBox, MobileInfo } from '../index.styles';

interface FourthPageProps {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
}

const FourthPage = ({ type = PAGE_TYPE.personal }: FourthPageProps) => {
  const { pageInfo: personalPageInfo } = useReservation();
  const { pageInfo: groupPageInfo } = useGroupReservation();
  const { t } = useTranslation('createBookingPage');

  if (type === PAGE_TYPE.group) {
    return (
      <FourthPageBox>
        <MediaQuery maxWidth={768}>
          <MobileInfo>{t('mobile.blockingTimeGuide')}</MobileInfo>
        </MediaQuery>

        <FirstPagePreview pageInfo={groupPageInfo} type="GROUP" />
      </FourthPageBox>
    );
  }

  if (type === PAGE_TYPE.personal) {
    return (
      <FourthPageBox>
        <MediaQuery maxWidth={768}>
          <MobileInfo>{t('mobile.prevideGuide')}</MobileInfo>
        </MediaQuery>
        <FirstPagePreview pageInfo={personalPageInfo} type="PERSONAL" />
      </FourthPageBox>
    );
  }

  return <></>;
};

export default FourthPage;
