import styled from '@emotion/styled';

export const NoticeContainer = styled.div<{ open?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 10px;
  border: 1px solid var(--gray-400);
  border-radius: 8px;
  background: var(--white);
  font-size: 14px;
  gap: 20px;
  min-width: 80px;
  width: fit-content;
  z-index: var(--semi-middle);
  max-width: 500px;

  ${({ open }) => {
    return !open
      ? `align-items: center;
         overflow: hidden;
       `
      : `position: absolute;
         box-shadow: 0 4px 6px 0 #75879525;`;
  }}
`;

export const MoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Left = styled.div<{ open?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  ${({ open }) => {
    return open && `padding-top: 3px;`;
  }}
`;

export const Content = styled.div<{ open?: boolean }>`
  max-width: 365px;
  word-break: break-all;
  font-weight: var(--normal);
  line-height: 1.5;

  ${({ open }) => {
    return (
      !open &&
      `overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      `
    );
  }};
`;
