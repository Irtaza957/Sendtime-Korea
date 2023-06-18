import styled from '@emotion/styled';

const ContainerOuter = styled.section<{ hasImageUrl?: boolean }>`
  width: 100%;
  margin: auto;
  gap: ${({ hasImageUrl }) => (hasImageUrl ? '32px' : '0')};
  padding: 20px 40px 0 40px;

  @media only screen and (max-width: 425px) {
    padding: 0px 20px;
  }

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const ContainerInner = styled.div<{
  maxWidth?: number;
  padding?: string;
  gap?: string;
}>`
  padding: ${({ padding }) => (padding ? padding : '35px 50px 50px 50px')};
  width: 100%;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  border-radius: 15px;
  background: var(--white);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 30px auto;
  gap: ${({ gap }) => (gap ? gap : '0')};

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

const ImageContainer = styled.div`
  max-width: 242px;
  max-height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { ContainerInner, ContainerOuter, ImageContainer };
