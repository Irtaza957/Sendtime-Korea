import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--gray-100);
  padding: 40px 40px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  gap: 50px;
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const LogoWrapper = styled.div`
  width: 200px;
`;

export const FormContainer = styled.form<{ gap?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  box-shadow: var(--shadow);
  border-radius: 15px;
  padding: 40px;
  gap: ${({ gap }) => gap ?? 32}px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: var(--gray-700);
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
