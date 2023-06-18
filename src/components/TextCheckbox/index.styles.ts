import styled from '@emotion/styled';

const Box = styled.div<{ small?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 93.5%;
  width: 100%;
  gap: ${({ small }) => (small ? '6px' : '10px')};
`;

const ContentContainer = styled.span<{
  hasBackground: boolean;
  small?: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-width: fit-content;
  font-size: ${({ small }) => (small ? '12px' : '16px')};

  ${({ hasBackground }) => {
    return (
      hasBackground &&
      `height: 100%;
        word-break: break-all;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        width: 100%;
        border: 1px solid var(--gray-200);
        border-right: none;
        border-radius: 4px 0 0 4px;
        background: var(--gray-50);`
    );
  }}
`;

const LocationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  p {
    flex-shrink: 0;
  }

  svg {
    display: flex;
    flex-shrink: 0;
  }
`;

const LocationContent = styled.span`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const MoreContent = styled.span`
  display: inline-flex;
  font-size: 12px;
  color: var(--gray-600);
`;

const CheckboxWrapper = styled.div<{ checked: boolean; small?: boolean }>`
  border: 1px solid var(--gray-300);
  background: ${({ checked }) => `var(--${checked ? 'purple-500' : 'white'})`};
  border-radius: 4px;
  height: fit-content;
  cursor: pointer;
  scale: ${({ small }) => (small ? '0.75' : '1')};

  & > div {
    width: 20px;
    height: 20px;
    padding: 2px;
  }
`;

export {
  Box,
  CheckboxWrapper,
  ContentContainer,
  LocationBox,
  LocationContent,
  MoreContent,
};
