import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import ReservationNavigationBar from '@components/ReservationNavigationBar';
import {
  RESERVATION_PAGE_COUNT,
  useReservation,
} from '@contexts/ReservationProvider';

import {
  Box,
  PreviewAlert,
  PreviewContainer,
  PreviewContent,
  PreviewPageContainer,
  PreviewTitle,
  RightLine,
} from '../index.styles';

interface PageContainerProps {
  edit?: boolean;
  editableContents?: ReactNode;
  previewContents?: ReactNode;
  createReservation: () => void;
}

const PageContainer = ({
  edit,
  editableContents,
  previewContents,
  createReservation,
}: PageContainerProps) => {
  const { t } = useTranslation('createBookingPage');
  const { isValidated, page, goNextPage, goPrevPage } = useReservation();
  return (
    <PreviewContainer isFourthPage={page === 4}>
      <Box>
        <ReservationNavigationBar
          currentStep={page}
          maxStep={RESERVATION_PAGE_COUNT}
          onClickNext={
            page !== RESERVATION_PAGE_COUNT ? goNextPage : createReservation
          }
          onClickBack={goPrevPage}
          isNextButtonDisabled={
            !(
              isValidated.firstPage.title &&
              isValidated.firstPage.term &&
              isValidated.firstPage.isDurationSelected
            )
          }
          edit={edit}
          isLast={page === RESERVATION_PAGE_COUNT}
        />

        {editableContents}
      </Box>

      <MediaQuery minWidth={769}>
        <RightLine />

        <PreviewContent>
          {page == 1 || page == 2 || page == 3 ? (
            <>
              <PreviewTitle>{t('preview.title')}</PreviewTitle>
              {previewContents}
            </>
          ) : page == 4 ? (
            <>
              <PreviewTitle>{t('formPreview.title')}</PreviewTitle>
              {previewContents}
            </>
          ) : (
            <PreviewPageContainer isFourthPage>
              <PreviewAlert>{t('customBlockingTimes.guide')}</PreviewAlert>
              {previewContents}
            </PreviewPageContainer>
          )}
        </PreviewContent>
      </MediaQuery>
    </PreviewContainer>
  );
};

export default PageContainer;
