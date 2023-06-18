import styled from '@emotion/styled';

export const Item = styled.li`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-size: 15px;
  width: fit-content;
`;

export const ItemContainer = styled.div<{ selected: boolean }>`
  cursor: pointer;
  position: relative;
  min-width: fit-content;

  ${({ selected }) =>
    selected &&
    `
    * {
      color: var(--purple-500)
    };
    
    font-weight: var(--semi-bold);

    &::after {
      content: '';
      width: 100%;
      height: 2px;
      border-radius: 20px;
      background: var(--purple-500);
      position: absolute;
      bottom: -1px;
      left: 0;
    }
  `}

  &:hover::after {
    content: '';
    width: 100%;
    height: 2px;
    border-radius: 20px;
    background: var(--purple-500);
    position: absolute;
    bottom: -1px;
    left: 0;
  }
`;

export const Noti = styled.div`
  width: 5px;
  height: 5px;
  background: var(--red);
  border-radius: 50%;
  position: absolute;
  top: 6px;
  right: 6px;
`;

export const LengthInfo = styled.span`
  padding: 2px 6.5px;
  background: var(--gray-200);
  border-radius: 6px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: var(--regular);
  margin-left: 5px;
`;
