import React from 'react';
import { GetServerSideProps } from 'next';
import { ToastContainer } from 'react-toastify';

import { SpaceAPI, SpaceData } from '@api/space/SpaceApi';
import { timeZoneAPI } from '@api/user/UserInfo';
import WithAuth from '@components/AuthRedirect';
import { MetaProps } from '@components/Meta';
import SpacePage from '@pages/Space';
import * as Sentry from '@sentry/nextjs';
import { getLocalizedText } from '@utils/spaceUtils';

import 'react-toastify/dist/ReactToastify.css';

interface SpacePageProps {
  spaceInfo: SpaceData;
  timezones: Timezone[];
}

const Page = ({ spaceInfo, timezones }: SpacePageProps) => {
  return (
    <>
      <SpacePage spaceInfo={spaceInfo} timezones={timezones} />;
      <ToastContainer
        position="bottom-left"
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        limit={1}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default WithAuth(Page);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { handle } = context.query;
  const { locale } = context;

  let spaceData;
  try {
    const { data } = await SpaceAPI.getSpace(handle as string);
    spaceData = data;
  } catch (e) {
    Sentry.captureException(e);
    return { notFound: true };
  }
  const spaceInfo: SpaceData = spaceData.results[0];

  const timezonesResponse = await timeZoneAPI.getTimezones();
  const timezones = timezonesResponse.data.results;

  if (!spaceInfo || !timezones) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const meta: MetaProps = {
    useTranslation: false,
    route: `/space/@${handle}`,
    faviconHref: '/favicon_space.ico',
  };

  const translatedTitle =
    getLocalizedText(spaceInfo.localizedTitles || [], locale || 'en', '') ||
    spaceInfo.title;
  meta.title = `Space | ${translatedTitle}`;

  if (spaceInfo.description) {
    const translatedDescription =
      getLocalizedText(
        spaceInfo.localizedDescriptions || [],
        locale || 'en',
        ''
      ) || spaceInfo.description;
    meta.description = translatedDescription;
  }

  if (spaceInfo.imageUrl) meta.image = spaceInfo.imageUrl;

  return {
    props: {
      spaceInfo,
      timezones,
      meta,
    },
  };
};
