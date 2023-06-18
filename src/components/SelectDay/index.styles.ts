import styled from '@emotion/styled';

const SelectContainer = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 26px;
  gap: 10px;

  &:not(:last-of-type) {
    border-right: 1px solid var(--gray-300);
  }
`;

const DayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid var(--gray-300);
`;

const SelectContent = styled.span`
  display: inline-block;
  width: max-content;
`;

const CheckboxWrapper = styled.div<{ checked: boolean }>`
  border: 1px solid var(--gray-300);
  background: ${({ checked }) => `var(--${checked ? 'purple-500' : 'white'})`};
  border-radius: 4px;
  width: fit-content;

  & > div {
    width: 22px;
    height: 22px;
    padding: 2px;
  }
`;

export { CheckboxWrapper, DayWrapper, SelectContainer, SelectContent };
