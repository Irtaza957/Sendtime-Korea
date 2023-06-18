import styled from '@emotion/styled';

const InputContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled.input<{ inputPadding: number; isEmpty?: boolean }>`
  width: 100%;
  font-size: 15px;
  font-weight: var(--normal);
  padding: ${({ inputPadding }) => inputPadding && `${inputPadding}px 0`};

  &::placeholder {
    color: var(--gray-500);
  }

  &:disabled {
    background-color: var(--gray-100);
    color: var(--gray-500);
    user-select: none;
  }
`;

const TextInputContainer = styled.div<{
  disabled?: boolean;
  validated?: boolean;
  animated?: boolean;
  height?: number | string;
}>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  border: 1px solid
    ${({ validated }) => `var(--${validated ? 'gray-300' : 'alert'})`};
  border-radius: 5px;
  padding: 8px 15px 8px 15px;
  display: flex;
  gap: 5px;
  ${({ height }) => height && `height: ${height}px`};

  background-color: ${({ disabled }) =>
    disabled ? 'var(--gray-100)' : 'var(--white)'};

  ${({ validated, animated }) =>
    !validated && animated && 'animation: bounceLeft 0.3s ease-in-out'};

  @media (max-width: 768px) {
    padding: 4px 6px 4px 12px;
    * {
      font-size: 14px;
    }
  }
`;

const TextInputLabel = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
`;

const PrefixContainer = styled.div`
  margin: 0;
  margin-right: 6px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  InputContainer,
  PrefixContainer,
  StyledInput,
  TextInputContainer,
  TextInputLabel,
};
