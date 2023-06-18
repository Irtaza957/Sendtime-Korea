import styled from '@emotion/styled';

const DropdownContainer = styled.div<{
  position?: string;
  top?: string;
  width?: string;
}>`
  width: ${({ width }) => (width ? width : 'max-content')};
  position: ${({ position }) => (position ? position : 'relative')};
  top: ${({ top }) => (top ? top : '0')};
`;

export { DropdownContainer };
