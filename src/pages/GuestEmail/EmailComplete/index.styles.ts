import styled from '@emotion/styled';

export const CompleteContainer = styled.div`
  box-shadow: 2px 4px 40px 0 #00000012;
  border: 1px solid var(--gray-300);
  border-radius: 15px;
  background: var(--white);
  overflow: hidden;
  display: flex;
  padding: 53px 0;
  width: 100%;
  max-width: 800px;
  margin: auto;
  height: 100%;
  max-height: 700px;

  @media (max-width: 768px) {
    border: none;
    padding: 0 30px;
    box-shadow: none;
  }
`;

export const CompletedTitle = styled.h2`
  font-weight: var(--semi-bold);
  font-size: 20px;
  color: var(--gray-800);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: var(--normal);
  line-height: 1.6;
  text-align: center;
  padding-bottom: 30px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 0 14px 20px 14px;
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
  gap: 25px;
`;

export const ChannelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 50px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 10px;

    h3 {
      font-size: 12px;
    }
  }
`;

export const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ChannelTitle = styled.h3`
  min-width: 80px;
  text-align: center;
`;

export const FlexBox = styled.div`
  display: flex;
  gap: 15px;
`;
