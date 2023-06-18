import styled from '@emotion/styled';

import { BlockBox, FlexBox } from '../../../../styles/container/index.styles';

export const SubToggle = styled(FlexBox)`
  max-width: 300px;
`;

export const Container = styled(BlockBox)`
  height: 100%;
`;

export const SubToggleContainer = styled(FlexBox)`
  gap: 10px;
  width: fit-content;
  font-size: 14px;
  font-weight: var(--normal);
`;

export const ThreePartyPreview = styled(BlockBox)`
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
  padding: 20px 30px;
  gap: 20px;
  font-size: 14px;
`;

export const BlockText = styled.span`
  padding: 10px 10px;
  background: var(--gray-200);
  border-radius: 4px;
  font: inherit;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const PersonalInfo = styled.span`
  color: var(--gray-800);
  display: inline-block;
  font: inherit;
  line-height: 1.5;
  margin-left: 5px;
`;

export const PreviewDescription = styled.div<{
  margin?: string;
  textAlign?: 'center' | 'left' | 'right';
}>`
  font-size: 16px;
  color: var(--gray-750);
  margin: ${({ margin }) => (margin ? margin : '20px 0 35px 0')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`;

export const EndAlert = styled.span`
  font-size: 13px;
  display: inline-block;
  margin: 40px 0;
  text-align: center;
  line-height: 1.4;
`;

export const FontStyle = styled.span`
  font-size: 13px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  color: var(--gray-600);
  left: 224px;
  height: 18px;
`;

export const EmphasisWord = styled.span`
  color: var(--cancel);
`;
