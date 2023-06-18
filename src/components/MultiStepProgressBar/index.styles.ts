import styled from '@emotion/styled';

export const Container = styled.ul`
  display: flex;
  width: 100%;
`;

export const Step = styled.li<{ isActive: boolean; index: number }>`
  flex-grow: 2;
  text-align: center;
  position: relative;
  color: var(--purple-500);
  counter-increment: stepNum;
  z-index: ${({ index }) => 100 - index};

  &:before {
    content: '';
    height: 5px;
    width: 100%;
    position: absolute;
    top: 7px;
    right: 50%;
    background: linear-gradient(
        to right,
        var(--purple-500) 50%,
        var(--gray-300) 50%
      )
      left;
    background-size: 200%;
    background-position: ${({ isActive }) => (isActive ? 'left' : 'right')};
    transition: ${({ isActive }) =>
      isActive
        ? 'background-position 0.2s linear'
        : 'background-position 0.2s ease-out 0.05s'};
  }
  &:after {
    content: '';
    display: block;
    position: relative;
    margin: 0 auto;
    width: 20px;
    height: 20px;
    text-align: center;
    color: white;
    font-weight: bold;
    border-radius: 100px;
    background: linear-gradient(
        to right,
        var(--purple-500) 50%,
        var(--gray-300) 50%
      )
      left;
    background-size: 200%;
    background-position: ${({ isActive }) => (isActive ? 'left' : 'right')};
    transition: ${({ isActive }) =>
      isActive
        ? 'background-position 0.05s ease-out 0.2s'
        : 'background-position 0.05s linear'};
  }
  &:first-of-type {
    flex-grow: 1;
    &:before {
      display: none;
    }
    &:after {
      margin-left: 0;
    }
  }
  &:last-child {
    flex-grow: 1;
    &:before {
      width: 200%;
      right: 0;
    }
    &:after {
      margin-right: 0;
    }
  }
`;
