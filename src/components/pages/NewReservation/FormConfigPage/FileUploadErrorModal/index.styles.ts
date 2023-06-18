import styled from '@emotion/styled';

export const ModalContainer = styled.div`
  max-width: 544px;
  min-height: 160px;
  height: max-content;
  width: 100%;
  background: var(--white);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 12px rgba(19, 20, 22, 0.18);
  @media (max-width: 767px) {
    width: 100vw;
    min-width: unset;
    max-width: unset;
  }
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
`;

export const WarningIcon = styled.div`
  margin-top: 5px;
`;

export const Title = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 24px;
  font-weight: var(--regular);
  color: var(--gray-900);
`;

export const CrossBtnWrapper = styled.div`
  align-self: center;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  margin-top: 16px;
  font-size: 20px;
  font-weight: 400;
`;

export const OkayContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const OkayText = styled.p`
  color: #131416;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
