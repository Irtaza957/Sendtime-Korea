import styled from '@emotion/styled';

const StyledButtonUnderline = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: var(--normal);
  color: var(--gray-600);
  gap: 5px;
  border-bottom: 1px solid var(--gray-600);
`;

StyledButtonUnderline.defaultProps = {
  type: 'button',
};

export { StyledButtonUnderline };
