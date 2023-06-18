import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import Iframe from 'react-iframe';
import { useMutation, useQuery } from 'react-query';

import { CreateUpdateSpaceRequest, SpaceAPI } from '@api/space/SpaceApi';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import NewTabLink from '@components/NewTabLink';
import FormQuestion from '@components/pages/NewReservation/FormConfigPage/FormQuestion';
import SideAreaContainer from '@components/SideAreaContainer';
import TextInput from '@components/TextInput';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { BASE_URL } from '@constants/baseUrl';
import { REGEX } from '@constants/regex';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useLoading from '@hooks/useLoading';
import useSnackbar from '@hooks/useSnackbar';
import useTranslate from '@hooks/useTranslate';
import { REGION } from '@utils/language';

import * as Styled from './index.styles';

type ErrorState = {
  questionNanoId: string;
  errorMessage: string;
};

const defaultQuestions: IFormQuestion[] = [
  {
    nanoId: nanoid(),
    title: `1. ${i18next.t('spaceBuilder:addEdit.handle.handle')}`,
    questionType: 'SHORT_LINE',
    value: '',
    isRequired: true,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
    helpText: `${i18next.t('spaceBuilder:addEdit.handleHelpText')}`,
  },
  {
    nanoId: nanoid(),
    title: `2. ${i18next.t('spaceBuilder:addEdit.icon.label')}`,
    questionType: 'FILE',
    value: '',
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
    helpText: `${i18next.t('spaceBuilder:addEdit.iconHelpText')}`,
  },
  {
    nanoId: nanoid(),
    title: `3. ${i18next.t('spaceBuilder:addEdit.title')}`,
    questionType: 'SHORT_LINE',
    value: '',
    isRequired: true,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
  {
    nanoId: nanoid(),
    title: `4. ${i18next.t('spaceBuilder:addEdit.description')}`,
    questionType: 'MULTIPLE_LINES',
    value: '',
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
];

const defaultContactQuestions: IFormQuestion[] = [
  {
    nanoId: nanoid(),
    title: i18next.t('spaceBuilder:addEdit.contact.email'),
    questionType: 'EMAIL',
    value: '',
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
  {
    nanoId: nanoid(),
    title: i18next.t('spaceBuilder:addEdit.contact.phone'),
    questionType: 'PHONE',
    value: '',
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
  {
    nanoId: nanoid(),
    title: i18next.t('spaceBuilder:addEdit.contact.website'),
    questionType: 'SHORT_LINE',
    value: '',
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
];

const defaultAdditionSettingsQuestions: IFormQuestion[] = [
  {
    nanoId: nanoid(),
    title: `1. ${i18next.t('spaceBuilder:addEdit.additionalOptions.cardsToBeShown')}`,
    questionType: 'RADIO',
    value: '',
    selectedOptions: [],
    options: [`${i18next.t('spaceBuilder:addEdit.additionalOptions.inRandom')}`, `${i18next.t('spaceBuilder:addEdit.additionalOptions.inAlphabetical')}`],
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
  {
    nanoId: nanoid(),
    title: `2. ${i18next.t('spaceBuilder:addEdit.additionalOptions.needReactionButtons')}`,
    questionType: 'RADIO',
    value: '',
    options: [`${i18next.t('spaceBuilder:addEdit.additionalOptions.yes')}`, `${i18next.t('spaceBuilder:addEdit.additionalOptions.no')}`],
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
  {
    nanoId: nanoid(),
    title:
      `3. ${i18next.t('spaceBuilder:addEdit.additionalOptions.allowPeopleWhoCreatedCards')}`,
    questionType: 'RADIO',
    value: '',
    options: [`${i18next.t('spaceBuilder:addEdit.additionalOptions.yes')}`, `${i18next.t('spaceBuilder:addEdit.additionalOptions.no')}`],
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
  {
    nanoId: nanoid(),
    title: `4. ${i18next.t('spaceBuilder:addEdit.additionalOptions.accessControl')}`,
    questionType: 'RADIO',
    value: '',
    options: [`${i18next.t('spaceBuilder:addEdit.additionalOptions.public')}`, `${i18next.t('spaceBuilder:addEdit.additionalOptions.accessWithPassword')}`],
    selectedOptions: [],
    isRequired: false,
    isContainEtc: false,
    isSwitchOn: false,
    isSwitchToggleAllowed: false,
  },
];
interface AddEditSpaceProps {
  edit?: boolean;
}

const AddEditSpace = ({ edit }: AddEditSpaceProps) => {
  const router = useRouter();
  const { loadingView } = useLoading();
  const { handle } = router.query;
  const { i18n } = useTranslate();
  const { t } = useTranslation(['guestQuestionare', 'spaceBuilder']);
  const [questions, setQuestions] = useState(defaultQuestions);
  const [contactQuestions, setContactQuestions] = useState(defaultContactQuestions);
  const [additionSettingsQuestions, setAdditionSettingsQuestions] = useState(defaultAdditionSettingsQuestions);
  const [isValidated, setIsValidated] = useState(edit ? true : false);
  const [ErrorFields, setErrorFields] = useState<ErrorState[]>([]);
  const showSnackbar = useSnackbar();
  const { showModal: showErrorModal } = useNestedModal({
    type: 'alert',
    description: `${edit
      ? t('updateErrorMessage', { ns: 'spaceBuilder' })
      : t('createErrorMessage', { ns: 'spaceBuilder' })
      }`,
  });

  const { mutate: createUpdateSpace, isLoading: isLoadingSpace } = useMutation(
    () => {
      const spaceInfo: CreateUpdateSpaceRequest = {
        ...(!edit && { handle: questions[0].value ? questions[0].value : '' }),
        ...(questions[1].selectedOptions && { imageUrl: questions[1].selectedOptions.length > 1 ? questions[1].selectedOptions[1] : questions[1].selectedOptions[0] }),
        title: questions[2].value ? questions[2].value : '',
        isProfileCreateAllowed: edit ? false : true,
        contactPoints: [
          {
            type: "EMAIL",
            value: contactQuestions[0].value ? contactQuestions[0].value : ''
          },
          {
            type: "PHONE",
            value: contactQuestions[1].value ? contactQuestions[1].value : ''
          },
          {
            type: "WEBSITE",
            value: contactQuestions[2].value ? contactQuestions[2].value : ''
          },
        ],
        description: questions[3].value ? questions[3].value : '',
        ...(edit && {
          ...(additionSettingsQuestions[0].value && {
            profileSortingType: additionSettingsQuestions[0].value === i18next.t('spaceBuilder:addEdit.additionalOptions.inRandom') ? 'RANDOM' : 'TITLE',
          }),
          isReactionsDisabled: additionSettingsQuestions[1].value === i18next.t('spaceBuilder:addEdit.additionalOptions.yes'),
          isAccessLimitedToOnlyCardOwners: additionSettingsQuestions[2].value === i18next.t('spaceBuilder:addEdit.additionalOptions.yes'),
          enterCode: additionSettingsQuestions[3].value === i18next.t('spaceBuilder:addEdit.additionalOptions.accessWithPassword') ? additionSettingsQuestions[3].accessWithPassword : '',
        }),
      };
      return edit ? SpaceAPI.updateSpace(spaceInfo, typeof handle === 'string' ? handle : '') : SpaceAPI.createSpace(spaceInfo);
    },
    {
      onSuccess: () => {
        router.push(ROUTES.SPACE_BUILDER.SPACE);
        showSnackbar({
          type: 'up',
          message: edit ? i18next.t('spaceBuilder:alert.successSpaceUpdate') : i18next.t('spaceBuilder:alert.successSpaceCreate'),
        });
      },
      onError: () => {
        showErrorModal();
      },
    }
  );

  useQuery('getSpaceData', () => SpaceAPI.getEditData(`${handle}`), {
    onSuccess: ({ data: { results } }) => {
      questions[0].value = results[0].handle
      questions[1].selectedOptions = [results[0]?.imageUrl]
      questions[2].value = results[0].title
      questions[3].value = results[0].description
      contactQuestions[0].value = results[0].contactPoints[0].value
      contactQuestions[1].value = results[0].contactPoints[1].value
      contactQuestions[2].value = results[0].contactPoints[2].value
      additionSettingsQuestions[0].value = results[0].profileSortingType === 'RANDOM' ? i18next.t('spaceBuilder:addEdit.additionalOptions.inRandom') : results[0].profileSortingType === 'TITLE' ? i18next.t('spaceBuilder:addEdit.additionalOptions.inAlphabetical') : ''
      additionSettingsQuestions[1].value = results[0].isReactionsDisabled ? i18next.t('spaceBuilder:addEdit.additionalOptions.yes') : i18next.t('spaceBuilder:addEdit.additionalOptions.no')
      additionSettingsQuestions[2].value = results[0].isAccessLimitedToOnlyCardOwners ? i18next.t('spaceBuilder:addEdit.additionalOptions.yes') : i18next.t('spaceBuilder:addEdit.additionalOptions.no')
      if (results[0].enterCode) {
        additionSettingsQuestions[3].value = i18next.t('spaceBuilder:addEdit.additionalOptions.accessWithPassword')
        additionSettingsQuestions[3].accessWithPassword = results[0].enterCode
      } else {
        additionSettingsQuestions[3].value = i18next.t('spaceBuilder:addEdit.additionalOptions.public')
      }
      validate();
    },
    onError: (error) => {
      console.error(error);
    },
    refetchOnWindowFocus: false,
    enabled: !!handle,
  });

  const onChangeAccessPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const copyQuestions = [...additionSettingsQuestions]
    const questionIndex = copyQuestions.findIndex(
      (q) => q.nanoId === copyQuestions[3].nanoId
    )
    const updatedQuestion = {
      ...copyQuestions[3],
      accessWithPassword: value
    }
    copyQuestions.splice(questionIndex, 1, updatedQuestion);
    setAdditionSettingsQuestions(copyQuestions);
  }

  const onChangeInputQuestion = (e:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>
    | MouseEvent<HTMLButtonElement>,
    question: IFormQuestion) => {
    const value = (e.target as HTMLInputElement).value
    if (question.isRequired) {
      if (value === '') {
        setErrorFields((prev) => [
          ...prev,
          {
            questionNanoId: question.nanoId,
            errorMessage: `${t('alert.emptyField', { ns: 'guestQuestionare' })}`,
          },
        ]);
      } else if (value) {
        const index = ErrorFields.findIndex(
          (errorField) => errorField.questionNanoId === question.nanoId
        );
        index >= 0 && ErrorFields.splice(index, 1);
      }
    }
    const copyQuestions = [...questions]
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.nanoId === question.nanoId
    )
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (q) => q.nanoId === question.nanoId
      ) as unknown as IFormQuestion
      const updatedQuestion = {
        ...selectedQuestion,
        value,
      }
      copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
      setQuestions(copyQuestions);
    }
  }

  const onChangeContactInfo = (e:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>
    | MouseEvent<HTMLButtonElement>,
    question: IFormQuestion) => {
    const value = (e.target as HTMLInputElement).value
    if (question.questionType === 'EMAIL') {
      const index = ErrorFields.findIndex(
        (errorField) =>
          errorField.questionNanoId === question.nanoId &&
          errorField.errorMessage === `${t('alert.invalidEmail')}`
      );
      if (value?.match(REGEX.EMAIL) && index >= 0) {
        ErrorFields.splice(index, 1);
      } else if (!value && !question.isRequired) {
        ErrorFields.splice(index, 1);
      } else if (!value?.match(REGEX.EMAIL) && index < 0) {
        setErrorFields((prev) => [
          ...prev,
          {
            questionNanoId: question.nanoId,
            errorMessage: `${t('alert.invalidEmail')}`,
          },
        ]);
      }
    }
    const copyQuestions = [...contactQuestions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.nanoId === question.nanoId
    )
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (q) => q.nanoId === question.nanoId
      ) as unknown as IFormQuestion
      const updatedQuestion = {
        ...selectedQuestion,
        value,
      }
      copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion)
      setContactQuestions(copyQuestions)
    }
  }

  const onChangeAdditionalOptionQuestion = (index: number, question: IFormQuestion) => {
    const copyQuestions = [...additionSettingsQuestions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.nanoId === question.nanoId
    );
    const selectedQuestion = copyQuestions.find(
      (q) => q.nanoId === question.nanoId
    ) as IFormQuestion;
    switch (question.questionType) {
      case 'RADIO':
        if (selectedQuestionIndex >= 0 && selectedQuestion.options) {
          const updatedQuestion = {
            ...selectedQuestion,
            value: selectedQuestion.options[index],
          };
          copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
        }
        break;
    }
    setAdditionSettingsQuestions(copyQuestions)
  };

  const onChangeDefaultQuestionFileInput = async (
    value: Blob | string,
    question: IFormQuestion,
    fileName: string
  ) => {
    const copyQuestions = [...questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.nanoId === question.nanoId
    );
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (q) => q.nanoId === question.nanoId
      ) as unknown as IFormQuestion;
      let fileData = [fileName];
      if (value) {
        try {
          const { data } = await SpaceAPI.uploadProfileImage(value as File);
          fileData.push(data.results[0]);
        } catch (e) {
          fileData = [];
        }
      }
      const updatedQuestion = {
        ...selectedQuestion,
        selectedOptions: fileData,
      };
      copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
      setQuestions(copyQuestions)
    }
  };

  const validate = () => {
    let isEmpty = true;
    let requiredQuestions = questions.filter((question) => question.isRequired);
    requiredQuestions = [...requiredQuestions, ...contactQuestions.filter((question) => question.isRequired)];
    if (edit) {
      requiredQuestions = [...requiredQuestions, ...additionSettingsQuestions.filter((question) => question.isRequired)];
    }
    requiredQuestions.forEach((question) => {
      if (question.questionType === 'FILE') {
        if (question.selectedOptions?.length === 0) {
          isEmpty = false;
          return;
        }
      } else {
        if (!question.value) {
          isEmpty = false;
          return;
        }
      }
    });
    setIsValidated(isEmpty);
    return isEmpty;
  };

  const publishSpace = () => {
    if (validate()) {
      createUpdateSpace();
    }
  }

  const getImageByLocale = useCallback(() => {
    return i18n.language.includes(REGION.KO) ? `${BASE_URL.image}/guide/space/space_info_card_kor.png` : `${BASE_URL.image}/guide/space/space_info_card_eng.png`
  }, [i18n.language]);

  const getEmbedNotionByLocale = useCallback(() => {
    return i18n.language.includes(REGION.KO) ? 'https://v2-embednotion.com/044db485460e4dbdaca7eafd59e0770d' : 'https://v2-embednotion.com/Personalize-your-space-927c4983a4e0458f91a0149c823f6cdd'
  }, [i18n.language]);

  useEffect(() => {
    validate();
  }, [questions, contactQuestions, additionSettingsQuestions]);

  useEffect(() => {
    if (!edit) {
      setQuestions(questions.map((ques) => ({ ...ques, value: '' })));
      setContactQuestions(
        contactQuestions.map((ques) => ({ ...ques, value: '' }))
      );
      setAdditionSettingsQuestions(
        additionSettingsQuestions.map((ques) => ({ ...ques, value: '' }))
      );
    }
  }, [])

  return (
    <>
      {isLoadingSpace && loadingView()}
      <WithSidebarComponent>
        <SideAreaContainer mobilePadding="0 0 0 0">
          <Styled.NewSpaceWrapper>
            <Styled.TitleContainer>
              <Title>{edit ? t('editSpace', { ns: 'spaceBuilder' }) : t('createSpace', { ns: 'spaceBuilder' })}</Title>
              <Styled.MainButtonContainer>
                <Styled.ButtonContainer padding="3px 0px">
                  <NewTabLink href="https://www.sendtime.app/en/space/@demo">
                    <StyledButton
                      width='max-content'
                    >
                      {t('examplePage', { ns: 'spaceBuilder' })}
                    </StyledButton>
                  </NewTabLink>
                  <Styled.PublishedOnDesktop>
                    <StyledButton
                      width='max-content'
                      bgColor={isValidated ? 'purple-500' : 'gray-600'}
                      onClickButton={() => publishSpace()}
                    >
                      {t('publish', { ns: 'spaceBuilder' })}
                    </StyledButton>
                  </Styled.PublishedOnDesktop>
                </Styled.ButtonContainer>
                <NewTabLink href="https://sendtime.channel.io">
                  <Styled.Link>
                    {t('needHelp', { ns: 'spaceBuilder' })}
                  </Styled.Link>
                </NewTabLink>
              </Styled.MainButtonContainer>
            </Styled.TitleContainer>
            <Styled.NewSpaceContainer>
              <Styled.ImageWrapper>
                <ImageContainer>
                  <AutoHeightImage
                    src={getImageByLocale()}
                    alt="space-card"
                  />
                </ImageContainer>
              </Styled.ImageWrapper>
              <Styled.QuestionContainer>
                <Styled.QuestionInnerContainer>
                  {questions.map((question, index) => {
                    return (
                      <FormQuestion
                        key={index}
                        nanoId={question.nanoId}
                        title={question.title}
                        questionType={question.questionType}
                        required={question.isRequired}
                        isPreview={true}
                        isReservationContent={true}
                        value={question.value ? question.value : ''}
                        isSwitchOn={false}
                        isCreateSpace={true}
                        ErrorFields={ErrorFields}
                        helpText={question.helpText}
                        isDisable={index === 0 && edit}
                        supportedFileTypes={["png", "jpg", "jpeg"]}
                        onChangeInputQuestion={(
                          e:
                            | ChangeEvent<HTMLInputElement>
                            | ChangeEvent<HTMLTextAreaElement>
                            | MouseEvent<HTMLButtonElement>
                        ) => onChangeInputQuestion(e, question)}
                        onChangeFileInput={(
                          file: Blob | string,
                          name: string
                        ) => onChangeDefaultQuestionFileInput(file, question, name)}
                      />
                    );
                  })}
                  <Styled.ContactQuestionTitle>
                    {`${5}. ${t('addEdit.contact.info', { ns: 'spaceBuilder' })}`}
                  </Styled.ContactQuestionTitle>
                  <Styled.ContactQuestionWrappers padding="0 0 0 20px">
                    {contactQuestions.map((question, index) => {
                      return (
                        <FormQuestion
                          key={index}
                          nanoId={question.nanoId}
                          title={question.title}
                          questionType={question.questionType}
                          required={question.isRequired}
                          isPreview={true}
                          isReservationContent={true}
                          value={question.value ? question.value : ''}
                          isSwitchOn={false}
                          isCreateSpace={true}
                          ErrorFields={ErrorFields}
                          onChangeInputQuestion={(
                            e:
                              | ChangeEvent<HTMLInputElement>
                              | ChangeEvent<HTMLTextAreaElement>
                              | MouseEvent<HTMLButtonElement>
                          ) => onChangeContactInfo(e, question)}
                        />
                      );
                    })}
                  </Styled.ContactQuestionWrappers>
                  {edit && (
                    <>
                      <Styled.ContactQuestionTitle>
                        {t('addEdit.additionalSettings', { ns: 'spaceBuilder' })}
                      </Styled.ContactQuestionTitle>
                      <Styled.ContactQuestionWrappers>
                        {additionSettingsQuestions.map((question, index) => {
                          return (
                            <FormQuestion
                              key={index}
                              nanoId={question.nanoId}
                              title={question.title}
                              options={question.options}
                              selectedOptions={question.selectedOptions}
                              questionType={question.questionType}
                              required={question.isRequired}
                              isPreview={true}
                              isReservationContent={true}
                              value={question.value ? question.value : ''}
                              isSwitchOn={false}
                              isCreateSpace={true}
                              onChangeOptionQuestion={(optionIndex: number) =>
                                onChangeAdditionalOptionQuestion(optionIndex, question)
                              }
                            />
                          );
                        })}
                        {additionSettingsQuestions[3].value === i18next.t('spaceBuilder:addEdit.additionalOptions.accessWithPassword') &&
                          <Styled.AccessWithPassword>
                            <TextInput
                              value={additionSettingsQuestions[3].accessWithPassword || ''}
                              onChange={onChangeAccessPassword}
                              inputPadding={5}
                            />
                          </Styled.AccessWithPassword>
                        }
                      </Styled.ContactQuestionWrappers>
                    </>
                  )}
                </Styled.QuestionInnerContainer>
                {edit &&
                  <Styled.InnerContainer >
                    <Styled.IframeContainer>
                      <Iframe
                        url={getEmbedNotionByLocale()}
                        width="100%"
                        height="100%"
                        display="block"
                        position="relative"
                      />
                    </Styled.IframeContainer>
                  </Styled.InnerContainer>
                }
              </Styled.QuestionContainer>
            </Styled.NewSpaceContainer>
          </Styled.NewSpaceWrapper>
          <Styled.PublishButton onClick={() => publishSpace()} isValid={isValidated}>
            <Styled.PublishText>{t('publish', { ns: 'spaceBuilder' })}</Styled.PublishText>
            <Styled.PublishDescription>
              {t('editLater', { ns: 'spaceBuilder' })}
            </Styled.PublishDescription>
          </Styled.PublishButton>
        </SideAreaContainer>
      </WithSidebarComponent>
    </>

  );
};

export default AddEditSpace;
