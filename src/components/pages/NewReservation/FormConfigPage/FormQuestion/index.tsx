import React, { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import RadioButton from '@components/RadioButton';
import SelectTextInput from '@components/SelectTextInput';
import TextArea from '@components/TextArea';
import TextInput from '@components/TextInput';
import { Required } from '@components/TextInputWithLabel/index.styles';
import TextCheckbox from '@components/UI/Checkbox';
import ToggleButton from '@components/UI/ToggleButton';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ErrorState } from '@hooks/useGuestUserInfo';
import { Icon } from '@iconify/react';

import * as Styled from './index.style';

export const QuestionTypeMaxLength: Record<
  IFormQuestion['questionType'],
  number | null
> = {
  ['NAME']: 50,
  ['EMAIL']: null,
  ['PHONE']: 50,
  ['SHORT_LINE']: 50,
  ['MULTIPLE_LINES']: 200,
  ['RADIO']: null,
  ['CHECK_BOX']: null,
  ['DROP_DOWN']: null,
  ['FILE']: null,
};

type TextInputProps = {
  value?: string;
  isDisable?: boolean;
  onChangeInputQuestion?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type TextAreaProps = {
  value?: string;
  onChangeInputQuestion?: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

type DropdownInputProps = {
  value?: string;
  options?: string[];
  onChangeInputQuestion?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type MultipleChoiceProps = {
  value?: string;
  othersInputValue?: string;
  onChangeOthersInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOptionQuestion?: (index: number) => void;
  options?: string[];
};

type CheckboxesProps = {
  checked?: boolean;
  othersInputValue?: string;
  onChangeOthersInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOptionQuestion?: (index: number) => void;
  options?: string[];
};

type FileUploadProps = {
  onChangeFileInput?: (url: Blob | string, name: string) => void;
  disableFileUploadMessage?: string;
};

type QuestionTypeOptions = {
  icon: JSX.Element;
  text: string;
  type: IFormQuestion['questionType'];
};

type FormQuestionProps = {
  title: string;
  required: boolean;
  isSwitchOn: boolean;
  isSwitchToggleAllowed?: boolean;
  isPreview?: boolean;
  ErrorFields?: ErrorState[];
  isReservationContent?: boolean;
  selectedOptions?: string[];
  nanoId: string;
  isCreateSpace?: boolean;
  helpText?: string;
  supportedFileTypes?: string[];
  icon?: QuestionTypeOptions[];
  onSettingsButtonClick?: () => void;
  setErrorModal?: (show: boolean, value: string) => void;
  onSwitchClick?: () => void;
} & (
  | ({
      questionType: 'SHORT_LINE';
    } & TextInputProps)
  | ({
      questionType: 'MULTIPLE_LINES';
    } & TextAreaProps)
  | ({
      questionType: 'RADIO';
    } & MultipleChoiceProps)
  | ({
      questionType: 'CHECK_BOX';
    } & CheckboxesProps)
  | ({
      questionType: 'DROP_DOWN';
    } & DropdownInputProps)
  | ({
      questionType: 'FILE';
    } & FileUploadProps)
  | ({
      questionType: 'EMAIL';
    } & TextInputProps)
  | ({
      questionType: 'NAME';
    } & TextInputProps)
  | ({
      questionType: 'PHONE';
    } & TextInputProps)
);

function FormQuestion(props: FormQuestionProps) {
  const {
    title,
    questionType,
    required,
    isSwitchOn,
    isSwitchToggleAllowed,
    isPreview,
    ErrorFields,
    isReservationContent,
    nanoId,
    supportedFileTypes,
    icon,
    setErrorModal,
    onSettingsButtonClick,
    onSwitchClick,
  } = props;

  const defaultFileDetail: FileDetails = {
    lastModified: 0,
    lastModifiedDate: new Date(),
    name: '',
    size: 0,
    type: '',
    webkitRelativePath: '',
  };
  const { t } = useTranslation('guestQuestionare');
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [uploadedFileInfo, setUploadedFileInfo] =
    useState<FileDetails>(defaultFileDetail);

  const isErrorInQuestion = () => {
    let isError = -1;
    ErrorFields?.forEach((element, index) => {
      if (element.questionNanoId === nanoId) {
        isError = index;
      }
    });
    return isError;
  };

  const renderInputArea = () => {
    switch (questionType) {
      case 'SHORT_LINE': {
        const {
          value = '',
          onChangeInputQuestion = () => {},
          isCreateSpace = false,
          isDisable = false,
          helpText = '',
        } = props;
        const isError = isErrorInQuestion();
        const errorMessage =
          isError >= 0 && ErrorFields?.[isError].errorMessage;
        return (
          <Styled.QuestionWrapper>
            {helpText && (
              <Styled.FieldHelpText>{helpText}</Styled.FieldHelpText>
            )}
            <TextInput
              value={value}
              onChange={onChangeInputQuestion}
              required={required}
              inputPadding={5}
              disabled={isDisable}
            />
            {isError >= 0 && (
              <Styled.FieldErrorMessage>
                {errorMessage}
              </Styled.FieldErrorMessage>
            )}
            <Styled.TextInputAlert>
              {!isCreateSpace
                ? `(${value.length}/${QuestionTypeMaxLength[questionType]})`
                : '\u00A0'}
            </Styled.TextInputAlert>
          </Styled.QuestionWrapper>
        );
      }
      case 'MULTIPLE_LINES': {
        const { value = '', onChangeInputQuestion = () => {} } = props;
        const isError = isErrorInQuestion();
        const errorMessage =
          isError >= 0 && ErrorFields?.[isError]?.errorMessage;
        return (
          <Styled.QuestionWrapper>
            <TextArea
              value={value}
              onChange={onChangeInputQuestion}
              required={required}
            />
            {isError >= 0 && (
              <Styled.FieldErrorMessage>
                {errorMessage}
              </Styled.FieldErrorMessage>
            )}
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.QuestionWrapper>
        );
      }
      case 'EMAIL': {
        const { value = '', onChangeInputQuestion = () => {} } = props;
        const isError = isErrorInQuestion();
        const errorMessage =
          isError >= 0 && ErrorFields?.[isError].errorMessage;
        return (
          <Styled.QuestionWrapper>
            <TextInput
              value={value}
              onChange={onChangeInputQuestion}
              required={required}
              inputPadding={5}
            />
            {isError >= 0 && (
              <Styled.FieldErrorMessage>
                {errorMessage}
              </Styled.FieldErrorMessage>
            )}
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.QuestionWrapper>
        );
      }
      case 'NAME': {
        const { value = '', onChangeInputQuestion = () => {} } = props;
        const isError = isErrorInQuestion();
        const errorMessage =
          isError >= 0 && ErrorFields?.[isError].errorMessage;
        return (
          <Styled.QuestionWrapper>
            <TextInput
              value={value}
              onChange={onChangeInputQuestion}
              required={required}
              inputPadding={5}
            />
            {isError >= 0 && (
              <Styled.FieldErrorMessage>
                {errorMessage}
              </Styled.FieldErrorMessage>
            )}
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.QuestionWrapper>
        );
      }
      case 'PHONE': {
        const { value = '', onChangeInputQuestion = () => {} } = props;
        const isError = isErrorInQuestion();
        const errorMessage =
          isError >= 0 && ErrorFields?.[isError].errorMessage;
        return (
          <Styled.QuestionWrapper>
            <TextInput
              value={value}
              onChange={onChangeInputQuestion}
              required={required}
              inputPadding={5}
            />
            {isError >= 0 && (
              <Styled.FieldErrorMessage>
                {errorMessage}
              </Styled.FieldErrorMessage>
            )}
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.QuestionWrapper>
        );
      }
      case 'DROP_DOWN': {
        const {
          value = '',
          options = [],
          onChangeInputQuestion = () => {},
        } = props;
        const textOptions = options.map((value) => ({
          text: value,
          value,
        }));
        return (
          <Styled.DropdownContainer>
            <SelectTextInput
              value={value}
              onClickSelectBox={onChangeInputQuestion}
              selectValues={textOptions}
              inputPadding={5}
            />
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.DropdownContainer>
        );
      }
      case 'RADIO': {
        const {
          value = '',
          othersInputValue = '',
          onChangeOthersInput = () => {},
          onChangeOptionQuestion = () => {},
          options = [],
        } = props;
        return (
          <Styled.BlockBox gap={8}>
            {options.map((option, index) => {
              return (
                <Styled.RadioButtonWrapper key={index}>
                  <RadioButton
                    checked={value === option}
                    onClick={() => onChangeOptionQuestion(index)}
                  >
                    <Styled.RadioButtonLabel>
                      <>
                        {option === 'Other' ? (
                          <>
                            <Styled.OthersOption>
                              <Styled.OptionName>
                                {t(`addQuestion.other`)}
                              </Styled.OptionName>
                              <Styled.OtherOptionText>
                                <TextInput
                                  value={othersInputValue}
                                  placeholder={t('formQuestion.typeYourAnswer')}
                                  inputPadding={0}
                                  height={35}
                                  onChange={
                                    value === option
                                      ? onChangeOthersInput
                                      : () => {}
                                  }
                                />
                              </Styled.OtherOptionText>
                            </Styled.OthersOption>
                          </>
                        ) : (
                          option
                        )}
                      </>
                    </Styled.RadioButtonLabel>
                  </RadioButton>
                </Styled.RadioButtonWrapper>
              );
            })}
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.BlockBox>
        );
      }
      case 'CHECK_BOX': {
        const {
          selectedOptions = [],
          othersInputValue = '',
          onChangeOthersInput = () => {},
          onChangeOptionQuestion = () => {},
          options = [],
        } = props;
        return (
          <Styled.BlockBox alignItems={'flex-start'} gap={8}>
            {options.map((option, index) => {
              return (
                <Styled.RadioButtonWrapper key={index}>
                  <TextCheckbox
                    checked={selectedOptions?.includes(option)}
                    onClick={() => onChangeOptionQuestion(index)}
                  >
                    <>
                      {option === 'Other' ? (
                        <>
                          <Styled.OthersOption>
                            <Styled.OptionName>
                              {t(`addQuestion.other`)}
                            </Styled.OptionName>
                            <Styled.OtherOptionText
                              onClick={(e) => e.stopPropagation()}
                            >
                              <TextInput
                                value={othersInputValue}
                                placeholder={t('formQuestion.typeYourAnswer')}
                                inputPadding={0}
                                height={35}
                                onChange={onChangeOthersInput}
                              />
                            </Styled.OtherOptionText>
                          </Styled.OthersOption>
                        </>
                      ) : (
                        option
                      )}
                    </>
                  </TextCheckbox>
                </Styled.RadioButtonWrapper>
              );
            })}
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.BlockBox>
        );
      }
      case 'FILE': {
        const {
          onChangeFileInput = () => {},
          disableFileUploadMessage,
          helpText = '',
        } = props;
        const handleClick = () => {
          if (disableFileUploadMessage) {
            alert(disableFileUploadMessage);
            return;
          }
          if (hiddenFileInput.current != null) {
            hiddenFileInput.current.click();
          }
        };
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files !== null) {
            const fileUploaded = event.target.files[0];
            const ftype = fileUploaded.type.split('/')[1];
            if (
              supportedFileTypes &&
              supportedFileTypes?.length > 0 &&
              !supportedFileTypes.includes(ftype)
            ) {
              event.target.value = '';
              alert(t('alert.onlyImage'));
              return;
            }
            const fsize = Number((fileUploaded.size / 1048576).toFixed(2));
            if (fsize > 10) {
              setErrorModal?.(true, t('fileUploadErr.description'));
              return;
            }
            onChangeFileInput(fileUploaded, fileUploaded.name);
            setUploadedFileInfo(fileUploaded as unknown as FileDetails);
            // Reset file input so that same file can be added again
            event.target.value = '';
          }
        };
        const resetFile = () => {
          setUploadedFileInfo(defaultFileDetail);
          onChangeFileInput('', '');
        };

        return (
          <Styled.FileUploadWrapper>
            {helpText && (
              <Styled.FieldHelpText>{helpText}</Styled.FieldHelpText>
            )}
            <Styled.FileUploadButton onClick={handleClick}>
              <StyledButton
                width="100%"
                borderRadius={100}
                bgColor={'white'}
                color={isPreview ? 'purple-500' : 'gray-700'}
                borderColor={isPreview ? 'purple-500' : 'gray-700'}
                withBorder
                hover={isPreview ? true : false}
                icon={{
                  icon: 'ic:outline-attach-file',
                  color: 'red',
                  width: 22,
                }}
              >
                {t('formQuestion.fileUpload.UploadFile')}
              </StyledButton>
            </Styled.FileUploadButton>
            {isReservationContent && (
              <Styled.FileInput
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
              />
            )}
            {uploadedFileInfo?.size > 0 && (
              <Styled.UploadedFileInfo>
                <Styled.FileInfoHeader>
                  {t('formQuestion.fileUpload.file')}
                </Styled.FileInfoHeader>
                <Styled.FileInfoWrapper>
                  <Styled.FileInfoContainer>
                    <Styled.AttachmentIconContainer>
                      <Icon
                        icon="quill:attachment"
                        width={22}
                        height={22}
                        color="#303336"
                      />
                    </Styled.AttachmentIconContainer>
                    <Styled.FileName>{uploadedFileInfo.name}</Styled.FileName>
                  </Styled.FileInfoContainer>
                  <Styled.DeleteFileContainer onClick={resetFile}>
                    <Icon
                      icon="ic:outline-delete"
                      width={20}
                      height={20}
                      color="#60666D"
                    />
                  </Styled.DeleteFileContainer>
                </Styled.FileInfoWrapper>
              </Styled.UploadedFileInfo>
            )}
            <Styled.TextInputAlert>{'\u00A0'}</Styled.TextInputAlert>
          </Styled.FileUploadWrapper>
        );
      }
    }
  };
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: nanoId as unknown as UniqueIdentifier,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <Styled.FormQuestionContainer ref={setNodeRef} style={style}>
      <Styled.InputTopContainer>
        {!(isReservationContent || isPreview) && (
          <Styled.DragWrapper {...attributes} {...listeners}>
            <Styled.DragHandleContainer>
              <Icon icon="ic:baseline-drag-indicator" width={'100%'} />
            </Styled.DragHandleContainer>
          </Styled.DragWrapper>
        )}
        <Styled.InputLabelWrapper>
          <Styled.InputLabel>
            {icon?.map((item, index) => {
              return (
                <Styled.Icon key={index}>
                  {item.type === questionType && item.icon}
                </Styled.Icon>
              );
            })}
            {title}
            {required && <Required>*</Required>}
          </Styled.InputLabel>
        </Styled.InputLabelWrapper>
        {questionType === 'FILE' && (
          <Styled.MaxFileSize>
            ({t('formQuestion.fileUpload.maxSize')})
          </Styled.MaxFileSize>
        )}
        {onSettingsButtonClick && !isPreview && (
          <Styled.SettingsIcon>
            <Icon
              icon="uil:setting"
              color="var(--purple-500)"
              width={'100%'}
              onClick={onSettingsButtonClick}
            />
          </Styled.SettingsIcon>
        )}
        {onSwitchClick && isSwitchToggleAllowed && !isPreview && (
          <Styled.ToggleButtonContainer>
            <ToggleButton
              active={isSwitchOn ?? false}
              onClick={onSwitchClick}
            />
          </Styled.ToggleButtonContainer>
        )}
      </Styled.InputTopContainer>
      <Styled.InputBottomContainer padding={isPreview ? '0px' : ''}>
        {renderInputArea()}
      </Styled.InputBottomContainer>
    </Styled.FormQuestionContainer>
  );
}

export default FormQuestion;
