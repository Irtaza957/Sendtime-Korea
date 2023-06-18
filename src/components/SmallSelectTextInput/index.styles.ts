import styled from '@emotion/styled';

export const SmallSelectTextInputBox = styled.div`
  * {
    font-size: 14px;
    background-color: #f9fafc;
  }

  div {
    background-color: #f9fafc;
    height: auto;
    border-radius: 0.23rem;

    input[type='text'] {
      padding: 2px 0;
    }
  }

  & > div > div:last-of-type {
    button {
      padding: 12px 10px;
      width: 100%;
    }
  }
  max-width: 150px;
  @media (max-width: 768px) {
    * {
      background-color: white;
    }
    div {
      background-color: white;
    }
  }
`;
