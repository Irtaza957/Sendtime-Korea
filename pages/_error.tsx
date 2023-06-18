import React from 'react';
import { NextPage, NextPageContext } from 'next';
import NextErrorComponent from 'next/error';

import * as Sentry from '@sentry/nextjs';

export const httpStatusCode = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  movedPermanently: 301,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  requestTimeout: 408,
  unprocessableEntity: 422,
  internalServerError: 500,
  serviceUnavailable: 503,
} as const;

export type HttpStatusCode = typeof httpStatusCode[keyof typeof httpStatusCode];

type Props = {
  statusCode: HttpStatusCode;
  err?: Error;
  hasGetInitialPropsRun?: boolean;
};

const CustomErrorPage: NextPage<Props> = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

const defaultTimeout = 2000;

CustomErrorPage.getInitialProps = async (
  context: NextPageContext
): Promise<Props> => {
  const errorInitialProps = (await NextErrorComponent.getInitialProps(
    context
  )) as Props;

  const { res, err, asPath } = context;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === httpStatusCode.notFound) {
    return errorInitialProps;
  }

  if (err) {
    Sentry.captureException(err);

    await Sentry.flush(defaultTimeout);

    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.tsx getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(defaultTimeout);

  return errorInitialProps;
};

export default CustomErrorPage;
