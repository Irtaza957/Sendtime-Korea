import React, {
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Particles from 'react-particles';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadFull } from 'tsparticles';

import {
  ProfileReactionData,
  SpaceAPI,
  SpaceData,
  SpaceParticleConfig,
  SpaceProfileCategoryConfig,
  SpaceProfileData,
} from '@api/space/SpaceApi';
import { coreUserState, mySpaceProfileState } from '@atoms/index';
import StyledButton from '@components/Button';
import CategoryFilter, {
  CategoryFilterProps,
} from '@components/CategoryFilter';
import ChannelService from '@components/ChannelService';
import HackleTrack from '@components/HackleTrack';
import InformationModal from '@components/Modal/Custom/InformationModal';
import SendMessageModal from '@components/Modal/Custom/SendMessageModal';
import PasswordInput from '@components/PasswordInput';
import PoweredBySpace from '@components/Space/PoweredBySpace';
import RegisterSpaceProfile from '@components/Space/RegisterSpaceProfile';
import SpaceInfoCard from '@components/Space/SpaceInfoCard';
import SpaceInfoHeader from '@components/Space/SpaceInfoHeader';
import SpaceProfileCard from '@components/Space/SpaceProfileCard';
import { HACKLE_KEYS } from '@constants/hackle';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { Global } from '@emotion/react';
import { useTrack } from '@hackler/react-sdk';
import useLoading from '@hooks/useLoading';
import useSignIn from '@hooks/useSignIn';
import { getLocalizedText, SpaceProfileCategoryUtil } from '@utils/spaceUtils';
import { getLocalStorage, setLocalStorage } from '@utils/storage';

import * as Styled from './index.styles';

interface SpacePageProps {
  spaceInfo: SpaceData;
  timezones: Timezone[];
}

