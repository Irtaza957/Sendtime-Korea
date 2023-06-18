import React, { ReactNode } from 'react';
import i18next from 'i18next';

import StyledButton from '@components/Button';

import {
  NpsButtonContainer,
  NpsDescription,
  NpsQuestionNumber,
  NpsRequired,
  NpsTitle,
  NpsTitleContainer,
  NpsTitleContent,
  QuestionContent,
} from './index.styles';

interface NpsQuestionProps {
  no: number;
  lastNo: number;
  question: string;
  required?: boolean;
  description?: string;
  handlePrev?: () => void;
  handleNext: () => void;
  disabled?: { prev: boolean; next: boolean };
  children: ReactNode;
}
const NpsQuestion = ({
  no,
  lastNo,
  question,
  required = true,
  handlePrev,
  handleNext,
  description,
  disabled = { prev: false, next: false },
  children,
}: NpsQuestionProps) => {
  return (
    <NpsTitleContainer>
      <NpsTitleContent>
        <NpsTitle>
          {required && <NpsRequired>*</NpsRequired>}
          <NpsQuestionNumber>Q{no}.</NpsQuestionNumber>
          <QuestionContent>
            {question}
            {description && <NpsDescription>{description}</NpsDescription>}
          </QuestionContent>
        </NpsTitle>
        {children}
        <NpsButtonContainer>
          {no === 1 ? (
            <div />
          ) : (
            <StyledButton
              onClickButton={handlePrev}
              withBorder
              bgColor="white"
              color="gray-750"
              borderRadius={8}
              disabled={disabled.prev}
            >
              {i18next.t('common:prev')}
            </StyledButton>
          )}

          <StyledButton
            onClickButton={handleNext}
            borderRadius={8}
            disabled={disabled.next}
          >
            {no !== lastNo
              ? i18next.t('common:next')
              : i18next.t('common:submit')}
          </StyledButton>
        </NpsButtonContainer>
      </NpsTitleContent>
    </NpsTitleContainer>
  );
};

export default NpsQuestion;
