import { useState } from 'react';

const usePagination = (lastPage = 2) => {
  const [page, setPage] = useState(1);

  const goPrevPage = (page = 1, cb?: () => void) => {
    setPage((prev) => {
      const newPage = prev - page;

      if (newPage < 1) {
        if (cb) cb?.();
        return prev;
      }

      return newPage;
    });
  };

  const goNextPage = (page = 1, cb?: () => void) => {
    setPage((prev) => {
      const newPage = prev + page;

      if (newPage > lastPage) {
        if (cb) cb?.();
        return prev;
      }

      return newPage;
    });
  };

  const goPage = (page: number) => {
    setPage(page);
  };

  return { page, goPrevPage, goNextPage, goPage };
};

export default usePagination;
