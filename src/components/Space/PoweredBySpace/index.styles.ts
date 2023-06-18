import styled from '@emotion/styled';

export const PoweredBySpaceContainer = styled.div<{ isSmallWidth?: boolean }>`
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--gray-300);
  padding: 16px 24px;
  padding-bottom: ${({ isSmallWidth }) => (isSmallWidth ? '56px' : '20px')};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  background-color: white;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 20px;
  background: linear-gradient(
    90deg,
    #26dfca -50%,
    #589fdf 20%,
    #6f86e7 71%,
    #9457fd 100%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;

  & > span {
    display: inline-block;
  }
`;

export const Subtitle = styled.h3`
  font-size: 13px;
  color: var(--gray-600);
  font-weight: 400;
`;

export const LogoContainer = styled.div`
  position: absolute;
  bottom: 12px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const PoweredByText = styled.span`
  color: #514d7e;
  padding-bottom: 2px;
  font-size: 12px;
`;

export const LogoImageWrapper = styled.div`
  width: 90px;
`;
