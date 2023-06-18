import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const addGoogleAnalyticsScript = (id: string) => {
    return {
      __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname,
          })
        `,
    };
  };

  const addHotjarScript = () => {
    return {
      __html: `
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3225658,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
    };
  };

  return (
    <Html>
      <Head>
        <script
          dangerouslySetInnerHTML={addGoogleAnalyticsScript(
            process.env.NEXT_PUBLIC_GA_ID || ''
          )}
        />
        <script
          dangerouslySetInnerHTML={addGoogleAnalyticsScript(
            process.env.NEXT_PUBLIC_GA_EVENT_ID || ''
          )}
        />
        <script dangerouslySetInnerHTML={addHotjarScript()} />
      </Head>

      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
