import styled from '@emotion/styled';

export const GroupCalendarContainer = styled.main`
  display: flex;
  width: 100%;
  max-height: calc(92% - 60px);
  min-height: 85%;
`;

export const GroupCalendarLoading = styled.div`
  color: var(--white);
  text-align: center;
  line-height: 1.6;
`;

export const GroupCalendarInfo = styled.div<{ start: number }>`
  position: absolute;
  top: 50%;
  text-align: center;
  left: ${({ start }) => `${start * 0.85 * 10}%`};
  transform: ${({ start }) => `translate(-${start * 10}%, -50%)`};
  z-index: var(--front);
  background: var(--gray-50);
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px var(--gray-300);
  border: 1px solid var(--gray-500);
`;
