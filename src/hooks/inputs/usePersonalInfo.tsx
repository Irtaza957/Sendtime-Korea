import React, { ChangeEvent, ReactNode, useState } from 'react';
import dayjs from 'dayjs';

import { ContentAlert } from '@components/Reservation/index.styles';
import TextInput from '@components/TextInput';
import { ACCOUNT_MESSAGE } from '@constants/accountMessage';
import { REGEX } from '@constants/regex';
import { Box, GridBox, Width } from '@pages/GuestReservation/common.styles';
import { makePhoneNumberWithHyphen } from '@utils/phoneNumber';
import { validate } from '@utils/validation';

type BookingPageNameViewParams = {
  bookingPageName?: { show?: boolean; required?: boolean };
};

export type BookingPageNameType = {
  bookingPageName: {
    value: string;
    validated: boolean;
    alertMessage: ReactNode;
  };
};

type PersonalInfoViewParams = {
  name?: { show?: boolean; required?: boolean };
  organization?: { show?: boolean; required?: boolean };
  department?: { show?: boolean; required?: boolean };
  role?: { show?: boolean; required?: boolean };
  phone?: { show?: boolean; required?: boolean };
  email?: { show?: boolean; required?: boolean };
  reminderStartDate?: { show?: boolean; required?: boolean };
  reminderStartTime?: { show?: boolean; required?: boolean };
};

export type PersonalInfoType = {
  name: { value: string; validated: boolean; alertMessage: ReactNode };
  organization: { value: string; validated: boolean; alertMessage: ReactNode };
  department: string;
  role: string;
  phone: { value: string; validated: boolean; alertMessage: ReactNode };
  email: { value: string; validated: boolean; alertMessage: ReactNode };
  reminderStartDate: {
    value: Date;
    validated: boolean;
    alertMessage: ReactNode;
  };
  reminderStartTime: {
    value: string;
    validated: boolean;
    alertMessage: ReactNode;
  };
};

const zzzgetDefaultTime = () => {
  let defaultTime = '00:00';
  const hourNow = new Date().getHours();
  if (hourNow >= 20) {
    if (hourNow === 20) {
      defaultTime = '00:00';
    } else if (hourNow === 21) {
      defaultTime = '01:00';
    } else if (hourNow === 22) {
      defaultTime = '02:00';
    } else if (hourNow === 23) {
      defaultTime = '03:00';
    } else if (hourNow === 0) {
      defaultTime = '04:00';
    }
  } else {
    defaultTime = hourNow + 4 + ':00';
  }

  const defaultHr = defaultTime.replace(/:(.*)/g, '');
  if (defaultHr.length === 1) {
    defaultTime = '0' + defaultTime;
  }

  return defaultTime;
};

const getDefaultTime = () => {
  let defaultTime = '00:00';
  const minNow = new Date().getMinutes();
  const hrNow = new Date().getHours();
  if (minNow === 0) {
    defaultTime = hrNow + ':00';
  } else {
    defaultTime = hrNow + 1 + ':00';
  }

  const defaultHr = defaultTime.replace(/:(.*)/g, '');
  if (defaultHr.length === 1) {
    defaultTime = '0' + defaultTime;
  }

  return defaultTime;
};

/*
const getDefaultDate = () => {
  const defaultHours = getDefaultTime();
  const defaultHr = parseInt(defaultHours.replace(/:(.*)/g, ""))

  let addDay = 0;
  if (defaultHr < 4) {    
      addDay = 1;    
  }

  const date = new Date()
  date.setDate(date.getDate() + addDay);
  return date;
}

const zzzgetDefaultDate = () => {

  const defaultHours = getDefaultTime();
  const defaultHr = parseInt(defaultHours.replace(/:(.*)/g, ""))

  let addDay = 0;
  if (defaultHr < 4) {    
      addDay = 1;    
  }

  const date = new Date()
  date.setDate(date.getDate() + addDay);
  return date;
}
*/

