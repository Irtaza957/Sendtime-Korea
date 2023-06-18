import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import Cancel from '@pages/GuestEmail/Cancel';
import * as Sentry from '@sentry/browser';

interface GuestReservationCancelPageProps {
  hostInfo: HostInfoType;
  pageId: string;
  reservationId: string;
  timezone: string;
}

const Page = ({
  hostInfo,
  pageId,
  reservationId,
  timezone,
}: GuestReservationCancelPageProps) => {
  // const router = useRouter();

  // const token = getLocalStorage(USER_TOKEN);
  // if (typeof window !== 'undefined') {
  //   if (!token) {
  //     window.location.replace(`${ROUTES.USER.SIGN_IN}?next=${router.asPath}`);
  //     return <></>;
  //   }
  // }

  return (
    <Cancel
      pageId={pageId}
      reservationId={reservationId}
      hostInfo={hostInfo}
      timezone={timezone}
    />
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { i: pageId, r: reservationId, tz } = context.query;
  let hostData, customData;
  const timezone = typeof tz === 'string' ? tz : '';
  try {
    const { data } = await axios.get<GuestReservationInfoResponse>(
      `${process.env.API_SERVER}/v2/reservation/page/${pageId}`
    );
    hostData = data.results[0];
  } catch (e) {
    Sentry.captureException(e);
    return { notFound: true };
  }

  try {
    const { data } = await axios.get<CustomReservationResponse>(
      `${process.env.API_SERVER}/v2/reservation/${pageId}/${reservationId}`
    );
    customData = data.results[0];

    hostData.confirmDetail = customData.confirmDetail;
    hostData.timeUnit = customData.timeUnit;
    hostData.startDate = customData.startDate;
    hostData.endDate = customData.endDate;
    hostData.reservationPageDescription = customData.reservationPageDescription;
    hostData.reservationPageName = customData.reservationPageName;
    hostData.location = customData.reservationLocations.map((l) => ({
      ...l,
      checked: true,
    }));
  } catch (e) {
    Sentry.captureException(e);
    return { notFound: true };
  }

  const hostInfo = hostData;

  if (!hostData)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };

  if (!pageId || !reservationId) {
    return { notFound: true };
  }

  return { props: { hostInfo, pageId, reservationId, timezone } };
};
