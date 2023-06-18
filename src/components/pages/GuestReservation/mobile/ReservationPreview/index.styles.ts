import styled from '@emotion/styled';

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: relative;
`;

export const PreviewName = styled.h1`
  font-size: 20px;
  color: var(--gray-800);
  font-weight: var(--semi-bold);
  word-break: break-all;
`;

export const ArrowIcon = styled.span<{ isDropdown: boolean }>`
  ${({ isDropdown }) =>
    isDropdown
      ? `transform: rotate(180deg); margin-top: 1px;`
      : `margin-top: -1px;`}
  @media(max-width: 1200px) {
    ${({ isDropdown }) =>
      isDropdown ? `margin-top: -3px;` : `margin-top: -5px;`}
  }
`;
export const PreviewDescription = styled.div<{ isMoreClicked?: boolean }>`
  ${({ isMoreClicked }) =>
    !isMoreClicked ? `max-height: unset;` : `max-height: 100px;`}
  height: auto;
  overflow-y: hidden;
  font-size: 14px;
  color: var(--gray-800);
  margin: 10px 0px 20px 0px;
  white-space: break-spaces;
  word-break: break-all;
  a:hover {
    text-decoration: underline;
  }
`;

export const ButtonContainerMore = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0px;
  gap: 8px;

  position: absolute;
  bottom: -10px;
  display: flex;
  align-items: flex-end;
  left: 0px;
  height: 80px;
  background: linear-gradient(
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.4) 10%,
    rgba(255, 255, 255, 0.7) 30%,
    rgb(255, 255, 255) 100%
  );
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0px;
  gap: 8px;
`;

export const MoreButton = styled.button`
  color: var(--gray-750);
  font-weight: var(--semi-bold);
  font-size: 1rem;
  background: var(--white);
`;

export const PreviewInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  font-size: 14px;
  gap: 4px;
`;

export const TimeZoneContainer = styled.div`
  width: 100%;
`;
