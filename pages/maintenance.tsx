import React from 'react';

import AutoHeightImage from '@components/AutoHeightImage';
import { BASE_URL } from '@constants/baseUrl';
import styled from '@emotion/styled';

export const Page = styled.div`
  padding: 50px;
  alignitems: center;
  background: #f5f5f5;
  @media screen and (max-width: 800px) {
    padding: 0px;
  }
`;

export const Preview = styled.div`
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 708px;
    left: 9736px;
    top: 227px;
    border-radius: 0px;
  }
`;

export const LogoContainer = styled.div`
  width: 200px;
  left: 517px;
  top: 100px;
  align-self: flex-start;
  margin-left: 30px;

  @media screen and (max-width: 800px) {
    left: 68px;
    top: 104px;
    border-radius: 0px;
  }
`;

export const PageContaier = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 30px 10px;
  width: 100%;
  gap: 80px;
  margin: 0 auto;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const ContentTitle = styled.div`
  height: 10%;
  left: 250px;
  top: 892px;
  font-size: 54px;
  font-weight: 600;
  line-height: 51px;
  letter-spacing: 0em;
  text-align: center;
  color: #44494f;

  @media screen and (max-width: 1100px) {
    font-size: 40px;
  }

  @media screen and (max-width: 800px) {
    height: 112px;
    left: 26px;
    top: 484px;
    border-radius: nullpx;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: -15%;
  }
`;
export const Content = styled.div`
  left: 337px;
  top: 965px;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 1.8;

  text-align: center;
  color: #747474;
  margin-bottom: 15px;

  @media screen and (max-width: 1100px) {
    font-size: 18px;
  }
  @media screen and (max-width: 800px) {
    left: 24px;
    top: 560px;
    border-radius: nullpx;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
  }
`;

export const ImageContainer = styled.div`
  justify-content: center;
  align-items: center;
  overflow: hidden;
  object-fit: contain;
  margin-left: 110px;
  margin-bottom: -40px;

  @media screen and (max-width: 1100px) {
    margin-bottom: -40px;
  }

  @media screen and (max-width: 800px) {
    margin-left: 50px;
    margin-bottom: -50px;
  }
`;

export const CustomImage = styled.div`
  text-align: center;
  img {
    width: 70%;
    left: 350px;
    top: 265px;
    height: 587px;
    border-radius: 0px;

    @media screen and (max-width: 1100px) {
      height: 80%;
    }

    @media screen and (max-width: 800px) {
      left: 3px;
      top: 195px;
      border-radius: 0px;
    }
  }
`;

const MaintenancePage = () => {
  // const router = useRouter();
  // if (process.env.ACTIVATE_MAINTENANCE_MODE != "true") {
  //   const userToken = getLocalStorage(USER_TOKEN);
  //   if (userToken) {
  //     router.push(ROUTES.MY_CALENDAR);
  //     return <></>;
  //   } else {
  //     router.push(ROUTES.USER.SIGN_IN);
  //     return <></>;
  //   }
  // }

  return (
    <Page>
      <Preview
        style={{
          width: '100%',
          height: '80%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          background: '#FFFFFF',
          boxShadow: '-1px 4px 9px rgba(0, 0, 0, 0.06)',
        }}
      >
        <PageContaier>
          <LogoContainer>
            <AutoHeightImage
              src={`${BASE_URL.image}/logos/sendtime_logo.png`}
              alt="sendtime-logo"
            />
          </LogoContainer>

          {/* <ImageContainer>
            <CustomImage>
              <img src={maintenanceImg} alt="maintenanceImg" />
            </CustomImage>
          </ImageContainer> */}
          <ContentContainer>
            <ContentTitle>
              대규모 업데이트 안내 <br />
              Major Update
            </ContentTitle>
            <Content>
              안녕하세요. 센드타임입니다.
              <br />
              Hello from Sendtime.
              <br />
              아래와 같이 대규모 서비스 업데이트를 진행합니다.
              <br />
              We&apos;re currently updating the service as follows.
              <br />
              <br />
              2023년 5월 22일 (월) 23:00 ~ (약 30분)
              <br />
              May 22th, 2023 (Mon) 23:00 KST ~ (30 minutes)
              <br />
              <br />
              현재 업데이트 진행중으로 서비스 이용이 불가능한 점 양해
              부탁드립니다.
              <br />
              업데이트 기간 동안 불편을 드려 죄송합니다.
              <br />
              We apologize for any inconvenience during this time.
              <br />
              <br />
              감사합니다.
              <br />
              Thank you for your patience.
            </Content>
          </ContentContainer>
        </PageContaier>
      </Preview>
    </Page>
  );
};

export default MaintenancePage;
