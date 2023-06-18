import React from 'react';
import { GetServerSideProps } from 'next';
import i18n from 'locales';

import { SpaceAPI, SpaceData } from '@api/space/SpaceApi';
import { MetaProps } from '@components/Meta';
import { META_TRANSLATION_ID } from '@constants/seo';
import SpacePageForPrint from '@pages/Space/ForPrint';
import * as Sentry from '@sentry/nextjs';

interface SpacePageProps {
  spaceInfo: SpaceData;
}

const Page = ({ spaceInfo }: SpacePageProps) => {
  return <SpacePageForPrint spaceInfo={spaceInfo} />;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { handle } = context.query;

  let spaceData;
  try {
    const { data } = await SpaceAPI.getSpace(handle as string);
    spaceData = data;
  } catch (e) {
    Sentry.captureException(e);
    return { notFound: true };
  }
  const spaceInfo: SpaceData = spaceData.results[0];

  if (!spaceInfo) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const meta: MetaProps = {
    useTranslation: false,
    title: `${i18n.t(`meta:${META_TRANSLATION_ID.DEFAULT}.title`, {
      lng: context.locale,
    })} | ${spaceInfo.title}`,
    route: `/space/@${handle}`,
  };
  if (spaceInfo.description) meta.description = spaceInfo.description;
  if (spaceInfo.imageUrl) meta.image = spaceInfo.imageUrl;

  return {
    props: {
      spaceInfo,
      meta,
    },
  };
};
