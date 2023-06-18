import styled from '@emotion/styled';

export const CompleteContainer = styled.div`
  box-shadow: 2px 4px 40px 0 #00000012;
  border-radius: 15px;
  background: var(--white);
  overflow: hidden;
  display: flex;
  padding: 0 0 40px 0;
  width: 100%;
  max-width: 500px;
  margin: auto;
  height: 100%;
  /* max-height: 620px; */
  flex-direction: column;

  button {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    margin: auto;
    border: none;
    padding: 23px 20px;
    box-shadow: none;

    button {
      font-size: 14px;
    }
  }
`;

export const CompletedTitle = styled.h2`
  font-weight: var(--semi-bold);
  font-size: 22px;
  color: var(--gray-800);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: var(--gray-650);
  font-weight: var(--normal);
  line-height: 1.6;
  text-align: center;
  padding-bottom: 15px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 0 14px;
    margin-bottom: 10px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const EmailContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const EmailBoxTitle = styled.h2`
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: var(--semi-bold);
  font-size: 22px;
  color: var(--gray-800);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const EmailAlert = styled.span`
  margin-left: 4px;
  font-size: 12px;
  color: var(--gray-600);
`;
