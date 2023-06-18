import React from 'react';

import { CarouselNavContainer, NavButton } from './index.styles';

interface CarouselNavProps {
  count: number;
  handleNav: (id: number) => void;
  activeIndex?: number;
}

const CarouselNav = ({
  count,
  handleNav,
  activeIndex = 0,
}: CarouselNavProps) => {
  return (
    <CarouselNavContainer>
      {[...Array(count).keys()].map((c) => (
        <NavButton
          key={c}
          onClick={() => handleNav(c + 1)}
          active={activeIndex === c}
        />
      ))}
    </CarouselNavContainer>
  );
};

export default CarouselNav;
