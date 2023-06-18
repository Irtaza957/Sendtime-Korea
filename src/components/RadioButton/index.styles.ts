import styled from '@emotion/styled';

const RadioButtonContainer = styled.div`
  display: flex !important;
  align-items: center;
  font-size: 14px;
  width: 100%;
`;

const RadioButtonOuter = styled.div<{ disabled?: boolean; checked: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 20px;
  background: ${({ checked, disabled }) => {
    if (checked && !disabled) {
      return 'var(--purple-500)';
    }

    if (disabled) {
      return 'var(--gray-100)';
    }

    if (!checked) {
      return 'var(--white)';
    }
  }};

  border: 1px solid var(--gray-200);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  ${({ disabled }) => !disabled && `cursor: pointer;`}
`;

const RadioButtonInner = styled.div<{ disabled?: boolean }>`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: ${({ disabled }) => `var(--${disabled ? 'gray-100' : 'white'})`};
`;

export const RadioButtonChild = styled.span`
  cursor: pointer;
  width: 100%;
`;

export { RadioButtonContainer, RadioButtonInner, RadioButtonOuter };
