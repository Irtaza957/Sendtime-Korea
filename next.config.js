const { withSentryConfig } = require('@sentry/nextjs');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
// /** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
]);

const nextConfig = {
  images: {
    loader: 'imgix',
    path: '',
    disableStaticImages: true,
    domains: ['storage.sendtime.app'],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  env: {
    ACTIVATE_MAINTENANCE_MODE: process.env.NEXT_ACTIVATE_MAINTENANCE_MODE,
    API_SERVER: process.env.NEXT_PUBLIC_API_SERVER,
    GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  compiler: {
    removeConsole: true,
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
      test: /\.(woff2|woff|ttf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext]',
      },
    });

    return {
      ...config,
      devtool:
        process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
    };
  },
  reactStrictMode: true,
  target: 'serverless',
  async redirects() {
    return [
      // {
      //   source: '/space',
      //   destination: process.env.NEXT_PUBLIC_SPACE_LANGIND_URL,
      //   permanent: true,
      // },
      {
        source: '/space/:spaceHandle([^@]+)',
        destination: '/space/@:spaceHandle',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination:
          'https://splendid-mail-46d.notion.site/Splab-Inc-Privacy-Policy-754831ba414a44f8a6ab5d99bcc41e85',
        permanent: false,
      },
      {
        source: '/terms-of-use',
        destination:
          'https://splendid-mail-46d.notion.site/Splab-Inc-Terms-of-Use-512b4f45f0ea4153b1f6533980c7e320',
        permanent: false,
      },
      {
        source: '/guide',
        destination:
          'https://splendid-mail-46d.notion.site/splendid-mail-46d/b81249fddffb450e9b594072525e37f1',
        permanent: false,
      },
      {
        source: '/guide/integrations',
        destination:
          'https://splendid-mail-46d.notion.site/Integrations-0f3562e4825f4d438a003fad1b63a301',
        permanent: false,
      },
      {
        source: '/support',
        destination: 'https://sendtime.channel.io/',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/@:customUrl',
        destination: '/c/:customUrl',
      },
      {
        source: '/space/@:spaceHandle',
        destination: '/space/:spaceHandle',
      },
      {
        source: '/space/@:spaceHandle/print',
        destination: '/space/:spaceHandle/print',
      },
    ];
  },
  i18n: {
    locales: [
      'default',
      'en-US',
      'ko-KR',
      'vi-VN',
      'zh-TW',
      'en',
      'ko',
      'vi',
      'zh',
    ],
    defaultLocale: 'default',
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  ignore: ['node_modules', 'next.config.js'],
  dryRun: process.env.VERCEL_ENV !== 'production',
};

module.exports = withPlugins(
  [withImages, withTM, [withSentryConfig, sentryWebpackPluginOptions]],
  nextConfig
);
