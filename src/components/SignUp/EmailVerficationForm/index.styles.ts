import styled from '@emotion/styled';

export const ContainerOuter = styled.section`
  width: 100%;
  margin: auto;
  gap: 32;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const ContainerInner = styled.div`
  padding: 35px 30px 35px 30px;
  width: 100%;
  border-radius: 15px;
  max-width: 460px;
  background: #ffffff;
  gap: 20px;
  box-shadow: 0px 4px 50px 0px rgba(191, 203, 217, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 30px auto;

  @media only screen and (max-width: 425px) {
    padding: 35px 30px;
    margin: 10px auto;
  }

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 auto;
    box-shadow: none;
  }
`;

export const ImageContainer = styled.div`
  max-width: 242px;
  max-height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  gap: 40px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Msg = styled.span`
  color: var(--gray-750);
  font-size: 16px;
  text-align: center;

  span {
    font-weight: 600;
    color: var(--gray-750);
  }
`;
