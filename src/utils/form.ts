type IFormQuestionAnswers = Pick<
  IFormQuestion,
  | 'id'
  | 'questionType'
  | 'isContainEtc'
  | 'othersInputValue'
  | 'value'
  | 'selectedOptions'
>;

export const convertQuestionAnswersToAnswers = (
  questions: IFormQuestionAnswers[]
): AnswerType[] => {
  return questions.map((question) => {
    if (
      question.questionType === 'CHECK_BOX' ||
      question.questionType === 'RADIO'
    ) {
      return {
        questionId: question.id || '',
        questionType: question.questionType,
        answers:
          question.questionType === 'RADIO'
            ? [question.value || '']
            : question.selectedOptions || [],
        isContainEtc: question.isContainEtc,
        etcAnswer: question.othersInputValue,
      };
    } else if (question.questionType === 'FILE') {
      return {
        questionId: question.id || '',
        questionType: question.questionType,
        answers: question.selectedOptions || [],
      };
    } else {
      return {
        questionId: question.id || '',
        questionType: question.questionType,
        answers: [question.value || ''],
      };
    }
  });
};

export const convertAnswersToQuestionAnswers = (
  answers: AnswerType[]
): IFormQuestionAnswers[] => {
  return answers.map((answer) => {
    if (
      answer.questionType === 'CHECK_BOX' ||
      answer.questionType === 'RADIO'
    ) {
      return {
        id: answer.questionId,
        questionType: answer.questionType,
        isContainEtc: answer.isContainEtc || false,
        othersInputValue: answer.etcAnswer,
        value: answer.questionType === 'RADIO' ? answer.answers[0] : '',
        selectedOptions: answer.answers,
      };
    } else {
      return {
        id: answer.questionId,
        questionType: answer.questionType,
        isContainEtc: false,
        value: answer.answers[0],
      };
    }
  });
};
