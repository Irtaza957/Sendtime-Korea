import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { mailHostInfoAPI } from '@api/personal/reservation/MailGuestReservation';
import LeftSidebar from '@components/pages/cancel/LeftSidebar';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import TextArea from '@components/TextArea';
import { reservationRoutes } from '@constants/routes';
import useDebounce from '@hooks/useDebounce';
import useLoading from '@hooks/useLoading';
import { RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import * as Sentry from '@sentry/browser';

import * as Styled from './index.styles';

interface CancelProps {
  authenticated?: boolean;
  hostInfo: HostInfoType;
  pageId: string;
  reservationId: string;
  timezone: string;
}

const Cancel = ({
  authenticated,
  hostInfo,
  pageId,
  reservationId,
  timezone,
}: CancelProps) => {
  const router = useRouter();
  const { t } = useTranslation('guestPage');
  const { debounce } = useDebounce();
  const { loadingView } = useLoading();
  const [changedInfo, setChangedInfo] = useState({ responseMessage: '' });
  const [currentTimezone, setCurrentTimezone] = useState(timezone);

  const onChangeMessage = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setChangedInfo((prevValue) => ({
      ...prevValue,
      responseMessage: target.value,
    }));
  };

  const { mutate: cancelReservation, isLoading } = useMutation(
    ({ uuid, reservationId }: HostMailParams) =>
      mailHostInfoAPI.createHostReservation(
        { uuid, reservationId },
        {
          responseType: 'CANCEL',
          responseMessage: changedInfo.responseMessage,
        }
      ),
    {
      onSuccess: () => {
        const route = reservationRoutes({
          type: 'cancel',
          pageId,
          reservationId,
        }).COMPLETED;
        router.push(route);
      },
      onError: (error: RequestError) => {
        alert(error.message);
        console.error(error);
        Sentry.captureException(error);
      },
    }
  );

  const onClickCancel = () => {
    debounce(() => cancelReservation({ uuid: pageId, reservationId }), 500);
  };

  useEffect(() => {
    if (!timezone) {
      const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setCurrentTimezone(browserTimezone);
    }
  }, []);

  return (
    <Styled.CancelPageContainerWithLanguage>
      <Styled.LanguageDropdownWrapper>
        <LanguageDropdown position="relative" />
      </Styled.LanguageDropdownWrapper>
      <Styled.CancelPageContainer>
        {isLoading && loadingView()}
        <Styled.CancelContentWrapper>
          <Styled.CancelLeftSideWrapper>
            <LeftSidebar pageInfo={hostInfo} timezone={currentTimezone} />
          </Styled.CancelLeftSideWrapper>
          <Styled.CancelRightSideWrapper>
            <Styled.HeaderWrapper>
              <Styled.HeaderTitle>{t('cancel.title')}</Styled.HeaderTitle>
              <Styled.HeaderDescription>
                {t('cancel.description')}
              </Styled.HeaderDescription>
            </Styled.HeaderWrapper>
            <Styled.HeaderWrapper>
              <Styled.HeaderTitle>{t('cancel.reason')}</Styled.HeaderTitle>
              <TextArea
                value={changedInfo.responseMessage}
                onChange={onChangeMessage}
                placeholder={t('cancel.placeholder')}
              />
            </Styled.HeaderWrapper>
            <Styled.ButtonContainer>
              <Styled.UpdateButton onClick={onClickCancel}>
                {t('cancel.button')}
                <CustomIcon
                  size={6}
                  height={17}
                  fill="none"
                  stroke="white"
                  viewBox="0 0 8 14"
                  margin="0px 0px 0px 4px"
                >
                  <RightArrow />
                </CustomIcon>
              </Styled.UpdateButton>
            </Styled.ButtonContainer>
          </Styled.CancelRightSideWrapper>
        </Styled.CancelContentWrapper>
      </Styled.CancelPageContainer>
    </Styled.CancelPageContainerWithLanguage>
  );
};

export default Cancel;
