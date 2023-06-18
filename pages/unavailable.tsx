import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import lottie from 'lottie-web-light';
import { useTranslation } from 'react-i18next';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import styled from '@emotion/styled';
import lottie404 from '@Icon/lottie/404.json';

export const Page = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 30px;
  min-height: calc(100vh - 75px);
  height: calc(100vh - 75px);
  max-width: 700px;
  margin: 0 auto;
`;

const InfoTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const InfoContent = styled.div`
  line-height: 1.5em;
  font-size: 18px;
  color: var(--gray-700);
  font-weight: var(--normal);
  text-align: center;
`;

const Unavailable = () => {
  const router = useRouter();
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation('commonRequests');

  const goHome = () => router.push(ROUTES.MY_CALENDAR);

  useEffect(() => {
    if (!lottieRef.current) return;

    lottie.loadAnimation({
      container: lottieRef.current,
      loop: true,
      animationData: lottie404,
      renderer: 'svg',
      autoplay: true,
    });
  }, []);

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
        <ImageContainer>
          <AutoHeightImage
            src={`${BASE_URL.image}/banners/unavailable-splab.png`}
            alt="unavailable-splab-logo"
          />
        </ImageContainer>

        <div>
          <InfoTitle>{t('deactivatedPage.title')}</InfoTitle>
          <InfoContent>{t('deactivatedPage.subtitle')}</InfoContent>
        </div>

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
            {t('deactivatedPage.btn')}
          </div>
        </Link>
      </Page>
    </div>
  );
};

export default Unavailable;
