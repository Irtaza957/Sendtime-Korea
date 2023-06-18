import styled from '@emotion/styled';

export const NpsTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NpsTitleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 30px;
`;

export const NpsQuestionNumber = styled.span`
  font-weight: var(--bold);
  color: var(--purple-500);
  margin-right: 8px;
`;

export const NpsRequired = styled.span`
  font-weight: var(--bold);
  color: var(--alert);
  margin-right: 5px;
`;

export const NpsTitle = styled.span`
  font-weight: var(--regular);
  color: var(--gray-800);
  display: flex;
`;

export const NpsButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    min-width: 100px;
  }
`;

export const NpsDescription = styled.div`
  color: var(--gray-600);
  font-size: 13px;
  font-weight: var(--normal);
  margin-top: 5px;
`;

export const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--gray-800);
`;

export const GoodByeMent = styled.div`
  background: var(--gray-50);
  border-radius: 12px;
  padding: 15px 25px;
  font-size: 15px;
  text-align: center;
`;

export const ThankyouTitle = styled.div`
  font-weight: var(--regular);
  font-size: 18px;
  color: var(--gray-800);
`;

export const NpsIcon = styled.span`
  font-size: 50px;
`;
