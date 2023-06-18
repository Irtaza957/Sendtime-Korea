import styled from '@emotion/styled';

export const PaymentCompleted = styled.div`
  box-shadow: 2px 4px 40px 0 #00000012;
  border: 1px solid var(--gray-300);
  border-radius: 15px;
  background: var(--white);
  overflow: hidden;
  display: flex;
  padding: 53px 0;
  width: 100%;
  max-width: 600px;
  margin: auto;
  height: 100%;
  max-height: 500px;

  @media (max-width: 768px) {
    border: none;
    padding: 0 30px;
    box-shadow: none;
  }
`;
