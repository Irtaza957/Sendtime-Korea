import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const Box = styled.div<{ height: number; padding: number }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  border-radius: 4px;
  padding: 0 ${({ padding }) => padding && padding}px;
  height: ${({ height }) => height && height}px;
  cursor: pointer;
  border: 1px solid #d9e0e8;
`;

export const SelectedText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: block;
  margin-top: 2.5px;
`;

export const Text = styled.p`
  color: #6f6f6f;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 2px;
  cursor: pointer;
`;

export const ArrowIcon = styled.span<{ isDropdown: boolean }>`
  ${({ isDropdown }) =>
    isDropdown && `transform: rotate(180deg); margin-top: 5px;`};
`;

const animateFromBottom = keyframes`
from {
  transform: translate3d(0, 10px, 0);
  opacity: 0
}
to {
  transform: translate3d(0, 0, 0);
  opacity: 1
}
`;

export const SelectboxContainer = styled.div`
  max-height: 300px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.4rem;
  animation: ${animateFromBottom} 0.3s;
  background-color: white;
  border-radius: 8px;
  box-shadow: 4px 1px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  overflow-y: auto;
  padding: 1rem;
`;

export const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
