import styled from '@emotion/styled';

const ModalDimmedContainer = styled.section`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-800-70);
  z-index: var(--very-front);
  overflow: hidden;
  position: fixed;
`;

/* ConfirmModalContainer */

const ConfirmModalContainer = styled.div`
  width: 400px;
  height: 520px;
  background: var(--white);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px;

  button {
    width: 100%;
  }
`;

const Wrapper = styled.div<{ alignItems?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  gap: 20px;
  width: 100%;
`;

const ModalTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-800);
  margin: 8px 0 10px 0;
`;

const ModalContent = styled.div`
  white-space: pre-line;
  font-size: 14px;
  line-height: 1.6;
`;

const ContentLine = styled.p`
  text-align: center;
  color: var(--gray-750);
`;

/* Delete Modal Container */

const DeleteModalContainer = styled.div`
  width: 440px;
  height: 300px;
  background: var(--white);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 45px;

  button {
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
`;

const Flex = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const Box = styled.div<{ flex?: boolean; gap?: number; width?: string }>`
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  gap: ${({ gap }) => (gap ? gap : 0)}px;
  width: ${({ width }) => (width ? width : '')};
  justify-content: center;
  align-items: center;
`;

/* Calendar Modal Container */

const CalendarParentContainer = styled.div`
  /* position: relative;
  display: none; */
`;

const CalendarChildrenContainer = styled.div`
  position: absolute;
`;

/* MiniConfirmModalContainer */

const MiniConfirmModalContainer = styled.div`
  width: 300px;
  height: 200px;
  background: var(--white);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 50px;
  gap: 30px;
`;

/* Default Modal Container */

const DefaultModalContainer = styled.div`
  min-width: 350px;
  min-height: 200px;
  background: var(--white);
  border-radius: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 30px 40px;

  button {
    width: 100%;
    min-width: 100px;
    max-width: fit-content;
  }
`;

const DefaultModalContent = styled(ModalContent)`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px 0;
`;

export {
  Box,
  CalendarChildrenContainer,
  CalendarParentContainer,
  ConfirmModalContainer,
  ContentLine,
  DefaultModalContainer,
  DefaultModalContent,
  DeleteModalContainer,
  Flex,
  IconWrapper,
  MiniConfirmModalContainer,
  ModalContent,
  ModalDimmedContainer,
  ModalTitle,
  Wrapper,
};
