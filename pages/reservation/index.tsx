import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { request } from '@api/Request';
import { MetaProps } from '@components/Meta';
import GuestReservation from '@pages/GuestReservation';
import * as Sentry from '@sentry/browser';
import { makeQueryString } from '@utils/etc';

interface GuestReservationPageProps {
  hostInfo: HostInfoType;
  calendarInfo: HostCalendarInfoType;
}

const Page = ({ hostInfo }: GuestReservationPageProps) => {
  const router = useRouter();
  const change = makeQueryString(router.query.change);

  return <GuestReservation hostInfo={hostInfo} change={change} />;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isLoggedIn = !!context.req.cookies.accessToken;
  const { i, r: reservationId, cp, tp } = context.query;
  const pageId = typeof i === 'string' ? i.split('?')[0] : '';
  const customPageId = typeof cp === 'string' ? cp.split('?')[0] : '';
  const thirdPageId = typeof tp === 'string' ? tp.split('?')[0] : '';

  let hostData, customData;

  if (thirdPageId) {
    try {
      const { data } = await request.get<ThirdPartyReservationResponse>(
        `/v2/reservation/page/third/guest/${pageId}?thirdId=${thirdPageId}`
      );

      hostData = data.results[0];
    } catch (e) {
      Sentry.captureException(e);
      return { notFound: true };
    }
  }

  if (!thirdPageId) {
    try {
      let response;
      if (customPageId) {
        response = await request.get<GuestReservationInfoResponse>(
          `/v2/reservation/page/custom/guest/${pageId}/${customPageId}`
        );
      } else {
        response = await request.get<GuestReservationInfoResponse>(
          `/v2/reservation/page/guest/${pageId}`
        );
      }
      hostData = response.data.results[0];
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

      if (error.code === 4405) {
        return {
          redirect: {
            destination: '/unavailable',
            permanent: false,
          },
        };
      }

      return { notFound: true };
    }

    if (reservationId) {
      try {
        const { data } = await request.get<CustomReservationResponse>(
          `${process.env.API_SERVER}/v2/reservation/${pageId}/${reservationId}`
        );
        customData = data.results[0];

        hostData.timeUnit = customData.timeUnit;
        hostData.startDate = customData.startDate;
        hostData.endDate = customData.endDate;
        hostData.reservationPageDescription =
          customData.reservationPageDescription;
        hostData.reservationPageName = customData.reservationPageName;
        hostData.location = customData.reservationLocations.map((l) => ({
          ...l,
          checked: true,
        }));
      } catch (e) {
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

        if (error.code === 4405) {
          return {
            redirect: {
              destination: '/unavailable',
              permanent: false,
            },
          };
        }

        return { notFound: true };
      }
    }
  }

  const hostInfo = hostData;

  if (!hostData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const meta: MetaProps = {
    useTranslation: false,
    title: hostInfo?.reservationPageName,
    description: hostInfo?.reservationPageDescription,
    route: context.req.url,
  };

  return {
    props: { hostInfo, isLoggedIn, meta },
  };
};
