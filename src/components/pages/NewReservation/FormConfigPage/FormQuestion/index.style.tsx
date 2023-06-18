import styled from '@emotion/styled';

export const FormQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputTopContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const DragWrapper = styled.div`
  width: 28px;
  cursor: grab;
`;

export const InputLabelWrapper = styled.div`
  flex: 1;
`;

export const InputLabel = styled.label`
  display: flex;
  font-size: 14px;
  word-break: break-all;
  color: var(--gray-750);
`;

export const Icon = styled.div`
  margin-right: 1px;
`;

export const MaxFileSize = styled.span`
  margin: 0 0 0 16px;
  font-size: 12px;
  color: var(--gray-500);
`;

export const SettingsIcon = styled.div`
  height: 25px;
  width: 25px;
  padding: 2px;
  flex-shrink: 0;
  cursor: pointer;
  margin: 0 0 0 16px;
`;

export const ToggleButtonContainer = styled.div`
  margin: 0 0 0 16px;
`;

export const InputBottomContainer = styled.div<{
  padding?: string;
}>`
  display: flex;
  width: 100%;
  padding-left: ${({ padding }) => (padding ? padding : '28px')};

  input[type='text'] {
    font-size: 14px;
  }
`;

export const DragHandleContainer = styled.div`
  display: flex;
  width: 28px;
  padding: 4px;
  flex-shrink: 0;
`;

export const TextInputAlert = styled.div`
  text-align: right;
  font-size: 12px;
  color: var(--gray-500);
  margin-top: 4px;
`;

export const BlockBox = styled.div<{
  gap?: number;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  gap: ${({ gap }) => `${gap}px`};
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const DropdownOptions = styled.div`
  font-size: 16px;
  font-weight: 400;
  padding: 4px 0;
  word-break: break-all;
`;

export const RadioButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 35px;
`;

export const RadioButtonLabel = styled.label`
  cursor: pointer;
  font-size: 14px;
  word-break: break-all;
`;

export const OthersOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  div:nth-of-type(2) {
    font-size: 14px;
    width: 100%;
  }
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

export const CheckboxWrapper = styled.div`
  width: 100%;
`;

export const FileUploadWrapper = styled.div`
  width: 100%;
  input[type='file'] {
    display: none;
  }
`;

export const FileUploadButton = styled.div`
  cursor: pointer;
`;

export const FileInput = styled.input`
  cursor: pointer;
`;

export const UploadedFileInfo = styled.div`
  margin-top: 16px;
`;

export const FileInfoHeader = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

export const FileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid #d9e0e8;
  margin-top: 8px;
  font-size: 14px;
`;

export const FileInfoContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: -6px;
`;

export const AttachmentIconContainer = styled.div`
  display: block;
`;

export const FileName = styled.div`
  font-weight: 400;
  font-size: 16px;
  padding-bottom: 6px;
`;

export const DeleteFileContainer = styled.div`
  display: block;
  cursor: pointer;
  margin-bottom: -4px;
`;

export const QuestionWrapper = styled.div`
  width: 100%;
`;

export const FieldHelpText = styled.div`
  font-size: 12px;
  margin: 4px 0px 5px;
`;

export const FieldErrorMessage = styled.div`
  font-size: 11px;
  color: var(--alert);
  margin: 5px 0px 0px 0px;
`;
