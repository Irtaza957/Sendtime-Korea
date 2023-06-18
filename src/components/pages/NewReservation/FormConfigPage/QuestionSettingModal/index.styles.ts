import styled from '@emotion/styled';

export const ModalContainer = styled.div<{ isValidated?: boolean }>`
  min-height: 282px;
  max-height: 80vh;
  overflow-y: auto;
  width: 450px;
  background: var(--white);
  border-radius: 8px;
  text-align: center;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${({ isValidated }) =>
    isValidated
      ? ' 0px 4px 12px #FFA3A3'
      : ' 0px 4px 12px rgba(19, 20, 22, 0.18)'};
  @media (max-width: 767px) {
    width: 100vw;
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

export const QuestionTypeRow = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0px;
`;

export const QuestionTypeIcon = styled.div`
  display: block;
  margin-top: 2.5px;
`;

export const QuestionTypeText = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #60666d;
`;

export const RequiredRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: start;
  font-weight: var(--normal);
  color: #000000;
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

export const CTAWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 14px;
`;

export const OptionContainer = styled.div`
  width: 100%;
  margin: 20px 0px 0px 0px;
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

export const DeleteButtonContainer = styled.div<{
  isOneQuestionAvailable?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: ${({ isOneQuestionAvailable }) =>
    isOneQuestionAvailable ? 'pointer' : 'default'};
`;

export const DeleteText = styled.div<{ isOneQuestionAvailable?: boolean }>`
  font-size: 14px;
  font-weight: var(--regular);
  color: ${({ isOneQuestionAvailable }) =>
    isOneQuestionAvailable ? 'var(--purple-500)' : '#717780'};
`;

export const CustomOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  width: 100%;
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
