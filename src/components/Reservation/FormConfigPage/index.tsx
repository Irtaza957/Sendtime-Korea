import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import AddQuestionModal from '@components/pages/NewReservation/FormConfigPage/AddQuestionModal';
import FormQuestion from '@components/pages/NewReservation/FormConfigPage/FormQuestion';
import QuestionSettingModal from '@components/pages/NewReservation/FormConfigPage/QuestionSettingModal';
import { PAGE_TYPE } from '@constants/utils';
import { useGroupReservation } from '@contexts/GroupReservationProvider';
import { useReservation } from '@contexts/ReservationProvider';
import { closestCenter, DndContext, UniqueIdentifier } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DropdownIcon, Paragraph } from '@Icon/Icons/Utils';
import { Icon } from '@iconify/react';

import { Box } from '../index.styles';

import * as Styled from './index.style';

interface FormConfigPageProps {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
}

const defaultQuestion: IFormQuestion = {
  nanoId: '',
  questionType: 'SHORT_LINE',
  title: '',
  isContainEtc: false,
  isRequired: false,
  isSwitchOn: false,
  isSwitchToggleAllowed: false,
};

const FormConfigPage: React.FC<FormConfigPageProps> = ({ type }) => {
  const { t } = useTranslation('guestQuestionare');
  const [showSetting, setShowSetting] = useState(false);
  const [showAddQuestion, setAddQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<IFormQuestion>(defaultQuestion);
  const [isExceedCount, setIsExceedCount] = useState(true);

  const {
    pageInfo: personalPageInfo,
    setPageInfo: setPersonalPageInfo,
    onClickTogglePreview: onClickTogglePreviewPersonal,
  } = useReservation();
  const {
    pageInfo: groupPageInfo,
    setPageInfo: setGroupPageInfo,
    onClickTogglePreview: onClickTogglePreviewGroup,
  } = useGroupReservation();
  const questionTypeOptions: {
    icon: JSX.Element;
    text: string;
    type: IFormQuestion['questionType'];
  }[] = [
    {
      icon: (
        <Icon
          icon="fluent:line-horizontal-1-20-regular"
          color="#B4B4B4"
          width={16}
          height={16}
        />
      ),
      text: `${t('addQuestion.questionTypeOptions.shortAnswer')}`,
      type: 'SHORT_LINE',
    },
    {
      icon: <Paragraph />,
      text: `${t('addQuestion.questionTypeOptions.paragraph')}`,
      type: 'MULTIPLE_LINES',
    },
    {
      icon: (
        <Icon
          icon="icon-park-twotone:edit-name"
          color="#B4B4B4"
          width={16}
          height={16}
        />
      ),
      text: `${t('addQuestion.questionTypeOptions.name')}`,
      type: 'NAME',
    },
    {
      icon: (
        <Icon icon="ic:outline-email" color="#B4B4B4" width={16} height={16} />
      ),
      text: `${t('addQuestion.questionTypeOptions.email')}`,
      type: 'EMAIL',
    },
    {
      icon: (
        <Icon
          icon="material-symbols:phone-enabled-outline"
          color="#B4B4B4"
          width={16}
          height={16}
        />
      ),
      text: `${t('addQuestion.questionTypeOptions.phoneNumber')}`,
      type: 'PHONE',
    },
    {
      icon: (
        <Icon
          icon="carbon:radio-button-checked"
          color="#B4B4B4"
          width={16}
          height={16}
        />
      ),
      text: `${t('addQuestion.questionTypeOptions.multipleOptions')}`,
      type: 'RADIO',
    },
    {
      icon: (
        <Icon
          icon="ci:checkbox-unchecked"
          color="#B4B4B4"
          width={16}
          height={16}
        />
      ),
      text: `${t('addQuestion.questionTypeOptions.checkBoxes')}`,
      type: 'CHECK_BOX',
    },
    {
      icon: <DropdownIcon />,
      text: `${t('addQuestion.questionTypeOptions.dropdown')}`,
      type: 'DROP_DOWN',
    },
    {
      icon: (
        <Icon
          icon="clarity:attachment-line"
          color="#B4B4B4"
          width={16}
          height={16}
        />
      ),
      text: `${t('addQuestion.questionTypeOptions.fileUpload')}`,
      type: 'FILE',
    },
  ];
  const [questions, setQuestions] = useState(
    type === PAGE_TYPE.personal
      ? personalPageInfo.form.questions
      : groupPageInfo.form.questions
  );
  const questionIds = useMemo(
    () => questions.map((question) => question.nanoId),
    [questions]
  );
  const questionsBoxRef: RefObject<HTMLDivElement> = useRef(null);

  const onClickSetting = (question: IFormQuestion) => {
    setSelectedQuestion(question);
    setShowSetting((prev) => !prev);
  };

  useEffect(() => {
    const questionCount =
      type === PAGE_TYPE.personal
        ? personalPageInfo.form.questions.length
        : groupPageInfo.form.questions.length;
    questionCount >= 10 ? setIsExceedCount(true) : setIsExceedCount(false);
    setQuestions(
      type === PAGE_TYPE.personal
        ? personalPageInfo.form.questions
        : groupPageInfo.form.questions
    );
  }, [personalPageInfo?.form.questions, groupPageInfo?.form.questions, type]);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    let updatedQuestion: IFormQuestion[] = questions;
    if (active.id !== over.id) {
      setQuestions((items) => {
        const activeIndex = items.findIndex(
          (item) => item.nanoId === active.id
        );
        const overIndex = items.findIndex((item) => item.nanoId === over.id);
        updatedQuestion = arrayMove(items, activeIndex, overIndex);
        return updatedQuestion;
      });
    }
    if (type === PAGE_TYPE.group) {
      setGroupPageInfo((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          questions: updatedQuestion,
        },
      }));
    } else if (type === PAGE_TYPE.personal) {
      setPersonalPageInfo((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          questions: updatedQuestion,
        },
      }));
    }
  }
  const onClickAddQuestion = () => {
    setAddQuestion(!showAddQuestion);
    if (questionsBoxRef.current !== null) {
      questionsBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Box gap={24} ref={questionsBoxRef}>
        <Styled.AddButtonWrapper>
          <StyledButton
            onClickButton={
              !isExceedCount ? () => onClickAddQuestion() : () => {}
            }
            width="100%"
            borderRadius={100}
            bgColor="white"
            color={'purple-500'}
            borderColor={'purple-500'}
            hover={false}
            withBorder
          >
            {t('addQuestionButton')}
          </StyledButton>
        </Styled.AddButtonWrapper>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext
            items={questionIds as unknown as UniqueIdentifier[]}
            strategy={verticalListSortingStrategy}
          >
            <Styled.QuestionWrapper>
              {questions.map((question, index) => (
                <FormQuestion
                  key={index}
                  nanoId={question.nanoId}
                  title={question.title}
                  icon={questionTypeOptions}
                  questionType={question.questionType}
                  required={question.isRequired}
                  isSwitchOn={question.isSwitchOn}
                  isSwitchToggleAllowed={question.isSwitchToggleAllowed}
                  options={question.options}
                  isPreview={false}
                  onSettingsButtonClick={() => onClickSetting(question)}
                  onSwitchClick={() =>
                    type === PAGE_TYPE.group
                      ? onClickTogglePreviewGroup(question.nanoId)
                      : onClickTogglePreviewPersonal(question.nanoId)
                  }
                />
              ))}
            </Styled.QuestionWrapper>
          </SortableContext>
        </DndContext>
        {showAddQuestion && (
          <>
            <Styled.Backdrop
              onClick={() => setAddQuestion(false)}
              isBackground={true}
            />
            <Styled.AddQuestionModal>
              <AddQuestionModal
                type={type}
                questionTypeOptions={questionTypeOptions}
                onClose={() => setAddQuestion(false)}
              />
            </Styled.AddQuestionModal>
          </>
        )}
        {showSetting && (
          <Styled.ModalDimmedContainer>
            <Styled.Backdrop onClick={() => setShowSetting(false)} />
            <Styled.Modal>
              <QuestionSettingModal
                type={type}
                question={selectedQuestion}
                questionTypeOptions={questionTypeOptions}
                onClose={() => setShowSetting(false)}
              />
            </Styled.Modal>
          </Styled.ModalDimmedContainer>
        )}
      </Box>
    </>
  );
};

export default FormConfigPage;
