import React, { ChangeEvent, MouseEvent } from 'react';

import StyledButton from '@components/Button';
import FormQuestion from '@components/pages/NewReservation/FormConfigPage/FormQuestion';
import { SubSection } from '@components/Reservation/Common';
import { Box } from '@components/ScheduleItem/index.styles';
import TextArea from '@components/TextArea';
import TextInput from '@components/TextInput';
import useCustomPage from '@hooks/useCustomPage';
import useLoading from '@hooks/useLoading';
import { Icon } from '@iconify/react';

import {
  ButtonContainer,
  ContentContainer,
  HideButton,
  NestedModalContainer,
  NestedModalContent,
  NestedModalTitle,
} from './index.styles';

export interface NestedPageModalProps {
  hideModal: () => void;
  parentId: string;
  pageTitle?: string;
  pageDescription?: string;
  questions: IFormQuestion[];
  answers?: AnswerType[];
  updatePage?: () => void;
  customPageId?: string;
  edit?: boolean;
}

const NestedPageModal = (props: NestedPageModalProps) => {
  const {
    nestedInfo,
    isLoading,
    handleMakePage,
    handleChangePageTitle,
    handleChangePageDescription,
    onChangeInputQuestion,
    onChangeOptionQuestion,
    onChangeOthersInput,
  } = useCustomPage(props);

  const { loadingView } = useLoading();

  return (
    <NestedModalContainer>
      {isLoading && loadingView()}
      <ButtonContainer>
        <HideButton onClick={props.hideModal}>
          <Icon
            icon="eva:close-outline"
            width="50"
            height="35"
            color="#A6B5C6"
          />
        </HideButton>
      </ButtonContainer>

      <ContentContainer>
        <Box gap="25px">
          <Box>
            <NestedModalTitle>예약자 맞춤 예약 페이지</NestedModalTitle>
            <NestedModalContent>
              기존 예약페이지에 예약페이지 이름, 설명을 예약자 한 사람에 맞춰
              변경하고 <br />
              예약자의 개인정보를 내가 기입해 예약자가 기입하지 않고 예약할 수
              있도록 해보세요.
            </NestedModalContent>
          </Box>

          <Box gap="15px">
            <SubSection subTitle="예약 페이지 이름" required>
              <TextInput
                value={nestedInfo.pageTitle.value}
                onChange={handleChangePageTitle}
                inputPadding={8}
              />
            </SubSection>
            <SubSection subTitle="예약 페이지 설명">
              <TextArea
                value={nestedInfo.pageDescription.value}
                onChange={handleChangePageDescription}
                placeholder="예약자가 알아야 하는 정보를 입력해주세요."
              />
            </SubSection>
          </Box>
        </Box>

        <Box gap="25px">
          <Box>
            <NestedModalTitle>예약자 개인정보 미리 입력하기</NestedModalTitle>
            <NestedModalContent>
              예약자가 더 편리하게 예약할 수 있도록 내가 알고 있는 예약자의
              개인정보를 미리 입력해보세요.
            </NestedModalContent>
          </Box>
          <Box>
            {nestedInfo.questions.map(
              (question: IFormQuestion, index: number) => (
                <FormQuestion
                  key={index}
                  nanoId={question.nanoId}
                  title={question.title}
                  questionType={question.questionType}
                  required={false}
                  isSwitchOn={question.isSwitchOn}
                  options={question.options}
                  selectedOptions={question.selectedOptions}
                  isPreview={true}
                  isReservationContent={true}
                  ErrorFields={[]}
                  disableFileUploadMessage={'파일은 미리 업로드할 수 없습니다.'}
                  value={question.value}
                  onChangeInputQuestion={(
                    e:
                      | ChangeEvent<HTMLInputElement>
                      | ChangeEvent<HTMLTextAreaElement>
                      | MouseEvent<HTMLButtonElement>
                  ) => onChangeInputQuestion(e, question)}
                  onChangeOptionQuestion={(optionIndex: number) =>
                    onChangeOptionQuestion(optionIndex, question)
                  }
                  othersInputValue={question.othersInputValue}
                  onChangeOthersInput={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangeOthersInput(e, question)
                  }
                />
              )
            )}
          </Box>
        </Box>

        <StyledButton
          size="big"
          align="center"
          padding="15px 80px"
          onClickButton={handleMakePage}
        >
          {props.edit ? '수정하기' : '만들기'}
        </StyledButton>
      </ContentContainer>
    </NestedModalContainer>
  );
};

export default NestedPageModal;
