import React, {
  ChangeEvent,
  createContext,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { nanoid } from 'nanoid';
import { useQuery } from 'react-query';

import {
  reservationAPI,
  ReservationQueryKeys,
} from '@api/personal/reservation/Reservation';
import { getIcon } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { ENG_TO_KOR_SHORT_WD, SELECT_TIME } from '@constants/time';
import { DateSelectArg } from '@fullcalendar/common';
import { Icon } from '@iconify/react';
import { AvailableTime, defaultChecked } from '@pages/SetTime';
import * as Sentry from '@sentry/browser';
import { translateOptionSlot, translateTime } from '@utils/format';
import { toDateWithDash } from '@utils/time';

import { useNestedModal } from './NestedModalProvider';

export const RESERVATION_PAGE_COUNT = 5;

export type RequiredType = {
  firstPage: {
    title: boolean;
    term: boolean;
    isDurationSelected: boolean;
  };
};

export type DailyTimes = {
  start: typeof SELECT_TIME[number];
  end: typeof SELECT_TIME[number];
};

export type LocationType = {
  id: string;
  content: string;
  checked: boolean;
};

export type OnlineLocationType = {
  id: string;
  content:
  | 'Zoom'
  | 'Microsoft Teams'
  | 'Google Meet'
  | '예약자가 장소입력'
  | '전화 미팅';
  icon: ReactNode;
  checked: boolean;
};

export type Radio = { start: Date; end: Date; checked: boolean };

export type PageInfoType = {
  title: string;
  description: string;
  term: { custom: Radio; days: Radio; infinite: Radio };
  timeIndex: string[];
  location: LocationType[];
  online: OnlineLocationType[];
  /* 타입 변경하기 */
  availableDays: AvailableTime[];
  spareTime: {
    before: {
      time: string /* 15분, 30분, ... Type 변경해야 */;
      checked: boolean;
    };
    next: {
      time: string /* 15분, 30분, ... Type 변경해야 */;
      checked: boolean;
    };
  };
  rankOption: { selectInput: string; value: number };
  masked: boolean;
  reminder: boolean;
  blockingTimes: {
    id: string;
    start: string;
    end: string;
    className: 'blocked-events';
    blocked: true;
  }[];
  form: IForm;
};

interface ReservationProviderProps {
  page: number;
  goNextPage: (params?: any) => void;
  goPrevPage: () => void;
  pageInfo: PageInfoType;
  isValidated: RequiredType;
  isAnimated: { firstPage: boolean };

  /* First Page 관련 함수 */
  onChangePageInfoTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePageInfoDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  onClickSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onChangeCustomLocation: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickAddLocation: () => void;
  customLocations: LocationType[];
  customLocation: LocationType;
  onClickCustomLocationCheckbox: (id: string) => void;
  onClickDeleteLocation: (id: string) => void;
  onClickCheckbox: (id: string) => void;
  onDurationChange: (durations: string[]) => void;

  /* Second Page 관련 함수 */
  onClickSpareTimeStartSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickSpareTimeEndSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickRankOptionTimeSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickSpareTimeBeforeCheckbox: () => void;
  onClickSpareTimeNextCheckbox: () => void;
  onMakeCalendarBlock: (event: DateSelectArg) => void;
  onDeleteCalendarBlock: (id: string) => void;

  /* Third Page 관련 함수 */
  onToggleReminder: () => void;
  onToggleMasked: () => void;

  /* Guest Questionnaire */
  onClickTogglePreview: (id: string) => void;
  onChangeQuestion: (question: IFormQuestion) => void;
  onDeleteQuestion: (question: IFormQuestion) => void;
  onAddQuestion: (question: IFormQuestion) => void;

  setPageInfo: Dispatch<SetStateAction<PageInfoType>>;
}

const defaultValue = { page: 1 } as unknown as ReservationProviderProps;

const defaultCustomLocation: LocationType = {
  id: nanoid(),
  content: '',
  checked: false,
};

const ReservationContext =
  createContext<ReservationProviderProps>(defaultValue);

export const defaultPageInfo: PageInfoType = {
  title: `-`,
  description: '',
  term: {
    custom: {
      start: new Date(),
      end: dayjs().add(30, 'day').toDate(),
      checked: true,
    },
    days: {
      start: new Date(),
      end: dayjs().add(30, 'day').toDate(),
      checked: false,
    },
    infinite: { start: new Date(), end: new Date(), checked: false },
  },
  timeIndex: ['30분'],
  location: [],
  online: [
    {
      id: nanoid(),
      content: 'Zoom',
      icon: getIcon('Zoom'),
      checked: false,
    },
    {
      id: nanoid(),
      content: 'Google Meet',
      icon: <Icon icon="logos:google-meet" width="24" />,
      checked: false,
    },
    {
      id: nanoid(),
      content: 'Microsoft Teams',
      icon: <Icon icon="logos:microsoft-teams" width="24" />,
      checked: false,
    },
    {
      id: nanoid(),
      content: '전화 미팅',
      icon: <Icon icon="bxs:phone-call" width="24" color="#27AE60" />,
      checked: false,
    },
    {
      id: nanoid(),
      content: '예약자가 장소입력',
      icon: <></>,
      checked: false,
    },
  ],
  availableDays: defaultChecked,
  spareTime: {
    before: { time: translateTime('15분'), checked: false },
    next: { time: translateTime('15분'), checked: false },
  },
  rankOption: {
    selectInput: translateOptionSlot('1순위까지 옵션받기'),
    value: 1,
  },
  masked: true,
  reminder: true,
  blockingTimes: [],
  form: {
    questions: [
      {
        nanoId: nanoid(),
        questionType: 'NAME',
        title: `${i18next.t(
          'guestQuestionare:addQuestion.defaultQuestions.name'
        )}`,
        value: '',
        isContainEtc: false,
        isRequired: true,
        isSwitchOn: true,
        isSwitchToggleAllowed: false,
      },
      {
        nanoId: nanoid(),
        questionType: 'EMAIL',
        title: `${i18next.t(
          'guestQuestionare:addQuestion.defaultQuestions.email'
        )}`,
        value: '',
        isContainEtc: false,
        isRequired: true,
        isSwitchOn: true,
        isSwitchToggleAllowed: true,
      },
      {
        nanoId: nanoid(),
        questionType: 'PHONE',
        title: `${i18next.t(
          'guestQuestionare:addQuestion.defaultQuestions.phoneNumber'
        )}`,
        value: '',
        isContainEtc: false,
        isRequired: true,
        isSwitchOn: true,
        isSwitchToggleAllowed: true,
      },
      {
        nanoId: nanoid(),
        questionType: 'MULTIPLE_LINES',
        title: `${i18next.t(
          'guestQuestionare:addQuestion.defaultQuestions.leaveMessage'
        )}`,
        value: '',
        isContainEtc: false,
        isRequired: true,
        isSwitchOn: true,
        isSwitchToggleAllowed: true,
      },
    ],
  },
};

const ReservationProvider = ({
  children,
  edit = false,
}: {
  children: ReactNode;
  edit?: boolean;
}) => {
  const router = useRouter();
  const { showModal } = useNestedModal({
    type: 'alert',
    description: i18next.t('reservationProvider:alert.retry.message'),
  });
  const { showModal: showNoCustomUrl, hideModal: hideNoCustomUrl } =
    useNestedModal({
      type: 'alert',
      title: i18next.t('reservationProvider:alert.createURL.title'),
      description: i18next.t('reservationProvider:alert.createURL.message'),
    });

  const { id } = router.query;
  const [page, setPage] = useState(1);

  const [pageInfo, setPageInfo] = useState<PageInfoType>(defaultPageInfo);

  // useQuery(ReservationQueryKeys.get(), () => reservationAPI.get(), {
  //   onSuccess: ({ data: { results } }) => {
  //     if (edit) return;
  //     const res = results[0];
  //     const customLocations = res.favoritePlaces
  //       .filter(({ type }) => type === 'CUSTOM')
  //       .map(({ id, name }) => ({
  //         id,
  //         content: name,
  //         icon: (
  //           <CustomIcon size={20} height={25} fill="#F2994A" stroke="none">
  //             <Location />
  //           </CustomIcon>
  //         ),
  //         checked: true,
  //       })) as unknown as LocationType[];

  //     setPageInfo((prevPageInfo) => ({
  //       ...prevPageInfo,
  //       title: `${res.hostName}` + i18next.t('reservationProvider:placeholder'),
  //       availableDays: res.openTimes.map(
  //         ({ day, start, end, available }, id) => ({
  //           id,
  //           day: ENG_TO_KOR_SHORT_WD[day],
  //           start,
  //           end,
  //           available,
  //         })
  //       ),
  //       location: customLocations,
  //     }));
  //   },
  //   onError: async (error: { message: string; code: number }) => {
  //     if (error.message === '커스텀 URL이 설정되지 않았습니다.') {
  //       await showNoCustomUrl();
  //       router.push(ROUTES.ONBOARDING.URL);
  //       hideNoCustomUrl();
  //       return;
  //     }

  //     Sentry.captureException(error);
  //     showModal();
  //     console.error(error);
  //   },
  //   refetchOnWindowFocus: false,
  // });

  useQuery(
    ReservationQueryKeys.getEditData(),
    () => reservationAPI.getEditData(`${id}`),
    {
      onSuccess: ({ data: { results } }) => {
        const pageDetails = results[0];

        const startDateTerm = new Date(
          pageDetails.reservationPeriodInfo.startDateTime
        );
        const endDateTerm = new Date(
          pageDetails.reservationPeriodInfo.endDateTime
        );
        setPageInfo({
          title: pageDetails.reservationPageName,
          description: pageDetails.reservationPageDescription,
          term: {
            custom: {
              start: startDateTerm,
              end: endDateTerm,
              checked: !pageDetails.reservationPeriodInfo.isInfinite,
            },
            days: {
              start: new Date(),
              end: new Date(new Date().setDate(new Date().getDate() + 30)),
              checked: false,
            },
            infinite: {
              start: startDateTerm,
              end: new Date('2999-12-31T00:00:00.000+09:00'),
              checked: pageDetails.reservationPeriodInfo.isInfinite,
            },
          },
          timeIndex: pageDetails.timeUnit,
          location: pageDetails.reservationLocations
            .filter(
              ({ type, name }) =>
                type === 'CUSTOM' && name !== '예약자가 장소입력'
            )
            .map(({ id, name }) => ({ id, content: name, checked: true })),
          online: [
            {
              id: nanoid(),
              content: 'Zoom',
              icon: getIcon('Zoom'),
              checked:
                pageDetails.reservationLocations.find(
                  ({ type }) => type === 'ZOOM'
                ) !== undefined,
            },
            {
              id: nanoid(),
              content: 'Google Meet',
              icon: <Icon icon="logos:google-meet" width="24" />,
              checked:
                pageDetails.reservationLocations.find(
                  ({ type }) => type === 'MEET'
                ) !== undefined,
            },
            {
              id: nanoid(),
              content: 'Microsoft Teams',
              icon: <Icon icon="logos:microsoft-teams" width="24" />,
              checked:
                pageDetails.reservationLocations.find(
                  ({ type }) => type === 'TEAMS'
                ) !== undefined,
            },
            {
              id: nanoid(),
              content: '전화 미팅',
              icon: <Icon icon="bxs:phone-call" width="24" color="#27AE60" />,
              checked:
                pageDetails.reservationLocations.find(
                  ({ type }) => type === 'PHONE'
                ) !== undefined,
            },
            {
              id: nanoid(),
              content: '예약자가 장소입력',
              icon: <></>,
              checked:
                pageDetails.reservationLocations.find(
                  ({ name }) => name === '예약자가 장소입력'
                ) !== undefined,
            },
          ],
          availableDays:
            pageDetails.reservationAvailableRange.map((range, idx) => ({
              ...range,
              id: idx,
              day: ENG_TO_KOR_SHORT_WD[range.day],
            })) || defaultChecked,
          spareTime: {
            before: {
              time: pageDetails.frontBufferTime
                ? translateTime(pageDetails.frontBufferTime + '분')
                : translateTime('15분'),
              checked: pageDetails.frontBufferTime !== '',
            },
            next: {
              time: pageDetails.backBufferTime
                ? translateTime(pageDetails.backBufferTime + '분')
                : translateTime('15분'),
              checked: pageDetails.backBufferTime !== '',
            },
          },
          rankOption: {
            selectInput: translateOptionSlot(
              `${pageDetails.reservationPageOptionCount}순위까지 옵션받기`
            ),
            value: pageDetails.reservationPageOptionCount,
          },
          masked: pageDetails.masking || false,
          reminder: pageDetails.remind || false,
          blockingTimes: pageDetails.blockingTimes.map(
            ({ startTime, endTime }) => ({
              id: nanoid(),
              start: startTime,
              end: endTime,
              className: 'blocked-events',
              blocked: true,
            })
          ),
          form: {
            questions: pageDetails.form.questions.map((item: any) => {
              return {
                id: item.id,
                nanoId: item.id,
                questionType: item.type,
                title: item.title,
                isRequired: item.isRequired,
                isSwitchOn: item.isExposed,
                isContainEtc: item.isContainEtc || false,
                options: item.options,
                isSwitchToggleAllowed: item.type !== 'NAME',
              };
            }) as IFormQuestion[],
          } as IForm,
        });
      },
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
      refetchOnWindowFocus: false,
      enabled: edit && !!id,
    }
  );

  const [isValidated, setIsValidated] = useState({
    firstPage: { title: true, term: true, isDurationSelected: true },
  });

  const isPageValidated = {
    firstPage: Object.values(isValidated.firstPage).every((val) => val),
  };

  const [isAnimated, setIsAnimated] = useState({ firstPage: false });

  useEffect(() => {
    setIsValidated((prevState) => {
      return {
        ...prevState,
        firstPage: {
          ...prevState.firstPage,
          title: pageInfo.title.trim() !== '',
          isDurationSelected: pageInfo.timeIndex.length !== 0,
        },
      };
    });
  }, [pageInfo.title, pageInfo.timeIndex]);

  useEffect(() => {
    setIsValidated((prevState) => {
      const dateRange =
        +new Date(toDateWithDash(pageInfo.term.custom.end)) -
        +new Date(toDateWithDash(pageInfo.term.custom.start));

      return {
        ...prevState,
        firstPage: {
          ...prevState.firstPage,
          term: dateRange >= 0,
        },
      };
    });
  }, [pageInfo.term.custom.start, pageInfo.term.custom.end]);

  const animateRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (animateRef.current) {
      clearTimeout(animateRef.current);
      animateRef.current = null;
    }
  }, [isAnimated.firstPage]);

  const goNextPage = () => {
    setPage((prevState) => {
      if (prevState === 1) {
        if (!isPageValidated.firstPage) {
          setIsAnimated({ firstPage: true });

          animateRef.current = setTimeout(() => {
            setIsAnimated({ firstPage: false });
          }, 400);

          return prevState;
        }
      }

      const newPage = prevState + 1;
      if (newPage > RESERVATION_PAGE_COUNT) {
        router.push(ROUTES.MANAGE.INDEX);

        // API 요청 보내기
        return prevState;
      }

      return newPage;
    });
  };

  const goPrevPage = () => {
    setPage((prevState) => {
      const newPage = prevState - 1;

      if (newPage < 1) {
        const isConfirmed = confirm(
          i18next.t('reservationProvider:alert.goingBack')
        );
        if (isConfirmed) {
          router.push(ROUTES.MY_CALENDAR);
        }
        return prevState;
      }

      return newPage;
    });
  };

  const [customLocation, setCustomLocation] = useState<LocationType>(
    defaultCustomLocation
  );
  const [customLocations, setCustomLocations] = useState<LocationType[]>([]);

  const onChangeCustomLocation = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 100) return;

    setCustomLocation((prevState) => ({
      ...prevState,
      content: target.value,
    }));
  };

  const onChangePageInfoTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 100) return;

    setPageInfo((prevState) => ({
      ...prevState,
      title: target.value,
    }));
  };

  const onChangePageInfoDescription = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    if (target.value.length > 3000) return;

    setPageInfo((prevState) => ({
      ...prevState,
      description: target.value,
    }));
  };

  const onClickSelectBox = (event: MouseEvent<HTMLButtonElement>) => {
    const newReservationTime = event.currentTarget.innerText;
  };

  const onDurationChange = (durations: string[]) => {
    setPageInfo((prevState) => ({
      ...prevState,
      timeIndex: durations,
    }));
  };

  const onClickAddLocation = () => {
    const noContent = !customLocation.content || !customLocation.content.trim();
    if (noContent) return;

    const newLocation = {
      id: nanoid(),
      content: customLocation.content,
      checked: true,
    };

    setCustomLocation(defaultCustomLocation);

    setPageInfo((prevInfo) => ({
      ...prevInfo,
      location: [newLocation, ...prevInfo.location],
    }));
  };

  const onClickDeleteLocation = (id: string) => {
    setPageInfo((prevPageInfo) => {
      return {
        ...prevPageInfo,
        location: prevPageInfo.location.filter(
          (location) => location.id !== id
        ),
      };
    });
  };

  const onClickCustomLocationCheckbox = (id: string) => {
    setPageInfo((prevState) => {
      const copy = [...prevState.location];
      const idx = copy.findIndex((lo) => lo.id === id);
      const target = copy.find((lo) => lo.id === id);

      if (target) {
        copy.splice(idx, 1, { ...target, checked: !target.checked });

        return { ...prevState, location: copy };
      }

      return { ...prevState };
    });
  };

  const onClickCheckbox = (id: string) => {
    const copy = [...pageInfo.online];
    const onlineLocationIdx = copy.findIndex((location) => location.id === id);
    const targetOnlineLocation = copy.find((location) => location.id === id);

    if (targetOnlineLocation) {
      const newOnlineLocation = {
        ...targetOnlineLocation,
        checked: !targetOnlineLocation.checked,
      };
      copy.splice(onlineLocationIdx, 1, newOnlineLocation);

      setPageInfo((prevState) => ({ ...prevState, online: copy }));
    }
  };

  /* Second Page 관련 로직 */
  const onClickSpareTimeStartSelectBox = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const newStartTime = event.currentTarget.innerText;

    setPageInfo((prevState) => ({
      ...prevState,
      spareTime: {
        ...prevState.spareTime,
        before: { time: newStartTime, checked: true },
      },
    }));
  };

  const onClickSpareTimeEndSelectBox = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const newEndTime = event.currentTarget.innerText;
    setPageInfo((prevState) => ({
      ...prevState,
      spareTime: {
        ...prevState.spareTime,
        next: { time: newEndTime, checked: true },
      },
    }));
  };

  const onMakeCalendarBlock = ({ startStr, endStr }: DateSelectArg) => {
    setPageInfo((prevState) => ({
      ...prevState,
      blockingTimes: [
        ...prevState.blockingTimes,
        {
          id: nanoid(),
          start: startStr,
          end: endStr,
          className: 'blocked-events',
          blocked: true,
        },
      ],
    }));
  };

  const onDeleteCalendarBlock = (id: string) => {
    setPageInfo((prevState) => ({
      ...prevState,
      blockingTimes: prevState.blockingTimes.filter((time) => time.id !== id),
    }));
  };

  /* ---------------  ---------------  ---------------  --------------- */

  const onClickRankOptionTimeSelectBox = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const newReservationTime = event.currentTarget.innerText;
    const id = event.currentTarget.dataset.id as string;

    setPageInfo((prevState) => ({
      ...prevState,
      rankOption: {
        selectInput: newReservationTime,
        value: parseInt(id) + 1,
      },
    }));
  };

  const onClickSpareTimeBeforeCheckbox = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      spareTime: {
        ...prevState.spareTime,
        before: {
          ...prevState.spareTime.before,
          checked: !prevState.spareTime.before.checked,
        },
      },
    }));
  };

  const onClickSpareTimeNextCheckbox = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      spareTime: {
        ...prevState.spareTime,
        next: {
          ...prevState.spareTime.next,
          checked: !prevState.spareTime.next.checked,
        },
      },
    }));
  };

  /* Third Page 관련 로직 */
  const onToggleReminder = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      reminder: !prevState.reminder,
    }));
  };

  const onToggleMasked = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      masked: !prevState.masked,
    }));
  };

  /* Guest Questionnaire */
  const onClickTogglePreview = (id: string) => {
    const copyQuestions = [...pageInfo.form.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (question) => question.nanoId === id
    );
    if (selectedQuestionIndex >= 0) {
      const selectedQuestion = copyQuestions.find(
        (question) => question.nanoId === id
      ) as IFormQuestion;
      const updatedQuestion = {
        ...selectedQuestion,
        isSwitchOn: !selectedQuestion?.isSwitchOn,
      };
      copyQuestions.splice(selectedQuestionIndex, 1, updatedQuestion);
      setPageInfo((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          questions: copyQuestions,
        },
      }));
    }
  };

  const onAddQuestion = (question: IFormQuestion) => {
    const copyQuestions = [...pageInfo.form.questions];
    copyQuestions.push(question);
    setPageInfo((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        questions: copyQuestions,
      },
    }));
  };

  const onDeleteQuestion = (question: IFormQuestion) => {
    const id = question.nanoId;
    const copyQuestions = [...pageInfo.form.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (question) => question.nanoId === id
    );
    copyQuestions.splice(selectedQuestionIndex, 1);
    setPageInfo((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        questions: copyQuestions,
      },
    }));
  };

  const onChangeQuestion = (question: IFormQuestion) => {
    const id = question.nanoId;
    const copyQuestions = [...pageInfo.form.questions];
    const selectedQuestionIndex = copyQuestions.findIndex(
      (question) => question.nanoId === id
    );
    copyQuestions.splice(selectedQuestionIndex, 1, question);
    setPageInfo((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        questions: copyQuestions,
      },
    }));
  };

  return (
    <ReservationContext.Provider
      value={{
        isValidated,
        isAnimated,
        page,
        goNextPage,
        goPrevPage,
        setPageInfo,
        pageInfo,
        onChangePageInfoTitle,
        onChangePageInfoDescription,
        onDurationChange,
        onClickSelectBox,
        onChangeCustomLocation,
        onClickAddLocation,
        customLocations,
        customLocation,
        onClickCustomLocationCheckbox,
        onClickDeleteLocation,
        onClickCheckbox,
        onClickSpareTimeStartSelectBox,
        onClickSpareTimeEndSelectBox,
        onClickRankOptionTimeSelectBox,
        onClickSpareTimeBeforeCheckbox,
        onClickSpareTimeNextCheckbox,
        onToggleReminder,
        onToggleMasked,
        onMakeCalendarBlock,
        onDeleteCalendarBlock,
        onClickTogglePreview,
        onChangeQuestion,
        onDeleteQuestion,
        onAddQuestion,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = (): ReservationProviderProps => {
  return useContext<ReservationProviderProps>(ReservationContext);
};

export default ReservationProvider;
