import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import Change from '@pages/GuestEmail/Change';
import * as Sentry from '@sentry/browser';

interface GuestReservationChangePageProps {
  hostInfo: HostInfoType;
  pageId: string;
  reservationId: string;
  timezones: Timezone[];
}

const Page = ({
  hostInfo,
  pageId,
  reservationId,
  timezones,
}: GuestReservationChangePageProps) => {
  // const router = useRouter();

  // TODO: Authentication -> Signin으로 가게하기
  // const token = getLocalStorage(USER_TOKEN);
  // if (typeof window !== 'undefined') {
  //   if (!token) {
  //     window.location.replace(`${ROUTES.USER.SIGN_IN}?next=${router.asPath}`);
  //     return <></>;
  //   }
  // }

  return (
    <Change
      hostInfo={hostInfo}
      pageId={pageId}
      reservationId={reservationId}
      timezones={timezones}
    />
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { i: pageId, r: reservationId } = context.query;
  let hostData;
  let customData;
  let timezones;

  try {
    const { data } = await axios.get<GuestReservationInfoResponse>(
      `${process.env.API_SERVER}/v2/reservation/page/${pageId}`
    );
    hostData = data.results[0];
  } catch (e: unknown) {
    Sentry.captureException(e);
    const error = e as RequestError;

    if (error.code === 4406) {
      return {
        redirect: {
          destination: '/deleted',
          permanent: false,
        },
      };
    }
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
  } catch (e: unknown) {
    Sentry.captureException(e);
    const error = e as RequestError;

    if (error.code === 4406) {
      return {
        redirect: {
          destination: '/deleted',
          permanent: false,
        },
      };
    }

    return { notFound: true };
  }

  const hostInfo = hostData;

  try {
    const response = await axios.get<TimezoneResponse>(
      `${process.env.API_SERVER}/timezones`
    );
    timezones = response.data.results;
  } catch (error) {
    Sentry.captureException(error);
  }

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

  return { props: { hostInfo, pageId, reservationId, timezones } };
};
