import styled from '@emotion/styled';

export const MultiSelectBox = styled.button<{ selected?: boolean }>`
  border-radius: 10px;
  border: 1px solid var(--gray-300);
  color: var(--gray-750);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  line-height: 1.6;

  ${({ selected }) => selected && `border-color: var(--purple-500);`}

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }

  div {
    flex-grow: 1;
  }
`;

MultiSelectBox.defaultProps = { type: 'button' };

export const Selected = styled.span`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  background: var(--purple-500);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;
