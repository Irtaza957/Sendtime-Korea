import styled from '@emotion/styled';

import { Alert } from '../../styles/common.styles';

const DailyTimeSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 460px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const DayTimeSelectContainer = styled.div`
  display: flex;
  align-items: stretch;
  padding: 12px 6px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const SelectTextInputWrapper = styled.div`
  flex-grow: 3;
  min-width: 150px;
  min-height: 40px;
  max-height: fit-content;
  margin: 0 6px;

  @media (max-width: 768px) {
    width: 120px;
    min-width: 120px;
  }
`;

const Line = styled.div`
  width: 12px;
  height: 1px;
  max-width: 12px;
  border-top: 1px solid var(--gray-700);
`;

const TextContent = styled.span`
  min-width: 40px;
  color: var(--gray-700);
  font-size: 14px;
  font-weight: var(--regular);
`;

const TimeAlert = styled(Alert)`
  font-size: 11px;
  color: var(--alert);
  margin-top: 0;
  margin: 15px 0 0 15px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectAlertContainer = styled.div`
  flex-grow: 2;
`;

export {
  DailyTimeSelectContainer,
  DayTimeSelectContainer,
  Flex,
  Line,
  SelectAlertContainer,
  SelectTextInputWrapper,
  TextContent,
  TimeAlert,
};
