import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import MediaQuery from 'react-responsive';

import { mailHostInfoAPI } from '@api/personal/reservation/MailGuestReservation';
import LeftSidebar from '@components/pages/change/LeftSidebar';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import TextArea from '@components/TextArea';
import { reservationRoutes, ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useDebounce from '@hooks/useDebounce';
import useLoading from '@hooks/useLoading';
import { RightArrow } from '@Icon//Icons';
import CustomIcon from '@Icon/index';
import * as Sentry from '@sentry/browser';
import { toTzDateTime } from '@utils/time';

import * as Styled from './index.styles';

interface ChangeProps {
  authenticated?: boolean;
  hostInfo: HostInfoType;
  pageId: string;
  reservationId: string;
  timezones: Timezone[];
}

const Change = ({
  authenticated,
  hostInfo,
  pageId,
  reservationId,
  timezones,
}: ChangeProps) => {
  const router = useRouter();
  const { t } = useTranslation('guestPage');
  const { debounce } = useDebounce();
  const { loadingView } = useLoading();

  const [changedInfo, setChangedInfo] = useState({
    responseEmail: {
      value: '',
      validated: true,
    },
    responseMessage: '',
  });

  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { u, r, i, change, start, end, tz } = router.query;
  const qUuid = typeof i === 'string' ? i : '';
  const qRid = typeof r === 'string' ? r : '';
  const currentTimezone =
    typeof tz === 'string' ? tz : (browserTimezone as string);
  const newConfirmTime = {
    startDateTime: typeof start === 'string' ? start : '',
    endDateTime: typeof end === 'string' ? end : '',
  };

  const [f, s] = router.asPath.split('/change');

  const { showModal, hideModal } = useNestedModal({
    type: 'confirm',
    title: t('alert.doubleBooked.alreadyDone'),
    description: t('alert.doubleBooked.continue'),
    buttonText: { confirm: t('alert.doubleBooked.buttonText') },
  });

  const getTimeZoneByName = (timezone: string) => {
    let updatedTimezone = {
      id: '',
      name: '',
      timezone: '',
    };
    timezones.forEach((element) => {
      if (element.timezone === timezone) {
        updatedTimezone = { ...element };
        return;
      }
    });
    return updatedTimezone;
  };

  const { mutate: changeReservation, isLoading } = useMutation(
    ({ force }: Omit<HostMailParams, 'uuid' | 'reservationId'>) =>
      mailHostInfoAPI.createHostReservation(
        { uuid: qUuid, reservationId: qRid, force },
        {
          reservationStartDateTime:
            typeof start === 'string'
              ? toTzDateTime(start as string, currentTimezone)
              : '',
          reservationEndDateTime:
            typeof end === 'string'
              ? toTzDateTime(end as string, currentTimezone)
              : '',
          responseType: 'EDIT',
          responseMessage: changedInfo.responseMessage,
          timezone: getTimeZoneByName(currentTimezone),
        }
      ),

    {
      onSuccess: (res: AxiosResponse) => {
        router.push(
          reservationRoutes({
            type: 'change',
            pageId,
            reservationId,
          }).COMPLETED
        );
      },
      onError: (error: RequestError) => {
        Sentry.captureException(error);

        if (error.code === 4407) {
          showModal(async () => {
            await changeReservation({ force: true });
            hideModal();
            return true;
          });
          return;
        }

        if (error.code === 4403) {
          alert(t('alert.confirm.alreadyDone'));
        } else {
          alert(error.message);
        }

        window.location.replace(ROUTES.MY_CALENDAR);
      },
    }
  );

  const onChangeMessage = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setChangedInfo((prevValue) => ({
      ...prevValue,
      responseMessage: target.value,
    }));
  };

  const onChangeClick = () => {
    debounce(() => changeReservation({}), 500);
  };

  if (!change && typeof window !== 'undefined') {
    router.push({ pathname: `${f}`, query: { u, i, r, change: 'true' } });
    return loadingView();
  }

  return (
    <Styled.ChangePageContainer>
      {isLoading && loadingView()}
      <MediaQuery maxWidth={1024}>
        <Styled.LanguageDropdownWrapper>
          <LanguageDropdown position="relative" />
        </Styled.LanguageDropdownWrapper>
      </MediaQuery>
      <Styled.ChangeContentWrapper>
        <Styled.ChangeLeftSideWrapper>
          <LeftSidebar
            pageInfo={hostInfo}
            timezone={currentTimezone}
            newConfirmTime={newConfirmTime}
          />
        </Styled.ChangeLeftSideWrapper>
        <Styled.ChangeRightSideWrapper>
          <Styled.HeaderWrapper>
            <Styled.HeaderTitle>{t('change.title')}</Styled.HeaderTitle>
            <Styled.HeaderDescription>
              {t('change.description')}
            </Styled.HeaderDescription>
          </Styled.HeaderWrapper>
          <Styled.HeaderWrapper>
            <Styled.HeaderTitle>{t('change.reason')}</Styled.HeaderTitle>
            <TextArea
              value={changedInfo.responseMessage}
              onChange={onChangeMessage}
              placeholder={t('change.placeholder')}
            />
          </Styled.HeaderWrapper>
          <Styled.ButtonContainer>
            <Styled.UpdateButton onClick={onChangeClick}>
              {t('change.button')}
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
        </Styled.ChangeRightSideWrapper>
      </Styled.ChangeContentWrapper>
    </Styled.ChangePageContainer>
  );
};

export default Change;
