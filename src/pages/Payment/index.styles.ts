import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  min-width: 800px;
  max-width: 900px;
  margin: 0 auto;
  gap: 20px;

  button {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
    margin: 0 auto;
    min-width: auto;
    margin-bottom: 30px;

    button {
      width: 100%;
    }
  }
`;

export const PaymentContainer = styled.div`
  width: 100%;
  display: flex;
  max-width: 900px;
  min-width: 800px;
  border-radius: 15px;
  background: var(--white);
  box-shadow: 0 4px 50px 0 #3e567230;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 200px;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    width: fit-content;
    min-width: auto;
    box-shadow: none;
    border-radius: 0;
  }
`;

export const PaymentInfo = styled.div`
  width: 50%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const PaymentAccount = styled.div`
  width: 50%;
  height: 100%;
  padding: 30px 60px;
  background: var(--gray-50);

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    background: var(--white);
    border-top: 1px dashed var(--gray-300);
  }
`;

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;

  h2 {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const PaymentTitle = styled.div`
  font-size: 18px;
  font-weight: var(--regular);
  margin: 50px 0;

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

export const PaymentGoods = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

export const PaymentAmount = styled.div`
  padding: 30px;
  width: 100%;
  background: var(--gray-50);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  color: var(--gray-800);
  gap: 5px;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const PaymentMethod = styled.div`
  padding: 20px 30px;
  width: 100%;
  border: 1px solid var(--gray-300);
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-between;
  color: var(--gray-600);
  font-size: 15px;
`;

export const Method = styled.span`
  color: var(--gray-800);
  font-weight: var(--regular);
`;

export const Money = styled.span`
  color: var(--gray-800);
  font-size: 30px;
  font-weight: var(--bold);
  font-family: Pretendard;
`;
