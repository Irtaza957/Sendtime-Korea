import styled from '@emotion/styled';

const ReservationNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 28px;

  button {
    padding: 8px 14px;
    gap: 8px;
  }
`;

const ButtonWrapper = styled.div`
  min-width: 90px;
`;

export { ButtonWrapper, ReservationNavigation };
