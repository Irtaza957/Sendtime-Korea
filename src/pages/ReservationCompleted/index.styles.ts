import styled from '@emotion/styled';

export const CompleteContainer = styled.div`
  box-shadow: 2px 4px 40px 0 #00000012;
  border: 1px solid var(--gray-300);
  border-radius: 15px;
  background: var(--white);
  overflow: hidden;
  width: 100%;
  display: flex;
  padding: 53px 0;
  max-width: 800px;
  margin: auto;

  @media (max-width: 768px) {
    box-shadow: none;
    border: none;
    padding: 0 30px;
  }
`;

export const CompletedTitle = styled.h2`
  font-weight: var(--semi-bold);
  font-size: 20px;
  color: var(--gray-800);
`;

export const CopyButton = styled.button`
  padding: 3px;
  border-radius: 5px;
  background: var(--gray-200);
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  right: 15px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: var(--normal);
  line-height: 1.6;
  text-align: center;
  color: var(--gray-700);
`;

export const Container = styled.div<{ gap?: number }>`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => `${gap ? gap : 25}px`};

  > div {
    width: 100%;
  }
`;

export const ButtonText = styled.span`
  display: inline-block;
  margin-left: 6px;
`;
