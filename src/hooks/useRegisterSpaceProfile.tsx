import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import {
  CreateSpaceProfileRequest,
  CustomAgreementConfig,
  ReservationPageForSpaceProfileData,
  SpaceAPI,
  SpaceProfileCategoryConfig,
  SpaceProfileData,
  SpaceSupportedSocial,
  UpdateSpaceProfileRequest,
} from '@api/space/SpaceApi';
import { coreUserState } from '@atoms/index';
import { RegisterSpaceProfileProps } from '@components/Space/RegisterSpaceProfile';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { makePhoneNumberWithHyphen } from '@utils/phoneNumber';
import { SpaceProfileCategoryUtil, SpaceSocialUtil } from '@utils/spaceUtils';
import { getMatchBrowserTimezone } from '@utils/time';
import { validate } from '@utils/validation';

interface UseRegisterSpaceProfileProps {
  spaceId: string;
  timezones: Timezone[];
  onSuccess: (spaceProfile: SpaceProfileData) => void;
  profileCategoryConfig?: SpaceProfileCategoryConfig;
  customAgreementConfigs?: CustomAgreementConfig[];
  profileToEdit?: SpaceProfileData;
  paymentConfig: RegisterSpaceProfileProps['paymentConfig'];
}

const useRegisterSpaceProfile = ({
  spaceId,
  timezones,
  onSuccess,
  profileCategoryConfig,
  customAgreementConfigs = [],
  profileToEdit,
  paymentConfig,
}: UseRegisterSpaceProfileProps) => {
  const { t } = useTranslation('space');
  const router = useRouter();
  const user = useRecoilValue(coreUserState);
  const { showModal: showRegisterSuccessModal } = useNestedModal({
    type: 'alert',
    title: t('addCardModal.alerts.successTitle'),
    description: t('addCardModal.alerts.successMessage'),
  });
  const { showModal: showUpdateSuccessModal } = useNestedModal({
    type: 'alert',
    title: t('addCardModal.alerts.updateSuccessTitle'),
  });

  const [formData, setFormData] = useState({
    name: {
      text: user?.name || '',
      alertMessage: '',
    },
    email: {
      text: user?.email || '',
      alertMessage: '',
    },
    phone: {
      text: user?.phone ? makePhoneNumberWithHyphen(user.phone) : '',
      alertMessage: '',
    },
    title: {
      text: profileToEdit?.title || user?.name || '',
      alertMessage: '',
    },
    category: {
      label:
        profileCategoryConfig &&
        SpaceProfileCategoryUtil.getLocalizedCategoryLabel(
          profileCategoryConfig,
          i18n.language
        ),
      selectedId:
        profileToEdit?.categoryId ||
        profileCategoryConfig?.categoryItems?.[0]?.id,
    },
    description: {
      text: profileToEdit?.description || '',
    },
    tags: {
      text: profileToEdit?.tags?.join(', ') || '',
      list: profileToEdit?.tags || [],
    },
    imageUrl: {
      url: profileToEdit?.imageUrl || '',
    },
    reservationPage: {
      createNew: false,
      selectedText: '',
      list: [] as (ReservationPageForSpaceProfileData & {
        valueText: string;
      })[],
    },
    socials: (profileToEdit?.links || []).reduce(
      (acc, link) => {
        const social = SpaceSocialUtil.getSocialFromLabel(link.label);
        if (!social) return acc;
        return {
          ...acc,
          [social]: {
            text: SpaceSocialUtil.extractUsernameFromUrl(social, link.url),
            url: link.url,
          },
        };
      },
      {} as {
        [key in SpaceSupportedSocial]: {
          text: string;
          url: string;
        };
      }
    ),
    customAgreements: customAgreementConfigs.reduce(
      (acc, config) => ({
        ...acc,
        [config.id]: {
          isAgreed: true,
        },
      }),
      {} as {
        [key: string]: {
          isAgreed: boolean;
        };
      }
    ),
    isExposeToSearchAgreed: true,
    isMarketingUseAgreed: true,
  });

  const { isLoading: isCreateSpaceProfileInitLoading } = useQuery(
    ['createSpaceProfileInit', spaceId, user?.id],
    () => SpaceAPI.createSpaceProfileInit(),
    {
      onSuccess: ({ data: { results } }) => {
        const pages = results[0].reservationPages;
        const mappedList = pages.map((page) => {
          const uuidText =
            pages.filter((p) => p.pageName === page.pageName).length > 1
              ? ` [${page.uuid}]`
              : '';
          return {
            ...page,
            valueText: `${page.pageName}${uuidText}`,
          };
        });
        const selectedText =
          mappedList.find(
            (page) => page.uuid === profileToEdit?.reservationPageId
          )?.valueText ||
          mappedList[0]?.valueText ||
          t('addCardModal.alerts.noReservationPage');
        setFormData((prev) => ({
          ...prev,
          reservationPage: {
            ...prev.reservationPage,
            list: mappedList,
            selectedText,
            createNew: mappedList.length === 0,
          },
        }));
      },
      enabled: user != null,
    }
  );

  const onRegisterSuccess = (spaceProfileData: SpaceProfileData) => {
    if (paymentConfig?.isUsingPayment) {
      window.open(spaceProfileData.paymentsLink, '_blank');
    } else {
      showRegisterSuccessModal();
    }
    onSuccess(spaceProfileData);
  };

  const onCreateProfileError = (error: RequestError) => {
    switch (error.code) {
      case 4001:
        alert(t('addCardModal.alerts.checkInputs'));
        break;
      case 4101:
        alert(t('addCardModal.alerts.alreadyRegistered'));
        break;
      case 4602:
        alert(t('addCardModal.alerts.alreadyInSpace'));
        break;
      case 4604:
        alert(t('addCardModal.alerts.reservationPageNotFound'));
        break;
      default:
        alert(t('addCardModal.alerts.somethingWrong'));
        break;
    }
  };

  const {
    mutate: signUpAndCreateSpaceProfile,
    isLoading: isSignUpAndCreateProfileLoading,
  } = useMutation(SpaceAPI.signUpAndCreateSpaceProfile, {
    onSuccess: (data) => {
      onRegisterSuccess(data.data.results[0]);
    },
    onError: onCreateProfileError,
  });

  const { mutate: createSpaceProfile, isLoading: isCreateProfileLoading } =
    useMutation(SpaceAPI.createSpaceProfile, {
      onSuccess: (data) => {
        onRegisterSuccess(data.data.results[0]);
      },
      onError: onCreateProfileError,
    });

  const { mutate: updateSpaceProfile, isLoading: isUpdateProfileLoading } =
    useMutation(SpaceAPI.updateSpaceProfile, {
      onSuccess: (data) => {
        showUpdateSuccessModal();
        onSuccess(data.data.results[0]);
      },
      onError: onCreateProfileError,
    });

  const isRequiredAgreementsChecked = useMemo(
    () =>
      customAgreementConfigs
        .filter((config) => config.isRequired)
        .every((config) => formData.customAgreements[config.id].isAgreed),
    [customAgreementConfigs, formData.customAgreements]
  );

  const onClickSubmitButton = (): boolean => {
    const name = formData.name.text.trim();
    const email = formData.email.text.trim().toLowerCase();
    const phone = formData.phone.text.trim();
    const title = formData.title.text.trim();

    const verifySignUpInputs = (): boolean => {
      if (name.length === 0 && !profileToEdit) {
        setFormData({
          ...formData,
          name: {
            ...formData.name,
            alertMessage: t('addCardModal.alerts.nameEmptyError'),
          },
        });
        return false;
      }
      if (!validate.email.form(email) && !profileToEdit) {
        setFormData({
          ...formData,
          email: {
            ...formData.email,
            alertMessage: t('addCardModal.alerts.emailFormatError'),
          },
        });
        return false;
      }
      if (
        i18n.language === 'ko' &&
        (!validate.phone.form(phone) || !validate.phone.must11digits(phone)) &&
        !user &&
        !profileToEdit
      ) {
        setFormData({
          ...formData,
          phone: {
            ...formData.phone,
            alertMessage: t('addCardModal.alerts.phoneFormatError'),
          },
        });
        return false;
      }
      if (!isRequiredAgreementsChecked && !profileToEdit) {
        return false;
      }
      if (title.length === 0) {
        setFormData({
          ...formData,
          title: {
            ...formData.title,
            alertMessage: t('addCardModal.alerts.nameEmptyError'),
          },
        });
        return false;
      }
      return true;
    };

    if (!verifySignUpInputs()) return false;

    const spaceProfileInfo: CreateSpaceProfileRequest = {
      spaceId,
      title: formData.title.text.trim(),
      tags: formData.tags.list,
      categoryId: formData.category.selectedId,
      description: formData.description.text.trim(),
      imageUrl: formData.imageUrl.url,
      links: Object.entries(formData.socials).map(([key, value]) => ({
        url: value.url,
        iconId: SpaceSocialUtil.getSocialIconId(key as SpaceSupportedSocial),
        label: SpaceSocialUtil.getSocialLabel(key as SpaceSupportedSocial),
      })),
      isExposeToSearchAgreed: formData.isExposeToSearchAgreed,
      isMarketingUseAgreed: formData.isMarketingUseAgreed,
      customAgreements: customAgreementConfigs.map((config) => ({
        id: config.id,
        isAgreed: formData.customAgreements[config.id].isAgreed,
      })),
    };

    if (!formData.reservationPage.createNew) {
      const reservationPage = formData.reservationPage.list.find(
        (page) => page.valueText === formData.reservationPage.selectedText
      );
      spaceProfileInfo.reservationPageId = reservationPage?.uuid;
    }

    if (profileToEdit) {
      const spaceProfileInfoForUpdate: UpdateSpaceProfileRequest = {
        reservationPageId: spaceProfileInfo.reservationPageId,
        title: spaceProfileInfo.title,
        tags: spaceProfileInfo.tags,
        categoryId: spaceProfileInfo.categoryId,
        description: spaceProfileInfo.description,
        expandableDescription: profileToEdit.expandableDescription,
        imageUrl: spaceProfileInfo.imageUrl,
        imageConfig: profileToEdit.imageConfig,
        color: profileToEdit.color,
        links: spaceProfileInfo.links,
        isDescriptionUsingHtml: profileToEdit.isDescriptionUsingHtml,
        primaryButtonConfig: profileToEdit.primaryButtonConfig,
      };
      updateSpaceProfile({
        profileId: profileToEdit.id,
        spaceId,
        updateSpaceProfileRequest: spaceProfileInfoForUpdate,
      });
    } else {
      if (user) {
        createSpaceProfile(spaceProfileInfo);
      } else {
        signUpAndCreateSpaceProfile({
          signUpInfo: {
            name,
            email,
            phone: i18n.language === 'ko' ? phone : undefined,
            locale: router.locale || i18n.language,
            timezone: getMatchBrowserTimezone(timezones),
          },
          spaceProfileInfo,
        });
      }
    }
    return true;
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const title =
      formData.title.text === formData.name.text ||
      formData.title.text.length === 0
        ? text
        : formData.title.text;
    setFormData({
      ...formData,
      name: {
        ...formData.name,
        text: e.target.value,
        alertMessage: '',
      },
      title: {
        ...formData.title,
        text: title,
        alertMessage: '',
      },
    });
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      email: {
        ...formData.email,
        text: e.target.value,
        alertMessage: '',
      },
    });
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      phone: {
        ...formData.phone,
        text: makePhoneNumberWithHyphen(e.target.value.slice(0, 13)),
        alertMessage: '',
      },
    });
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        text: e.target.value,
        alertMessage: '',
      },
    });
  };

  const onCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedId = profileCategoryConfig?.categoryItems.find((item) =>
      Array.from(Object.values(item.localizedNames)).some(
        ({ text }) => e.currentTarget.innerText == text
      )
    )?.id;

    setFormData({
      ...formData,
      category: {
        ...formData.category,
        selectedId,
      },
    });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        text: e.target.value,
      },
    });
  };

  const onTagTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      tags: {
        ...formData.tags,
        text: e.target.value,
      },
    });
  };

  useEffect(() => {
    const tags = formData.tags.text
      .split(',')
      .map((tag) => {
        const trimmedTag = tag.trim();
        return trimmedTag.startsWith('#') ? trimmedTag.slice(1) : trimmedTag;
      })
      .filter((tag) => tag.length > 0);

    setFormData({
      ...formData,
      tags: {
        ...formData.tags,
        list: tags,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.tags.text]);

  const onImageUrlChange = (url: string) => {
    setFormData({
      ...formData,
      imageUrl: {
        ...formData.imageUrl,
        url,
      },
    });
  };

  const onReservationPageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFormData({
      ...formData,
      reservationPage: {
        ...formData.reservationPage,
        selectedText: e.currentTarget.innerText,
      },
    });
  };

  const onCreateNewReservationPageClick = () => {
    setFormData({
      ...formData,
      reservationPage: {
        ...formData.reservationPage,
        createNew:
          !formData.reservationPage.createNew ||
          formData.reservationPage.list.length < 1,
      },
    });
  };

  const onSocialInputTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    socialType: SpaceSupportedSocial
  ) => {
    const text = e.target.value.trim();
    const username = SpaceSocialUtil.extractUsernameFromText(socialType, text);

    if (username) {
      setFormData({
        ...formData,
        socials: {
          ...formData.socials,
          [socialType]: {
            ...formData.socials[socialType],
            text: username,
            url: SpaceSocialUtil.createSocialUrl(socialType, username),
          },
        },
      });
    } else {
      delete formData.socials[socialType];
      setFormData({
        ...formData,
      });
    }
  };

  const onCustomAgreementChange = (id: string) => {
    const agreement = formData.customAgreements[id];
    setFormData({
      ...formData,
      customAgreements: {
        ...formData.customAgreements,
        [id]: {
          ...agreement,
          isAgreed: !agreement.isAgreed,
        },
      },
    });
  };

  const onIsExposeToSearchAgreementChange = () => {
    setFormData({
      ...formData,
      isExposeToSearchAgreed: !formData.isExposeToSearchAgreed,
    });
  };

  const onIsMarketingUseAgreementChange = () => {
    setFormData({
      ...formData,
      isMarketingUseAgreed: !formData.isMarketingUseAgreed,
    });
  };

  const isLoading = useMemo(
    () =>
      isSignUpAndCreateProfileLoading ||
      isCreateProfileLoading ||
      isCreateSpaceProfileInitLoading ||
      isUpdateProfileLoading,
    [
      isSignUpAndCreateProfileLoading,
      isCreateProfileLoading,
      isCreateSpaceProfileInitLoading,
      isUpdateProfileLoading,
    ]
  );

  return {
    formData,
    isLoading,
    isRequiredAgreementsChecked,
    onClickSubmitButton,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onTitleChange,
    onCategoryChange,
    onDescriptionChange,
    onTagTextChange,
    onImageUrlChange,
    onReservationPageChange,
    onCreateNewReservationPageClick,
    onSocialInputTextChange,
    onCustomAgreementChange,
    onIsExposeToSearchAgreementChange,
    onIsMarketingUseAgreementChange,
  };
};

export default useRegisterSpaceProfile;
