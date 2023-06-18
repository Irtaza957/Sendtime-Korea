import styled from '@emotion/styled';

export const NewGroupContainer = styled.div`
  margin: 30px auto;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: 70%;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  button {
    &:disabled {
      background: var(--gray-50) !important;
      color: var(--gray-500) !important;
      border-color: var(--gray-500);
    }
  }
`;

export const RequiredContainer = styled.div`
  margin: 10px 0;
  span {
    background: var(--white);
  }
`;

export const PreviewContainer = styled.div`
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
  border-radius: 10px;
  padding: 25px 20px;

  > div > div > div,
  input:disabled {
    background: var(--white);
  }
`;

export const PreviewTitle = styled.h3`
  color: var(--gray-800);
  font-size: 15px;
  margin-bottom: 25px;
`;

export const CustomInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  > div {
    flex-basis: 90%;
    background: var(--gray-50) !important;

    > div,
    input:disabled {
      background: var(--white);
    }
  }

  > button {
    max-height: 40px;
    max-width: 40px;
    flex-basis: 10%;
  }

  @media (max-width: 768px) {
    display: flex !important;

    > div {
      width: 100%;
    }
  }
`;
