import React from 'react';

import StyledButton from '@components/Button';
import HackleTrack from '@components/HackleTrack';
import NewTabLink from '@components/NewTabLink';
import { HACKLE_KEYS } from '@constants/hackle';
import { CircleRightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { MainBanner } from './index.styles';

const GuestBanner = () => {
  return (
    <NewTabLink href={`https://sendtime.app/beta`}>
      <HackleTrack
        hackleEvent={{ key: HACKLE_KEYS.CLICK.RESERVATION.TOP_BANNER }}
      >
        <MainBanner>
          🎉 지금 바로 센드타임 회원가입하고 예약자 특별 혜택을 놓치지 마세요!
          🎁
          <StyledButton
            bgColor="white"
            borderRadius={12}
            padding="5px 10px"
            color="blue-500-light"
          >
            센드타임 가입하기
            <CustomIcon size={14} fill="blue-500-light" stroke="none">
              <CircleRightArrow />
            </CustomIcon>
          </StyledButton>
        </MainBanner>
      </HackleTrack>
    </NewTabLink>
  );
};

export default GuestBanner;
