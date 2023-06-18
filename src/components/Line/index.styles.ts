import styled from '@emotion/styled';

const BorderContainer = styled.div<{ margin: string; padding: string }>`
  width: 100%;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`;

const Border = styled.div`
  width: 100%;
  min-width: 20px;
  border-bottom: 1px solid var(--gray-300);
`;

const LineWithCenterText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  height: 43px;
  font-size: 12px;
  color: var(--gray-750);

  ::before,
  ::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--gray-750);
  }

  :not(:empty)::before {
    margin-right: 8px;
  }

  :not(:empty)::after {
    margin-left: 8px;
  }
`;

export { Border, BorderContainer, LineWithCenterText };
