import React, { useState } from 'react';
import MediaQuery from 'react-responsive';

import Notice from '@components/Notice';
import Sidebar from '@components/Sidebar';
import { Icon } from '@iconify/react';

import {
  DimmedSidebar,
  HamburgerButton,
  MobileSidebarContainer,
  TitleContainer,
} from './index.styles';

interface TitleProps {
  children: React.ReactNode;
  notice?: string;
  margin?: string;
  padding?: string;
  fontSize?: string;
}

const Title = ({ children, notice, margin, padding, fontSize }: TitleProps) => {
  const [open, setOpen] = useState(false);

  const handleSidebarClick = () => {
    setOpen(true);
  };

  const handleCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <TitleContainer
      margin={margin}
      padding={padding}
      withNotice={!!notice}
      fontSize={fontSize}
    >
      {open && (
        <DimmedSidebar onClick={handleCloseSidebar}>
          <MobileSidebarContainer>
            <Sidebar onHover={false} isSidebarOpen={true} />
          </MobileSidebarContainer>
        </DimmedSidebar>
      )}
      <MediaQuery maxWidth={768}>
        <HamburgerButton onClick={handleSidebarClick}>
          <Icon icon="charm:menu-hamburger" width={25} />
        </HamburgerButton>
      </MediaQuery>
      {children}

      <MediaQuery minWidth={769}>
        {''}
        {notice && <Notice content={notice} />}
      </MediaQuery>
    </TitleContainer>
  );
};

export default Title;
