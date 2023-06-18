import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import useWindowDimensions from '@hooks/useWindowDimensions';

interface SidebarProps {
  teamSubNavigation: SubNavigationResponse[];
  sidebarActive: SidebarActiveState;
  setSidebarActive: Dispatch<SetStateAction<SidebarActiveState>>;
  setTeamSubNavigation: Dispatch<SetStateAction<SubNavigationResponse[]>>;

  sidebarType: SidebarType;
  sidebarWidth: number;
  setSidebarWidth: Dispatch<SetStateAction<number>>;
  setSidebarType: Dispatch<SetStateAction<SidebarType>>;
}

type SidebarActiveState = {
  myCalendar: boolean;
  teamCalendar: any;
  myPage: boolean;
  logout: boolean;
  manage: boolean;
  manageSchedules: boolean;
  space: boolean;
};

export type SubNavigationResponse = {
  id: string;
  name: string;
};

export const defaultActiveState = {
  myCalendar: false,
  teamCalendar: { default: false },
  logout: false,
  myPage: false,
  manage: false,
  manageSchedules: false,
  space: false,
};

export const DIVERGE_POINT = { SMALL: 70, MIDDLE: 150, BIG: 260 };
export const SIDEBAR_TYPE = {
  BIG: 'BIG',
  SMALL: 'SMALL',
} as const;
export type SidebarType = keyof typeof SIDEBAR_TYPE;

const defaultSidebarProps: SidebarProps = {
  teamSubNavigation: [],
  sidebarActive: defaultActiveState,
  setSidebarActive: () => { },
  setTeamSubNavigation: () => { },
  sidebarType: SIDEBAR_TYPE.BIG,
  sidebarWidth: DIVERGE_POINT.BIG,
  setSidebarWidth: () => { },
  setSidebarType: () => { },
};

const SidebarContext = createContext<SidebarProps>(defaultSidebarProps);

export type SubNavActiveType = {
  [key: string]: boolean;
};

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarActive, setSidebarActive] = useState(defaultActiveState);
  const [teamSubNavigation, setTeamSubNavigation] = useState<
    SubNavigationResponse[]
  >([]);
  const { isBigScreen } = useWindowDimensions();

  const [sidebarWidth, setSidebarWidth] = useState(DIVERGE_POINT.BIG);
  const defaultSidebarType = isBigScreen
    ? SIDEBAR_TYPE.BIG
    : DIVERGE_POINT.MIDDLE <= sidebarWidth
      ? SIDEBAR_TYPE.BIG
      : SIDEBAR_TYPE.SMALL;

  const [sidebarType, setSidebarType] = useState(defaultSidebarType);

  return (
    <SidebarContext.Provider
      value={{
        teamSubNavigation,
        sidebarActive,
        setSidebarActive,
        setTeamSubNavigation,

        sidebarType,
        sidebarWidth,
        setSidebarWidth,
        setSidebarType,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarProps => {
  return useContext<SidebarProps>(SidebarContext);
};

export default SidebarProvider;
