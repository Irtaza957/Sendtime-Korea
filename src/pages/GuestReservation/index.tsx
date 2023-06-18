import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import MediaQuery from 'react-responsive';

import ReservationAlertModal from '@components/Modal/Custom/ReservationAlertModal';
import { HACKLE_KEYS } from '@constants/hackle';
import {
  defaultGuestInfo,
  useGuestInfo,
} from '@contexts/GuestReservationProvider';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { useTrack } from '@hackler/react-sdk';
import useGuestUserInfo from '@hooks/useGuestUserInfo';
import { makeQueryString } from '@utils/etc';
import { removeFromLocalStorage, setLocalStorage } from '@utils/storage';

import MobileGuestReservation from './@Mobile';
import WebGuestReservation from './@Web';

export type SelectedTimeType = {
  startTime: string;
  endTime: string;
  startDateTime: string;
  endDateTime: string;
};

interface GuestReservationProps {
  hostInfo: HostInfoType;
  change?: string;
}

const GuestReservation = ({ hostInfo, change }: GuestReservationProps) => {
  const track = useTrack();
  const router = useRouter();
  const { i, r, cp, tp } = router.query;
  const { guestInfo, setGuestInfo } = useGuestInfo();

  const { showModal, hideModal } = useNestedModal({
    type: 'custom',
    customModal: (
      <ReservationAlertModal
        skip={() => hideModal()}
        makeReservation={() => goNextPage()}
      />
    ),
  });

  const pageId = makeQueryString(i);
  const reservationId = makeQueryString(r);
  const customPageId = makeQueryString(cp);
  const thirdPageId = makeQueryString(tp);

  const { selectedTimezone, selectTimezone } = useGuestUserInfo({
    pageId: pageId,
    customPageId: customPageId,
    thirdPartyId: thirdPageId,
  });

  const optionNotAllSelected =
    guestInfo.reservationOptions.length < hostInfo.reservationPageOptionCount;

  const optionCount = change ? 1 : hostInfo.reservationPageOptionCount;

  const onTimezoneSelected = (timezone: Timezone) => {
    localStorage.setItem('createReservationTimezone', JSON.stringify(timezone));
    selectTimezone(timezone);
  };

  const goNextPage = () => {
    const route = {
      pathname: `/reservation/contents`,
      query: { i: pageId, tz: selectedTimezone.timezone },
    };

    if (customPageId) {
      router.push({
        pathname: route.pathname,
        query: { ...route.query, cp: customPageId },
      });

      return;
    }

    if (thirdPageId) {
      router.push({
        pathname: route.pathname,
        query: { ...route.query, tp: thirdPageId },
      });

      return;
    }

    router.push({
      pathname: `/reservation/contents`,
      query: {
        i: pageId,
        tz: selectedTimezone.timezone,
      },
    });
  };

  const goToChangeOrContentPage = async () => {
    const { startDateTime, endDateTime } = guestInfo.reservationOptions[0];

    if (change) {
      router.push({
        pathname: `/reservation/change`,
        query: {
          i: pageId,
          r: reservationId,
          tp: thirdPageId,
          tz: selectedTimezone.timezone,
          change: 'true',
          start: startDateTime,
          end: endDateTime,
        },
      });

      return;
    }

    if (optionNotAllSelected) {
      await showModal();
      hideModal();
      return;
    }

    goNextPage();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.onbeforeunload = () => {
      guestInfo.reservationOptions.forEach((_, idx) => {
        removeFromLocalStorage(`${pageId}${idx}`);
      });
    };
  }, []);

  useEffect(() => {
    track({ key: HACKLE_KEYS.VIEW.RESERVATION });
  }, []);

  useEffect(() => {
    setGuestInfo(defaultGuestInfo);
  }, [pageId, setGuestInfo]);

  useEffect(() => {
    setLocalStorage(
      `${pageId}length`,
      `${guestInfo.reservationOptions.length}`
    );

    guestInfo.reservationOptions.forEach(
      ({ startDateTime, endDateTime }, idx) => {
        setLocalStorage(`${pageId}${idx}`, `${startDateTime},${endDateTime}`);
      }
    );
  }, [guestInfo.reservationOptions, pageId, customPageId]);

  return (
    <>
      <MediaQuery minWidth={1281}>
        <WebGuestReservation
          hostInfo={hostInfo}
          guestInfo={guestInfo}
          pageId={typeof pageId === 'string' ? pageId : ''}
          optionCount={optionCount}
          setGuestInfo={setGuestInfo}
          onTimeSelectionCompleted={goToChangeOrContentPage}
          selectedTimezone={selectedTimezone}
          onTimeZoneSelected={onTimezoneSelected}
        />
      </MediaQuery>

      <MediaQuery maxWidth={1280}>
        <MobileGuestReservation
          hostInfo={hostInfo}
          guestInfo={guestInfo}
          pageId={typeof pageId === 'string' ? pageId : ''}
          optionCount={optionCount}
          setGuestInfo={setGuestInfo}
          onTimeSelectionCompleted={goToChangeOrContentPage}
          selectedTimezone={selectedTimezone}
          onTimeZoneSelected={onTimezoneSelected}
        />
      </MediaQuery>
    </>
  );
};

export default GuestReservation;
