import styled from '@emotion/styled';

export const ContactContainer = styled.a`
  width: 100%;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 8px;
  font-size: 14px;
  gap: 10px;
`;

export const ContactContent = styled.span`
  color: var(--gray-750);
  font-weight: var(--normal);
  word-break: break-all;
`;
