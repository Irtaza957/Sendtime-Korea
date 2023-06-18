import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import AutoHeightImage from '@components/AutoHeightImage';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import lottie404 from '@Icon/lottie/404.json';
import { Player } from '@lottiefiles/react-lottie-player';

import { InfoContent, Page } from './unavailable';

const Custom404 = () => {
  const router = useRouter();
  const { t } = useTranslation('commonRequests');
  const goHome = () => router.push(ROUTES.MY_CALENDAR);

  return (
    <div style={{ padding: '20px' }}>
      <button type="button" onClick={goHome}>
        <div style={{ width: '180px' }}>
          <AutoHeightImage
            src={`${BASE_URL.image}/logos/sendtime_logo.png`}
            alt="sendtime-logo"
          />
        </div>
      </button>

      <Page>
        <Player
          style={{ width: '300px', height: '300px' }}
          src={lottie404}
          autoplay
          loop
        />

        <InfoContent>{t('404.title')}</InfoContent>

        <Link href={ROUTES.MY_CALENDAR} passHref>
          <div
            style={{
              padding: '15px 55px',
              background: 'var(--purple-500)',
              borderRadius: '10px',
              color: 'var(--white)',
              cursor: 'pointer',
            }}
          >
            {t('404.btn')}
          </div>
        </Link>
      </Page>
    </div>
  );
};

export default Custom404;
