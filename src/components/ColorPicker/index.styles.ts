import styled from '@emotion/styled';

const PickerWrapper = styled.div`
  padding: 25px 30px 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Title = styled.h5`
  margin-bottom: 10px;
  color: var(--blue-800);
  text-align: center;
`;

const CustomInputWrapper = styled.div`
  margin-top: 10px;
  padding: 10px 0;

  input {
    width: 70%;
    font-size: 15px;
    background: inherit;
    text-align: center;
    border-bottom: 1px solid var(--gray-500);

    &::placeholder {
      color: var(--gray-400);
    }
  }
`;

export { CustomInputWrapper, PickerWrapper, Title };
