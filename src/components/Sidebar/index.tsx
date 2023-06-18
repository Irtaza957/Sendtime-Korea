import React, { MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import {
  groupCalendarAPI,
  GroupCalendarKeys,
} from '@api/group/calendar/GroupCalendar';
import { userInfoAPI, UserInfoQueryKeys } from '@api/user/UserInfo';
import { coreUserState } from '@atoms/index';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import GuideSkeletonModal from '@components/Modal/GuideSkeletonModal';
import ModalCover from '@components/Modal/GuideSkeletonModal/ModalCover';
import ModalData from '@components/Modal/GuideSkeletonModal/ModalData';
import { ModalDataAlert } from '@components/Modal/GuideSkeletonModal/ModalData/index.styles';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import { DO_NOT_SHOW_AGAIN } from '@constants/storage';
import { useNestedModal } from '@contexts/NestedModalProvider';
import {
  defaultActiveState,
  DIVERGE_POINT,
  SIDEBAR_TYPE,
  SidebarType,
  SubNavActiveType,
  SubNavigationResponse,
  useSidebar,
} from '@contexts/SidebarProvider';
import useRoutes from '@hooks/useRoutes';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { Icon } from '@iconify/react';
import { getLocalStorage, setLocalStorage } from '@utils/storage';

import Line from '../Line';
import SidebarItem from '../SidebarItem';
import SidebarProfile from '../SidebarProfile';

import {
  LogoContainer,
  OpenIcon,
  Resizer,
  SidebarBottom,
  SidebarContainer,
  SidebarItemContainer,
  SidebarProfileContainer,
  SidebarSettingContainer,
  SidebarTop,
  SidebarTopContainer,
  SmallLogoContainer,
  TopContainer,
} from './index.styles';

interface SidebarProps {
  onHover?: boolean;
  isSidebarOpen?: boolean;
}

const Sidebar = ({ onHover = true, isSidebarOpen = true }: SidebarProps) => {
  const router = useRouter();
  const { goTo } = useRoutes();
  const { isBigScreen } = useWindowDimensions();
  const { t } = useTranslation('common');

  const [user, setCoreUserInfo] = useRecoilState(coreUserState);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);

  const {
    sidebarActive: active,
    setSidebarActive: setActive,
    teamSubNavigation,
    setTeamSubNavigation,
    sidebarType,
    setSidebarWidth,
    setSidebarType,
  } = useSidebar();

  const { data: userInfo, refetch: refetchCoreUserInfo } = useQuery(
    UserInfoQueryKeys.getCoreUserInfo(),
    () => userInfoAPI.getCoreUserInfo(),
    {
      onSuccess: ({ data: { results } }) => {
        const [coreUser] = results;
        setCoreUserInfo(coreUser);
      },
      cacheTime: 500000,
      staleTime: 500000,
      enabled: !user,
    }
  );

  const SubNavigationActive = (teamNames: SubNavigationResponse[]) => {
    const { groupId } = router.query;
    return teamNames.reduce(
      (a: SubNavActiveType, _, idx: number) => (
        (a[teamNames[idx].id] = groupId === teamNames[idx].id), a
      ),
      {}
    );
  };

  const { data: groupCalendarList } = useQuery(
    GroupCalendarKeys.getList(),
    groupCalendarAPI.getList,
    {
      onSuccess: ({ data: { results } }) => { },
      enabled: !!user,
      onError: (error) => console.error(error),
    }
  );

  useEffect(() => {
    const { groupId } = router.query;
    setActive((prev) => {
      let route = router.asPath;
      if (groupId && typeof groupId === 'string') {
        route = router.asPath.split(groupId)[0];
      }

      switch (route) {
        case ROUTES.MY_CALENDAR:
          return { ...defaultActiveState, myCalendar: true };
        case ROUTES.GROUP.MANAGE:
          return {
            ...defaultActiveState,
            teamCalendar: {
              ...defaultActiveState.teamCalendar,
              default: true,
            },
          };
        case `${ROUTES.GROUP.MAIN}/`:
          return {
            ...defaultActiveState,
            teamCalendar: {
              ...defaultActiveState.teamCalendar,
              default: true,
            },
          };
        case ROUTES.SPACE_BUILDER.SPACE:
          return { ...defaultActiveState, space: true };
        case ROUTES.MY_PAGE:
          return { ...defaultActiveState, myPage: true };
        case ROUTES.MANAGE.INDEX:
          return { ...defaultActiveState, manage: true };
        case ROUTES.MANAGE.SCHEDULES:
          return { ...defaultActiveState, manageSchedules: true };

        default:
          return prev;
      }
    });

    const groupList = groupCalendarList?.data.results[0] || [];
    const teamNames = groupList.map(({ teamId, teamName }) => ({
      id: teamId,
      name: teamName,
    }));

    setTeamSubNavigation(teamNames);

    setActive((prevState) => ({
      ...prevState,
      teamCalendar: {
        default: !!groupId || router.asPath === ROUTES.GROUP.MANAGE,
        ...SubNavigationActive(teamNames),
      },
    }));

    return () => {
      setActive(defaultActiveState);
    };
  }, [userInfo, router.asPath, groupCalendarList]);

  useEffect(() => {
    refetchCoreUserInfo();
  }, []);

  const isTeamCalendarActive =
    Object.values(active.teamCalendar).some((subNav) => subNav) ||
    active.teamCalendar.default;

  const guides = [
    {
      content: (
        <ModalCover
          title={`센드타임 그룹 기능을 
        처음 방문하셨네요!`}
        />
      ),
    },
    {
      content: (
        <ModalData
          title={`왼쪽 사이드바 ‘그룹 참여자’에 있는 분들을 자유자재로 선택해서 
    다양한 조합의 그룹 예약페이지를 만들어 보세요.`}
          imgUrl={`${BASE_URL.image}/guide/group/group-guide-1.png`}
        />
      ),
    },
    {
      content: (
        <ModalData
          title={
            <>
              그룹 예약페이지에는 꼭 해당 일정에 참석해야하는 사람만 추가하고,{' '}
              <br />
              <ModalDataAlert>
                예약에 관한 알림은 선택되지 않은 그룹원에게도 모두 전송됩니다!
              </ModalDataAlert>
            </>
          }
          imgUrl={`${BASE_URL.image}/guide/group/group-guide-2.png`}
        />
      ),
    },
    {
      content: (
        <ModalData
          title={`그룹 예약페이지를 만들 때 참여자 일정 반영 방식을 설정하면,
          그룹을 훨씬 생산적으로 활용할 수 있습니다!`}
          imgUrl={`${BASE_URL.image}/guide/group/group-guide-3.png`}
        />
      ),
    },
    {
      content: (
        <ModalData
          title={
            <>
              1. 그룹 참여자들이 모두 참여해야 한다면, <br />
              선택한 그룹 참여자{' '}
              <ModalDataAlert>모두 가능한 시간</ModalDataAlert>에만 예약을
              받아보세요!
            </>
          }
          imgUrl={`${BASE_URL.image}/guide/group/group-guide-4.png`}
        />
      ),
    },
    {
      content: (
        <ModalData
          title={
            <>
              2. 그룹 참여자 중 일부만 참여해도 된다면,
              <br />
              선택한 그룹 참여자 중{' '}
              <ModalDataAlert>한 명이라도 가능한 시간</ModalDataAlert>에 예약을
              받을 수 있습니다.
            </>
          }
          imgUrl={`${BASE_URL.image}/guide/group/group-guide-5.png`}
        />
      ),
    },
    {
      content: (
        <ModalData
          title={
            <>
              3. 예약자를 최우선으로 예약자가 원하는 시간을 받고 싶다면,
              <br />
              일정 무관으로 <ModalDataAlert>모든 시간이 가능한</ModalDataAlert>
              예약페이지로 예약을 받아보세요.
            </>
          }
          imgUrl={`${BASE_URL.image}/guide/group/group-guide-6.png`}
        />
      ),
      customNext: '그룹 시작하기',
      handleNext: () => {
        hideGuideModal();
        router.push(ROUTES.GROUP.MANAGE);
      },
    },
  ];

  const { showModal: showGuideModal, hideModal: hideGuideModal } =
    useNestedModal({
      type: 'custom',
      customModal: (
        <GuideSkeletonModal data={guides} hide={() => hideGuideModal()} />
      ),
    });

  const onClickGroupCalendar = async (event: MouseEvent<HTMLButtonElement>) => {
    onClickSidebarItem(event);
    const doNotShow = getLocalStorage(DO_NOT_SHOW_AGAIN);

    if (doNotShow !== 'true') {
      // await showGuideModal(); // hide temporarily
    }

    goTo(ROUTES.GROUP.MANAGE);

    return;
  };

  const onClickSidebarItem = (event: MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;

    setActive((prevState) => {
      if (currentTarget.textContent === t('nav_items.MY_CALENDAR')) {
        return { ...defaultActiveState, myCalendar: true };
      }

      if (currentTarget.innerText === t('nav_items.GROUP_CALENDAR')) {
        // setIsTeamCalendarOpen(true);
        return {
          ...defaultActiveState,
          teamCalendar: { default: true },
        };
      }

      if (currentTarget.innerText === t('nav_items.SPACE')) {
        return { ...defaultActiveState, space: true };
      }

      if (currentTarget.innerText === t('nav_items.MY_RESERVATION')) {
        return { ...defaultActiveState, manageSchedules: true };
      }

      if (currentTarget.innerText === t('nav_items.MANAGE')) {
        return { ...defaultActiveState, manage: true };
      }

      if (currentTarget.innerText === t('nav_items.MY_PAGE')) {
        return { ...defaultActiveState, myPage: true };
      }

      return prevState;
    });
  };

  const onClickSubNavItem = ({
    currentTarget,
  }: MouseEvent<HTMLButtonElement>) => {
    const { id, name } = currentTarget.dataset;

    setActive((prevState) => {
      if (currentTarget.innerText === name) {
        return {
          ...defaultActiveState,
          teamCalendar: {
            ...defaultActiveState.teamCalendar,
            [`${id}`]: true,
          },
        };
      }

      return prevState;
    });

    goTo(`${ROUTES.GROUP.MAIN}/${id}`);
  };

  const handleSidebar = (type: SidebarType) => {
    setSidebarWidth(DIVERGE_POINT[type]);
    setSidebarType(SIDEBAR_TYPE[type]);
    setLocalStorage('s-type', SIDEBAR_TYPE[type]);

    if (!containerRef.current) return;
    containerRef.current.style.flexBasis = `${DIVERGE_POINT[type]}px`;
  };

  const resize = (e: any) => {
    if (e.x < DIVERGE_POINT.MIDDLE) {
      handleSidebar(SIDEBAR_TYPE.SMALL);
      return;
    }

    if (DIVERGE_POINT.MIDDLE <= e.x) {
      handleSidebar(SIDEBAR_TYPE.BIG);
      return;
    }
  };

  const handleResizerMouseDown = () => {
    if (!onHover) return;

    document.addEventListener('mousemove', resize, false);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', resize, false);
      },
      false
    );
  };

  useEffect(() => {
    const type = getLocalStorage('s-type') as SidebarType;
    if (type) {
      handleSidebar(type);
      return;
    }

    handleSidebar(SIDEBAR_TYPE.BIG);
  }, []);

  useEffect(() => {
    if (!onHover) return;

    if (!isBigScreen) {
      handleSidebar(SIDEBAR_TYPE.SMALL);
    }
  }, [isBigScreen]);

  useEffect(() => {
    if (!onHover) {
      handleSidebar(SIDEBAR_TYPE.BIG);
    }
  }, []);

  const handleClickSideMenu = () => {
    if (sidebarType === SIDEBAR_TYPE.SMALL) {
      handleSidebar(SIDEBAR_TYPE.BIG);
      return;
    }

    if (sidebarType === SIDEBAR_TYPE.BIG) {
      handleSidebar(SIDEBAR_TYPE.SMALL);
      return;
    }
  };

  const navigateLogout = () => {
    router.push({ pathname: ROUTES.USER.SIGN_OUT }, router.asPath);
  };

  return (
    <TopContainer ref={sidebarRef} isHoverAvailable={onHover}>
      <SidebarContainer ref={containerRef}>
        <SidebarTopContainer>
          {onHover && (
            <OpenIcon onClick={handleClickSideMenu}>
              <Icon
                icon="carbon:open-panel-filled-left"
                width={15}
                color="var(--purple-500)"
              />
            </OpenIcon>
          )}

          <SidebarTop type={sidebarType}>
            {!onHover ? (
              <></>
            ) : (
              <>
                {sidebarType === SIDEBAR_TYPE.BIG ? (
                  <LogoContainer onClick={() => goTo(ROUTES.MY_CALENDAR)}>
                    <ImageContainer width={165}>
                      <AutoHeightImage
                        src={`${BASE_URL.image}/logos/sendtime_logo.png`}
                        alt="sendtime-logo"
                      />
                    </ImageContainer>
                  </LogoContainer>
                ) : (
                  <SmallLogoContainer onClick={() => goTo(ROUTES.MY_CALENDAR)}>
                    <ImageContainer width={20}>
                      <AutoHeightImage
                        src={`${BASE_URL.image}/logos/sendtime_logo_small.png`}
                        alt="sendtime-logo"
                      />
                    </ImageContainer>
                  </SmallLogoContainer>
                )}
              </>
            )}

            <SidebarProfileContainer>
              <SidebarProfile
                name={user?.name || ''}
                privateURL={`sendtime.app/@${user?.customUrl || ''}`}
                bgColor={user?.color || 'var(--purple-400)'}
                type={sidebarType}
              />
            </SidebarProfileContainer>
          </SidebarTop>

          <Line padding="0 20px" />

          <SidebarItemContainer>
            <SidebarItem
              content={t('nav_items.MY_CALENDAR')}
              iconType="my-calendar"
              onClickItem={(event) => {
                onClickSidebarItem(event);
                goTo(ROUTES.MY_CALENDAR);
              }}
              active={active.myCalendar}
              sidebarType={sidebarType}
            />
            <SidebarItem
              content={t('nav_items.GROUP_CALENDAR')}
              iconType="team-calendar"
              subSidebar={teamSubNavigation}
              onClickItem={onClickGroupCalendar}
              active={isTeamCalendarActive}
              onClickSubNavItem={onClickSubNavItem}
              subItemActive={active.teamCalendar}
              sidebarType={sidebarType}
              isSubNavOpen
            />
          </SidebarItemContainer>
        </SidebarTopContainer>

        <SidebarBottom>
          <SidebarItem
            content={t('nav_items.SPACE')}
            iconType="space"
            onClickItem={(event) => {
              onClickSidebarItem(event);
              goTo(ROUTES.SPACE_BUILDER.SPACE);
            }}
            active={active.space}
            sidebarType={sidebarType}
          />

          <SidebarItem
            content={t('nav_items.MY_RESERVATION')}
            iconType="manageSchedules"
            onClickItem={(event) => {
              onClickSidebarItem(event);
              goTo(ROUTES.MANAGE.SCHEDULES);
            }}
            active={active.manageSchedules}
            sidebarType={sidebarType}
          />

          <SidebarItem
            content={t('nav_items.MANAGE')}
            iconType="reservation"
            onClickItem={(event) => {
              onClickSidebarItem(event);
              goTo(ROUTES.MANAGE.INDEX);
            }}
            active={active.manage}
            sidebarType={sidebarType}
          />

          <SidebarSettingContainer>
            <SidebarItem
              content={t('nav_items.MY_PAGE')}
              iconType="settings"
              onClickItem={(event) => {
                onClickSidebarItem(event);
                goTo(ROUTES.MY_PAGE);
              }}
              active={active.myPage}
              sidebarType={sidebarType}
            />
          </SidebarSettingContainer>

          <Line padding="0 20px" />

          <SidebarSettingContainer>
            <SidebarItem
              content={t('logout')}
              iconType="logout"
              onClickItem={navigateLogout}
              active={active.logout}
              sidebarType={sidebarType}
            />
          </SidebarSettingContainer>
        </SidebarBottom>
      </SidebarContainer>
      <Resizer ref={resizerRef} onMouseDown={handleResizerMouseDown} />
    </TopContainer>
  );
};

export default Sidebar;
