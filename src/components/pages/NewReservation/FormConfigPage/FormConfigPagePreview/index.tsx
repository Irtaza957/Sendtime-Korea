import React from 'react';
import { useTranslation } from 'react-i18next';

import FormQuestion from '@components/pages/NewReservation/FormConfigPage/FormQuestion';
import { PAGE_TYPE } from '@constants/utils';
import { GroupPageInfoType } from '@contexts/GroupReservationProvider';
import { PageInfoType } from '@contexts/ReservationProvider';

import * as Styled from './index.style';
interface FormConfigPagePreviewProp {
  pageInfo: PageInfoType | GroupPageInfoType;
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
}

const FormConfigPagePreview = ({
  pageInfo,
  type,
}: FormConfigPagePreviewProp) => {
  const { t } = useTranslation('guestQuestionare');
  return (
    <Styled.Preview>
      <Styled.FormHeader>
        <Styled.FormTitle>{t('preview.previewTitle')}</Styled.FormTitle>
        <Styled.FormDescription>
          {t('preview.previewDescription')}
        </Styled.FormDescription>
      </Styled.FormHeader>
      {pageInfo.form.questions.map(
        (question: IFormQuestion, index) =>
          question.isSwitchOn && (
            <Styled.FormQuestionWrapper key={index}>
              <FormQuestion
                nanoId={question.nanoId}
                title={question.title}
                questionType={question.questionType}
                required={question.isRequired}
                isSwitchOn={question.isSwitchOn}
                isSwitchToggleAllowed={question.isSwitchToggleAllowed}
                onSettingsButtonClick={() => {}}
                onSwitchClick={() => {}}
                options={question.options}
                selectedOptions={question.selectedOptions}
                isPreview={true}
                value={question.value}
                othersInputValue={question.othersInputValue}
              />
            </Styled.FormQuestionWrapper>
          )
      )}
    </Styled.Preview>
  );
};

export default FormConfigPagePreview;
