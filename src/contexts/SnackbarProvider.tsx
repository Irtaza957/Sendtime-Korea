import React, { createContext, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import useTimeout from '@hooks/useTimeout';
import { Icon } from '@iconify/react';

interface SnackbarInfo {
  message: string;
  type?: 'default' | 'error' | 'up';
}

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

interface ContainerStyleProps extends Required<Omit<SnackbarInfo, 'message'>> {
  isVisible: boolean;
}

interface SnackbarProps {
  snackbarInfo: SnackbarInfo;
}

type SnackbarContextType = null | (({ message, type }: SnackbarInfo) => void);

export const SnackbarContext = createContext<SnackbarContextType>(null);

const SNACKBAR_DISPLAY_TIME = 3000;

const SnackbarProvider = ({ children }: Props) => {
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInfo>({
    message: '',
    type: 'default',
  });

  const showSnackbar = ({ message, type = 'default' }: SnackbarInfo) => {
    setSnackbarInfo({ message, type });
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {snackbarInfo.message && <Snackbar snackbarInfo={snackbarInfo} />}
    </SnackbarContext.Provider>
  );
};

const Snackbar = ({ snackbarInfo }: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { message, type = 'default' } = snackbarInfo;

  useEffect(() => {
    setIsVisible(true);
  }, [snackbarInfo, setIsVisible]);

  useTimeout(() => setIsVisible(false), SNACKBAR_DISPLAY_TIME);

  return (
    <Container isVisible={isVisible} type={type}>
      {message}
      <StyledCloseIcon onClick={() => setIsVisible(false)}>
        <Icon icon="heroicons-solid:x" width={18} color="#6056db" />
      </StyledCloseIcon>
    </Container>
  );
};

const Container = styled.div<ContainerStyleProps>`
  position: fixed;
  min-width: 200px;
  max-width: fit-content;
  height: 45px;
  right: 3%;
  bottom: -4rem;
  border-radius: 40px;
  box-shadow: 0 4px 10px 0 #6600ff24;
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  align-items: center;
  font-size: 13px;
  color: var(--purple-500);
  transition: transform 300ms ease-in-out;
  z-index: var(--very-front);
  padding: 0 15px;
  transform: ${({ isVisible }) =>
    isVisible ? 'translate(0, -5rem)' : 'translate(0, 0)'};

  ${({ isVisible, type }) => {
    if (type === 'default') {
      return `color: var(--purple-500);
      background: var(--purple-100-50);
      border: 1px solid var(--purple-500);`;
    }

    if (type === 'error') {
      return `color: var(--alert);
      background: var(--red-50);
      border: 1px solid var(--red);
      
      `;
    }

    if (type === 'up') {
      return `color: var(--purple-500);
      background: var(--white);
      box-shadow: 0px 4px 40px 0px #75879535;
      padding: 2px 15px;
      height: 35px;
      font-size: 12px;
      top: 10px;
      left: 50%;
      font-weight: var(--regular);
      transform: ${
        isVisible ? 'translate(-50%, 0.5rem)' : 'translate(-50%, -4rem)'
      };`;
    }
  }}
`;

const StyledCloseIcon = styled.div`
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  cursor: pointer;
`;

export default SnackbarProvider;
