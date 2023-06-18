import styled from '@emotion/styled';

export const QrContainer = styled.div`
  padding: 30px 10px;
`;

export const QrButton = styled.button`
  width: 100%;
  font-size: 15px;
  padding: 5px;
  display: flex;
  text-align: left;
  align-items: center;
  gap: 10px;

  &:hover {
    background: var(--gray-100);
  }
`;

export const HostName = styled.span`
  flex-basis: 20%;
`;

export const QrUrl = styled.span`
  flex-basis: 50%;
`;

export const QrCreatedAt = styled.span`
  flex-basis: 30%;
`;
