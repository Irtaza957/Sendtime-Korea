import React, { MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import MediaQuery from 'react-responsive';

import {
  ChangeActivateStatusParams,
  reservationAPI,
} from '@api/personal/reservation/Reservation';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import NestedPageModal from '@components/NestedPageModal';
import ExportModal from '@components/NestedPageModal/ExportModal';
import ThirdPartyModal from '@components/NestedPageModal/ThreePartyModal';
import ToggleButton from '@components/ToggleButton';
import { BASE_URL } from '@constants/baseUrl';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useCopy from '@hooks/useCopy';
import { EmptyDownArrow, EmptyUpArrow } from '@Icon/Icons/Arrows';
import { More, PageLink, Person, ThreePeople } from '@Icon/Icons/Utils';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';
import { ModalContent } from '@pages/Group/Manage/MoreButtonWithModal';
import { translateLocation, translateTime } from '@utils/format';
import { REGION } from '@utils/language';

import {
  AttendeeInfo,
  Badge,
  ButtonsContainer,
  CustomModalContainer,
  FooterButton,
  Info,
  InfoContent,
  InfoTitle,
  MainPageWrapper,
  ModalContentBox,
  NestedPageContainer,
  NestedPageWrapper,
  NestedToggleBar,
  ReservationBody,
  ReservationFooter,
  ReservationHeader,
  ReservationItemContainer,
  ReservationPageButtonWrapper,
  ReservationTitle,
  ToggleContainer,
} from './index.styles';
import MoreMenu from './MoreMenu';
import NestedItem from './NestedItem';
import ThirdPartyItem from './ThirdPartyItem';

interface CalendarEventItemProps {
  type?: 'PERSONAL' | 'TEAM';
  uuid: string;
  attendees?: string[];
  title: string;
  description?: string;
  teamName: string;
  time: string[];
  locations: string[];
  isActive: boolean;
  optionLength: number;
  onClickMoreButton: (e: MouseEvent<HTMLButtonElement>) => void;
  isMoreMenuOpen: boolean;
  questions: IFormQuestion[];
  nestedPages: MyReservation['customPages'];
  thirdPartyPages?: MyReservation['thirdPersonPages'];
  closeMoreMenu?: () => void;
  groupId: string;
  refetch?: () => void;
}
type ModalMenuOpenStatus = {
  id: string;
  opened: boolean;
};

type NestedPageType = 'custom' | 'thirdParty';
type NestedPageVisibleType = {
  [P in NestedPageType]: boolean;
};

const CalendarEventItem = ({
  type = 'PERSONAL',
  uuid,
  attendees,
  title,
  description,
  teamName,
  time,
  locations,
  optionLength,
  isActive,
  onClickMoreButton,
  isMoreMenuOpen,
  closeMoreMenu,
  questions,
  nestedPages,
  thirdPartyPages,
  groupId,
  refetch,
}: CalendarEventItemProps) => {
  const { t, i18n } = useTranslation('eventHistoryPage');
  const router = useRouter();
  const [isNestedPagesVisible, setIsNestedPagesVisible] =
    useState<NestedPageVisibleType>({
      custom: false,
      thirdParty: false,
    });
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isThirdPartyInfoVisible, setIsThirdPartyInfoVisible] = useState(false);
  const [isNestedMoreMenuOpen, setIsNestedMoreMenuOpen] = useState<
    ModalMenuOpenStatus[]
  >([]);

  const { copyLink } = useCopy();

  const pageUrl = `/reservation?i=${uuid}`;
  const translatedLocations = locations.map((item) => {
    return translateLocation(item);
  });
  const locationsString =
    translatedLocations.length <= 1
      ? translatedLocations[0]
      : `${translatedLocations.join(' / ')}`;

  const translatedTimes = time.map((item) => {
    return translateTime(item);
  });
  const TimeString =
    translatedTimes.length <= 1
      ? translatedTimes[0]
      : `${translatedTimes.join(' / ')}`;

  const { showModal: showNestedModal, hideModal: hideNestedModal } =
    useNestedModal({
      type: 'custom',
      blockDimmerClick: true,
      customModal: (
        <NestedPageModal
          parentId={uuid}
          pageTitle={title}
          pageDescription={description}
          questions={questions}
          hideModal={() => hideNestedModal()}
          updatePage={refetch}
        />
      ),
    });

  const { showModal: showThirdPartyModal, hideModal: hideThirdPartyModal } =
    useNestedModal({
      type: 'custom',
      blockDimmerClick: true,
      customModal: (
        <ThirdPartyModal
          parentId={uuid}
          hideModal={() => hideThirdPartyModal()}
          updatePage={refetch}
          title={title}
        />
      ),
    });

  const { showModal: showExportModal, hideModal: hideExportModal } =
    useNestedModal({
      type: 'custom',
      customModal: (
        <ExportModal hideModal={() => hideExportModal()} pageUrl={pageUrl} />
      ),
    });

  const { showModal: showDeleteModal, hideModal: hideDeleteModal } =
    useNestedModal({
      type: 'delete',
      title: t('message.delete.title'),
      description: (
        <CustomModalContainer>
          <ModalContentBox>{title}</ModalContentBox>
          {t('message.delete.subtitle')}
        </CustomModalContainer>
      ),
    });

  const { showModal: showDisableModal, hideModal: hideDisableModal } =
    useNestedModal({
      type: 'delete',
      title: t('message.deactivate.title'),
      description: t('message.deactivate.subtitle'),
      buttonText: { delete: t('message.deactivate.btn') },
    });

  const { showModal: showEnableModal, hideModal: hideEnableModal } =
    useNestedModal({
      type: 'confirm',
      title: t('message.confirm.title'),
      description: t('message.confirm.subtitle'),
      buttonText: { confirm: t('message.confirm.btn') },
    });

  useEffect(() => {
    const defaultModalMenuOpenStatus =
      (thirdPartyPages
        ? [...nestedPages, ...thirdPartyPages]
        : nestedPages
      )?.map((event) => ({
        id: event.id,
        opened: false,
      })) ?? [];
    setIsNestedMoreMenuOpen(defaultModalMenuOpenStatus);
  }, [nestedPages]);

  const { mutate: deletePage } = useMutation(
    (id: string) => reservationAPI.delete(id),
    {
      onSuccess: () => {
        refetch?.();
      },
    }
  );

  const { mutate: changeActivateStatus } = useMutation(
    ({ id, active }: ChangeActivateStatusParams) =>
      reservationAPI.changeActivateStatus({ id, active }),
    {
      onSuccess: ({ data }) => {
        refetch?.();
      },
    }
  );

  const openNestedMoreMenu = (id: string) => {
    const targetIndex = isNestedMoreMenuOpen.findIndex(
      (item) => item.id === id
    );
    if (targetIndex === -1) return;

    const newList = isNestedMoreMenuOpen.map((item, idx) => {
      if (idx === targetIndex) {
        return { ...item, opened: !item.opened };
      }

      return { ...item, opened: false };
    });

    setIsNestedMoreMenuOpen(newList);
  };

  const onToggle = async () => {
    if (isActive) {
      const isValidated = await showDisableModal(async () => {
        try {
          changeActivateStatus({ id: uuid, active: false });
          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      });

      if (isValidated) {
        hideDisableModal();
      }
    } else {
      const isValidated = await showEnableModal(async () => {
        try {
          changeActivateStatus({ id: uuid, active: true });
          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      });

      if (isValidated) {
        hideEnableModal();
      }
    }
  };

  const toggleNestedPagesVisibility = (type: NestedPageType) => {
    setIsNestedPagesVisible((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const modalContents: ModalContent[] = [
    {
      content: t('exportBtn'),
      onClickContent: async (teamId: string) => {
        /* open modal */
        showExportModal();
      },
    },
    {
      content: t('editBtn'),
      onClickContent: () => {
        if (type === 'PERSONAL') {
          router.push(`/edit/reservation/${uuid}`);
          return;
        }

        if (type === 'TEAM') {
          router.push(`/group/edit/reservation/${groupId}/${uuid}`);
        }
      },
    },
    {
      content: t('deleteBtn'),
      alert: true,
      onClickContent: async (teamId: string) => {
        const isValidated = await showDeleteModal(async () => {
          try {
            deletePage(teamId);
            return true;
          } catch (e) {
            console.error(e);
            return false;
          }
        });

        if (isValidated) {
          hideDeleteModal();
        }
      },
    },
  ];

  const closeNestedMoreMenu = () => {
    const newList = isNestedMoreMenuOpen.map((item) => ({
      ...item,
      opened: false,
    }));

    setIsNestedMoreMenuOpen(newList);
  };

  const goReservationPage = () => {
    if (!isActive) return;
    router.push(`/reservation?i=${uuid}`);
  };

  return (
    <ReservationItemContainer
      isNestedPageExisting={nestedPages.length > 0}
      isThirdPartyPageExisting={(thirdPartyPages ?? []).length > 0}
    >
      <MainPageWrapper isActive={isActive} onClick={goReservationPage}>
        <ReservationHeader isToggleButtonOn={isActive}>
          <ReservationTitle>{title}</ReservationTitle>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => onClickMoreButton(e)}
            disabled={!isActive}
          >
            <CustomIcon
              size={30}
              height={30}
              fill="none"
              stroke="gray-750"
              viewBox="0 0 30 30"
            >
              <More />
            </CustomIcon>
          </button>
          {isMoreMenuOpen && isActive && (
            <MoreMenu
              modalContents={modalContents}
              teamId={uuid}
              close={closeMoreMenu}
            />
          )}
        </ReservationHeader>

        <ReservationBody isToggleButtonOn={isActive}>
          {TimeString} {t('duration')}, {locationsString}
          <Badge>{`${t('option')} ${optionLength}${t('howmany')}`}</Badge>
          {type === 'TEAM' && <Badge>{teamName}</Badge>}
        </ReservationBody>

        {attendees && (
          <ReservationBody isToggleButtonOn={isActive}>
            <AttendeeInfo>{attendees?.join(', ')}</AttendeeInfo>
          </ReservationBody>
        )}

        <ReservationFooter>
          <ButtonsContainer isToggleButtonOn={isActive}>
            <FooterButton
              disabled={!isActive}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                copyLink({ url: pageUrl });
              }}
            >
              <CustomIcon size={16} height={16} stroke="none" fill="gray-700">
                <PageLink />
              </CustomIcon>
              <span>{t('URLcopy')}</span>
            </FooterButton>
            <MediaQuery minWidth={769}>
              {i18n.language.includes(REGION.KO) && (
                <ReservationPageButtonWrapper>
                  <FooterButton
                    disabled={!isActive}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      showNestedModal();
                    }}
                    onMouseOver={() => isActive && setIsInfoVisible(true)}
                    onMouseOut={() => setIsInfoVisible(false)}
                  >
                    <CustomIcon
                      size={18}
                      height={18}
                      stroke="none"
                      fill="gray-700"
                    >
                      <Person />
                    </CustomIcon>
                    <span>맞춤 예약페이지</span>
                    <Icon
                      icon="ant-design:question-circle-outlined"
                      color="gray-550"
                      width={18}
                      height={18}
                    />
                    {isInfoVisible && (
                      <Info>
                        <InfoTitle>
                          <Icon
                            icon="ant-design:question-circle-outlined"
                            color="gray-550"
                            width={20}
                            height={20}
                          />
                          맞춤 예약페이지란?
                        </InfoTitle>
                        <InfoContent>
                          기존 예약페이지에 예약페이지 이름, 설명을 예약자 한
                          사람에 맞춰 변경하고 <br />
                          예약자의 개인정보를 내가 기입해 예약자가 기재할 필요
                          없이 예약할 수 있도록 할 수 있습니다.
                        </InfoContent>
                      </Info>
                    )}
                  </FooterButton>
                  <FooterButton
                    disabled={!isActive}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      showThirdPartyModal();
                    }}
                    onMouseOver={() =>
                      isActive && setIsThirdPartyInfoVisible(true)
                    }
                    onMouseOut={() => setIsThirdPartyInfoVisible(false)}
                  >
                    <CustomIcon
                      size={20}
                      height={20}
                      stroke="none"
                      fill="gray-700"
                    >
                      <ThreePeople />
                    </CustomIcon>
                    <span>3자 일정 조율</span>
                    <Icon
                      icon="ant-design:question-circle-outlined"
                      color="gray-550"
                      width={18}
                      height={18}
                    />
                    {isThirdPartyInfoVisible && (
                      <Info>
                        <InfoTitle>
                          <Icon
                            icon="ant-design:question-circle-outlined"
                            color="gray-550"
                            width={20}
                            height={20}
                          />
                          3자 일정조율이란?
                        </InfoTitle>
                        <InfoContent>
                          <ImageContainer margin="10px 0">
                            <AutoHeightImage
                              src={`${BASE_URL.image}/guide/thirdParty/ThirdParty_Info.png`}
                            />
                          </ImageContainer>
                          3자 일정 조율을 시작하면, 회원과 서로 다른 2명의
                          비회원, 3자간의 일정 조율이 가능합니다. <br />
                        </InfoContent>
                      </Info>
                    )}
                  </FooterButton>
                </ReservationPageButtonWrapper>
              )}
            </MediaQuery>
          </ButtonsContainer>
          <ToggleContainer>
            {t('activate')}
            <ToggleButton
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onToggle();
              }}
              active={isActive}
            />
          </ToggleContainer>
        </ReservationFooter>
      </MainPageWrapper>

      <NestedPageContainer>
        {!!nestedPages.length && (
          <>
            <NestedToggleBar
              onClick={() => toggleNestedPagesVisibility('custom')}
              isContentVisible={isNestedPagesVisible.custom}
            >
              {`예약자 맞춤 페이지 (${nestedPages.length})`}
              {isNestedPagesVisible.custom ? (
                <CustomIcon size={14} height={7} fill="none" stroke="gray-600">
                  <EmptyUpArrow />
                </CustomIcon>
              ) : (
                <CustomIcon size={14} height={7} fill="none" stroke="gray-600">
                  <EmptyDownArrow />
                </CustomIcon>
              )}
            </NestedToggleBar>

            <NestedPageWrapper
              isNestedPagesVisible={isNestedPagesVisible.custom}
            >
              {nestedPages.map((nestedPage) => (
                <NestedItem
                  key={nestedPage.id}
                  uuid={uuid}
                  customPageId={nestedPage.id}
                  title={nestedPage.reservationPageName}
                  description={nestedPage.reservationPageDescription}
                  questions={questions}
                  answers={nestedPage.answers}
                  isActive={nestedPage.isActive}
                  onClickNestedMoreButton={(
                    e: MouseEvent<HTMLButtonElement>
                  ) => {
                    e.stopPropagation();
                    openNestedMoreMenu(nestedPage.id);
                  }}
                  isNestedMoreMenuOpen={
                    isNestedMoreMenuOpen?.find(
                      (item) => item.id === nestedPage.id
                    )?.opened ?? false
                  }
                  refetch={refetch}
                  closeNestedMoreMenu={closeNestedMoreMenu}
                />
              ))}
            </NestedPageWrapper>
          </>
        )}

        {!!thirdPartyPages?.length && (
          <>
            <NestedToggleBar
              onClick={() => toggleNestedPagesVisibility('thirdParty')}
              isContentVisible={isNestedPagesVisible.thirdParty}
            >
              {`3자 일정 조율 (${thirdPartyPages?.length})`}
              {isNestedPagesVisible.thirdParty ? (
                <CustomIcon size={14} height={7} fill="none" stroke="gray-600">
                  <EmptyUpArrow />
                </CustomIcon>
              ) : (
                <CustomIcon size={14} height={7} fill="none" stroke="gray-600">
                  <EmptyDownArrow />
                </CustomIcon>
              )}
            </NestedToggleBar>

            <NestedPageWrapper
              isNestedPagesVisible={isNestedPagesVisible.thirdParty}
            >
              {thirdPartyPages.map(({ id, bookingPageName, ...rest }) => (
                <ThirdPartyItem
                  key={id}
                  uuid={uuid}
                  thirdPartyPageId={id}
                  title={bookingPageName}
                  onClickNestedMoreButton={(
                    e: MouseEvent<HTMLButtonElement>
                  ) => {
                    e.stopPropagation();
                    openNestedMoreMenu(id);
                  }}
                  isThirdPartyMoreMenuOpen={
                    isNestedMoreMenuOpen?.find((item) => item.id === id)
                      ?.opened ?? false
                  }
                  refetch={refetch}
                  closeNestedMoreMenu={closeNestedMoreMenu}
                  {...rest}
                />
              ))}
            </NestedPageWrapper>
          </>
        )}
      </NestedPageContainer>
    </ReservationItemContainer>
  );
};

export default CalendarEventItem;
