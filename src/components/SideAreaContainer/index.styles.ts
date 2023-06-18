import styled from '@emotion/styled';

const SideAreaContainerOuter = styled.section<{
  padding?: string;
  mobilePadding?: string;
  sidebarWidth?: number;
}>`
  flex-grow: 1;
  height: 100%;

  ${({ sidebarWidth }) =>
    sidebarWidth
      ? `width: calc(100% - ${sidebarWidth}px);
         margin-left: ${sidebarWidth}px;`
      : 'width: 100%'}

  padding: ${({ padding }) => (padding ? padding : '33px 28px')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  position: absolute;
  transition: marginLeft 0.15s cubic-bezier(0, 1.15, 1, 1);
  top: 0;

  @media (max-width: 768px) {
    padding: ${({ mobilePadding }) =>
      mobilePadding ? mobilePadding : '30px 0 0 0'};
    margin: 0;
    width: 100%;
  }
`;

export { SideAreaContainerOuter };
