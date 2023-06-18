import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import useTranslate from '@hooks/useTranslate';
import { REGION } from '@utils/language';

export type GuestInfoType = {
  reservationOptions: {
    id: string;
    className: string;
    startDateTime: string;
    endDateTime: string;
    priority: number;
  }[];
  reservationAttendee: {
    name: {
      value: string;
      validated: boolean;
      alertMessage: React.ReactNode;
    };
    organization: {
      value: string;
      validated: boolean;
      alertMessage: React.ReactNode;
    };
    role: string;
    department: string;
    phone: {
      value: string;
      validated: boolean;
      alertMessage: React.ReactNode;
    };
    email: {
      value: string;
      validated: boolean;
      alertMessage: React.ReactNode;
    };
  };
  reservationLocation: {
    name: string;
    type: string /* TODO: Custom, Zoom,,,  */;
  };
  reservationPurpose: string;
  postscript: string;
};

interface GuestReservationProps {
  guestInfo: GuestInfoType;
  setGuestInfo: Dispatch<SetStateAction<GuestInfoType>>;
}

export const defaultGuestInfo = {
  reservationOptions: [],
  reservationAttendee: {
    name: {
      value: '',
      validated: false,
      alertMessage: <></>,
    },
    organization: {
      value: '',
      validated: false,
      alertMessage: <></>,
    },
    role: '',
    department: '',
    phone: {
      value: '',
      validated: true,
      alertMessage: <></>,
    },
    email: {
      value: '',
      validated: false,
      alertMessage: <></>,
    },
  },
  reservationLocation: {
    name: '',
    type: '',
  },
  reservationPurpose: '',
  postscript: '',
};

const defaultValue: GuestReservationProps = {
  guestInfo: defaultGuestInfo,
  setGuestInfo: () => {},
};

const GuestReservationContext =
  createContext<GuestReservationProps>(defaultValue);

const GuestReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslate();

  /* 영어일 때에만 phone에 한해 validated true */
  const [guestInfo, setGuestInfo] = useState<GuestInfoType>(defaultGuestInfo);

  useEffect(() => {
    if (i18n.language.includes(REGION.EN)) {
      setGuestInfo((prev) => ({
        ...prev,
        reservationAttendee: {
          ...prev.reservationAttendee,
          phone: { ...prev.reservationAttendee.phone, validated: true },
        },
      }));
      return;
    }

    setGuestInfo((prev) => ({
      ...prev,
      reservationAttendee: {
        ...prev.reservationAttendee,
        phone: { ...prev.reservationAttendee.phone, validated: false },
      },
    }));
  }, [i18n.language]);

  return (
    <GuestReservationContext.Provider value={{ guestInfo, setGuestInfo }}>
      {children}
    </GuestReservationContext.Provider>
  );
};

export const useGuestInfo = (): GuestReservationProps => {
  const { guestInfo, setGuestInfo } = useContext<GuestReservationProps>(
    GuestReservationContext
  );

  return { guestInfo, setGuestInfo };
};

export default GuestReservationProvider;
