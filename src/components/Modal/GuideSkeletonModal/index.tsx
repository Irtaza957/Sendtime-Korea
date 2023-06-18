import React, { ReactNode, useRef } from 'react';
import { useRouter } from 'next/router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import StyledButton from '@components/Button';
import ButtonUnderline from '@components/ButtonUnderline';
import CarouselNav from '@components/Carousel/CarouselNav';
import { ROUTES } from '@constants/routes';
import { DO_NOT_SHOW_AGAIN } from '@constants/storage';
import usePagination from '@hooks/usePagination';
import { setLocalStorage } from '@utils/storage';

import { BlockBox, FlexBox } from '../../../../styles/container/index.styles';

import {
  GuideSkeletonModalContainer,
  GuideTransitionDiv,
} from './index.styles';

interface GuideSkeletonModalProps {
  data: { content: ReactNode; handleNext?: () => void; customNext?: string }[];
  hide: () => void;
}
const GuideSkeletonModal = ({ data, hide }: GuideSkeletonModalProps) => {
  const { page, goPage, goNextPage } = usePagination(data.length);
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleNotShow = () => {
    setLocalStorage(DO_NOT_SHOW_AGAIN, 'true');
    hide();

    router.push(ROUTES.GROUP.MANAGE);
  };

  return (
    <GuideSkeletonModalContainer>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={page}
          timeout={300}
          nodeRef={transitionRef}
          addEndListener={(
            done: (this: HTMLDivElement, ev: TransitionEvent) => any
          ) => {
            if (!transitionRef.current) return;
            transitionRef.current.addEventListener(
              'transitionend',
              done,
              false
            );
          }}
          classNames="fade"
        >
          <GuideTransitionDiv ref={transitionRef}>
            {data[page - 1].content}
          </GuideTransitionDiv>
        </CSSTransition>
      </SwitchTransition>
      <BlockBox gap={20}>
        <CarouselNav
          count={data.length}
          handleNav={goPage}
          activeIndex={page - 1}
        />
        <FlexBox justifyContent="space-between">
          <ButtonUnderline onClick={handleNotShow}>
            다시 보지않기
          </ButtonUnderline>
          <StyledButton
            padding="12px 50px"
            onClickButton={() => {
              if (data[page - 1].handleNext) {
                data[page - 1].handleNext?.();
                return;
              }
              goNextPage();
            }}
            align="end"
          >
            {data[page - 1].customNext ? data[page - 1].customNext : '다음'}
          </StyledButton>
        </FlexBox>
      </BlockBox>
    </GuideSkeletonModalContainer>
  );
};

export default GuideSkeletonModal;
