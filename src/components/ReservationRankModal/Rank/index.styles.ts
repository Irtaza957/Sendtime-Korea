import styled from '@emotion/styled';

export const Info = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Rank = styled.span`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 2px;
  padding: 6px;
  background: var(--gray-300);
  color: var(--gray-700);
  width: fit-content;
  min-width: 40px;
  max-width: 55px;
  text-align: center;
`;

export const Time = styled.div<{ size?: number }>`
  display: inline-block;
  font-size: ${({ size }) => (size ? `${size}px` : '14px')};
  margin: auto 0;
`;

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
