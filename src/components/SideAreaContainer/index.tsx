import React from 'react';

import { useSidebar } from '@contexts/SidebarProvider';

import { SideAreaContainerOuter } from './index.styles';

interface SideAreaContainerProps {
  padding?: string;
  mobilePadding?: string;
  children: React.ReactNode;
}

const SideAreaContainer = ({ padding, mobilePadding, children }: SideAreaContainerProps) => {
  const { sidebarWidth } = useSidebar();

  return (
    <SideAreaContainerOuter padding={padding || ''} mobilePadding={mobilePadding || ''} sidebarWidth={sidebarWidth}>
      {children}
    </SideAreaContainerOuter>
  );
};

export default SideAreaContainer;
