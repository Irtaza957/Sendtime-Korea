import styled from '@emotion/styled';

export const ReservationItemContainer = styled.div<{
  isNestedPageExisting: boolean;
  isThirdPartyPageExisting: boolean;
}>`
  display: flex;
  flex-direction: column;
  ${({ isNestedPageExisting, isThirdPartyPageExisting }) =>
    (isNestedPageExisting || isThirdPartyPageExisting) &&
    `border-bottom: 1px solid var(--gray-400);`}
`;

export const NestedPageContainer = styled.div`
  & > button:not(:last-of-type) {
    border-bottom: 1px solid var(--gray-200);
  }
`;

export const MainPageWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-400);
  padding: 12px 15px;
  gap: 5px;
  background: var(--white);
  ${({ isActive }) => isActive && `cursor: pointer;`}

  @media (max-width: 768px) {
    gap: 6px;
  }

  &:not(:disabled):hover {
    ${({ isActive }) => isActive && `background-color: var(--gray-100);`}
  }
`;

export const ReservationHeader = styled.div<{ isToggleButtonOn: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  opacity: ${({ isToggleButtonOn }) => !isToggleButtonOn && `50%`};

  button:disabled {
    cursor: initial;
  }
`;

export const ReservationTitle = styled.h2`
  color: var(--gray-800);
  font-size: 15px;
  line-height: 20px;
  font-weight: var(--regular);
  word-break: break-all;
`;

export const ReservationBody = styled.div<{ isToggleButtonOn: boolean }>`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  font-weight: var(--regular);
  color: var(--gray-750);
  gap: 6px;

  opacity: ${({ isToggleButtonOn }) => !isToggleButtonOn && `50%`};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AttendeeInfo = styled.div`
  color: inherit;
  margin-top: 5px;
`;

export const Badge = styled.span`
  padding: 3px 6px;
  color: var(--gray-750);
  background-color: var(--gray-200);
  border-radius: 4px;
  font-size: 12px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ReservationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 6px;

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;

export const ButtonsContainer = styled.div<{ isToggleButtonOn: boolean }>`
  display: flex;
  gap: 16px;
  align-items: center;
  opacity: ${({ isToggleButtonOn }) => !isToggleButtonOn && `50%`};
`;

export const ReservationPageButtonWrapper = styled.span`
  display: inline-flex;
  gap: 4px;
  align-items: center;
`;

export const FooterButton = styled.button`
  padding: 6px 0px;
  font-size: 13px;
  color: var(--gray-700);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  position: relative;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 10px;

  span {
    font-weight: var(--regular);
  }

  &:not(:disabled):hover {
    span {
      color: var(--blue-500);
    }

    path {
      fill: var(--blue-500);
    }
  }

  span {
    margin-top: 2px;
  }

  :disabled {
    background: inherit;
    cursor: initial;
  }
`;

export const Info = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  border-radius: 12px;
  background: var(--white);
  padding: 18px;
  box-shadow: 0 4px 20px 0 #75879540;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  width: 550px;
  line-height: 1.4;
  z-index: var(--front);
`;

export const InfoTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--gray-800);
`;

export const InfoContent = styled.div`
  line-height: 1.6;
`;

export const ToggleContainer = styled.span`
  display: inline-flex;
  font-size: 13px;
  gap: 8px;
  align-items: center;
`;

export const NestedPageWrapper = styled.div<{ isNestedPagesVisible: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ isNestedPagesVisible }) =>
    isNestedPagesVisible ? `auto` : '0'};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.52, 1.42, 1, 1);
  align-items: flex-end;

  & > div {
    padding: ${({ isNestedPagesVisible }) =>
      isNestedPagesVisible ? '12px 15px' : '0 20px'};
    transition: padding-top 0.3s cubic-bezier(0.52, 1.42, 1, 1);
  }
`;

export const NestedToggleBar = styled.button<{ isContentVisible: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 30px;
  width: calc(100% - 30px);
  border-left: 10px solid var(--gray-300);
  padding: 10px 12px;
  font-size: 14px;
  color: var(--gray-750);
  gap: 4px;
  background: var(--white);
  cursor: pointer;

  ${({ isContentVisible }) =>
    isContentVisible && `border-bottom: 1px solid var(--gray-200);`}

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const CustomModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 430px;
  padding: 0 20px;
`;

export const ModalContentBox = styled.div`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 18px;
  border: 1px solid var(--gray-500);
  font-weight: 500;
  border-radius: 4px;
  background: var(--gray-50);
  text-align: center;
  color: var(--gray-800);
  word-break: break-word;
`;
