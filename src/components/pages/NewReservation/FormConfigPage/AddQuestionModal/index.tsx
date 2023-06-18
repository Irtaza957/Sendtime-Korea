import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import TextArea from '@components/TextArea';
import TextInput from '@components/TextInput';
import TextCheckbox from '@components/UI/Checkbox';
import Dropdown from '@components/UI/Dropdown';
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

import * as Styled from './index.styles';
import Options from './Options';
interface AddQuestionModal {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
  questionTypeOptions: QuestionOptionType[];
  onClose: () => void;
}
export type QuestionOptionType = {
  icon: JSX.Element;
  text: string;
  type: IFormQuestion['questionType'];
};

const AddQuestionModal = ({
  type,
  onClose,
  questionTypeOptions,
}: AddQuestionModal) => {
  const { t } = useTranslation('guestQuestionare');
  const { pageInfo: personalPageInfo, onAddQuestion: onAddQuestionPersonal } =
    useReservation();
  const { pageInfo: groupPageInfo, onAddQuestion: onAddQuestionGroup } =
    useGroupReservation();

  const [selectedOption, setSelectedOption] = useState(questionTypeOptions[5]);
  const [isRequired, setRequired] = useState(true);
  const [questionTitle, setQuestionTitle] = useState('');
  const [customOptions, setCustomOptions] = useState([
    { text: '' },
    { text: '' },
    { text: '' },
  ]);
  const [isValidated, setIsValidated] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const [errText, setErrText] = useState('');

  const selectOptionHandler = (option: QuestionOptionType) => {
    setSelectedOption(option);
  };
  const isOneOptionEmpty = () => {
    if (
      selectedOption.type === 'CHECK_BOX' ||
      selectedOption.type === 'DROP_DOWN' ||
      selectedOption.type === 'RADIO'
    ) {
      for (let i = 0; i <= customOptions.length; i++) {
        if (customOptions[i]?.text.length === 0) {
          return true;
        }
      }
    }
    return false;
  };
  function isDuplicateOptions() {
    if (
      selectedOption.text ===
        `${t('addQuestion.questionTypeOptions.multipleOptions')}` ||
      selectedOption.text ===
        `${t('addQuestion.questionTypeOptions.checkBoxes')}` ||
      selectedOption.text === `${t('addQuestion.questionTypeOptions.dropdown')}`
    ) {
      return (
        new Set(
          customOptions.map((element) => {
            return element.text;
          })
        ).size !== customOptions.length
      );
    }
    return false;
  }
  const onApplyHandler = () => {
    if (questionTitle.length === 0 || isOneOptionEmpty()) {
      setIsValidated(true);
      setErrText(`${t('addQuestion.emptyFieldMessage')}`);
      return;
    }
    if (isDuplicateOptions()) {
      setIsValidated(true);
      setErrText(`${t('addQuestion.sameFieldMessage')}`);
      return;
    }
    const options: string[] = [];
    customOptions.map((option) => {
      options.push(option.text);
    });
    const addQuestion = {
      nanoId: nanoid(),
      questionType: selectedOption.type,
      title: questionTitle,
      isContainEtc: options.includes('Other'),
      isRequired: isRequired,
      isSwitchOn: true,
      isSwitchToggleAllowed: true,
    };
    if (
      selectedOption.type === 'CHECK_BOX' ||
      selectedOption.type === 'DROP_DOWN' ||
      selectedOption.type === 'RADIO'
    ) {
      Object.assign(addQuestion, { options: options, othersInputValue: '' });
    }
    if (selectedOption.type === 'CHECK_BOX') {
      Object.assign(addQuestion, { selectedOptions: [] });
    } else if (selectedOption.type === 'DROP_DOWN') {
      Object.assign(addQuestion, { value: options[0] });
    } else {
      Object.assign(addQuestion, { value: '' });
    }
    type === PAGE_TYPE.personal
      ? onAddQuestionPersonal(addQuestion)
      : onAddQuestionGroup(addQuestion);
    onClose();
  };
  const questionOptions = () => {
    const questions =
      type === PAGE_TYPE.personal
        ? personalPageInfo.form.questions
        : groupPageInfo.form.questions;
    let typeOptions = questionTypeOptions;
    const nameQuestion = questions.find(
      (question) => question.questionType === 'NAME'
    );
    const emailQuestion = questions.find(
      (question) => question.questionType === 'EMAIL'
    );
    const phoneQuestion = questions.find(
      (question) => question.questionType === 'PHONE'
    );
    if (nameQuestion) {
      typeOptions = typeOptions.filter((option) => option.type !== 'NAME');
    }
    if (emailQuestion) {
      typeOptions = typeOptions.filter((option) => option.type !== 'EMAIL');
    }
    if (phoneQuestion) {
      typeOptions = typeOptions.filter((option) => option.type !== 'PHONE');
    }
    return typeOptions;
  };
  const addOptionHandler = (value: string) => {
    if (value === 'Other') {
      setShowOthers(true);
    }
    const isOthersAdded = customOptions.includes({ text: 'Other' });
    const newQuestionOptions = [...customOptions];
    if (isOthersAdded) {
      newQuestionOptions.splice(customOptions.length - 1, 0, { text: value });
    } else {
      newQuestionOptions.push({ text: value });
    }
    setCustomOptions(newQuestionOptions);
  };
  const deleteOptionHandler = (i: number) => {
    if (customOptions[i].text === 'Other') {
      setShowOthers(false);
    }
    const newQuestionOptions = [...customOptions];
    newQuestionOptions.splice(i, 1);
    setCustomOptions(newQuestionOptions);
  };
  const changeOptionHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.target.value !== t(`addQuestion.other`)) {
      const newQuestionOptions = [...customOptions];
      newQuestionOptions[i].text = e.target.value;
      setCustomOptions(newQuestionOptions);
    }
  };
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCustomOptions((items) => {
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
          <Styled.Title>{t('addQuestion.addAQuestion')}</Styled.Title>
          <Styled.CrossBtnWrapper>
            <Icon onClick={onClose} icon="akar-icons:cross" color="#000000" />
          </Styled.CrossBtnWrapper>
        </Styled.Header>
        <Styled.Dropdown>
          <Styled.Subtitle>{t('addQuestion.answerType')}</Styled.Subtitle>
          <Dropdown
            height={56}
            padding={16}
            options={questionOptions()}
            selectedOption={selectedOption}
            selectOptionHandler={selectOptionHandler}
          />
        </Styled.Dropdown>
        <Styled.RequiredRow>
          <Styled.Subtitle>{t('addQuestion.question')}</Styled.Subtitle>
          <Styled.CheckboxWrapper>
            <TextCheckbox
              key={''}
              onClick={() => setRequired(!isRequired)}
              checked={isRequired}
            >
              <Styled.CheckboxText>
                {t('addQuestion.required')}
              </Styled.CheckboxText>
            </TextCheckbox>
          </Styled.CheckboxWrapper>
        </Styled.RequiredRow>
        <Styled.QuestionTitleRow>
          <TextArea
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            required={true}
            placeholder={t('addQuestion.writeQuestion')}
            inputPadding="10px 15px 8px 15px"
            overflow="hidden"
            rows={2}
          />
        </Styled.QuestionTitleRow>
        {(selectedOption.text ===
          `${t('addQuestion.questionTypeOptions.multipleOptions')}` ||
          selectedOption.text ===
            `${t('addQuestion.questionTypeOptions.checkBoxes')}` ||
          selectedOption.text ===
            `${t('addQuestion.questionTypeOptions.dropdown')}`) &&
          selectedOption && (
            <Styled.OptionContainer>
              <Styled.Subtitle>{t('addQuestion.answers')}</Styled.Subtitle>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToFirstScrollableAncestor]}
              >
                <SortableContext
                  items={customOptions as unknown as UniqueIdentifier[]}
                  strategy={verticalListSortingStrategy}
                >
                  {customOptions?.map(
                    (option, index) =>
                      option.text !== 'Other' && (
                        <Options
                          key={index}
                          option={option}
                          index={index}
                          isLastInput={customOptions.length > 1}
                          changeOptionHandler={(e) =>
                            changeOptionHandler(e, index)
                          }
                          deleteOptionHandler={() => deleteOptionHandler(index)}
                        />
                      )
                  )}
                </SortableContext>
              </DndContext>
              {showOthers && selectedOption.type !== 'DROP_DOWN' && (
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
                  {customOptions.length > 1 && (
                    <Icon
                      onClick={() =>
                        deleteOptionHandler(customOptions.length - 1)
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
                  {t('addQuestion.addAnswers')}
                </Styled.AddOption>
                {!showOthers && selectedOption.type !== 'DROP_DOWN' && (
                  <Styled.AddOption onClick={() => addOptionHandler('Other')}>
                    <Icon
                      cursor="pointer"
                      icon="ic:baseline-add"
                      color="var(--purple-500)"
                      width={16}
                      height={16}
                    />
                    {t('addQuestion.addOthers')}
                  </Styled.AddOption>
                )}
              </Styled.CustomOptions>
            </Styled.OptionContainer>
          )}
        {isValidated && (
          <Styled.EmptyFieldMessage>{errText}</Styled.EmptyFieldMessage>
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
            {t('addQuestion.cancel')}
          </StyledButton>
          <StyledButton
            onClickButton={onApplyHandler}
            withBorder
            borderRadius={50}
            bgColor="purple-500"
            borderColor="purple-500"
            color="white"
            width="50%"
          >
            {t('addQuestion.apply')}
          </StyledButton>
        </Styled.CTAWrapper>
      </Styled.Box>
    </Styled.ModalContainer>
  );
};

export default AddQuestionModal;
