import styled from '@emotion/styled';

export const TitleContainer = styled.div<{
  withNotice?: boolean;
  margin?: string;
  padding?: string;
  fontSize?: string;
}>`
  width: 100%;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '22px')};
  font-weight: var(--semi-bold);
  color: var(--gray-800);
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  position: relative;
  min-height: ${({ withNotice }) => (withNotice ? '93px' : 'auto')};

  @media (max-width: 768px) {
    padding: 0;
    display: flex;
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
    justify-content: center;
    position: relative;
    min-height: auto;
  }
`;

export const HamburgerButton = styled.button`
  display: flex;
  align-self: flex-start;
  padding: 0 15px;
  position: absolute;
  top: 6px;
  left: 0;
  background: var(--white);
`;

export const MobileSidebarContainer = styled.div`
  display: flex;
  z-index: var(--very-very-front);
  position: fixed;
  width: fit-content;
  top: 0;
  left: 0;
  bottom: 0;
  animation: slideRight 300ms cubic-bezier(0.51, -0.01, 0, 1.01);
`;

export const DimmedSidebar = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--gray-800-70);
  z-index: var(--very-front);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
