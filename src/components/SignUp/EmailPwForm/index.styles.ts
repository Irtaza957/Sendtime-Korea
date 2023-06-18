import styled from '@emotion/styled';

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const AlertConatiner = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(217, 224, 232, 1);
  border-radius: 5px;
  gap: 20px;
  padding: 20px;
  color: var(--gray-700);
  font-size: 15px;
`;

export const AlertText = styled.li<{ isPass: boolean }>`
  padding-left: 10px;
  color: ${({ isPass }) => (isPass ? '#208410' : 'var(--gray-700)')};
`;
