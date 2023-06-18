import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'react-i18next';

import AutoHeightImage from '@components/AutoHeightImage';
import { BASE_URL } from '@constants/baseUrl';

import * as Styled from './index.styles';

const PoweredBySpace = () => {
  const { t } = useTranslation('space');
  const router = useRouter();
  const containerRef = React.createRef<HTMLDivElement>();
  const [isSmallWidth, setIsSmallWidth] = React.useState(false);
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setIsSmallWidth((containerRef.current?.clientWidth || 0) < 500);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <>
      <Link
        href={
          router.locale === 'ko'
            ? 'https://www.sendspace.app'
            : 'https://form.typeform.com/to/yiXhleNo'
        }
        passHref
        target="_blank"
      >
        <a target="_blank">
          <Styled.PoweredBySpaceContainer
            ref={containerRef}
            isSmallWidth={isSmallWidth}
          >
            <Styled.Title>
              <Trans
                t={t}
                i18nKey="poweredBySpaceTitle"
                components={{ span: <span /> }}
              />
            </Styled.Title>
            <Styled.Subtitle>{t('poweredBySpaceSubtitle')}</Styled.Subtitle>
            <Styled.LogoContainer>
              <Styled.PoweredByText>published by</Styled.PoweredByText>
              <Styled.LogoImageWrapper>
                <AutoHeightImage
                  src={`${BASE_URL.image}/logos/space_logo.png`}
                  alt="Space logo"
                />
              </Styled.LogoImageWrapper>
            </Styled.LogoContainer>
          </Styled.PoweredBySpaceContainer>
        </a>
      </Link>
    </>
  );
};

export default PoweredBySpace;
