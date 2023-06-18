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
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import {
  groupReservationAPI,
  GroupReservationQueryKeys,
} from '@api/group/reservation/Reservation';
import { ReservationQueryKeys } from '@api/personal/reservation/Reservation';
import { getIcon } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { ENG_TO_KOR_SHORT_WD } from '@constants/time';
import { DateSelectArg } from '@fullcalendar/common';
import { Location } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';
import { AvailableTime, defaultChecked } from '@pages/SetTime';
import { translateOptionSlot, translateTime } from '@utils/format';
import { toDateWithDash } from '@utils/time';

import { useNestedModal } from './NestedModalProvider';
import {
  DailyTimes,
  LocationType,
  OnlineLocationType,
} from './ReservationProvider';

export const GROUP_RESERVATION_PAGE_COUNT = 5;

export type RequiredType = {
  firstPage: {
    title: boolean;
    term: boolean;
    isDurationSelected: boolean;
  };
};
type Radio = { start: Date; end: Date; checked: boolean };

export type GroupPageInfoType = {
  title: string;
  description: string;
  term: { custom: Radio; days: Radio; infinite: Radio };
  timeIndex: string[];
  location: LocationType[];
  online: OnlineLocationType[];
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
  reminder: boolean;
  blockingTimes: {
    id: string;
    start: string;
    end: string;
    className: 'blocked-events';
    blocked: true;
  }[];
  masked: boolean;
  googleOrganizerOptions: {
    id: string;
    name: string;
    email: string;
    isLinked: boolean;
    checked: boolean;
  }[];
  creatorIds: string[];
  displayOption: DisplayOptionType;
  isDisplayBlockingTimes: boolean;
  form: IForm;
};

interface GroupReservationProviderProps {
  page: number;
  goNextPage: (params?: any) => void;
  goPrevPage: () => void;
  pageInfo: GroupPageInfoType;
  isValidated: RequiredType;
  isAnimated: { firstPage: boolean };

  /* First Page 관련 함수 */
  onChangePageInfoTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePageInfoDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickRadioButton: (e: MouseEvent<HTMLDivElement>) => void;
  setStartTerm: (date: Date) => void;
  setEndTerm: (date: Date) => void;
  reservationTermText: string;
  onChangeReservationTerm: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeCustomLocation: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickAddLocation: () => void;
  customLocation: LocationType;
  onClickCustomLocationCheckbox: (id: string) => void;
  onClickDeleteLocation: (id: string) => void;
  onClickCheckbox: (id: string) => void;
  onClickGoogleOrganizer: (e: MouseEvent<HTMLButtonElement>) => void;

