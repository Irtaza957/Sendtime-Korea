import styled from '@emotion/styled';

export const CustomCardSection = styled.section`
  width: 100%;
  min-width: 300px;
  max-width: 320px;
  border: 1px solid var(--gray-300);
  padding: 42px 25px 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background: var(--white);
  min-height: 400px;
  max-height: 550px;
  position: relative;
  overflow: hidden;
  box-shadow: 1px 2px 6px 2px #8c8c8c1c;

  @media (max-width: 1200px) {
    min-height: 400px;
  }

  @media (max-width: 768px) {
    max-width: 360px;
  }

  @media (max-width: 480px) {
    max-width: 340px;
  }
`;

export const CardImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 20px;
  max-width: 52px;
  max-height: 52px;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const TopStyle = styled.span<{ color?: string }>`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 10px;
  background: ${({ color }) => color || 'var(--dark-blue)'};
  border-radius: 9px 9px 0 0;
`;

export const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: var(--bold);
  color: var(--gray-800);
`;

export const CardDescription = styled.div`
  font-weight: var(--normal);
  color: var(--gray-700);
  line-height: 1.7;
  font-size: 14px;
  max-height: 50%;
  overflow: auto;
`;

export const PageLink = styled.a`
  color: var(--blue-700);
  &:hover {
    text-decoration: underline;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-flow: wrap;
`;

export const CardMoreInfo = styled.div`
  font-size: 14px;

  svg {
    width: 18px;
  }
`;

export const CardTags = styled.span`
  border-radius: 30px;
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 5px 10px;
  font-size: 13px;
  word-break: break-all;
  display: inline-block;
  min-width: fit-content;
`;

export const CardLike = styled.button`
  background: var(--gray-100);
  border-radius: 30px;
  padding: 6px 12px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  max-height: 350px;
  min-height: 350px;
  overflow: hidden;
`;

export const CardLikeContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const Bottom = styled.div<{ color?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    background: ${({ color }) => color || 'var(--dark-blue)'};
  }
`;
