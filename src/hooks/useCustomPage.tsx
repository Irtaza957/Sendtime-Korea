import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useMutation } from 'react-query';

import { nestedAPI } from '@api/nestedPage/NestedPage';
import { NestedPageModalProps } from '@components/NestedPageModal';
import { QuestionTypeMaxLength } from '@components/pages/NewReservation/FormConfigPage/FormQuestion';
import { ContentAlert } from '@components/Reservation/index.styles';
import {
  convertAnswersToQuestionAnswers,
  convertQuestionAnswersToAnswers,
} from '@utils/form';
import { makePhoneNumberWithHyphen } from '@utils/phoneNumber';

const useCustomPage = ({
  hideModal,
  parentId,
  pageTitle,
  pageDescription,
  questions,
  answers,
  customPageId,
  updatePage,
  edit = false,
}: NestedPageModalProps) => {
  const prefilledQuestionAnswers = convertAnswersToQuestionAnswers(
    answers || []
  );
  const [nestedInfo, setNestedInfo] = useState({
    pageTitle: {
      value: pageTitle || '',
      validated: false,
      alertMessage: <></>,
    },
    pageDescription: {
      value: pageDescription || '',
      validated: false,
      alertMessage: <></>,
    },
    questions: questions.map((question) => {
      const prefilledAnswer = prefilledQuestionAnswers.find(
        (answer) => answer.id === question.id
      );
      if (!prefilledAnswer) {
        return {
          ...question,
        };
      }
      return {
        ...question,
        value: prefilledAnswer.value,
        isContainEtc: prefilledAnswer.isContainEtc,
        othersInputValue: prefilledAnswer.othersInputValue,
        selectedOptions: prefilledAnswer.selectedOptions,
      };
    }),
  });

  const { mutate: makeNestedPage, isLoading: isCreateLoading } = useMutation(
    ({ uuid, params }: CreateNestedPageParams) =>
      nestedAPI.create({ uuid, params }),
    {
      onSuccess: () => {
        updatePage?.();
        hideModal();
      },
    }
  );

  const { mutate: editNestedPage, isLoading: isEditLoading } = useMutation(
    ({ customPageId, params }: EditNestedPageParams) =>
      nestedAPI.edit({ customPageId, params }),
    {
      onSuccess: () => {
        updatePage?.();
        hideModal();
      },
    }
  );

  const handleMakePage = () => {
    const updatedAnswers = convertQuestionAnswersToAnswers(
      nestedInfo.questions
    );
    const pageData: CreateNestedPageParams = {
      uuid: parentId,
      params: {
        reservationPageName: nestedInfo.pageTitle.value,
        reservationPageDescription: nestedInfo.pageDescription.value,
        answers: updatedAnswers,
      },
    };

    if (edit) {
      editNestedPage({
        params: {
          ...pageData.params,
          answers: updatedAnswers.map((answer) => ({
            id:
              answers?.find((a) => a.questionId === answer.questionId)?.id ||
              '',
            questionId: answer.questionId,
            answers: answer.answers,
            etcAnswer: answer.etcAnswer,
            isContainEtc: answer.isContainEtc,
          })),
        },
        customPageId: customPageId || '',
      });
      return;
    }

    makeNestedPage(pageData);
  };

  const handleChangePageTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trimStart();

    if (withoutSpace === '') {
      setNestedInfo((prevValue) => ({
        ...prevValue,
        pageTitle: {
          value: withoutSpace,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              페이지 제목을 입력해주세요
            </ContentAlert>
          ),
        },
      }));

      return;
    }

    setNestedInfo((prevValue) => ({
      ...prevValue,
      pageTitle: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const handleChangePageDescription = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setNestedInfo((prevValue) => ({
      ...prevValue,
      pageDescription: {
        value: target.value,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const onChangeInputQuestion = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | MouseEvent<HTMLButtonElement>,
    question: IFormQuestion
  ) => {
    let value: unknown;
    switch (question.questionType) {
      case 'NAME':
      case 'SHORT_LINE':
        if (
          (event.target as HTMLInputElement).value.length >
          (QuestionTypeMaxLength[question?.questionType] || 50)
        ) {
          return;
        }
        value = (event.target as HTMLInputElement).value;
        break;
      case 'DROP_DOWN':
        value = (event.target as HTMLButtonElement).innerText;
        break;
      case 'MULTIPLE_LINES':
        if (
          (event.target as HTMLTextAreaElement).value.length >
          (QuestionTypeMaxLength[question?.questionType] || 200)
        ) {
          return;
        }
        value = (event.target as HTMLTextAreaElement).value;
        break;
      case 'PHONE':
        if (
          (event.target as HTMLInputElement).value.length >
          (QuestionTypeMaxLength[question?.questionType] || 50)
        ) {
          return;
        }
        value = makePhoneNumberWithHyphen(
          (event.target as HTMLInputElement).value.slice(0, 13)
        );
        break;
      case 'EMAIL':
        if (
          (event.target as HTMLInputElement).value.length >
          (QuestionTypeMaxLength[question?.questionType] || 50)
        ) {
          return;
        }
        value = (event.target as HTMLInputElement).value.trim();
        break;
    }

    const copyQuestions = [...nestedInfo.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.id === question.id
    );
    if (selectedQuestionIndex === -1) return;
    copyQuestions[selectedQuestionIndex] = {
      ...copyQuestions[selectedQuestionIndex],
      value: value as string,
    };

    setNestedInfo((prevState) => ({
      ...prevState,
      questions: copyQuestions,
    }));
  };

  const onChangeOptionQuestion = (index: number, question: IFormQuestion) => {
    const copyQuestions = [...nestedInfo.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.id === question.id
    );
    const selectedQuestion = copyQuestions.find(
      (q) => q.id === question.id
    ) as IFormQuestion;

    switch (question.questionType) {
      case 'RADIO':
        if (selectedQuestionIndex >= 0 && selectedQuestion.options) {
          const updatedQuestion = {
            ...selectedQuestion,
            value: selectedQuestion.options[index],
            othersInputValue:
              selectedQuestion.options[index] === 'Others'
                ? selectedQuestion.othersInputValue
                : '',
            isContainEtc:
              selectedQuestion.options[index] === 'Others' ? true : false,
          };
          copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
        }
        break;
      case 'CHECK_BOX':
        if (
          selectedQuestionIndex >= 0 &&
          selectedQuestion.selectedOptions &&
          selectedQuestion.options
        ) {
          const selectedOptionValue = selectedQuestion.options[index];
          const copyCheckboxes = [...selectedQuestion.selectedOptions];
          let isOthersClicked = false;
          if (copyCheckboxes.includes(selectedQuestion.options[index])) {
            const selectedOptIndex = copyCheckboxes.findIndex(
              (opt) => opt === selectedOptionValue
            );
            copyCheckboxes.splice(selectedOptIndex, 1);
            isOthersClicked = selectedOptionValue === 'Others';
          } else {
            copyCheckboxes.push(selectedQuestion.options[index]);
          }
          const updatedQuestion = {
            ...selectedQuestion,
            selectedOptions: copyCheckboxes,
            othersInputValue: isOthersClicked
              ? ''
              : selectedQuestion.othersInputValue,
            isContainEtc: isOthersClicked ? false : true,
          };
          copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
        }
        break;
    }
    setNestedInfo((prevState) => ({
      ...prevState,
      questions: copyQuestions,
    }));
  };

  const onChangeOthersInput = (
    event: ChangeEvent<HTMLInputElement>,
    question: IFormQuestion
  ) => {
    const copyQuestions = [...nestedInfo.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.id === question.id
    );
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (q) => q.id === question.id
      ) as IFormQuestion;
      const updatedQuestion = {
        ...selectedQuestion,
        othersInputValue: event.target.value,
      };
      copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
      setNestedInfo((prevState) => ({
        ...prevState,
        questions: copyQuestions,
      }));
    }
  };

  return {
    nestedInfo,
    isLoading: isEditLoading || isCreateLoading,
    handleMakePage,
    handleChangePageTitle,
    handleChangePageDescription,
    onChangeInputQuestion,
    onChangeOptionQuestion,
    onChangeOthersInput,
  };
};

export default useCustomPage;
