import styled from '@emotion/styled';

const StyledButton = styled.button`
  border: 1px solid var(--gray-300);
  padding: 15px 12px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 6px;
`;

const IconWrapper = styled.div`
  display: flex;
  width: 25px;
  height: 25px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.span`
  font-size: 15px;
  font-weight: var(--normal);
  color: var(--gray-750);
  display: inline-block;
  text-align: left;
`;

const CheckboxWrapper = styled.div<{ checked: boolean }>`
  border: 1px solid var(--gray-300);
  background: ${({ checked }) => `var(--${checked ? 'purple-500' : 'white'})`};
  border-radius: 4px;

  & > div {
    width: 22px;
    height: 22px;
    padding: 2px;
  }
`;

export {
  CheckboxWrapper,
  Content,
  IconContentWrapper,
  IconWrapper,
  StyledButton,
};
