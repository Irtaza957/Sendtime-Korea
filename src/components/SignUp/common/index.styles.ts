import styled from '@emotion/styled';

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: var(--gray-700);
`;

export const FormContainer = styled.form<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  box-shadow: var(--shadow);
  border-radius: 15px;
  padding: 40px;
  gap: ${({ gap }) => gap ?? 32}px;

  @media only screen and (max-width: 768px) {
    padding: 32px 20px;
  }

`;

export const Section = styled.section<{ gap?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap ?? 16}px;
`;

export const BottomDescriptionContainer = styled.div<{ primary?: boolean }>`
  font-size: ${({ primary }) => (primary ? 12 : 10)}px;
  font-weight: ${({ primary }) => (primary ? '500' : '400')};
  color: var(--${({ primary }) => (primary ? 'purple-800' : 'gray-700')});
  text-align: center;
`;

export const BottomDescriptionLink = styled.a<{ marginLeft?: number }>`
  color: var(--purple-500);
  text-decoration: underline;
  font-weight: var(--normal);
  margin-left: ${({ marginLeft }) => marginLeft ?? 0}px;
  cursor: pointer;

  :visited {
    color: var(--purple-500);
  }
`;
