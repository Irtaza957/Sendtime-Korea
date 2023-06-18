import styled from '@emotion/styled';

export const Box = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => `${gap ?? 0}px`};
`;

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  color: var(--gray-800);
`;

export const TitleNavBar = styled.div`
  width: 100%;
  padding: 33px 0;
  background-color: var(--gray-50);
  position: sticky;
  top: 0px;
  z-index: var(--front);

  @media (max-width: 768px) {
    background-color: var(--white);
  }
`;

export const Subscription = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: var(--gray-750);
  margin-top: 7px;
  margin-bottom: 18px;
  white-space: pre-line;
`;

export const ReservationListContainer = styled.section`
  position: relative;
  height: auto;
  min-width: 650px;
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
`;

export const ReservationItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid var(--gray-300);
  margin-bottom: 16px;
  padding: 18px 20px;
  gap: 8px;
  flex-direction: column;
`;

export const HorizontalBox = styled.div<{
  gap?: number;
  width?: string;
  justifyContent?: string;
}>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => `${gap ? gap : 0}px`};
  ${({ width }) => `width: ${width};`}
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'space-between'}
`;

export const NoItem = styled.div`
  height: calc(100vh - 300px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5;
  gap: 20px;
`;

export const Hr = styled.div`
  width: 50%;
  border-bottom: 1px dashed var(--gray-500);
`;

export const ReservationContentTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Badge = styled.span`
  display: inline-block;
  font-size: 10px;
  background-color: var(--gray-100);
  color: var(--gray-700);
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  min-width: fit-content;
`;

export const ReservationTitle = styled.span`
  font-size: 16px;
  font-weight: var(--regular);
  line-height: 1.5;
  color: var(--gray-800);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ReservationLink = styled.span`
  color: var(--link-blue);
  font-size: 13px;
  line-height: 1.34;
  display: inline-block;
  cursor: pointer;
`;

export const SquareButton = styled.button`
  display: inline-flex;
  justify-content: stretch;
  align-items: center;
  min-width: fit-content;
  gap: 6.25px;
  font-size: 13px;
  line-height: 1.4;
  border: 1px solid var(--gray-300);
  border-radius: 4px;
  padding: 5.5px 10.25px;
  color: var(--gray-700);
  background-color: var(--white);

  div {
    margin-top: 1px;
  }

  &:active {
    background-color: var(--gray-100);
  }

  :disabled {
    background-color: var(--gray-100);
    opacity: 0.4;
    cursor: default;
  }
`;

SquareButton.defaultProps = {
  type: 'button',
};

export const ReservationContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CreatedAt = styled.span`
  font-size: 12px;
  color: var(--gray-550);
  line-height: 1.43;
  min-width: fit-content;
  display: inline-block;
  flex-shrink: 0;
`;
