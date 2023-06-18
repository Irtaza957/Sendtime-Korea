import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import TextArea from '@components/TextArea';
import TextInput from '@components/TextInput';
import TextCheckbox from '@components/UI/Checkbox';
import { PAGE_TYPE } from '@constants/utils';
import { useGroupReservation } from '@contexts/GroupReservationProvider';
import { useReservation } from '@contexts/ReservationProvider';
import { closestCenter, DndContext, UniqueIdentifier } from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Icon } from '@iconify/react';

import { QuestionOptionType } from '../AddQuestionModal';

import * as Styled from './index.styles';
import Options from './Options';
interface QuestionSettingModalProps {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
  question: IFormQuestion;
  questionTypeOptions: QuestionOptionType[];
  onClose: () => void;
}

const QuestionSettingModal = ({
  type,
  question,
  questionTypeOptions,
  onClose,
}: QuestionSettingModalProps) => {
  const {
    pageInfo: personalPageInfo,
    onChangeQuestion: onChangeQuestionPersonal,
    onDeleteQuestion: onDeleteQuestionPersonal,
  } = useReservation();
  const {
    pageInfo: groupPageInfo,
    onChangeQuestion: onChangeQuestionGroup,
    onDeleteQuestion: onDeleteQuestionGroup,
  } = useGroupReservation();
  const { t } = useTranslation('guestQuestionare');
  const [isRequired, setRequired] = useState(question.isRequired);
  const [questionTitle, setQuestionTitle] = useState(question.title);
  const [questionOptions, setQuestionOptions] = useState([{ text: '' }]);
  const [isValidated, setIsValidated] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

  useEffect(() => {
    setQuestionOptions([]);
    question.options?.map((option) => {
      setQuestionOptions((prevItems) => [...prevItems, { text: option }]);
    });
  }, []);

  useEffect(() => {
    const isOthersAdded = questionOptions.some((elem) => {
      return JSON.stringify({ text: 'Other' }) === JSON.stringify(elem);
    });
    setShowOthers(isOthersAdded);
  }, [questionOptions]);

  const changeTitleHandler = (value: string) => {
    setQuestionTitle(value);
  };

  const onApplyHandler = (question: IFormQuestion) => {
    if (questionTitle.length === 0 || isOneOptionEmpty()) {
      setIsValidated(true);
      return;
    }
    const options: string[] = [];
    questionOptions.map((option) => {
      options.push(option.text);
    });
    const updatedQuestion: IFormQuestion = JSON.parse(JSON.stringify(question));
    updatedQuestion.isRequired = isRequired;
    updatedQuestion.title = questionTitle;
    updatedQuestion.isContainEtc = options.includes('Other');
    if (question.questionType === 'DROP_DOWN') {
      updatedQuestion.value = options[0];
    }
    if (
      question.questionType === 'CHECK_BOX' ||
      question.questionType === 'DROP_DOWN' ||
      question.questionType === 'RADIO'
    ) {
      updatedQuestion.options = options;
    }
    type === PAGE_TYPE.personal
      ? onChangeQuestionPersonal(updatedQuestion)
      : onChangeQuestionGroup(updatedQuestion);
    onClose();
  };

  const isOneOptionEmpty = () => {
    for (let i = 0; i <= questionOptions.length; i++) {
      if (questionOptions[i]?.text.length === 0) {
        return true;
      }
    }
    return false;
  };

  const deleteQuestionHandler = () => {
    if (type === PAGE_TYPE.group) {
      onDeleteQuestionGroup(question);
      onClose();
    } else if (type === PAGE_TYPE.personal) {
      onDeleteQuestionPersonal(question);
      onClose();
    }
  };

  const isOneQuestionAvailable = () => {
    return type === PAGE_TYPE.group
      ? groupPageInfo.form.questions.length > 1
        ? true
        : false
      : personalPageInfo.form.questions.length > 1
      ? true
      : false;
  };

  const addOptionHandler = (value: string) => {
    if (value === 'Other') {
      setShowOthers(true);
    }
    const isOthersAdded = questionOptions.some((elem) => {
      return JSON.stringify({ text: 'Other' }) === JSON.stringify(elem);
    });
    const newQuestionOptions = [...questionOptions];
    if (isOthersAdded) {
      newQuestionOptions.splice(questionOptions.length - 1, 0, { text: value });
    } else {
      newQuestionOptions.push({ text: value });
    }
    setQuestionOptions(newQuestionOptions);
  };
  const deleteOptionHandler = (i: number) => {
    if (questionOptions[i].text === 'Other') {
      setShowOthers(false);
    }
    const newQuestionOptions = [...questionOptions];
    newQuestionOptions.splice(i, 1);
    setQuestionOptions(newQuestionOptions);
  };
  const changeOptionHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.target.value !== t(`addQuestion.other`)) {
      const newQuestionOptions = [...questionOptions];
      newQuestionOptions[i].text = e.target.value;
      setQuestionOptions(newQuestionOptions);
    }
  };
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setQuestionOptions((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
  return (
    <Styled.ModalContainer isValidated={isValidated}>
      <Styled.Box>
        <Styled.Header>
          <Styled.Title>{t('settings.setting')}</Styled.Title>
          <Styled.CrossBtnWrapper onClick={onClose}>
            <Icon icon="akar-icons:cross" color="#000000" />
          </Styled.CrossBtnWrapper>
        </Styled.Header>
        {questionTypeOptions.map(
          (option, index) =>
            option.type === question.questionType && (
              <Styled.QuestionTypeRow key={index}>
                <Styled.QuestionTypeIcon>
                  {' '}
                  {option.icon}
                </Styled.QuestionTypeIcon>
                <Styled.QuestionTypeText>{option.text}</Styled.QuestionTypeText>
              </Styled.QuestionTypeRow>
            )
        )}
        <Styled.RequiredRow>
          <Styled.Subtitle>{t('settings.changeQuestion')}</Styled.Subtitle>
          <Styled.CheckboxWrapper>
            <TextCheckbox
              key={''}
              onClick={() => setRequired(!isRequired)}
              checked={isRequired}
            >
              <Styled.CheckboxText>
                {t('settings.required')}
              </Styled.CheckboxText>
            </TextCheckbox>
          </Styled.CheckboxWrapper>
        </Styled.RequiredRow>
        <Styled.QuestionTitleRow>
          <TextArea
            value={questionTitle}
            onChange={(e) => changeTitleHandler(e.target.value)}
            required={isRequired}
            inputPadding="10px 15px 8px 15px"
            overflow="hidden"
            rows={2}
          />
        </Styled.QuestionTitleRow>
        {(question.questionType === 'CHECK_BOX' ||
          question.questionType === 'DROP_DOWN' ||
          question.questionType === 'RADIO') &&
          questionOptions.length > 0 && (
            <>
              <Styled.OptionContainer>
                <Styled.Subtitle>{t('settings.answers')}</Styled.Subtitle>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToFirstScrollableAncestor]}
                >
                  <SortableContext
                    items={questionOptions as unknown as UniqueIdentifier[]}
                    strategy={verticalListSortingStrategy}
                  >
                    {questionOptions?.map(
                      (option, index) =>
                        option.text !== 'Other' && (
                          <Options
                            key={index}
                            option={option}
                            index={index}
                            isLastInput={questionOptions.length > 1}
                            changeOptionHandler={(e) =>
                              changeOptionHandler(e, index)
                            }
                            deleteOptionHandler={() =>
                              deleteOptionHandler(index)
                            }
                          />
                        )
                    )}
                  </SortableContext>
                </DndContext>
                {showOthers && (
                  <Styled.OtherOption>
                    <Styled.OptionName>
                      {t(`addQuestion.other`)}
                    </Styled.OptionName>
                    <Styled.OtherOptionText>
                      <TextInput
                        value={''}
                        placeholder={t('formQuestion.typeYourAnswer')}
                        inputPadding={5}
                        onChange={() => {}}
                      />
                    </Styled.OtherOptionText>
                    {questionOptions.length > 1 && (
                      <Icon
                        onClick={() =>
                          deleteOptionHandler(questionOptions.length - 1)
                        }
                        cursor="pointer"
                        icon="ic:baseline-delete-outline"
                        color="#60666D"
                        width={20}
                        height={20}
                      />
                    )}
                  </Styled.OtherOption>
                )}
                <Styled.CustomOptions>
                  <Styled.AddOption onClick={() => addOptionHandler('')}>
                    <Icon
                      cursor="pointer"
                      icon="ic:baseline-add"
                      color="var(--purple-500)"
                      width={16}
                      height={16}
                    />
                    {t('settings.addAnswers')}
                  </Styled.AddOption>
                  {!showOthers && (
                    <Styled.AddOption onClick={() => addOptionHandler('Other')}>
                      <Icon
                        cursor="pointer"
                        icon="ic:baseline-add"
                        color="var(--purple-500)"
                        width={16}
                        height={16}
                      />
                      {t('settings.addOthers')}
                    </Styled.AddOption>
                  )}
                </Styled.CustomOptions>
              </Styled.OptionContainer>
            </>
          )}
        {isValidated && (
          <Styled.EmptyFieldMessage>
            {t('settings.emptyFieldMessage')}
          </Styled.EmptyFieldMessage>
        )}
        <Styled.CTAWrapper>
          <StyledButton
            onClickButton={onClose}
            withBorder
            borderRadius={50}
            bgColor="white"
            borderColor="gray-550"
            color="gray-750"
            padding="10px 20px"
            width="50%"
          >
            {t('settings.cancel')}
          </StyledButton>
          <StyledButton
            onClickButton={() => {
              onApplyHandler(question);
            }}
            withBorder
            borderRadius={50}
            bgColor="purple-500"
            borderColor="purple-500"
            color="white"
            width="50%"
          >
            {t('settings.apply')}
          </StyledButton>
        </Styled.CTAWrapper>
      </Styled.Box>
      <Styled.DeleteButtonContainer
        isOneQuestionAvailable={isOneQuestionAvailable()}
        onClick={() =>
          isOneQuestionAvailable() ? deleteQuestionHandler() : null
        }
      >
        <Icon
          icon="ic:baseline-delete-outline"
          color={isOneQuestionAvailable() ? 'var(--purple-500)' : '#717780'}
          width={20}
          height={20}
        />
        <Styled.DeleteText isOneQuestionAvailable={isOneQuestionAvailable()}>
          {t('settings.deleteThisQuestion')}
        </Styled.DeleteText>
      </Styled.DeleteButtonContainer>
    </Styled.ModalContainer>
  );
};

export default QuestionSettingModal;
