import React, { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Pagination from '@components/Pagination';
import { NAVIGATION } from '@constants/navigation';
import {
  getSessionStorage,
  removeFromSessionStorage,
  setSessionStorage,
} from '@utils/storage';

import {
  NavigationContainer,
  NavigationContents,
  NavigationWrapper,
} from './index.styles';
import NavigationItem from './NavigationItem';

export type NavigationItemType = {
  title: string;
  contents: ReactNode;
  onClick: (data?: any) => void;
  dataLength: number;
  notification?: boolean;
  showLength?: boolean;
};

interface NavigationProps {
  navItems: NavigationItemType[];
  pagination?: boolean;
  children?: ReactNode;
  rememberTab?: boolean;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIST_COUNT = 10;

const Navigation = ({
  navItems,
  pagination = true,
  children,
  rememberTab = true,
}: NavigationProps) => {
  const router = useRouter();
  const { navIndex } = router.query;
  const path = getSessionStorage(NAVIGATION.PATH);
  const defaultPage = getSessionStorage(NAVIGATION.PAGE);
  const index = getSessionStorage(NAVIGATION.SELECTED_INDEX);

  const prevSelected = navItems.map((_, idx) => {
    /* routing할 때 탭 선택 가능 */
    if (navIndex) return idx === +navIndex;

    if (path === router.asPath && index) return idx === +index;
    return idx === 0;
  });

  useEffect(() => {
    if (!navIndex) return;

    navItems[+navIndex].onClick(DEFAULT_PAGE);
  }, []);

  const [selected, setSelected] = useState(prevSelected);

  const [currentPage, setCurrentPage] = useState(
    defaultPage ? +defaultPage : DEFAULT_PAGE
  );

  const selectedIndex = selected.findIndex((select) => !!select);

  useEffect(() => {
    navItems[selectedIndex].onClick(currentPage);
    if (!rememberTab) return;
    setSessionStorage(NAVIGATION.PATH, router.asPath);

    if (path === router.asPath) {
      setSessionStorage(NAVIGATION.PAGE, `${currentPage}`);
      setSessionStorage(NAVIGATION.SELECTED_INDEX, `${selectedIndex}`);
    }

    return () => {
      removeFromSessionStorage(NAVIGATION.PATH);
      removeFromSessionStorage(NAVIGATION.PAGE);
      removeFromSessionStorage(NAVIGATION.SELECTED_INDEX);
    };
  }, [currentPage, selectedIndex]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedIndex]);

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (e: MouseEvent<HTMLButtonElement>) => {
    const targetPage = e.currentTarget.textContent || '1';
    setCurrentPage(parseInt(targetPage));
  };

  const onClickItem = (idx: number, cb: () => void) => {
    setSelected((prevState) => prevState.map((_, id) => id === idx));

    cb();
  };

  const lastPage =
    navItems[selectedIndex].dataLength / DEFAULT_LIST_COUNT > 0
      ? Math.ceil(navItems[selectedIndex].dataLength / DEFAULT_LIST_COUNT)
      : DEFAULT_PAGE;

  return (
    <NavigationContainer>
      <NavigationWrapper>
        {navItems.map(
          ({ title, onClick, notification, dataLength, showLength }, idx) => {
            return (
              <NavigationItem
                key={idx}
                title={title}
                onClick={() => onClickItem(idx, onClick)}
                selected={selected[idx]}
                notification={notification && !!dataLength}
                dataLength={dataLength}
                showLength={showLength}
              />
            );
          }
        )}
        {/* <NavigationBar /> */}
      </NavigationWrapper>
      <NavigationContents>
        {navItems[selectedIndex].contents}
        {children && children}
        {pagination &&
          !!navItems[selectedIndex].dataLength &&
          navItems[selectedIndex].dataLength > 10 && (
            <Pagination
              lastPage={lastPage}
              currentPage={currentPage}
              onNextClick={handleNextClick}
              onPrevClick={handlePrevClick}
              onPageClick={handlePageClick}
            />
          )}
      </NavigationContents>
    </NavigationContainer>
  );
};

export default Navigation;
