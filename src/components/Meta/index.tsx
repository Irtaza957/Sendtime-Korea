import React from 'react';
import Head from 'next/head';

import { BASE_URL } from '@constants/baseUrl';

export interface MetaPlainProps {
  title?: string;
  description?: string;
  route?: string;
  image?: string;
  faviconHref?: string;
}

export interface MetaTranslatedProps {
  translationId: string;
  route?: string;
  image?: string;
  faviconHref?: string;
}

export type MetaProps =
  | ({
      useTranslation: true;
    } & MetaTranslatedProps)
  | ({
      useTranslation: false;
    } & MetaPlainProps);

const Meta = ({
  title,
  description,
  route: url,
  image,
  faviconHref,
}: MetaPlainProps) => {
  return (
    <Head>
      <link rel="icon" href={faviconHref || '/favicon.ico'} />
      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:site_name" content={title} key="og-site" />
      <meta name="description" content={description} key="main-description" />
      <meta
        property="og:description"
        content={description}
        key="og-description"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} key="og-url" />
      <meta
        property="og:image"
        content={image || `${BASE_URL.image}/banners/og_banner.png`}
        key="og-image"
      />
      <meta property="og:locale" content="en-US" />
      <meta property="og:locale:alternate" content="ko-KR" />

      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
      />
      <meta
        name="naver-site-verification"
        content="e30e8d7d67a71622f5b92e917f6cb0e170211fe1"
      />
      <meta name="robots" content="noindex" />

      <title key="main-title">{title}</title>
    </Head>
  );
};

export default Meta;
