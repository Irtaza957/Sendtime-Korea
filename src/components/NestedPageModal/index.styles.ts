import styled from '@emotion/styled';

export const NestedModalContainer = styled.div<{
  width?: number;
  height?: number;
}>`
  min-width: 600px;
  max-width: 700px;
  min-height: 100px;
  max-height: 800px;
  border-radius: 15px;
  width: ${({ width }) => (width ? `${width}px` : 'fit-content')};
  height: ${({ height }) => (height ? `${height}px` : 'fit-content')};
  background: var(--white);
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  justify-content: flex-start;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  background: var(--white);
  height: 35px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  max-height: 700px;
  overflow: auto;
  padding: 0 20px;
  height: 100%;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px 20px;
`;

export const NestedModalTitle = styled.div<{ align?: 'center' }>`
  font-size: 20px;
  font-weight: var(--regular);
  margin-bottom: 10px;
  color: var(--gray-800);
  ${({ align }) => align === 'center' && `text-align: center;`}
`;

export const HideButton = styled.button`
  position: absolute;
  right: -15px;
`;

export const NestedModalContent = styled.div`
  font-size: 14px;
  font-weight: var(--normal);
  color: var(--gray-600);
  line-height: 1.6;
`;

export const Page = styled.span`
  display: inline-block;
  margin-left: 6px;
  font-size: 16px;
  color: var(--gray-600);
  font-weight: var(--normal);
`;

export const ToggleDescription = styled.span`
  display: flex;
  display: inline-block;
  font-size: 12px;
  text-align: left;
  font-weight: var(--normal);
  color: var(--gray-600);
  width: 100%;
`;
