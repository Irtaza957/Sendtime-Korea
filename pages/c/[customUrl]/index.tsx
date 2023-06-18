import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import i18n from 'locales';

import { MetaProps } from '@components/Meta';
import { META_TRANSLATION_ID } from '@constants/seo';
import CustomPage from '@pages/CustomPage';
import * as Sentry from '@sentry/nextjs';

interface CustomPageProps {
  pageInfo: CustomPageInfo;
  customUrl: string;
}

const Page = ({ pageInfo, customUrl }: CustomPageProps) => {
  return (
    <>
      <CustomPage pageInfo={pageInfo} customUrl={customUrl} />;
    </>
  );
};

export default Page;

// TODO: GET API 만들어지면 수정될 내용
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { customUrl } = context.query;

  let pageData;

  try {
    const { data } = await axios.get<CustomPageInfoResponse>(
      `${process.env.API_SERVER}/profilePages/${customUrl}`
    );
    pageData = data;
  } catch (e) {
    Sentry.captureException(e);
    return { notFound: true };
  }

  const pageInfo = pageData.results[0];

  if (!pageInfo)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };

  const meta: MetaProps = {
    useTranslation: false,
    title: `${i18n.t(`meta:${META_TRANSLATION_ID.DEFAULT}.title`, {
      lng: context.locale,
    })} | ${pageInfo.companyName}`,
    description: pageInfo.description,
    image: pageInfo.logoUrl,
    route: `/@${customUrl}`,
  };

  return { props: { pageInfo, customUrl, meta } };
};
