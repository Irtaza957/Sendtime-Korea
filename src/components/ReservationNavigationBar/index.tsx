import React from 'react';
import { useTranslation } from 'react-i18next';

import MultiStepProgressBar from '@components/MultiStepProgressBar';
import { LeftArrow, RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import StyledButton from '../Button';

import { ButtonWrapper, ReservationNavigation } from './index.styles';

interface ReservationNavigationBarProps {
  currentStep: number;
  maxStep: number;
  onClickNext: () => void;
  onClickBack: () => void;
  isLast?: boolean;
  isNextButtonDisabled?: boolean;
  edit?: boolean;
}

const ReservationNavigationBar = ({
  currentStep,
  maxStep,
  onClickBack,
  onClickNext,
  isLast,
  isNextButtonDisabled,
  edit,
}: ReservationNavigationBarProps) => {
  const { t } = useTranslation('common');
  return (
    <ReservationNavigation>
      <ButtonWrapper>
        <StyledButton
          width="100%"
          onClickButton={onClickBack}
          bgColor="white"
          color="purple-500"
          borderColor="purple-500"
          borderRadius={50}
          withBorder
        >
          <CustomIcon
            size={8}
            height={17}
            fill="none"
            stroke="purple-500"
            viewBox="0 0 8 14"
          >
            <LeftArrow />
          </CustomIcon>
          {t('prev')}
        </StyledButton>
      </ButtonWrapper>
      {maxStep > 1 && (
        <MultiStepProgressBar
          currentProgress={currentStep}
          maxProgress={maxStep}
        />
      )}
      <ButtonWrapper>
        <StyledButton
          width="100%"
          bgColor="purple-500"
          color="white"
          borderColor="purple-500"
          borderRadius={50}
          withBorder
          onClickButton={onClickNext}
          disabled={isNextButtonDisabled}
        >
          {isLast && edit ? t('edit') : isLast ? t('create') : t('next')}
          <CustomIcon
            size={8}
            height={17}
            fill="none"
            stroke="white"
            viewBox="0 0 8 14"
          >
            <RightArrow />
          </CustomIcon>
        </StyledButton>
      </ButtonWrapper>
    </ReservationNavigation>
  );
};

export default ReservationNavigationBar;
