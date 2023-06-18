import React from 'react';
import MediaQuery from 'react-responsive';

import styled from '@emotion/styled';

import Sidebar from '../Sidebar';

interface WithSidebarComponentProps {
  children: React.ReactNode;
  padding?: string;
}

const WithSidebarComponentContainer = styled.div<{ padding?: string }>`
  width: 100%;
  height: 100vh;
  padding: ${({ padding }) => (padding ? padding : '0 0 0 0')};
  overflow: auto;
`;

const WithSidebarComponent = ({
  padding,
  children,
}: WithSidebarComponentProps) => {
  return (
    <WithSidebarComponentContainer padding={padding}>
      <MediaQuery minWidth={769}>
        <Sidebar />
      </MediaQuery>

      {children}
    </WithSidebarComponentContainer>
  );
};

export default WithSidebarComponent;
