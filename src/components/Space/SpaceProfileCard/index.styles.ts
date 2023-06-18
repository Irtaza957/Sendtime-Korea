import StyledButton from '@components/Button';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';

export const EXPANDED_PROFILE_CARD_WIDTH = '90%';
export const EXPANDED_PROFILE_CARD_MAX_WIDTH = '700px';

export const ProfileCardContainer = styled.section<{
  isExpandable?: boolean;
  hideBorder?: boolean;
  isExpanded?: boolean;
  highlightColor?: string;
}>`
  ${({ isExpanded }) =>
    isExpanded && `width: ${EXPANDED_PROFILE_CARD_WIDTH} !important;`}
  ${({ isExpanded }) =>
    isExpanded && `max-width: ${EXPANDED_PROFILE_CARD_MAX_WIDTH} !important;`}
  border: ${({ hideBorder, highlightColor }) =>
    hideBorder
      ? 'none'
      : highlightColor
      ? `1.5px solid ${highlightColor}`
      : '1px solid var(--gray-300)'};
  padding: 42px 25px 25px 25px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: var(--white);
  min-height: ${({ isExpandable }) => (isExpandable ? 'unset' : '450px')};
  max-height: ${({ isExpanded }) => (isExpanded ? 'unset' : '550px')};
  position: relative;
  overflow: ${({ isExpanded }) => (isExpanded ? 'unset' : 'hidden')};
  gap: 20px;

  @media (max-width: 770px) {
    width: 100%;
    max-width: 450px;
  }
`;

export const TopStyle = styled.span<{ color?: string }>`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 10px;
  background: ${({ color }) => color || 'var(--dark-blue)'};
`;

export const ProfileImageWrapper = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: number;
}>`
  display: flex;
  position: relative;
  align-items: center;
  flex-shrink: 0;
  width: ${({ width }) => width || '52px'};
  height: ${({ height }) => height || '52px'};
  border-radius: ${({ borderRadius }) =>
    borderRadius != null ? `${borderRadius}px` : '20px'};
  max-width: ${({ width }) => width || '52px'};
  max-height: ${({ height }) => height || '52px'};
  overflow: hidden;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  flex: 1;
`;

export const CardTag = styled.span`
  border-radius: 30px;
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 5px 10px;
  font-size: 13px;
  word-break: break-all;
  display: inline-block;
  min-width: fit-content;
`;

export const CardTitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: var(--bold);
  color: var(--gray-800);
  line-break: anywhere;
  flex: 1;
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 3px;
  flex-shrink: 0;
`;

export const LinkButton = styled.a`
  & > div {
    display: flex;
  }
`;

export const CardDescription = styled.div<{ isExpanded?: boolean }>`
  font-weight: var(--normal);
  color: var(--gray-700);
  line-height: 1.7;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    overflow-y: ${({ isExpanded }) => (isExpanded ? 'hidden' : 'auto')};
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-flow: wrap;
`;

export const ReservationInfoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 0;
`;

export const ReservationInfoContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ReservationInfoIcon = styled(Icon)`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  color: var(--purple-500);
`;

export const ReservationInfoText = styled.span`
  font-size: 13px;
`;

export const MoreButton = styled.button<{ color?: string }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  gap: 4px;
  padding: 4px 0;
  color: ${({ color }) => color || 'var(--dark-blue)'};

  & > svg {
    color: ${({ color }) => color || 'var(--dark-blue)'};
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const PrimaryButton = styled(StyledButton)`
  background: ${({ color }) => color || 'var(--dark-blue)'};
  color: white;
`;

export const CardReactionContainer = styled.div`
  display: flex;
  gap: 5px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CardReaction = styled.button`
  background: var(--gray-100);
  border-radius: 30px;
  padding: 6px 12px;
`;

export const MessageIcon = styled.div<{ borderColor?: string }>`
  height: 34px;
  width: 34px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ borderColor }) => (borderColor ? borderColor : 'var(--purple-500)')};
  border-radius: 6px;
  cursor: pointer;
`;

export const MessageButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
