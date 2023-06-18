import styled from '@emotion/styled';
import { ContainerTitle, SPACE_MOBILE_WIDTH } from '@pages/Space/index.styles';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(85, 106, 122, 0.14) 0px 6px 15px 0px;
  background-color: white;
  width: 360px;
  border-radius: 10px;
  padding: 25px 25px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1639px) {
    width: 30vw;
  }

  @media (max-width: 1380px) {
    width: 360px;
  }

  @media (max-width: 1279px) {
    width: 50vw;
  }

  @media (max-width: 1150px) {
    width: 45vw;
  }

  @media (max-width: ${SPACE_MOBILE_WIDTH}) {
    width: 100%;
  }
`;

export const CardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const TopInfoContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const CardContainerTitle = styled(ContainerTitle)`
  padding: 0;
  flex: 1;
`;

export const ViewCount = styled.div`
  width: fit-content;
  padding: 6px 10px;
  background: var(--purple-50);
  border-radius: 6px;
  font-size: 12px;
  align-self: flex-end;
  flex-shrink: 0;

  span {
    font-weight: var(--semi-bold);
  }
`;

export const ImageWrapper = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: number;
}>`
  width: ${({ width }) => width || '80px'};
  max-width: ${({ width }) => width || '80px'};
  height: ${({ height }) => height || '80px'};
  max-height: ${({ height }) => height || '80px'};
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${({ borderRadius }) =>
    borderRadius != null ? `${borderRadius}px` : '50%'};
  overflow: hidden;
`;

export const CardTitle = styled.h1`
  font-size: 20px;
  font-weight: var(--semi-bold);
  color: var(--gray-800);
  width: 100%;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--gray-300);
`;

export const SpaceDescription = styled.div`
  font-size: 14px;
  font-weight: var(--normal);
  color: var(--gray-750);
  line-height: 1.7;
  white-space: pre-line;
`;

export const ContactPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
