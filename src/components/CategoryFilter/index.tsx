import React from 'react';

import * as Styled from './index.styles';

export interface CategoryFilterProps {
  selectedCategoryIds: string[];
  categories: {
    id: string;
    name: string;
    color?: string;
  }[];
  isScrolled?: boolean;
  onCategoryClick?: (categoryId: string) => void;
}

const CategoryFilter = ({
  selectedCategoryIds,
  categories,
  isScrolled,
  onCategoryClick,
}: CategoryFilterProps) => {
  return (
    <Styled.CategoryFilterContainer showShadow={isScrolled || false}>
      {categories.map((category) => (
        <Styled.CategoryItem
          key={category.id}
          color={category.color}
          selected={selectedCategoryIds.includes(category.id)}
          onClick={() => onCategoryClick?.(category.id)}
        >
          {category.name}
        </Styled.CategoryItem>
      ))}
    </Styled.CategoryFilterContainer>
  );
};

export default CategoryFilter;
