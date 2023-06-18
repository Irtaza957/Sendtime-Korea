import styled from '@emotion/styled';

export const PageSectionDate = styled.div`
  > div > div > div:not(:nth-of-type(2)) {
    padding: 10px;
  }
  @media (max-width: 768px) {
    > div > div {
      flex-direction: column;
      gap: 14px;

      & > div:nth-of-type(2) {
        transform: rotate(90deg) translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: var(--white);
      }
    }
  }
`;

export const Padding = styled.div`
  padding: 0 30px;
  gap: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;