const usePersonalInfo = () => {
  const [bookingPageInfo, setbookingPageInfo] = useState<BookingPageNameType>({
    bookingPageName: { value: '', validated: false, alertMessage: <></> },
  });

  const defaultTime = getDefaultTime();
  const defaultDate = new Date(); //getDefaultDate();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    name: { value: '', validated: false, alertMessage: <></> },
    organization: { value: '', validated: false, alertMessage: <></> },
    department: '',
    role: '',
    phone: { value: '', validated: false, alertMessage: <></> },
    email: { value: '', validated: false, alertMessage: <></> },
    reminderStartDate: {
      value: defaultDate,
      validated: false,
      alertMessage: <></>,
    },
    reminderStartTime: {
      value: defaultTime,
      validated: false,
      alertMessage: <></>,
    },
  });

  const handleBookingPageString = (target: string) => {
    const withoutSpace = target.trimStart();
    if (withoutSpace === '') {
      setbookingPageInfo((prev) => ({
        ...prev,
        bookingPageName: {
          value: withoutSpace,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              예약페이지 이름을 입력해주세요.
            </ContentAlert>
          ),
        },
      }));
      return;
    }

    setbookingPageInfo((prev) => ({
      ...prev,
      bookingPageName: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const handleBookingPage = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trimStart();
    if (withoutSpace === '') {
      setbookingPageInfo((prev) => ({
        ...prev,
        bookingPageName: {
          value: withoutSpace,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              예약페이지 이름을 입력해주세요.
            </ContentAlert>
          ),
        },
      }));
      return;
    }

    setbookingPageInfo((prev) => ({
      ...prev,
      bookingPageName: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const onChangeProposerStartDate = (date: Date) => {
    const newStartTime = personalInfo.reminderStartTime.value;

    const selectedHr = parseInt(newStartTime.replace(/:(.*)/g, ''));
    const selectedMin = parseInt(newStartTime.replace(/(.*):/g, ''));

    date.setHours(selectedHr);
    date.setMinutes(selectedMin);

    const selectedDateTime = dayjs(date);
    const todaysDate = dayjs(new Date());

    const diffHours = selectedDateTime.diff(todaysDate, 'hours');
    const diffMins = selectedDateTime.diff(todaysDate, 'minutes');

    const defaultTime = getDefaultTime();
    if (diffHours <= 0 && diffMins < 0) {
      setPersonalInfo((prev) => ({
        ...prev,
        reminderStartTime: {
          value: defaultTime,
          validated: false,
          alertMessage: <></>,
        },
      }));

      setPersonalInfo((prevState) => ({
        ...prevState,
        reminderStartDate: {
          value: new Date(),
          validated: false,
          alertMessage: <></>,
        },
      }));
      return;
    }

    setPersonalInfo((prev) => ({
      ...prev,
      reminderStartTime: {
        value: defaultTime,
        validated: true,
        alertMessage: <></>,
      },
    }));

    setPersonalInfo((prevState) => ({
      ...prevState,
      reminderStartDate: {
        value: date,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };
  const onChangeProposerStartTime = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newStartTime = event.currentTarget.innerText;
    const sDate = personalInfo.reminderStartDate.value;

    const selectedHr = parseInt(newStartTime.replace(/:(.*)/g, ''));
    const selectedMin = parseInt(newStartTime.replace(/(.*):/g, ''));

    sDate.setHours(selectedHr);
    sDate.setMinutes(selectedMin);

    const selectedDateTime = dayjs(sDate);
    const todaysDate = dayjs(new Date());

    const diffHours = selectedDateTime.diff(todaysDate, 'hours');
    const diffMins = selectedDateTime.diff(todaysDate, 'minutes');
    if (diffHours <= 0 && diffMins < 0) {
      const defaultTime = getDefaultTime();
      setPersonalInfo((prev) => ({
        ...prev,
        reminderStartTime: {
          value: defaultTime,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              올바른 시간을 입력해주세요.
            </ContentAlert>
          ),
        },
      }));
    } else {
      setPersonalInfo((prev) => ({
        ...prev,
        reminderStartTime: {
          value: newStartTime,
          validated: true,
          alertMessage: <></>,
        },
      }));
    }
  };

  const handleName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trimStart();

    if (withoutSpace === '') {
      setPersonalInfo((prev) => ({
        ...prev,
        name: {
          value: withoutSpace,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>이름을 입력해주세요</ContentAlert>
          ),
        },
      }));

      return;
    }

    setPersonalInfo((prev) => ({
      ...prev,
      name: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const handlePhone = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (validate.phone.length(target.value.length)) {
      const newValue = target.value.slice(0, 13);
      setPersonalInfo((prev) => ({
        ...prev,
        phone: {
          value: makePhoneNumberWithHyphen(newValue),
          validated: true,
          alertMessage: <></>,
        },
      }));

      return;
    }

    if (!validate.phone.form(target.value)) {
      setPersonalInfo((prev) => ({
        ...prev,
        phone: {
          ...prev.phone,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              {ACCOUNT_MESSAGE.PHONE.INPUT_ERROR}
            </ContentAlert>
          ),
        },
      }));

      return;
    }

    if (!validate.phone.formWithLength(target.value)) {
      setPersonalInfo((prev) => ({
        ...prev,
        phone: {
          ...prev.phone,
          validated: false,
          alertMessage: <></>,
        },
      }));

      return;
    }

    setPersonalInfo((prev) => ({
      ...prev,
      phone: {
        value: makePhoneNumberWithHyphen(target.value),
        validated: true,
        alertMessage: <></>,
      },
    }));

    if (validate.phone.empty(target.value)) {
      setPersonalInfo((prev) => ({
        ...prev,
        phone: {
          ...prev.phone,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>전화번호를 입력해주세요</ContentAlert>
          ),
        },
      }));
    }
  };

  const handleOrganization = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trimStart();

    if (withoutSpace === '') {
      setPersonalInfo((prev) => ({
        ...prev,
        organization: {
          value: withoutSpace,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>소속을 입력해주세요</ContentAlert>
          ),
        },
      }));

      return;
    }

    setPersonalInfo((prev) => ({
      ...prev,
      organization: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const handleEmail = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value.trim();

    if (withoutSpace === '') {
      setPersonalInfo((prev) => ({
        ...prev,
        email: {
          value: target.value,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>이메일을 입력해주세요.</ContentAlert>
          ),
        },
      }));

      return;
    }

    if (!withoutSpace.match(REGEX.EMAIL)) {
      setPersonalInfo((prev) => ({
        ...prev,
        email: {
          value: target.value,
          validated: false,
          alertMessage: (
            <ContentAlert marginLeft={0}>
              이메일 형식에 맞게 입력해주세요.
            </ContentAlert>
          ),
        },
      }));

      return;
    }

    setPersonalInfo((prev) => ({
      ...prev,
      email: {
        value: withoutSpace,
        validated: true,
        alertMessage: <></>,
      },
    }));
  };

  const handleNotRequired = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'role' | 'department'
  ) => {
    setPersonalInfo((prevValue) => ({
      ...prevValue,
      [type]: e.target.value,
    }));
  };

  const BookinPageNameView = ({
    bookingPageName = { show: true, required: true },
  }: BookingPageNameViewParams) => {
    return (
      <Box flex>
        <Width>
          {bookingPageName.show && (
            <TextInput
              value={bookingPageInfo.bookingPageName.value}
              onChange={handleBookingPage}
              alert={
                bookingPageName.required &&
                bookingPageInfo.bookingPageName.alertMessage
              }
              required={bookingPageName.required}
            />
          )}
        </Width>
      </Box>
    );
  };
  const PersonalInfoView = ({
    name = { show: true, required: true },
    // organization = { show: true, required: true },
    // department = { show: true, required: true },
    // role = { show: true, required: true },
    phone = { show: true, required: true },
    email = { show: true, required: true },
  }: PersonalInfoViewParams) => {
    return (
      <Box flex>
        <GridBox>
          {name.show && (
            <TextInput
              label="이름"
              value={personalInfo.name.value}
              onChange={handleName}
              alert={name.required && personalInfo.name.alertMessage}
              required={name.required}
            />
          )}
          {/* {organization.show && (
            <TextInput
              label="소속"
              value={personalInfo.organization.value}
              onChange={handleOrganization}
              alert={
                organization.required && personalInfo.organization.alertMessage
              }
              required={organization.required}
            />
          )} */}
          {/* {department.show && (
            <TextInput
              label="부서"
              value={personalInfo.department}
              onChange={(e) => handleNotRequired(e, 'department')}
            />
          )} */}
          {/* {role.show && (
            <TextInput
              label="직위"
              value={personalInfo.role}
              onChange={(e) => handleNotRequired(e, 'role')}
            />
          )} */}
          {phone.show && (
            <TextInput
              label="연락처"
              value={personalInfo.phone.value}
              onChange={handlePhone}
              alert={phone.required && personalInfo.phone.alertMessage}
              required={phone.required}
            />
          )}
          {email.show && (
            <TextInput
              label="이메일"
              value={personalInfo.email.value}
              onChange={handleEmail}
              alert={email.required && personalInfo.email.alertMessage}
              required={email.required}
            />
          )}
        </GridBox>
      </Box>
    );
  };

  return {
    handleBookingPage,
    handleBookingPageString,
    handleName,
    handlePhone,
    handleOrganization,
    handleEmail,
    handleNotRequired,
    personalInfo,
    PersonalInfoView,
    bookingPageInfo,
    BookinPageNameView,
    onChangeProposerStartDate,
    onChangeProposerStartTime,
  };
};

export default usePersonalInfo;
