import React, { useState } from 'react';

import { ImageContainer } from '@components/AutoHeightImage';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';

const LoadingViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gray-800-70);
  z-index: var(--very-very-front);
  overflow: hidden;
  position: fixed;
`;

const Message = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: var(--semi-bold);
  color: var(--mobile-active);
  padding: 10px 0;
  position: absolute;
  top: 34%;
`;

// const Lottie = styled.div`
//   margin-top: 15px;
// `;

export const ICONTYPE = {
  DEFAULT: 'default',
  CALENDAR: 'calendar',
};

const useLoading = (loadingInfo?: React.ReactNode, iconType = 'calendar') => {
  const [isViewLoading, setIsViewLoading] = useState(true);
  // const lottieRef = useRef<HTMLDivElement | null>(null);

  // const icon = useCallback(() => {
  //   switch (iconType) {
  //     case 'calendar':
  //       return calendarLoading;
  //     case 'default':
  //     default:
  //       return loading;
  //   }
  // }, [iconType]);

  // useEffect(() => {
  //   if (!lottieRef.current) return;

  //   lottie.loadAnimation({
  //     container: lottieRef.current,
  //     loop: true,
  //     animationData: icon(),
  //     renderer: 'svg',
  //     autoplay: true,
  //     path:
  //       iconType === 'calendar'
  //         ? '../Icon/lottie/calendar_loading.json'
  //         : '../Icon/lottie/loading.json',
  //   });
  // }, []);

  const loadingView = () => {
    return (
      <LoadingViewContainer>
        {loadingInfo && <Message>{loadingInfo}</Message>}
        <ImageContainer width={200}>
          {/* <Lottie ref={lottieRef} /> */}
          <Icon icon="line-md:loading-loop" width="50" color="#fff" />
        </ImageContainer>
      </LoadingViewContainer>
    );
  };

  return { isViewLoading, setIsViewLoading, loadingView };
};

export default useLoading;
