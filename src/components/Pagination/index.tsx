import React, { MouseEvent } from 'react';

import { LeftArrow, RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { ArrowButton, Page, PaginationContainer } from './index.styles';

interface PaginationProps {
  lastPage: number;
  currentPage: number;
  onPageClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
}

const Pagination = ({
  lastPage,
  currentPage,
  onNextClick,
  onPrevClick,
  onPageClick,
}: PaginationProps) => {
  const pageArrays = [...Array(lastPage).keys()].map((key) => key + 1);

  const fivePage = () => {
    if (lastPage <= 5) {
      return pageArrays;
    }

    if (currentPage === 1 || currentPage === 2) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage === lastPage || currentPage === lastPage - 1) {
      return pageArrays.slice(-5);
    }

    return pageArrays.slice(currentPage - 3, currentPage + 2);
  };

  return (
    <PaginationContainer>
      <ArrowButton onClick={onPrevClick} disabled={currentPage === 1}>
        <CustomIcon
          size={7}
          height={17}
          fill="none"
          stroke="gray-600"
          viewBox="0 0 8 14"
        >
          <LeftArrow />
        </CustomIcon>
      </ArrowButton>

      {fivePage().map((page) => {
        if (page !== lastPage || page === 1 || page < 5) {
          return (
            <Page
              key={page}
              onClick={onPageClick}
              current={page === currentPage}
            >
              {page}
            </Page>
          );
        }
      })}

      <>
        {currentPage !== lastPage &&
          currentPage !== lastPage - 1 &&
          currentPage !== lastPage - 2 &&
          lastPage !== 4 &&
          lastPage !== 5 &&
          '...'}
        {pageArrays.length > 5 && currentPage <= lastPage && (
          <Page onClick={onPageClick} current={lastPage === currentPage}>
            {lastPage}
          </Page>
        )}
      </>

      <>
        {lastPage === 5 && (
          <Page onClick={onPageClick} current={lastPage === currentPage}>
            {lastPage}
          </Page>
        )}
      </>

      <ArrowButton onClick={onNextClick} disabled={currentPage === lastPage}>
        <CustomIcon
          size={7}
          height={17}
          fill="none"
          stroke="gray-600"
          viewBox="0 0 8 14"
        >
          <RightArrow />
        </CustomIcon>
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;
