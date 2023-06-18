import styled from '@emotion/styled';

import { NestedItemContainer } from '../NestedItem/index.styles';

export const ThirdPartyItemContainer = styled(NestedItemContainer)`
  &:hover {
    background: var(--gray-100);

    * span:not(:first-of-type) {
      background: var(--gray-100);
    }
  }
`;

export const PersonalType = styled.span<{
  type?: 'person' | 'status' | 'statusConfirmed';
}>`
  display: inline-block;
  padding: 4px 6px;
  border-radius: 4px;
  background: var(--gray-200);
  font-size: 11px;

  ${({ type }) =>
    type === 'status'
      ? `
    padding: 3px 5px;
    background: var(--white);
    border: 1px solid var(--gray-600);
    `
      : type === 'statusConfirmed'
      ? `
      border: 1px solid var(--confirm);
      color: var(--confirm);
      background: var(--white);
      padding: 3px 5px;
      `
      : ''}
`;

export const PersonalInfo = styled.span`
  font-size: 13px;
  margin: 0 1px 0 3px;
`;

export const ThirdPartyDelete = styled.div`
  text-align: center;
`;
