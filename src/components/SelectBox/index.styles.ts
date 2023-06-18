import styled from '@emotion/styled';

export const SelectBoxContainer = styled.div<{
  boxCount: number;
  startLocation?: number;
  dropdownAbove?: boolean;
}>`
  position: absolute;
  width: 100%;
  border: 0.5px solid var(--gray-300);
  border-radius: 5px;
  overflow: hidden;
  height: ${({ boxCount }) => `${boxCount * 55}px`};
  overflow: auto;
  transform: ${({ dropdownAbove, boxCount }) =>
    dropdownAbove
      ? `translateY(-${(boxCount + 1) * 42 + 12}px)`
      : 'translateY(10px)'};
  z-index: var(--front);
  box-shadow: 2px 4px 6px 0px #8f98a320;
`;

export const SelectButtonItem = styled.button<{
  selected: boolean;
  isActive?: boolean;
}>`
  padding: 18px 20px;
  background: var(--white);
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 15px;
  border-bottom: 0.5px solid var(--gray-300);
  background: ${({ selected }) =>
    selected ? 'var(--gray-200)' : 'var(--white)'};
  display: flex;
  justify-content: space-between;
  word-break: break-all;

  &:disabled {
    color: var(--gray-500);
  }

  &:disabled:hover {
    background: var(--white);
  }

  &:hover {
    background: var(--gray-200);
  }
`;

export const DisabledText = styled.span`
  display: inline-block;
  color: var(--gray-500);
  font-size: 14px;
`;