  /* Second Page 관련 함수 */
  onClickDayTimeStartSelectBox: (
    e: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => void;
  onClickDayTimeEndSelectBox: (
    e: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => void;
  onClickSpareTimeStartSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickSpareTimeEndSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickRankOptionTimeSelectBox: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickSpareTimeBeforeCheckbox: () => void;
  onClickSpareTimeNextCheckbox: () => void;
  onClickDayOfWeek: (targetDay: OpenTime['day']) => void;
  onMakeCalendarBlock: (event: DateSelectArg) => void;
  onDeleteCalendarBlock: (id: string) => void;

  /* Third Page 관련 함수 */
  onToggleMasked: () => void;
  onToggleReminder: () => void;
  groupAlert: { endDate: boolean };
  groupEndDate?: string;

  /* Guest Questionnaire */
  onClickTogglePreview: (id: string) => void;
  onChangeQuestion: (question: IFormQuestion) => void;
  onDeleteQuestion: (question: IFormQuestion) => void;
  onAddQuestion: (question: IFormQuestion) => void;

  setPageInfo: Dispatch<SetStateAction<GroupPageInfoType>>;
}

const defaultValue = { page: 1 } as unknown as GroupReservationProviderProps;

const defaultCustomLocation: LocationType = {
  id: nanoid(),
  content: '',
  checked: false,
};

const GroupReservationContext =
  createContext<GroupReservationProviderProps>(defaultValue);

const GroupReservationProvider = ({
  children,
  edit = false,
}: {
  children: ReactNode;
  edit?: boolean;
}) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { t: tCommonRequests } = useTranslation('commonRequests');
  const { t } = useTranslation('reservationProvider');

  const { showModal: showErrorModal, hideModal: hideErrorModal } =
    useNestedModal({
      type: 'alert',
      title: tCommonRequests('memberError.title'),
      description: tCommonRequests('memberError.description'),
    });
  const groupId =
    typeof router.query.groupId === 'string' ? router.query.groupId : '';
  const pageId = typeof router.query.id === 'string' ? router.query.id : '';

  const [pageInfo, setPageInfo] = useState<GroupPageInfoType>({
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
    reminder: true,
    masked: true,
    blockingTimes: [],
    googleOrganizerOptions: [],
    creatorIds: [],
    displayOption: 'UNION',
    isDisplayBlockingTimes: false,
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
  });

  const { data: defaultInfo } = useQuery(
    GroupReservationQueryKeys.get(),
    () => groupReservationAPI.get({ groupId }),
    {
      onSuccess: ({ data: { results } }) => {
        if (edit) return;

        const res = results[0];
        const customLocations = res.favoritePlaces
          .filter(({ type }) => type === 'CUSTOM')
          .map(({ id, name }) => ({
            id,
            content: name,
            icon: (
              <CustomIcon size={20} height={25} fill="#F2994A" stroke="none">
                <Location />
              </CustomIcon>
            ),
            checked: true,
          })) as unknown as LocationType[];

        const linked = res.googleOrganizerOptions.find(
          ({ isLinked }) => isLinked
        );

        const googleOrganizerOptions = res.googleOrganizerOptions.map((g) => ({
          ...g,
          checked: linked?.id === g.id,
        }));

        const groupEndDate = new Date(res.calendarOpenPeriod.endDate);
        const defaultEndDate = new Date(dayjs().add(30, 'day').toDate());

        const endDate =
          +groupEndDate - +defaultEndDate > 0 ? defaultEndDate : groupEndDate;

        setPageInfo((prevPageInfo) => ({
          ...prevPageInfo,
          title: `${res.hostName}` + t('placeholder'),
          availableDays: res.openTimes.map(
            ({ day, start, end, available }, id) => ({
              id,
              day: ENG_TO_KOR_SHORT_WD[day],
              start,
              end,
              available,
            })
          ),
          location: customLocations,
          googleOrganizerOptions,
          masked: true,
          term: {
            ...prevPageInfo.term,
            custom: {
              start: new Date(),
              end: endDate,
              checked: true,
            },
          },
        }));
      },
      onError: async (error: { message: string; code: number }) => {
        /* TODO: 에러 코드 확인 후 변경 필요 */
        if (error.message === '사용자 정보가 없습니다.') {
          await showErrorModal();
          hideErrorModal();
          router.back();
          return;
        }

        // await showModal();
        // router.reload();
        // hideModal();
        // console.error(error);
        alert(error.message);
        router.back();
      },
      enabled: !!groupId,
    }
  );

  useQuery(
    ReservationQueryKeys.getEditData(),
    () => groupReservationAPI.getEditData(pageId),
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
          masked: true, // TODO: 나중에 변경될 수 있음
          googleOrganizerOptions: (
            pageDetails.googleOrganizerOptions || []
          ).map((g) => ({
            ...g,
            checked: g.id === pageDetails.googleOrganizerId,
          })),
          creatorIds: pageDetails.creatorIds ? pageDetails.creatorIds : [],
          displayOption: pageDetails.displayOption ?? 'UNION',
          isDisplayBlockingTimes: pageDetails.isDisplayBlockingTimes,
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
                options: item.options || null,
                isSwitchToggleAllowed: item.type !== 'NAME',
              };
            }) as IFormQuestion[],
          } as IForm,
        });
      },
      onError: (error) => {
        console.error(error);
      },
      enabled: edit && !!pageId,
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

  const goNextPage = (params?: any) => {
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
      if (newPage > GROUP_RESERVATION_PAGE_COUNT) {
        router.push(
          {
            pathname: ROUTES.MANAGE.INDEX,
            query: { navIndex: 1 },
          },
          ROUTES.MANAGE.INDEX
        );

        return prevState;
      }

      return newPage;
    });
  };

  const goPrevPage = () => {
    if (page === 1) {
      const isConfirmed = confirm(
        `만드시던 예약 페이지의 내용이 전부 사라지며 그룹 캘린더로 되돌아갑니다. 
뒤로 가시겠습니까?`
      );

      if (isConfirmed) {
        router.back();
      }

      return;
    }

    setPage((prevState) => prevState - 1);
  };

  const [customLocation, setCustomLocation] = useState<LocationType>(
    defaultCustomLocation
  );

  const [reservationTermText, setReservationTermText] = useState('30');

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

  const setStartTerm = (date: Date) => {
    setPageInfo((prevState) => ({
      ...prevState,
      term: {
        ...prevState.term,
        custom: { ...prevState.term.custom, start: date, checked: true },
      },
    }));
  };

  const [groupAlert, setGroupAlert] = useState({ endDate: false });

  const groupEndDate = defaultInfo?.data.results[0].calendarOpenPeriod.endDate;
  const setEndTerm = (date: Date) => {
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const gEndDate = new Date(groupEndDate || dayjs().add(30, 'day').toDate());
    const endDate = +gEndDate >= +targetDate ? date : gEndDate;

    setPageInfo((prevState) => ({
      ...prevState,
      term: {
        ...prevState.term,
        custom: { ...prevState.term.custom, end: endDate, checked: true },
      },
    }));
  };

  useEffect(() => {
    const d = pageInfo.term.custom.end;
    const targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const gEndDate = new Date(groupEndDate || dayjs().add(30, 'day').toDate());
    setGroupAlert({ endDate: +gEndDate < +targetDate });
    setIsValidated((prev) => ({
      ...prev,
      term: +gEndDate > +targetDate,
    }));
  }, [pageInfo.term]);

  const onChangeReservationTerm = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim() === '' || parseInt(target.value) < 0) {
      setPageInfo((prevState) => {
        return {
          ...prevState,
          term: {
            ...prevState.term,
            days: { ...prevState.term.days, end: dayjs().toDate() },
          },
        };
      });
      setReservationTermText('0');

      return;
    }

    if (parseInt(target.value) > 999) {
      const newValue = target.value.slice(-3);
      setPageInfo((prevState) => {
        return {
          ...prevState,
          term: {
            ...prevState.term,
            days: {
              ...prevState.term.days,
              end: dayjs().add(parseInt(newValue), 'day').toDate(),
            },
          },
        };
      });
      setReservationTermText(newValue);

      return;
    }

    setReservationTermText(target.value);
    setPageInfo((prevState) => {
      return {
        ...prevState,
        term: {
          ...prevState.term,
          days: {
            ...prevState.term.days,
            end: dayjs().add(Number(target.value), 'day').toDate(),
          },
        },
      };
    });
  };

  const onClickRadioButton = ({
    currentTarget,
  }: MouseEvent<HTMLDivElement>) => {
    if (currentTarget.dataset.radio === 'custom') {
      setPageInfo((prevState) => {
        return {
          ...prevState,
          term: {
            custom: { ...prevState.term.custom, checked: true },
            days: { ...prevState.term.days, checked: false },
            infinite: { ...prevState.term.infinite, checked: false },
          },
        };
      });
      return;
    }

    if (currentTarget.dataset.radio === 'days') {
      setPageInfo((prevState) => {
        return {
          ...prevState,
          term: {
            custom: { ...prevState.term.custom, checked: false },
            days: { ...prevState.term.days, checked: true },
            infinite: { ...prevState.term.infinite, checked: false },
          },
        };
      });
      return;
    }

    if (currentTarget.dataset.radio === 'infinite') {
      setPageInfo((prevState) => {
        return {
          ...prevState,
          term: {
            custom: { ...prevState.term.custom, checked: false },
            days: { ...prevState.term.days, checked: false },
            infinite: { ...prevState.term.infinite, checked: true },
          },
        };
      });
      return;
    }
  };

  const onClickGoogleOrganizer = (e: MouseEvent<HTMLButtonElement>) => {
    const targetEmail = e.currentTarget.innerText
      .split('(')[1]
      .replace(')', '');

    const option = pageInfo.googleOrganizerOptions.find(
      ({ email }) => email === targetEmail
    );

    if (option) {
      setPageInfo((prevState) => {
        const newOptions = prevState.googleOrganizerOptions.map((g) => ({
          ...g,
          checked: false,
        }));

        const prevOptions = newOptions.map((o) => ({
          ...o,
          checked: o.name === option.name,
        }));

        return {
          ...prevState,
          googleOrganizerOptions: prevOptions,
        };
      });
    }
  };

  /* Second Page 관련 로직 */
  const onClickDayTimeStartSelectBox = (
    event: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => {
    const newEndTime = event.currentTarget
      .innerText as unknown as DailyTimes['start'];

    setPageInfo((prevState) => {
      const copy = [...prevState.availableDays];
      const target = copy.find(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );
      const targetIdx = copy.findIndex(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );

      if (target) {
        const newTarget = { ...target, start: newEndTime };
        copy.splice(targetIdx, 1, newTarget);

        return { ...prevState, availableDays: copy };
      }

      return prevState;
    });
  };

  const onClickDayTimeEndSelectBox = (
    event: MouseEvent<HTMLButtonElement>,
    targetDay: OpenTime['day']
  ) => {
    const newEndTime = event.currentTarget
      .innerText as unknown as DailyTimes['end'];

    setPageInfo((prevState) => {
      const copy = [...prevState.availableDays];
      const target = copy.find(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );
      const targetIdx = copy.findIndex(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );

      if (target) {
        const newTarget = { ...target, end: newEndTime };
        copy.splice(targetIdx, 1, newTarget);

        return { ...prevState, availableDays: copy };
      }

      return prevState;
    });
  };

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

  const onClickDayOfWeek = (targetDay: OpenTime['day']) => {
    setPageInfo((prevState) => {
      const copy = [...prevState.availableDays];
      const idx = copy.findIndex(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );
      const target = copy.find(
        (checked) => checked.day === ENG_TO_KOR_SHORT_WD[targetDay]
      );

      if (target) {
        copy.splice(idx, 1, { ...target, available: !target.available });
      }

      return {
        ...prevState,
        availableDays: copy,
      };
    });
  };

  /* Third Page 관련 로직 */

  const onToggleMasked = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      masked: !prevState.masked,
    }));
  };

  const onToggleReminder = () => {
    setPageInfo((prevState) => ({
      ...prevState,
      reminder: !prevState.reminder,
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
    <GroupReservationContext.Provider
      value={{
        isValidated,
        isAnimated,
        page,
        goNextPage,
        goPrevPage,
        pageInfo,
        onChangePageInfoTitle,
        onChangePageInfoDescription,
        onClickRadioButton,
        setStartTerm,
        setEndTerm,
        reservationTermText,
        onChangeReservationTerm,
        onChangeCustomLocation,
        onClickAddLocation,
        customLocation,
        onClickCustomLocationCheckbox,
        onClickDeleteLocation,
        onClickCheckbox,
        onClickDayTimeStartSelectBox,
        onClickDayTimeEndSelectBox,
        onClickSpareTimeStartSelectBox,
        onClickSpareTimeEndSelectBox,
        onClickRankOptionTimeSelectBox,
        onClickSpareTimeBeforeCheckbox,
        onClickSpareTimeNextCheckbox,
        onClickDayOfWeek,
        onToggleMasked,
        onToggleReminder,
        onMakeCalendarBlock,
        onDeleteCalendarBlock,
        onClickGoogleOrganizer,
        groupAlert,
        groupEndDate,
        setPageInfo,
        onClickTogglePreview,
        onChangeQuestion,
        onDeleteQuestion,
        onAddQuestion,
      }}
    >
      {children}
    </GroupReservationContext.Provider>
  );
};

export const useGroupReservation = (): GroupReservationProviderProps => {
  return useContext<GroupReservationProviderProps>(GroupReservationContext);
};

export default GroupReservationProvider;
