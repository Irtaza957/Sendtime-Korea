import styled from '@emotion/styled';

const ScheduleSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const RankTimeContainer = styled.div<{ disabled?: boolean; checked?: boolean }>`
  background: ${({ checked, disabled }) => {
    if (checked && !disabled) {
      return 'rgb(232, 231, 255, 68%)';
    }

    if (disabled) {
      return '#F8F9FB';
    }

    if (!checked) {
      return 'var(--white)';
    }
  }};
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 16px 24px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 16px 12px;
  }
`;

const RadioButtonContainer = styled.div<{ disabled?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  ${({ disabled }) => !disabled && `cursor: pointer;`}
`;

const Rank = styled.div<{ checked?: boolean; disabled?: boolean }>`
  max-width: 55px;
  height: 35px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 8px;
  margin-right: 16px;
  background: ${({ checked, disabled }) => {
    if (checked && !disabled) {
      return 'var(--purple-500)';
    }

    if (disabled) {
      return '#EBEEF3';
    }

    if (!checked) {
      return 'var(--gray-300)';
    }
  }};
  color: ${({ checked }) => `var(--${checked ? 'white' : 'gray-800'})`};
  font-size: 12px;
  @media (max-width: 768px) {
  }
`;

const Time = styled.span<{ disabled?: boolean }>`
  flex: 1;
  display: inline-block;
  font-size: 16px;
  text-decoration: ${({ disabled }) => (disabled ? 'line-through' : 'none')};
  color: ${({ disabled }) => `var(--${disabled ? 'gray-550' : 'inherit'})`};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const RadioButtonOuter = styled.div<{ disabled?: boolean; checked: boolean }>`
  border: 1px solid var(--gray-600) !important;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  min-width: 20px;
  order: 2;
  background: white;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  ${({ disabled }) => !disabled && `cursor: pointer;`}
`;

const RadioButtonInner = styled.div<{ checked: boolean; disabled?: boolean }>`
  height: 9px;
  width: 8px;
  margin: 4px auto;
  background: ${({ checked, disabled }) => {
    if (checked && !disabled) {
      return 'var(--purple-500)';
    }

    if (disabled) {
      return 'var(--white)';
    }

    if (!checked) {
      return 'var(--white)';
    }
  }};
  border-radius: 50%;
  ${({ disabled }) => !disabled && `cursor: pointer;`}
`;

export {
  RadioButtonContainer,
  RadioButtonInner,
  RadioButtonOuter,
  Rank,
  RankTimeContainer,
  ScheduleSelectContainer,
  Time,
};
