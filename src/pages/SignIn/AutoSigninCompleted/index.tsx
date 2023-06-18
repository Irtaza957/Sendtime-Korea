import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { coreUserState } from '@atoms/index';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import styled from '@emotion/styled';
import {
  CompleteContainer,
  CompletedTitle,
  Container,
  Content,
} from '@pages/GuestReservation/Completed/index.styles';

const AutoSigninCompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const AutoSigninCompleted = () => {
  const router = useRouter();
  const user = useRecoilValue(coreUserState);

  return (
    <AutoSigninCompletedContainer>
      <CompleteContainer>
        <Container>
          <ImageContainer width={150}>
            <AutoHeightImage
              src={`${BASE_URL.image}/icons/new_done.gif`}
              alt="sendtime-logo"
            />
          </ImageContainer>
          <CompletedTitle>{user?.name || '회원'}님 환영합니다!</CompletedTitle>

          <Content>
            지금 바로 그룹 캘린더를 확인해보세요.
            <br />
            {user?.name || '회원'} 님의 캘린더 정보는 모두 가려져서 공유됩니다.
          </Content>

          <StyledButton
            onClickButton={() => router.push(ROUTES.GROUP.MANAGE)}
            padding="15px 30px"
            borderRadius={10}
          >
            그룹 캘린더로 이동
          </StyledButton>
        </Container>
      </CompleteContainer>
      <ImageContainer width={140}>
        <AutoHeightImage
          src={`${BASE_URL.image}/logos/gray-logo.png`}
          alt="sendtime-logo"
        />
      </ImageContainer>
    </AutoSigninCompletedContainer>
  );
};

export default AutoSigninCompleted;
