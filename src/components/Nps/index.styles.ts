import styled from '@emotion/styled';

export const NpsContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: var(--white);
  border-radius: 15px;
  margin: 0 auto;
  min-height: 350px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px 20px 50px 20px;
  }
`;