const SpacePage = ({
  spaceInfo: initialSpaceInfo,
  timezones,
}: SpacePageProps) => {
  const { t, i18n } = useTranslation('space');
  const router = useRouter();
  const track = useTrack();
  const { register } = router.query;
  const { loadingView } = useLoading();
  const { logoutQuitely, isLogoutQuitelyLoading } = useSignIn();

  const user = useRecoilValue(coreUserState);

  const [originalSpaceInfo, setOriginalSpaceInfo] = useState(initialSpaceInfo);
  const [informationModal, setInformationModal] = useState(false);
  const spaceInfo = useMemo(() => {
    return {
      ...originalSpaceInfo,
      contactPoints: originalSpaceInfo.contactPoints.filter(
        (contactPoint) => contactPoint.value
      ),
    };
  }, [originalSpaceInfo]);

  const [mySpaceProfile, setMySpaceProfile] =
    useRecoilState(mySpaceProfileState);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(['all']);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMessageModal, setIsMessageModal] = useState(false);

  const { isLoading: isLoadingProfiles, data: originalSpaceProfiles = [] } =
    useQuery(['spaceProfiles', spaceInfo.handle], async () => {
      const { data } = await SpaceAPI.getSpaceProfiles(spaceInfo.handle);
      return data.results[0].spaceProfileList;
    });

  const isLoading = useMemo(() => {
    return isLoadingProfiles || isLogoutQuitelyLoading;
  }, [isLoadingProfiles, isLogoutQuitelyLoading]);

  useEffect(() => {
    setMySpaceProfile(
      originalSpaceProfiles.find((profile) => profile.memberId === user?.id) ||
      null
    );
  }, [originalSpaceProfiles, setMySpaceProfile, user?.id]);

  const spaceProfiles = useMemo(() => {
    let profiles = originalSpaceProfiles.filter(
      (profile) =>
        profile.id !== mySpaceProfile?.id &&
        (selectedCategoryIds.includes('all') ||
          selectedCategoryIds.includes(profile.categoryId || ''))
    );
    if (
      mySpaceProfile &&
      (selectedCategoryIds.includes('all') ||
        selectedCategoryIds.includes(mySpaceProfile.categoryId || ''))
    ) {
      profiles = [mySpaceProfile, ...profiles];
    }
    return profiles;
  }, [originalSpaceProfiles, mySpaceProfile, selectedCategoryIds]);

  const filterCategories: CategoryFilterProps['categories'] = useMemo(() => {
    let categories: CategoryFilterProps['categories'] | undefined =
      spaceInfo.profileCategoryConfig?.categoryItems.map((categoryItem) => {
        const name = SpaceProfileCategoryUtil.getLocalizedCategoryName(
          spaceInfo.profileCategoryConfig as SpaceProfileCategoryConfig,
          categoryItem.id,
          i18n.language
        );
        const count = originalSpaceProfiles.filter(
          (profile) => profile.categoryId === categoryItem.id
        ).length;
        return {
          id: categoryItem.id,
          name: name ? `${name} (${count})` : '',
          color: categoryItem.color,
        };
      });

    categories = categories?.filter((category) => category.name);

    if ((categories?.length || 0) === 0) return [];

    categories?.unshift({
      id: 'all',
      name: `ALL (${originalSpaceProfiles.length})`,
    });

    return categories || [];
  }, [spaceInfo.profileCategoryConfig, originalSpaceProfiles, i18n.language]);

  const registerAllowed = useMemo(() => {
    return !mySpaceProfile && spaceInfo.isProfileCreateAllowed;
  }, [mySpaceProfile, spaceInfo.isProfileCreateAllowed]);

  const savedEnterCode =
    getLocalStorage(`space_enter_code_${spaceInfo.id}`) || '';
  const [currentEnterCode, setCurrentEnterCode] =
    useState<string>(savedEnterCode);
  const isEnterCodeCorrect = () =>
    spaceInfo.enterCode ? spaceInfo.enterCode === currentEnterCode : true;
  const [showEnterCodePage, setShowEnterCodePage] = useState<boolean>(
    !isEnterCodeCorrect()
  );

  useEffect(() => {
    if (spaceInfo.isChannelTalkDisabled) return;
    const channelTalk = new ChannelService();
    const { id, name, email } = user || { id: '', name: '', email: '' };

    const pluginKey =
      i18n.language === 'ko'
        ? process.env.NEXT_PUBLIC_CHANNEL_IO_FOR_SPACE_KEY
        : process.env.NEXT_PUBLIC_CHANNEL_IO_FOR_SPACE_ENG_KEY;
    channelTalk.boot({
      pluginKey: pluginKey,
      memberId: id,
      profile: { name, email },
    });

    return () => channelTalk.shutdown();
  }, [i18n.language, spaceInfo.isChannelTalkDisabled, user]);

  const { refetch } = useQuery(
    ['space', spaceInfo.id],
    async () => {
      const { data } = await SpaceAPI.getSpace(spaceInfo.handle);
      setOriginalSpaceInfo(data.results[0]);
    },
    { enabled: false }
  );

  const { showModal: showEnterCodeWrongModal } = useNestedModal({
    type: 'alert',
    title: t('enterCodePage.alerts.wrongTitle'),
    description: t('enterCodePage.alerts.wrongDescription'),
  });

  const onEnterCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEnterCode(e.target.value);
  };

  const onEnterCodeClick = (
    event?: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();
    if (isEnterCodeCorrect()) {
      setShowEnterCodePage(false);
      setLocalStorage(`space_enter_code_${spaceInfo.id}`, currentEnterCode);
    } else {
      showEnterCodeWrongModal();
    }
  };

  const onCategoryClick = (categoryId: string) => {
    track({
      key: HACKLE_KEYS.CLICK.SPACE.CATEGORY,
      properties: {
        spaceId: spaceInfo.id,
        userId: user?.id || '',
        userName: user?.name || '',
        categoryId,
      },
    });
    if (categoryId === 'all') {
      setSelectedCategoryIds(['all']);
    } else {
      let newSelectedCategoryIds = selectedCategoryIds.includes(categoryId)
        ? selectedCategoryIds.filter((id) => id !== categoryId)
        : [...selectedCategoryIds, categoryId];

      newSelectedCategoryIds = newSelectedCategoryIds.filter(
        (id) => id !== 'all'
      );
      newSelectedCategoryIds.length === 0 && newSelectedCategoryIds.push('all');
      setSelectedCategoryIds(newSelectedCategoryIds);
    }
  };

  const onRegisterSuccess = (spaceProfile: SpaceProfileData) => {
    setMySpaceProfile(spaceProfile);
    refetch();
    hideAllModals();
    if (isNotPayed) {
      handleShowCompletePaymentModal(spaceProfile);
    }
  };

  const onRegisterModalClose = () => {
    hideAllModals();
  };

  const getRegisterSpaceProfileModal = (title?: string, subtitle?: string) => {
    return (
      <RegisterSpaceProfile
        spaceId={spaceInfo.id}
        profileCategoryConfig={spaceInfo.profileCategoryConfig}
        timezones={timezones}
        title={title}
        subtitle={subtitle}
        preShowEmbedHtml={spaceInfo.profileCreateConfig?.preShowEmbedHtml}
        preShowTitle={getLocalizedText(
          spaceInfo.profileCreateConfig?.localizedPreShowTitles || [],
          router.locale || '',
          spaceInfo.profileCreateConfig?.defaultLanguage || ''
        )}
        preShowDescription={getLocalizedText(
          spaceInfo.profileCreateConfig?.localizedPreShowDescriptions || [],
          router.locale || '',
          spaceInfo.profileCreateConfig?.defaultLanguage || ''
        )}
        spaceProfileCreateConfig={spaceInfo.profileCreateConfig}
        paymentConfig={{ isUsingPayment: spaceInfo.isNeedPayments }}
        onSuccess={onRegisterSuccess}
        onClose={onRegisterModalClose}
      />
    );
  };

  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  const { showModal: showRegisterModal, hideModal: hideRegisterModal } =
    useNestedModal({
      type: 'custom',
      customModal: getRegisterSpaceProfileModal(),
      onDimmerClick: () => {
        setIsRegisterModalOpen(false);
      },
    });

  const [
    lastRegisterModalForViewingLimitShownAt,
    setLastRegisterModalForViewingLimitShownAt,
  ] = useState<number>(0);
  const {
    showModal: showRegisterModalForViewingLimit,
    hideModal: hideRegisterModalForViewingLimit,
  } = useNestedModal({
    type: 'custom',
    customModal: getRegisterSpaceProfileModal(
      t('addCardModal.yourCardMissing'),
      t('addCardModal.createOneToSeeMore')
    ),
    onDimmerClick: () => {
      setIsRegisterModalOpen(false);
    },
  });

  const {
    showModal: showRegisterModalForBookingLimit,
    hideModal: hideRegisterModalForBookingLimit,
  } = useNestedModal({
    type: 'custom',
    customModal: getRegisterSpaceProfileModal(
      t('addCardModal.yourCardMissing'),
      t('addCardModal.createOneToMeet')
    ),
    onDimmerClick: () => {
      setIsRegisterModalOpen(false);
    },
  });

  const {
    showModal: showEditMyProfileModal,
    hideModal: hideEditMyProfileModal,
  } = useNestedModal({
    type: 'custom',
    customModal: (
      <RegisterSpaceProfile
        spaceId={spaceInfo.id}
        profileCategoryConfig={spaceInfo.profileCategoryConfig}
        timezones={timezones}
        spaceProfileCreateConfig={spaceInfo.profileCreateConfig}
        onSuccess={onRegisterSuccess}
        onClose={onRegisterModalClose}
        editMode
      />
    ),
    onDimmerClick: () => {
      setIsRegisterModalOpen(false);
    },
  });

  const {
    showModal: showCompletePaymentModal,
    hideModal: hideCompletePaymentModal,
  } = useNestedModal({
    type: 'confirm',
    title: t('alerts.completePaymentModalTitle'),
    description: t('alerts.completePaymentModalMessage'),
    buttonText: {
      confirm: t('alerts.completePaymentModalButton'),
    },
    onCancelClick: () => {
      setIsRegisterModalOpen(false);
    },
    onDimmerClick: () => {
      setIsRegisterModalOpen(false);
    },
  });

  const handleShowCompletePaymentModal = useCallback(
    (spaceProfileData?: SpaceProfileData) => {
      if (isRegisterModalOpen) return;
      setIsRegisterModalOpen(true);

      showCompletePaymentModal(async () => {
        window.open(
          spaceProfileData?.paymentsLink || mySpaceProfile?.paymentsLink,
          '_blank'
        );
        return true;
      });
    },
    [
      isRegisterModalOpen,
      mySpaceProfile?.paymentsLink,
      showCompletePaymentModal,
    ]
  );

  const hideAllModals = () => {
    hideRegisterModal();
    hideRegisterModalForViewingLimit();
    hideRegisterModalForBookingLimit();
    hideEditMyProfileModal();
    hideCompletePaymentModal();
    setIsRegisterModalOpen(false);
  };

  useEffect(() => {
    track({
      key: HACKLE_KEYS.VIEW.SPACE.MAIN,
      properties: {
        spaceId: spaceInfo.id,
        userId: user?.id || '',
        userName: user?.name || '',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoginClick = () => {
    router.push(`${ROUTES.USER.SIGN_IN}?url=${window.location.pathname}`);
  };

  const onLogoutClick = () => {
    logoutQuitely();
  };

  useEffect(() => {
    if (isLoading) return;
    if (
      register &&
      registerAllowed &&
      !originalSpaceProfiles.find((p) => p.memberId === user?.id)
    ) {
      setIsRegisterModalOpen(true);
      showRegisterModal();
    }
    router.replace(router.asPath.split('?')[0], undefined, { shallow: true });

    return () => {
      hideAllModals();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const isNotPayed = useMemo(
    () =>
      spaceInfo.isNeedPayments && mySpaceProfile?.paymentsStatus !== 'SUCCESS',
    [mySpaceProfile, spaceInfo.isNeedPayments]
  );

  const accessLimited = useMemo(
    () =>
      spaceInfo.isAccessLimitedToOnlyCardOwners &&
      (!mySpaceProfile || isNotPayed),
    [isNotPayed, mySpaceProfile, spaceInfo.isAccessLimitedToOnlyCardOwners]
  );

  const onAddCardClick = () => {
    if (!registerAllowed) return;
    setInformationModal(true)
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);

      if (
        accessLimited &&
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 100 &&
        !isRegisterModalOpen &&
        Date.now() - lastRegisterModalForViewingLimitShownAt > 2000 &&
        !showEnterCodePage
      ) {
        if (registerAllowed) {
          setInformationModal(true)
          setLastRegisterModalForViewingLimitShownAt(Date.now());
        } else if (isNotPayed) {
          setLastRegisterModalForViewingLimitShownAt(Date.now());
          handleShowCompletePaymentModal();
        }
        new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
        track({
          key: HACKLE_KEYS.VIEW.SPACE.MODAL_FOR_VIEWING_LIMIT,
          properties: {
            spaceId: spaceInfo.id,
            userId: user?.id || '',
            userName: user?.name || '',
          },
        });
      }
    };

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [
    accessLimited,
    handleShowCompletePaymentModal,
    isNotPayed,
    isRegisterModalOpen,
    lastRegisterModalForViewingLimitShownAt,
    registerAllowed,
    showEnterCodePage,
    showRegisterModalForBookingLimit,
    showRegisterModalForViewingLimit,
    spaceInfo.id,
    track,
    user?.id,
    user?.name,
  ]);

  const { mutate: increaseProfileReactionCount } = useMutation(
    async (payload: { profileId: string; reactionType: string }) => {
      const { data } = await SpaceAPI.increaseProfileReactionCount(
        payload.profileId,
        payload.reactionType
      );
      return data;
    }
  );

  const localizedTitle = useMemo(() => {
    return (
      getLocalizedText(
        spaceInfo.localizedTitles || [],
        router.locale || 'en',
        ''
      ) || spaceInfo.title
    );
  }, [router.locale, spaceInfo.localizedTitles, spaceInfo.title]);

  const localizedDescription = useMemo(() => {
    return (
      getLocalizedText(
        spaceInfo.localizedDescriptions || [],
        router.locale || 'en',
        ''
      ) || spaceInfo.description
    );
  }, [router.locale, spaceInfo.description, spaceInfo.localizedDescriptions]);

  const localizedCreateCardButtonLabel = useMemo(() => {
    return (
      getLocalizedText(
        spaceInfo.profileCreateConfig?.localizedCreateButtonLabels || [],
        router.locale || 'en',
        spaceInfo.profileCreateConfig?.defaultLanguage || 'en'
      ) || t('buildMyCard')
    );
  }, [
    router.locale,
    spaceInfo.profileCreateConfig?.defaultLanguage,
    spaceInfo.profileCreateConfig?.localizedCreateButtonLabels,
    t,
  ]);

  const getSubtitle = (profile: SpaceProfileData) => {
    return profile.categoryId && spaceInfo.profileCategoryConfig
      ? SpaceProfileCategoryUtil.getLocalizedCategoryName(
        spaceInfo.profileCategoryConfig,
        profile.categoryId,
        i18n.language
      )
      : undefined;
  };

  const getColor = (profile: SpaceProfileData) => {
    return profile.categoryId && spaceInfo.profileCategoryConfig
      ? SpaceProfileCategoryUtil.getCategoryColor(
        spaceInfo.profileCategoryConfig,
        profile.categoryId
      )
      : undefined;
  };

  const onClickPrimaryButtonOnCard = (profile: SpaceProfileData) => {
    if (accessLimited) {
      if (registerAllowed) {
        setInformationModal(true)
        track({
          key: HACKLE_KEYS.VIEW.SPACE.MODAL_FOR_BOOKING_LIMIT,
          properties: {
            spaceId: spaceInfo.id,
            spaceProfileId: profile.id,
            spaceProfileTitle: profile.title,
            userId: user?.id || '',
            userName: user?.name || '',
          },
        });
      } else if (isNotPayed) {
        handleShowCompletePaymentModal();
      }
      return;
    }
    window.open(
      `${ROUTES.GUEST_RESERVATION.MAIN}?i=${profile.reservationPageId}`,
      '_blank'
    );
  };

  const onClickReactionOnProfile = (
    profile: SpaceProfileData,
    reaction: ProfileReactionData
  ) => {
    increaseProfileReactionCount({
      profileId: profile.id,
      reactionType: reaction.type,
    });
  };

  const [modalOpenedProfile, setModalOpenedProfile] =
    useState<SpaceProfileData | null>(null);

  const [openedProfile, setOpenedProfile] = useState<SpaceProfileData | null>(
    null
  );

  const onClickMoreButtonOnProfile = (profile: SpaceProfileData) => {
    setModalOpenedProfile(profile);
  };

  const onClickProfileCardModalCloseButton = () => {
    setModalOpenedProfile(null);
  };

  const onClickSendMessageButton = (profile: SpaceProfileData) => {
    if (user && mySpaceProfile) {
      if (isNotPayed) {
        handleShowCompletePaymentModal();
      } else {
        setOpenedProfile(profile);
        setIsMessageModal(true);
      }
    } else {
      setInformationModal(true);
    }
  };

  const handleRegisterModal = () => {
    if (registerAllowed) {
      setInformationModal(false);
      setIsRegisterModalOpen(true);
      showRegisterModal();
    }
  };

  const onClickSendMessagedModalCloseButton = () => {
    setOpenedProfile(null);
    setIsMessageModal(false);
  };

  const onClickEditMyProfileButton = () => {
    if (!user) {
      alert(t('loginToEditYourProfileCard'));
      return;
    }
    setIsRegisterModalOpen(true);
    showEditMyProfileModal();
  };

  const renderParticles = (particleConfig: SpaceParticleConfig) => (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'snow',
        particles: {
          shape: {
            type: 'image',
            image: particleConfig.images?.map((image) => ({
              src: image.url,
              fill: true,
              width: image.width || 800,
              height: image.height || 800,
            })),
          },
          size: {
            value: particleConfig.sizeValue || 50,
          },
          collisions: {
            enable: true,
          },
          move: {
            enable: true,
            direction: 'bottom',
            speed: particleConfig.moveSpeed || 3,
          },
          number: {
            density: {
              enable: true,
              area: particleConfig.numberDensityArea || 3000,
            },
            value: particleConfig.numberValue || 80,
          },
        },
        detectRetina: true,
      }}
    />
  );

  const renderProfileCardModal = (profile: SpaceProfileData) => (
    <Styled.ProfileCardModalOuterContainer
      onClick={onClickProfileCardModalCloseButton}
    >
      <Styled.ProfileCardModalInnerContainer
        onClick={onClickProfileCardModalCloseButton}
      >
        <Styled.CloseButtonWrapper>
          <Styled.CloseButton icon="ep:circle-close-filled" />
        </Styled.CloseButtonWrapper>
        <SpaceProfileCard
          {...profile}
          reservationPageId={undefined}
          isExpanded={true}
          subTitle={getSubtitle(profile)}
          color={getColor(profile)}
        />
      </Styled.ProfileCardModalInnerContainer>
    </Styled.ProfileCardModalOuterContainer>
  );

  const renderSpacePage = () => (
    <Styled.SpacePageWrapper>
      <SpaceInfoHeader
        {...spaceInfo}
        title={localizedTitle}
        description={localizedDescription}
        userMenus={[
          ...(registerAllowed
            ? [
              {
                icon: 'material-symbols:add-circle-outline',
                text: localizedCreateCardButtonLabel || t('menu.buildMyCard'),
                color: 'var(--purple-500)',
                onClick: onAddCardClick,
              },
            ]
            : []),
          {
            icon: 'material-symbols:open-in-new',
            text: t('menu.goToSendtime'),
            onClick: () => window.open(ROUTES.MAIN, '_blank'),
          },
          {
            icon: 'material-symbols:exit-to-app',
            text: t('menu.logout'),
            color: 'var(--red)',
            onClick: onLogoutClick,
          },
        ]}
        isScrolled={isScrolled}
        onSpaceTitleClick={() =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        onLoginClick={onLoginClick}
      />
      <Styled.LeftSideContainer>
        <Styled.SpaceInfoCardWrapper>
          <SpaceInfoCard
            {...spaceInfo}
            title={localizedTitle}
            description={localizedDescription}
          />
        </Styled.SpaceInfoCardWrapper>
        {registerAllowed && (
          <HackleTrack
            hackleEvent={{
              key: HACKLE_KEYS.CLICK.SPACE.CREATE_CARD,
              properties: {
                spaceId: spaceInfo.id,
                userId: user?.id || '',
                userName: user?.name || '',
              },
            }}
          >
            <Styled.AddCardButton size="big" onClickButton={onAddCardClick}>
              {localizedCreateCardButtonLabel || t('buildMyCard')}
            </Styled.AddCardButton>
          </HackleTrack>
        )}
        <Styled.PoweredByWrapper>
          <HackleTrack
            hackleEvent={{
              key: HACKLE_KEYS.CLICK.SPACE.POWERED_BY,
              properties: {
                spaceId: spaceInfo.id,
                userId: user?.id || '',
                userName: user?.name || '',
              },
            }}
          >
            <PoweredBySpace />
          </HackleTrack>
        </Styled.PoweredByWrapper>
      </Styled.LeftSideContainer>
      <Styled.RightSideContainer>
        <Styled.ContainerTitle>{t('eventAttendeesList')}</Styled.ContainerTitle>
        {filterCategories.length > 0 && (
          <Styled.CategoryFilterWrapper>
            <CategoryFilter
              selectedCategoryIds={selectedCategoryIds}
              categories={filterCategories}
              onCategoryClick={onCategoryClick}
              isScrolled={isScrolled}
            />
          </Styled.CategoryFilterWrapper>
        )}
        <Styled.ProfilesCardsContainer accessLimited={accessLimited}>
          {spaceProfiles.map((profile) => (
            <SpaceProfileCard
              key={profile.id}
              {...profile}
              expandableDescription={profile.expandableDescription}
              reactions={spaceInfo.isReactionsDisabled ? [] : profile.reactions}
              subTitle={getSubtitle(profile)}
              color={getColor(profile)}
              showSendMessageButton={spaceInfo.isNeedMessaging}
              isMyCard={profile.id === mySpaceProfile?.id}
              reservationPageId={
                spaceInfo.isPrimaryButtonDisabled
                  ? undefined
                  : profile.reservationPageId
              }
              primaryButtonLabel={
                profile.primaryButtonConfig &&
                getLocalizedText(
                  profile.primaryButtonConfig.localizedLabels,
                  i18n.language,
                  profile.primaryButtonConfig.defaultLanguage
                )
              }
              supportedSocials={spaceInfo.profileCreateConfig?.supportedSocials}
              onClickPrimaryButton={() => onClickPrimaryButtonOnCard(profile)}
              onClickReaction={(reaction) =>
                onClickReactionOnProfile(profile, reaction)
              }
              onClickMoreButton={() => onClickMoreButtonOnProfile(profile)}
              onClickSendMessageButton={() => onClickSendMessageButton(profile)}
              onClickEditButton={
                profile.id === mySpaceProfile?.id
                  ? onClickEditMyProfileButton
                  : undefined
              }
            />
          ))}
          {accessLimited && <Styled.AccessLimitOverlay />}
        </Styled.ProfilesCardsContainer>
      </Styled.RightSideContainer>
    </Styled.SpacePageWrapper>
  );

  const renderPasswordInputPage = () => (
    <Styled.PasswordPageWrapper>
      <Styled.PasswordForm onSubmit={onEnterCodeClick}>
        <Styled.PasswordTitle>{t('enterCodePage.title')}</Styled.PasswordTitle>
        <PasswordInput
          value={currentEnterCode}
          onChange={onEnterCodeChange}
          autoFocus
        />
        <StyledButton width="100%" onClickButton={onEnterCodeClick}>
          {t('enterCodePage.button')}
        </StyledButton>
      </Styled.PasswordForm>
    </Styled.PasswordPageWrapper>
  );

  const renderSendMessageModal = () => {
    return (
      <SendMessageModal
        title={openedProfile?.title}
        spaceId={spaceInfo.id}
        targetId={openedProfile?.id || ''}
        senderId={mySpaceProfile?.id || ''}
        close={onClickSendMessagedModalCloseButton}
      />
    );
  };

  const renderMessageVerifyModal = () => {
    return (
      <InformationModal
        title={t('spaceInformationMadal.title')}
        description={(!user && !mySpaceProfile) || !user ? t('spaceInformationMadal.description1') : t('spaceInformationMadal.description2')}
        closeModal={() => setInformationModal(false)}
      >
        <StyledButton
          onClickButton={onLoginClick}
          color="purple-500"
          padding="10px 14px"
          bgColor="white"
          withBorder
          borderColor="purple-500"
        >
          {t('spaceInformationMadal.loginButton')}
        </StyledButton>
        <StyledButton
          onClickButton={handleRegisterModal}
          color="white"
          padding="10px 14px"
        >
          {t('spaceInformationMadal.registerButton')}
        </StyledButton>
      </InformationModal>
    );
  };
  return (
    <>
      <Global styles={[Styled.spacePageStyle]} />
      {isRegisterModalOpen && <Global styles={[Styled.blockScrollStyle]} />}
      {isLoading && loadingView()}
      {spaceInfo.particleConfig && renderParticles(spaceInfo.particleConfig)}
      {modalOpenedProfile && renderProfileCardModal(modalOpenedProfile)}
      {!showEnterCodePage && renderSpacePage()}
      {showEnterCodePage && renderPasswordInputPage()}
      {isMessageModal && renderSendMessageModal()}
      {informationModal && renderMessageVerifyModal()}
    </>
  );
};

export default SpacePage;
