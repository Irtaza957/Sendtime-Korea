import styled from '@emotion/styled';

export const CategoryFilterContainer = styled.div<{ showShadow: boolean }>`
  width: 100%;
  display: flex;
  border-radius: 10px;
  gap: 12px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: ${({ showShadow }) =>
    showShadow ? '1px solid transparent' : '1px solid var(--gray-200)'};
  box-shadow: ${({ showShadow }) =>
    showShadow
      ? '0px 2px 8px rgba(19, 20, 22, 0.1)'
      : '0px 2px 8px rgba(19, 20, 22, 0)'};
  padding: 16px;
  transition: all 0.2s ease-in-out;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryItem = styled.button<{
  selected?: boolean;
  color?: string;
}>`
  padding: 8px 12px;
  border-radius: 100px;
  background-color: ${({ selected, color }) =>
    selected ? color || 'var(--purple-500)' : 'white'};
  border: ${({ selected }) =>
    selected ? '1px solid transparent' : '1px solid var(--gray-500)'};
  color: ${({ selected }) => (selected ? 'white' : 'var(--gray-500)')};
  font-weight: 500;
  font-size: 14px;
  flex-shrink: 0;
  transition: all 0.1s ease-in-out;
`;
