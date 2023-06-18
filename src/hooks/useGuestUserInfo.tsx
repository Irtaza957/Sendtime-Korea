import { ChangeEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import {
  guestUserInfoAPI,
  GuestUserInfoKeys,
} from '@api/personal/reservation/GuestReservationInfo';
import { coreUserState } from '@atoms/index';
import { QuestionTypeMaxLength } from '@components/pages/NewReservation/FormConfigPage/FormQuestion';
import { REGEX } from '@constants/regex';
import { useGuestInfo } from '@contexts/GuestReservationProvider';
import {
  defaultHostInfo,
  defaultTimezone,
} from '@pages/GuestReservation/defaults';
import { encodeBase64Json } from '@utils/encoding';
import {
  convertAnswersToQuestionAnswers,
  convertQuestionAnswersToAnswers,
} from '@utils/form';
import { makePhoneNumberWithHyphen } from '@utils/phoneNumber';
import { removeFromLocalStorage } from '@utils/storage';
import { toTzDateTimeObj } from '@utils/time';

import { UserInfoForRedirectToSignUp } from './useSignUp';
import useTranslate from './useTranslate';

type useGuestUserInfoParams = {
  pageId?: string;
  customPageId?: string;
  thirdPartyId?: string;
};

export type ErrorState = {
  questionNanoId: string;
  errorMessage: string;
};

const useGuestUserInfo = ({
  pageId,
  customPageId,
  thirdPartyId,
}: useGuestUserInfoParams) => {
  const router = useRouter();
  const { t } = useTranslation('guestQuestionare');
  const { i18n } = useTranslate();
  const pgId = pageId == undefined ? '' : pageId;

  const [selectedTimezone, setSelectedTimezone] = useState(defaultTimezone);

  const { guestInfo, setGuestInfo } = useGuestInfo();
  const [hostInfo, setHostInfo] = useState(defaultHostInfo);
  const [ErrorFields, setErrorFields] = useState<ErrorState[]>([]);
  const user = useRecoilValue(coreUserState);

  const [customLocation, setCustomLocation] = useState({
    value: '',
    checked: false,
  });

  const getParams = () => {
    if (customPageId) {
      return { custom: customPageId };
    }

    if (thirdPartyId) {
      return { third: thirdPartyId };
    }

    return {};
  };

  const { isLoading } = useQuery(
    GuestUserInfoKeys.get(pgId),
    () => guestUserInfoAPI.get(pgId, getParams()),
    {
      onSuccess: ({ data: { results } }) => {
        const location = results[0].location || [];
        const questions = results[0].form.questions || [];
        const prefilledQuestionAnswers = convertAnswersToQuestionAnswers(
          results[0].answers || []
        );
        let prefillUserData = false;
        let name = '',
          email = '',
          phone = '';
        if (user && results[0].reservationPageSubType === 'GENERAL') {
          prefillUserData = true;
          questions.forEach((element) => {
            if (element.type === 'NAME') {
              name = user?.name || '';
            } else if (element.type === 'EMAIL') {
              email = user?.email || '';
            } else if (element.type === 'PHONE') {
              phone = user?.phone || '';
            }
          });
        }
        setHostInfo(() => {
          if (location.length) {
            const { name, type } = location[0];
            setGuestInfo((prev) => {
              return { ...prev, reservationLocation: { name, type } };
            });
          }

          return {
            ...results[0],
            location: location.map((lo, idx) => ({
              ...lo,
              checked: idx === 0,
            })),
            form: {
              questions: questions.map((q) => {
                const prefilledAnswer = prefilledQuestionAnswers?.find(
                  (answer) => answer.id === q.id
                );
                return {
                  id: q.id,
                  nanoId: q.id,
                  questionType: q.type,
                  title: q.title,
                  options: q.options,
                  isRequired: q.isRequired,
                  isSwitchOn: q.isExposed,
                  isSwitchToggleAllowed: false,
                  ...(prefillUserData && q.type === 'NAME' && { value: name }),
                  ...(prefillUserData &&
                    q.type === 'EMAIL' && { value: email }),
                  ...(prefillUserData &&
                    q.type === 'PHONE' && { value: phone }),
                  ...(!prefillUserData && { value: prefilledAnswer?.value }),
                  selectedOptions: prefilledAnswer?.selectedOptions || [],
                  isContainEtc:
                    prefilledAnswer?.isContainEtc || q.isContainEtc || false,
                  othersInputValue: prefilledAnswer?.othersInputValue || '',
                } as IFormQuestion;
              }),
            },
          };
        });
      },

      cacheTime: 3600,
      // enabled:false
    }
  );

  const selectTimezone = (tz: Timezone) => {
    setSelectedTimezone(tz);
  };

  const getStoredTimezone = () => {
    const createReservationTimezone = localStorage.getItem(
      'createReservationTimezone'
    );
    if (createReservationTimezone) {
      return JSON.parse(createReservationTimezone);
    } else {
      return {
        id: '',
        name: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }
  };

  const { mutate: createReservation, isLoading: isCreateReservationLoading } =
    useMutation(
      () => {
        const location = hostInfo.location.find(({ checked }) => checked);
        const customLoc = customLocation.value;
        const reservationLocation = {
          name: location?.name || customLoc,
          type: location?.type || 'CUSTOM',
        };
        const createReservationTimezone = getStoredTimezone();
        const browserTimezone =
          Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (!!hostInfo.location.length && reservationLocation.name === '') {
          throw new Error(t('alert.location'));
        }

        const answers: AnswerType[] = convertQuestionAnswersToAnswers(
          hostInfo.form.questions
        );
        const parent = {
          ...guestInfo,
          reservationOptions: guestInfo.reservationOptions.map(
            ({ startDateTime, endDateTime, priority }) => {
              let startDate = startDateTime;
              let endDate = endDateTime;

              const startTz = toTzDateTimeObj(
                startDate,
                createReservationTimezone?.timezone
              ).format('Z');
              const startTzToReplace = toTzDateTimeObj(
                startDate,
                browserTimezone
              ).format('Z');
              const endTz = toTzDateTimeObj(
                endDate,
                createReservationTimezone?.timezone
              ).format('Z');
              const endTzToReplace = toTzDateTimeObj(
                endDate,
                browserTimezone
              ).format('Z');

              startDate = startDate.replace(startTzToReplace, startTz);
              endDate = endDate.replace(endTzToReplace, endTz);

              return {
                startDateTime: startDate,
                endDateTime: endDate,
                priority,
              };
            }
          ),
          reservationAttendee: null,
          reservationLocation: reservationLocation,
          timezone: createReservationTimezone,
          answers: answers,
          locale: i18n.language,
        };

        const nested = { ...parent, customPageId };
        const thirdParty = { ...parent, thirdPersonPageId: thirdPartyId };

        if (customPageId) {
          return guestUserInfoAPI.createReservation(pgId, nested);
        }

        if (thirdPartyId) {
          return guestUserInfoAPI.createReservation(pgId, thirdParty);
        }

        return guestUserInfoAPI.createReservation(pgId, parent);
      },
      {
        onSuccess: () => {
          removeFromLocalStorage('createReservationTimezone');
          removeFromLocalStorage(`${pgId}length`);
          guestInfo.reservationOptions.forEach((_, idx) => {
            removeFromLocalStorage(`${pgId}${idx}`);
          });
          let email = '';
          hostInfo.form.questions.every((question) => {
            if (question.questionType === 'EMAIL') {
              email = question.value || '';
              return false;
            }
            return true;
          });
          const query: UserInfoForRedirectToSignUp = {
            email: email,
            name: guestInfo.reservationAttendee.name.value,
            phone: guestInfo.reservationAttendee.phone.value,
          };

          const path = `${router.asPath.split('/contents')[0]}/completed`;
          const info = encodeBase64Json(query);

          router.push({
            pathname: path,
            query: { info },
          });
        },

        onError: (e: { message: string; code: number }) => {
          alert(e.message);
        },
      }
    );

  const onClickLocation = (id: string) => {
    setHostInfo((prevState) => {
      const newLocation = prevState.location.map((lo) => {
        if (lo.id === id) {
          return { ...lo, checked: true };
        }
        return { ...lo, checked: false };
      });

      return { ...prevState, location: newLocation };
    });

    setCustomLocation((prevValue) => ({ ...prevValue, checked: false }));
  };

  const onClickCustomLocation = () => {
    const newLocation = hostInfo.location.map((lo) => ({
      ...lo,
      checked: false,
    }));

    setHostInfo((prevState) => ({
      ...prevState,
      location: newLocation,
    }));

    setCustomLocation({
      value: customLocation.value,
      checked: true,
    });
  };

  const onChangeCustomLocation = (event: ChangeEvent<HTMLInputElement>) => {
    const newLocation = hostInfo.location.map((lo) => ({
      ...lo,
      checked: false,
    }));

    setHostInfo((prevState) => ({
      ...prevState,
      location: newLocation,
    }));

    setCustomLocation({ value: event.target.value, checked: true });
  };

  // Guest Questionnaire
  const onChangeInputQuestion = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | MouseEvent<HTMLButtonElement>,
    question: IFormQuestion
  ) => {
    let value: any;
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
      default:
        break;
    }
    if (question.questionType === 'EMAIL') {
      const index = ErrorFields.findIndex(
        (errorField) =>
          errorField.questionNanoId === question.nanoId &&
          errorField.errorMessage === `${t('alert.invalidEmail')}`
      );
      if (value?.match(REGEX.EMAIL) && index >= 0) {
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
    } else if (question.questionType === 'PHONE') {
      const index = ErrorFields.findIndex(
        (errorField) =>
          errorField.questionNanoId === question.nanoId &&
          errorField.errorMessage === `${t('alert.invalidPhone')}`
      );
      if (value?.length === 13 && index >= 0) {
        ErrorFields.splice(index, 1);
      } else if (value?.length < 13 && index < 0) {
        setErrorFields((prev) => [
          ...prev,
          {
            questionNanoId: question.nanoId,
            errorMessage: `${t('alert.invalidPhone')}`,
          },
        ]);
      }
    } else if (question.isRequired) {
      if (value === '') {
        setErrorFields((prev) => [
          ...prev,
          {
            questionNanoId: question.nanoId,
            errorMessage: `${t('alert.emptyField')}`,
          },
        ]);
      } else if (value) {
        const index = ErrorFields.findIndex(
          (errorField) => errorField.questionNanoId === question.nanoId
        );
        index >= 0 && ErrorFields.splice(index, 1);
      }
    }
    const copyQuestions = [...hostInfo.form.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.id === question.id
    );
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (q) => q.id === question.id
      ) as unknown as IFormQuestion;
      const updatedQuestion = {
        ...selectedQuestion,
        value,
      };
      copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
      setHostInfo((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          questions: copyQuestions,
        },
      }));
    }
  };

  const onChangeOptionQuestion = (index: number, question: IFormQuestion) => {
    const copyQuestions = [...hostInfo.form.questions];
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
              selectedQuestion.options[index] === 'Other'
                ? selectedQuestion.othersInputValue
                : '',
            isContainEtc:
              selectedQuestion.options[index] === 'Other' ? true : false,
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
            isOthersClicked = selectedOptionValue === 'Other';
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
    setHostInfo((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        questions: copyQuestions,
      },
    }));
  };

  const onChangeOthersInput = (
    event: ChangeEvent<HTMLInputElement>,
    question: IFormQuestion
  ) => {
    const copyQuestions = [...hostInfo.form.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.id === question.id
    );
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (q) => q.id === question.id
      ) as IFormQuestion;
      const copyCheckboxes = selectedQuestion.selectedOptions
        ? [...selectedQuestion.selectedOptions]
        : [];
      if (event.target.value && !copyCheckboxes.includes('Other')) {
        copyCheckboxes.push('Other');
      }

      const updatedQuestion = {
        ...selectedQuestion,
        selectedOptions: copyCheckboxes,
        othersInputValue: event.target.value,
        isContainEtc: copyCheckboxes.includes('Other'),
      };
      copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
      setHostInfo((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          questions: copyQuestions,
        },
      }));
    }
  };

  const onChangeFileInput = async (
    value: Blob | string,
    question: IFormQuestion,
    fileName: string
  ) => {
    const copyQuestions = [...hostInfo.form.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (q) => q.id === question.id
    );
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (q) => q.id === question.id
      ) as unknown as IFormQuestion;
      let fileData = [fileName];
      if (value) {
        try {
          const formData = new FormData();
          formData.append('multipartFile', value);
          const { data } = await guestUserInfoAPI.fileUpload(formData);
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
      setHostInfo((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          questions: copyQuestions,
        },
      }));
    }
  };

  const isFormValidated = () => {
    let isEmpty = false;
    const requiredQuestions = hostInfo.form.questions.filter(
      (question) =>
        question.questionType === 'PHONE' ||
        question.questionType === 'EMAIL' ||
        question.isRequired
    );
    requiredQuestions.forEach((question) => {
      if (question.questionType === 'RADIO') {
        if (question.value === 'Other' && !question.othersInputValue) {
          isEmpty = true;
          return;
        } else if (!question.value) {
          isEmpty = true;
          return;
        }
      } else if (question.questionType === 'CHECK_BOX') {
        if (
          question.selectedOptions?.includes('Other') &&
          !question.othersInputValue
        ) {
          isEmpty = true;
          return;
        } else if (question.selectedOptions?.length === 0) {
          isEmpty = true;
          return;
        }
      } else if (question.questionType === 'PHONE') {
        if (question.isRequired) {
          if (
            !question.value ||
            question.value == '' ||
            question.value.length < 13
          ) {
            isEmpty = true;
            return;
          }
        } else if (
          question.value &&
          question?.value !== '' &&
          question.value.length < 13
        ) {
          isEmpty = true;
          return;
        }
      } else if (question.questionType === 'EMAIL') {
        if (question.isRequired) {
          if (
            !question.value ||
            question.value == '' ||
            !question.value.match(REGEX.EMAIL)
          ) {
            isEmpty = true;
            return;
          }
        } else if (
          question.value &&
          question?.value !== '' &&
          !question.value.match(REGEX.EMAIL)
        ) {
          isEmpty = true;
          return;
        }
      } else if (question.questionType === 'FILE') {
        if (question.selectedOptions?.length === 0) {
          isEmpty = true;
          return;
        }
      } else {
        if (!question.value || question.value == '') {
          isEmpty = true;
          return;
        }
      }
    });
    return isEmpty;
  };

  return {
    onChangeCustomLocation,
    onClickCustomLocation,
    onClickLocation,
    createReservation,
    guestInfo,
    hostInfo,
    customLocation,
    setGuestInfo,
    ErrorFields,
    isLoading: isLoading || isCreateReservationLoading,
    selectedTimezone,
    setSelectedTimezone,
    selectTimezone,
    onChangeInputQuestion,
    onChangeOptionQuestion,
    onChangeOthersInput,
    onChangeFileInput,
    isFormValidated,
  };
};

export default useGuestUserInfo;
