import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const animateFromBottom = keyframes`
from {
  transform: translate3d(0, 10px, 0);
  opacity: 0
}
to {
  transform: translate3d(0, 0, 0);
  opacity: 1
}
`;

export const ModalContainer = styled.div<{ isValidated?: boolean }>`
  max-height: 110vh;
  overflow-y: auto;
  width: 460px;
  background: var(--white);
  border-radius: 8px;
  text-align: center;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 12px rgba(19, 20, 22, 0.18);
  animation: ${animateFromBottom} 0.2s;
  box-shadow: ${({ isValidated }) =>
    isValidated
      ? ' 0px 4px 12px #FFA3A3'
      : ' 0px 4px 12px rgba(19, 20, 22, 0.18)'};
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: var(--regular);
  color: var(--gray-900);
`;

export const CrossBtnWrapper = styled.div`
  align-self: center;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;
`;

export const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: start;
  font-weight: var(--normal);
  color: #000000;
`;

export const RequiredRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
`;

export const CheckboxText = styled.div`
  color: #000000;
  font-size: 14px;
`;

export const QuestionTitleRow = styled.div`
  width: 100%;
`;

export const OptionContainer = styled.div`
  width: 100%;
  margin: 20px 0px 0px 0px;
`;

export const CTAWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0px;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0px;
  gap: 8px;
`;

export const InputWrapper = styled.div`
  flex: 1;
`;

export const DragHandleContainer = styled.div`
  display: flex;
  width: 22px;
  flex-shrink: 0;
  cursor: grab;
`;

export const CustomOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  width: 100%;
`;

export const AddOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--purple-500);
  font-size: 15px;
  font-weight: 400;
  margin: 12px 0px;
  cursor: pointer;
`;

export const EmptyFieldMessage = styled.div`
  width: 100%;
  font-size: 14px;
  margin-top: 16px;
  text-align: left;
  color: #fd0000;
`;

export const OtherOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0px;
  gap: 8px;
  margin-left: 30px;
`;

export const OptionName = styled.div`
  display: flex;
  word-break: initial;
`;

export const OtherOptionText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
