import styled from '@emotion/styled';

const ToggleButtonOuter = styled.div<{ active: boolean }>`
  width: 42px;
  height: 25px;
  background: ${({ active }) => `var(--${active ? 'purple-500' : 'gray-300'})`};
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 0 2.5px;
  cursor: pointer;
  position: relative;
`;

const ToggleButtonInner = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  background: var(--white);
  border-radius: 50%;
  position: absolute;
  left: ${({ active }) => `${active ? 20 : 2}px`};
  transition: all 0.1s cubic-bezier(0, 1.15, 1, 1);
`;

export { ToggleButtonInner, ToggleButtonOuter };
