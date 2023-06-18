import styled from '@emotion/styled';

export const Preview = styled.div`
  flex-grow: 1;
  width: 600px;
  height: calc(100vh - 190px);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  gap: 5px;
  box-shadow: 0 4px 15px 0 #292f3315;
  padding: 30px;
  overflow: auto;

  @media (min-width: 768px) {
    width: 400px;
  }
  @media (min-width: 1280px) {
    width: 450px;
  }
  @media (min-width: 1500px) {
    width: 600px;
  }
  @media (max-width: 768px) {
    width: auto;
  }
`;
export const FormHeader = styled.div`
  margin-bottom: 24px;
`;
export const FormTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #303336;
  margin-bottom: 12px;
  font-weight: var(--semi-bold);
  border-bottom: 2px solid var(--gray-200);
  padding-bottom: 10px;
`;
export const FormDescription = styled.p`
  font-size: 18px;
  font-weight: var(--regular);
  color: var(--gray-750);
`;

export const FormQuestionWrapper = styled.div`
  padding: 12px 0px;
`;
