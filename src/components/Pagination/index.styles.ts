import styled from '@emotion/styled';

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  gap: 10px;
`;

export const Page = styled.button<{ current?: boolean }>`
  ${({ current }) =>
    `background: var(--${current ? 'purple-500' : 'transparent'});
     color: var(--${current ? 'white' : 'gray-700'});`};
  width: 26px;
  height: 26px;
  font-size: 14px;
  border-radius: 4px;

  :hover {
    background: ${({ current }) =>
      current ? 'var(--purple-500)' : 'var(--purple-100)'};
    color: var(--white);
  }
`;

export const ArrowButton = styled.button`
  padding: 0 5px;
`;
