import React from 'react';
import Link from 'next/link';
import MediaQuery from 'react-responsive';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { BASE_URL } from '@constants/baseUrl';

import {
  CompleteContainer,
  CompleteContent,
  CompleteTitle,
  Container,
  LogoContainer,
} from './index.styles';

const BrandazineMinorCompletePage = () => {
  return (
    <>
      <CompleteContainer>
        <Container>
          <ImageContainer width={150}>
            <AutoHeightImage
              src={`${BASE_URL.image}/icons/new_done.gif`}
              alt="sendtime-logo"
            />
          </ImageContainer>
          <CompleteTitle>문의가 접수되었습니다.</CompleteTitle>
          <CompleteContent>
            영업일 기준 1-2일 안으로 <br />
            담당자가 연락드리겠습니다.
          </CompleteContent>
          <Link href="https://sendtime.app" passHref>
            <StyledButton>홈으로 이동</StyledButton>
          </Link>
        </Container>
        <MediaQuery maxWidth={768}>
          <LogoContainer>
            <ImageContainer width={280}>
              <AutoHeightImage
                src={`${BASE_URL.image}/banners/powered_by_korean.png`}
                alt="powered_by_sendtime"
              />
            </ImageContainer>
          </LogoContainer>
        </MediaQuery>
      </CompleteContainer>
      <MediaQuery minWidth={769}>
        <LogoContainer>
          <ImageContainer width={280}>
            <AutoHeightImage
              src={`${BASE_URL.image}/banners/powered_by_korean.png`}
              alt="powered_by_sendtime"
            />
          </ImageContainer>
        </LogoContainer>
      </MediaQuery>
    </>
  );
};

export default BrandazineMinorCompletePage;
