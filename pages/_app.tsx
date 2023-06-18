import React, { useEffect, useState } from 'react';
import type { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import cookies from 'next-cookies';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  setToken,
} from 'helper/TokenManager';
import { CookiesProvider } from 'react-cookie';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from 'react-query';
import { RecoilRoot } from 'recoil';

import Meta, { MetaPlainProps, MetaProps } from '@components/Meta';
import { BASE_URL } from '@constants/baseUrl';
import { META_TRANSLATION_ID } from '@constants/seo';
import GuestReservationProvider from '@contexts/GuestReservationProvider';
import ModalProvider from '@contexts/ModalProvider';
import NestedModalProvider from '@contexts/NestedModalProvider';
import SidebarProvider from '@contexts/SidebarProvider';
import SnackbarProvider from '@contexts/SnackbarProvider';
import { Global } from '@emotion/react';
import { createInstance, HackleProvider } from '@hackler/react-sdk';
import useLoading from '@hooks/useLoading';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { updateRouteForLanguage } from '@utils/language';

import * as gtag from '../src/lib/gtag';
import {
  animations,
  colors,
  etc,
  font,
  globalStyle,
  overrides,
  transitions,
} from '../styles/global.styles';

import Custom404 from './404';
import MaintenancePage from './maintenance';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import '../src/locales';
import '@fullcalendar/react';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

type T = any;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      // useErrorBoundary: true,
    },
    mutations: {
      // useErrorBoundary: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error({ error });
    },
  }),
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { loadingView } = useLoading();
  const [loading, setLoading] = useState(false);
  const publicKey =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_HACKLE_KEY
      : process.env.NEXT_PUBLIC_DEV_HACKLE_KEY;
  const hackleClient = createInstance(publicKey || '', {
    debug: false,
    auto_track_page_view: true,
  });
  const { reset } = useQueryErrorResetBoundary();
  const { t } = useTranslation('meta');

  useEffect(() => {
    updateRouteForLanguage(router);
  }, []);

  useEffect(() => {
    if (document) {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        autoSessionTracking: true,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
      });
    }
  }, []);

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url: string) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (typeof Node === 'function' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child: T): T {
      if (child.parentNode !== this) {
        if (console) {
          console.error(
            'Cannot remove a child from a different parent',
            child,
            this
          );
        }
        return child;
      }

      // eslint-disable-next-line prefer-rest-params
      return originalRemoveChild.apply(this, arguments as any);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (console) {
          console.error(
            'Cannot insert before a reference node from a different parent',
            referenceNode,
            this
          );
        }
        return newNode;
      }
      // eslint-disable-next-line prefer-rest-params
      return originalInsertBefore.apply(this, arguments as any);
    };
  }

  if (process.env.ACTIVATE_MAINTENANCE_MODE == 'true') {
    return <MaintenancePage />;
  }

  const { meta }: { meta?: MetaProps } = pageProps ?? {};

  const defaultMeta: MetaPlainProps = {
    title: t(`${META_TRANSLATION_ID.DEFAULT}.title`, { lng: router.locale }),
    description: t(`${META_TRANSLATION_ID.DEFAULT}.description`, {
      lng: router.locale,
    }),
    route: '',
    image: `${BASE_URL.image}/banners/og_banner.png`,
    faviconHref: '/favicon.ico',
  };

  const metaData: MetaPlainProps = {
    title: meta?.useTranslation
      ? t(`${meta.translationId}.title`, {
          defaultValue: defaultMeta.title,
          lng: router.locale,
        })
      : meta?.title || defaultMeta.title,
    description: meta?.useTranslation
      ? t(`${meta.translationId}.description`, {
          defaultValue: defaultMeta.description,
          lng: router.locale,
        })
      : meta?.description || defaultMeta.description,
    route: BASE_URL.sendtime + (meta?.route || defaultMeta.route),
    image: meta?.image || defaultMeta.image,
    faviconHref: meta?.faviconHref || defaultMeta.faviconHref,
  };

  return (
    <>
      <Meta {...metaData} />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>

      <RecoilRoot>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary onReset={reset} fallbackRender={() => <Custom404 />}>
              <SnackbarProvider>
                <GuestReservationProvider>
                  {/** TODO: Guest Reservation Provider가 해당 내용만 감싸도록 변경해야 함 */}
                  <ModalProvider>
                    <NestedModalProvider>
                      <SidebarProvider>
                        <Global
                          styles={[
                            globalStyle,
                            font,
                            overrides,
                            animations,
                            colors,
                            transitions,
                            etc,
                          ]}
                        />
                        {loading && loadingView()}
                        {hackleClient ? (
                          <HackleProvider hackleClient={hackleClient}>
                            <Component {...pageProps} />
                          </HackleProvider>
                        ) : (
                          <Component {...pageProps} />
                        )}
                      </SidebarProvider>
                    </NestedModalProvider>
                  </ModalProvider>
                </GuestReservationProvider>
              </SnackbarProvider>
            </ErrorBoundary>
          </QueryClientProvider>
        </CookiesProvider>
      </RecoilRoot>
    </>
  );
}

export default App;

App.getInitialProps = async (appContext: AppContext) => {
  let appProps = {};
  if (appContext.Component.getInitialProps) {
    appProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  const { ctx } = appContext;
  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies[ACCESS_TOKEN_COOKIE_KEY];

  if (accessTokenByCookie !== undefined) {
    const refreshTokenByCookie = allCookies[REFRESH_TOKEN_COOKIE_KEY] || '';
    setToken(accessTokenByCookie, refreshTokenByCookie);
  }

  return { ...appProps };
};
