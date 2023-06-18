import styled from '@emotion/styled';

export const MoreButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  flex-basis: 20%;
`;

export const MoreButton = styled.button`
  height: 20px;
  transform: rotate(90deg);
  height: 100%;
`;

export const MoreModalContents = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 8px;
  width: 150px;
  position: absolute;
  top: 0;
  right: 30px;
  box-shadow: 0 4px 20px 0 #75879540;
  z-index: var(--front);
  overflow: hidden;

  button:not(:last-of-type) {
    border-bottom: 1px solid var(--gray-300);
  }
`;

export const Content = styled.button<{ alert?: boolean; disabled?: boolean }>`
  padding: 14px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--regular);
  color: ${({ alert }) => (alert ? 'var(--alert)' : 'var(--gray-800)')};
  line-height: 1.6;

  ${({ disabled }) => disabled && `color: var(--gray-300)`};

  &:hover {
    background: var(--gray-50);
  }
`;
