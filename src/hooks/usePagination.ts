import { useMemo, useState } from 'react';

const defaultOptions = {
  rowsPerPage: 7,
};

const usePagination = (options?: Partial<typeof defaultOptions>) => {
  const [selectedPage, setSelectedPage] = useState(1);

  const actualPage = useMemo(() => {
    const actualIndex = (selectedPage - 1) * (options?.rowsPerPage ?? 7);
    return [actualIndex, actualIndex + (options?.rowsPerPage ?? 7)];
  }, [options?.rowsPerPage, selectedPage]);

  const pages = useMemo(() => {
    const pagesArray = [];
    let page = selectedPage;

    if (page === 1) {
      page = 2;
    }

    for (let i = page - 1; i < page - 1 + 4; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }, [selectedPage]);

  return {
    selectedPage,
    setSelectedPage,
    actualPage,
    pages,
  };
};

export default usePagination;
