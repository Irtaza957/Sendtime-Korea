import styled from '@emotion/styled';

import { BlockBox } from './../../../../../styles/container/index.styles';

export const PaymentAlertContainer = styled(BlockBox)`
  padding: 30px 50px;
  background: var(--white);
  border-radius: 8px;
  width: 400px;
`;

export const AlertTitle = styled.h2`
  color: var(--gray-750);
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  font-weight: var(--semi-bold);
`;

export const InfoBoxContainer = styled(BlockBox)`
  border: 1px solid var(--gray-550);
  border-radius: 5px;
  width: 100%;
  overflow: hidden;
`;

export const InfoTitle = styled.h3`
  color: var(--gray-700);
  padding: 10px 15px;
  text-align: left;
  background: var(--gray-50);
  width: 100%;
  font-weight: var(--semi-bold);
  font-size: 14px;
`;

export const InfoContent = styled.p`
  color: var(--gray-800);
  padding: 10px 15px;
  font-size: 14px;
`;

export const PaymentAlarmList = styled.ul`
  justify-content: flex-start;
`;

export const PaymentAlarm = styled.li<{ bold?: boolean }>`
  list-style-type: disc;
  list-style-position: inside;
  font-weight: ${({ bold }) => (bold ? 'var(--semi-bold)' : 'var(--normal)')};
  font-size: 12px;
  line-height: 1.6;
  color: var(--gray-600);
  text-indent: -1rem;
  padding-left: 1rem;
`;
