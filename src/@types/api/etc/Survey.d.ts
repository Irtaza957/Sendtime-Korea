type SurveyItem = {
  questionIndex: number;
  type: 'SCORE' | 'TEXT_CHOICE' | 'TEXT_WRITE';
  response: string;
};

type SurveyParams = {
  surveyName: string;
  surveyItems: SurveyItem[];
};
