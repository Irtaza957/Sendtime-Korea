import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { request } from '@api/Request';
import useGuestUserInfo from '@hooks/useGuestUserInfo';
import Reselect from '@pages/GuestEmail/Reselect';
import * as Sentry from '@sentry/browser';
import { makeQueryString } from '@utils/etc';

interface GuestReservationReselectPageProps {
  mailInfo: MailInfo;
  pageId: string;
  reservationId: string;
  timezones: Timezone[];
}

const Page = ({
  mailInfo,
  pageId,
  reservationId,
  timezones,
}: GuestReservationReselectPageProps) => {
  const router = useRouter();

  // const token = getLocalStorage(USER_TOKEN);
  // if (typeof window !== 'undefined') {
  //   if (!token) {
  //     window.location.replace(`${ROUTES.USER.SIGN_IN}?next=${router.asPath}`);
  //     return <></>;
  //   }
  // }
  const { cp, tp } = router.query;
  const customPageId = makeQueryString(cp);
  const thirdPageId = makeQueryString(tp);
  const { selectedTimezone, selectTimezone } = useGuestUserInfo({
    pageId: pageId,
    customPageId: customPageId,
    thirdPartyId: thirdPageId,
  });

  return (
    <Reselect
      mailInfo={mailInfo}
      pageId={pageId}
      reservationId={reservationId}
      selectedTimezone={selectedTimezone}
      onTimeZoneSelected={selectTimezone}
      timezones={timezones}
    />
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { i: pageId, r: reservationId } = context.query;
  let mailData;
  let timezones;

  try {
    const { data } = await request.get<GetMailInfoResponse>(
      `${process.env.API_SERVER}/v2/reservation/${pageId}/${reservationId}`
    );

    const response = await request.get<TimezoneResponse>(
      `${process.env.API_SERVER}/timezones`
    );

    mailData = data;
    timezones = response.data.results;
  } catch (e) {
    Sentry.captureException(e);
    return { notFound: true };
  }

  const mailInfo = mailData.results[0];

  if (!mailData)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };

  if (!pageId || !reservationId) {
    return { notFound: true };
  }

  return { props: { mailInfo, pageId, reservationId, timezones } };
};
