import styled from '@emotion/styled';

const CopyContainer = styled.div`
  border-radius: 5px;
  border: 1px solid var(--gray-300);
  background: var(--gray-50);
  color: var(--link-blue);
  font-weight: var(--normal);
  font-size: 13px;
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

export { CopyContainer };
