import styled from '@emotion/styled';

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  height: 100%;
`;

const LeftSideContentWrapper = styled.div`
  background: var(--white);
  box-shadow: rgb(41 47 51 / 8%) 0px 4px 15px 0px;
  height: calc(100% - 60px);
  padding: 24px;
  flex: 1;
  @media (max-width: 1024px) {
    box-shadow: none;
    padding: 0px;
    margin-bottom: 20px;
  }
`;

const LeftSideImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const LeftSidePreviewName = styled.h1`
  font-size: 20px;
  color: var(--gray-800);
  font-weight: var(--semi-bold);
  word-break: break-all;
`;

const LeftSideDescription = styled.p`
  font-size: 14px;
  color: var(--gray-600);
  padding: 12px 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const LeftSidePreviewInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const LeftSidePreviewInfo = styled.div`
  display: flex;
  gap: 8px;
`;

const PreviewIconWrapper = styled.div<{
  alignItems?: string;
  justifyContent?: string;
}>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'center'};
`;

const PreviewContentWrapper = styled.div<{
  alignItems?: string;
  justifyContent?: string;
}>`
  flex: 1;
  display: flex;
  font-size: 14px;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
`;

const PreviewRanking = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PreviewRankWrapper = styled.span`
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PreviewRank = styled.span`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 2px;
  padding: 6px;
  background: var(--gray-300);
  color: var(--gray-700);
  width: fit-content;
  min-width: 40px;
  max-width: 55px;
  text-align: center;
`;

const PreviewTime = styled.div<{ size?: number }>`
  display: inline-block;
  font-size: ${({ size }) => (size ? `${size}px` : '14px')};
  margin: auto 0;
`;

export {
  LeftSideContainer,
  LeftSideContentWrapper,
  LeftSideDescription,
  LeftSideImageWrapper,
  LeftSidePreviewInfo,
  LeftSidePreviewInfos,
  LeftSidePreviewName,
  LeftSideWrapper,
  PreviewContentWrapper,
  PreviewIconWrapper,
  PreviewRank,
  PreviewRanking,
  PreviewRankWrapper,
  PreviewTime,
};
