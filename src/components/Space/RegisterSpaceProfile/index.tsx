import React, { createRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload';
import i18n from 'locales';
import { Trans, useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { Alert } from 'styles/common.styles';

import {
  SpaceAPI,
  SpaceProfileCategoryConfig,
  SpaceProfileCreateConfig,
  SpaceProfileData,
} from '@api/space/SpaceApi';
import { coreUserState, mySpaceProfileState } from '@atoms/index';
import { TagsContainer } from '@components/CustomCard/index.styles';
import HackleTrack from '@components/HackleTrack';
import SelectTextInput from '@components/SelectTextInput';
import TextArea from '@components/TextArea';
import TextCheckbox from '@components/TextCheckbox';
import TextInput from '@components/TextInput';
import { TextInputLabel } from '@components/TextInput/index.styles';
import { HACKLE_KEYS } from '@constants/hackle';
import { ROUTES } from '@constants/routes';
import { useTrack } from '@hackler/react-sdk';
import useLoading from '@hooks/useLoading';
import useRegisterSpaceProfile from '@hooks/useRegisterSpaceProfile';
import { Icon } from '@iconify/react';
import {
  getLocalizedText,
  SpaceProfileCategoryUtil,
  SpaceSocialUtil,
} from '@utils/spaceUtils';

import { CardTag } from '../SpaceProfileCard/index.styles';

import * as Styled from './index.style';

const MAX_PROFILE_IMAGE_SIZE_MB = 10;

export interface RegisterSpaceProfileProps {
  spaceId: string;
  profileCategoryConfig?: SpaceProfileCategoryConfig;
  timezones: Timezone[];
  title?: string;
  subtitle?: string;
  preShowEmbedHtml?: string;
  preShowTitle?: string;
  preShowDescription?: string;
  spaceProfileCreateConfig?: SpaceProfileCreateConfig;
  editMode?: boolean;
  paymentConfig?: {
    isUsingPayment: boolean;
  };
  onSuccess: (spaceProfile: SpaceProfileData) => void;
  onClose: () => void;
}

const RegisterSpaceProfile = ({
  spaceId,
  profileCategoryConfig,
  timezones,
  title,
  subtitle,
  preShowEmbedHtml,
  preShowTitle,
  preShowDescription,
  spaceProfileCreateConfig,
  editMode,
  paymentConfig = {
    isUsingPayment: false,
  },
  onSuccess,
  onClose,
}: RegisterSpaceProfileProps) => {
  const { t } = useTranslation('space');
  const router = useRouter();
  const { loadingView } = useLoading();
  const containerRef = createRef<HTMLDivElement>();
  const { FileInput, openFileDialog } = useS3Upload();
  const track = useTrack();
  const user = useRecoilValue(coreUserState);
  const myProfile = useRecoilValue(mySpaceProfileState);

  const [progress, setProgress] = useState({
    skipFirst: !preShowEmbedHtml,
    current: preShowEmbedHtml ? 1 : 2,
    max: 2,
  });

  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  useEffect(() => {
    if (progress.current === 1) {
      setNextButtonDisabled(true);
    }
    setTimeout(() => {
      setNextButtonDisabled(false);
    }, 3000);
  }, [progress]);

  const {
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
  } = useRegisterSpaceProfile({
    spaceId,
    timezones,
    onSuccess,
    profileCategoryConfig,
    customAgreementConfigs: spaceProfileCreateConfig?.customAgreementConfigs,
    profileToEdit: editMode ? myProfile || undefined : undefined,
    paymentConfig,
  });

  const onPreShowStepNextButtonClick = () => {
    setProgress((prev) => ({
      ...prev,
      current: 2,
    }));

    track({
      key: HACKLE_KEYS.CLICK.SPACE.CREATE_CARD_PRE_SHOW_NEXT,
      properties: {
        spaceId,
        userId: user?.id || '',
        userName: user?.name || '',
      },
    });
  };

  const onSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | undefined
  ) => {
    event?.preventDefault();

    const isValidated = onClickSubmitButton();
    if (!isValidated) {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { mutate: uploadProfileImage, isLoading: isImageUploading } =
    useMutation(SpaceAPI.uploadProfileImage, {
      onSuccess: (response) => {
        onImageUrlChange(response.data.results[0]);
      },
    });

  const onProfileImageFileChange = async (file: File) => {
    if (
      !file.type.includes('png') &&
      !file.type.includes('jpeg') &&
      !file.type.includes('jpg')
    ) {
      alert(t('addCardModal.alerts.onlyImage'));
      return;
    }
    if (file.size > MAX_PROFILE_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(
        t('addCardModal.alerts.imageSize', { size: MAX_PROFILE_IMAGE_SIZE_MB })
      );
      return;
    }

    uploadProfileImage(file);
  };

  const renderPreShowStep = () => {
    return (
      <>
        {preShowDescription && (
          <Styled.PreShowDescriptionContainer>
            {preShowDescription}
          </Styled.PreShowDescriptionContainer>
        )}
        <Styled.EmbedBottomContainer>
          <Styled.EmbedContainer
            dangerouslySetInnerHTML={{ __html: preShowEmbedHtml || '' }}
          />
          <Styled.NextButton
            size="big"
            onClickButton={onPreShowStepNextButtonClick}
            disabled={nextButtonDisabled}
          >
            {t('addCardModal.nextButtonText')}
          </Styled.NextButton>
        </Styled.EmbedBottomContainer>
      </>
    );
  };

  const renderFormStep = () => {
    return (
      <>
        <Styled.Form onSubmit={onSubmit}>
          {!user && (
            <Styled.Section>
              <Styled.SectionTitle>
                {t('addCardModal.signUpSectionTitle')}
              </Styled.SectionTitle>
              <Styled.SectionContent>
                <TextInput
                  value={formData.name.text}
                  onChange={onNameChange}
                  label={t('addCardModal.name')}
                  placeholder={t('addCardModal.namePlaceholder')}
                  inputPadding={5}
                  autoComplete="name"
                  alert={<Alert>{formData.name.alertMessage}</Alert>}
                  required
                />
                <TextInput
                  value={formData.email.text}
                  onChange={onEmailChange}
                  label={t('addCardModal.email')}
                  placeholder={t('addCardModal.emailPlaceholder')}
                  inputPadding={5}
                  autoComplete="email"
                  alert={<Alert>{formData.email.alertMessage}</Alert>}
                  required
                />
                {i18n.language === 'ko' && (
                  <TextInput
                    value={formData.phone.text}
                    onChange={onPhoneChange}
                    label={t('addCardModal.phone')}
                    placeholder={t('addCardModal.phonePlaceholder')}
                    inputPadding={5}
                    autoComplete="tel"
                    alert={<Alert>{formData.phone.alertMessage}</Alert>}
                    required
                  />
                )}
              </Styled.SectionContent>
            </Styled.Section>
          )}
          <Styled.Section>
            <Styled.SectionTitle>
              {t('addCardModal.infoSectionTitle')}
            </Styled.SectionTitle>
            <Styled.SectionContent>
              <TextInput
                value={formData.title.text}
                onChange={onTitleChange}
                label={t('addCardModal.nameOnYourCard')}
                placeholder={t('addCardModal.namePlaceholder')}
                inputPadding={5}
                autoComplete="name"
                alert={<Alert>{formData.title.alertMessage}</Alert>}
                required
              />
              {user && (
                <Styled.ReservationPageSelectionContainer>
                  <SelectTextInput
                    value={formData.reservationPage.selectedText}
                    onClickSelectBox={onReservationPageChange}
                    label={t('addCardModal.reservationPage')}
                    selectValues={formData.reservationPage.list.map((page) => ({
                      value: page.valueText,
                    }))}
                    inputPadding={5}
                    disabled={formData.reservationPage.createNew}
                    required
                  />
                  <TextCheckbox
                    onClick={onCreateNewReservationPageClick}
                    checked={formData.reservationPage.createNew}
                    small
                  >
                    {t('addCardModal.createNewReservationPage')}
                  </TextCheckbox>
                </Styled.ReservationPageSelectionContainer>
              )}
              {formData.category.label && (
                <SelectTextInput
                  value={
                    (profileCategoryConfig &&
                      SpaceProfileCategoryUtil.getLocalizedCategoryName(
                        profileCategoryConfig,
                        formData.category.selectedId || '',
                        i18n.language
                      )) ||
                    ''
                  }
                  onClickSelectBox={onCategoryChange}
                  label={formData.category.label}
                  selectValues={
                    profileCategoryConfig &&
                    SpaceProfileCategoryUtil.getLocalizedCategoryNames(
                      profileCategoryConfig,
                      i18n.language
                    )?.map((value) => ({ value }))
                  }
                  inputPadding={5}
                />
              )}
              <TextArea
                value={formData.description.text}
                onChange={onDescriptionChange}
                label={t('addCardModal.bio')}
                placeholder={t('addCardModal.bioPlaceholder')}
              />
              <TextArea
                value={formData.tags.text}
                onChange={onTagTextChange}
                label={t('addCardModal.hashtags')}
                placeholder={t('addCardModal.hashtagsPlaceholder')}
                rows={2}
              />
              <TagsContainer>
                {formData.tags.list.map((tag) => (
                  <CardTag
                    key={tag}
                    style={{ backgroundColor: 'var(--gray-200)' }}
                  >{`#${tag}`}</CardTag>
                ))}
              </TagsContainer>
              <TextInputLabel>{t('addCardModal.profileImage')}</TextInputLabel>
              <FileInput onChange={onProfileImageFileChange} />
              <Styled.ProfileImageWrapper onClick={openFileDialog}>
                {formData.imageUrl.url && !isImageUploading && (
                  <Image
                    src={formData.imageUrl.url}
                    width={'100%'}
                    height={'100%'}
                    objectFit="cover"
                    alt="profile image"
                  />
                )}
                {!formData.imageUrl.url && !isImageUploading && (
                  <Icon
                    icon="ic:baseline-file-upload"
                    width={24}
                    color="var(--gray-600)"
                  />
                )}
                {isImageUploading && (
                  <Icon
                    icon="line-md:loading-loop"
                    width={36}
                    color="var(--gray-600)"
                  />
                )}
              </Styled.ProfileImageWrapper>
              {spaceProfileCreateConfig?.supportedSocials?.map(
                (social, index) => (
                  <TextInput
                    key={index}
                    value={formData.socials[social]?.text || ''}
                    onChange={(e) => onSocialInputTextChange(e, social)}
                    prefixNode={
                      <Icon
                        icon={SpaceSocialUtil.getSocialIconId(social)}
                        width={16}
                      />
                    }
                    label={SpaceSocialUtil.getSocialLabel(social)}
                    placeholder={t('addCardModal.socialLinkPlaceholder')}
                    alert={
                      formData.socials[social]?.url && (
                        <Styled.SocialLinkPreview
                          href={formData.socials[social]?.url}
                          target="_blank"
                        >
                          {`${formData.socials[social]?.url.split('//')[1]}`}
                        </Styled.SocialLinkPreview>
                      )
                    }
                  />
                )
              )}
            </Styled.SectionContent>
          </Styled.Section>
          {!editMode &&
            spaceProfileCreateConfig?.customAgreementConfigs &&
            spaceProfileCreateConfig.customAgreementConfigs.length > 0 && (
              <Styled.Section>
                <Styled.SectionTitle>
                  {getLocalizedText(
                    spaceProfileCreateConfig.localizedCustomAgreementTitle ||
                      [],
                    router.locale || spaceProfileCreateConfig.defaultLanguage,
                    spaceProfileCreateConfig.defaultLanguage
                  )}
                </Styled.SectionTitle>
                <Styled.CheckboxesContainer>
                  {spaceProfileCreateConfig?.customAgreementConfigs?.map(
                    (agreementConfig) => (
                      <TextCheckbox
                        key={agreementConfig.id}
                        onClick={() =>
                          onCustomAgreementChange(agreementConfig.id)
                        }
                        checked={
                          formData.customAgreements[agreementConfig.id].isAgreed
                        }
                        small
                      >
                        <Styled.AgreementText
                          dangerouslySetInnerHTML={{
                            __html:
                              getLocalizedText(
                                agreementConfig.localizedHtmls,
                                router.locale ||
                                  spaceProfileCreateConfig.defaultLanguage,
                                spaceProfileCreateConfig.defaultLanguage
                              ) || '',
                          }}
                        />
                        {agreementConfig.isRequired && (
                          <Styled.AgreementTextMark>*</Styled.AgreementTextMark>
                        )}
                      </TextCheckbox>
                    )
                  )}
                </Styled.CheckboxesContainer>
              </Styled.Section>
            )}
          {!editMode && (
            <Styled.Section>
              <Styled.SectionTitle>
                {t('addCardModal.contentsSharingAgreement')}
              </Styled.SectionTitle>
              <Styled.CheckboxesContainer>
                <TextCheckbox
                  onClick={onIsExposeToSearchAgreementChange}
                  checked={formData.isExposeToSearchAgreed}
                  small
                >
                  {t('addCardModal.contentsSharingAgreement1')}
                </TextCheckbox>
                <TextCheckbox
                  onClick={onIsMarketingUseAgreementChange}
                  checked={formData.isMarketingUseAgreed}
                  small
                >
                  {t('addCardModal.contentsSharingAgreement2')}
                </TextCheckbox>
              </Styled.CheckboxesContainer>
            </Styled.Section>
          )}
        </Styled.Form>
        <Styled.ButtonSection>
          <HackleTrack
            hackleEvent={{
              key: HACKLE_KEYS.CLICK.SPACE.CREATE_CARD_SUBMIT,
              properties: {
                spaceId,
                userId: user?.id || '',
                userName: user?.name || '',
              },
            }}
          >
            <Styled.SubmitButton
              width="100%"
              size="big"
              onClickButton={onSubmit}
              disabled={isImageUploading || !isRequiredAgreementsChecked}
            >
              {editMode
                ? t('addCardModal.updateButtonText')
                : paymentConfig.isUsingPayment
                ? t('addCardModal.payButtonText')
                : t('addCardModal.buttonText')}
            </Styled.SubmitButton>
          </HackleTrack>
          {!editMode && (
            <Styled.AgreementAlertText>
              <Trans
                t={t}
                i18nKey={'addCardModal.alerts.agreement'}
                components={{
                  terms: (
                    <a
                      href={ROUTES.TERMS_OF_USE}
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                  privacy: (
                    <a
                      href={ROUTES.PRIVACY_POLICY}
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                }}
              />
            </Styled.AgreementAlertText>
          )}
        </Styled.ButtonSection>
      </>
    );
  };

  return (
    <Styled.FormContainer ref={containerRef} full={progress.current === 1}>
      {isLoading && loadingView()}
      <Styled.CloseButton onClick={onClose}>
        <Icon icon="material-symbols:close" />
      </Styled.CloseButton>
      <Styled.Title>
        {(progress.current === 1 ? preShowTitle : undefined) ||
          title ||
          (editMode ? t('addCardModal.updateTitle') : t('addCardModal.title'))}
      </Styled.Title>
      {(subtitle || !user) && (
        <Styled.SubtitleContainer>
          {subtitle && <Styled.Subtitle>{subtitle}</Styled.Subtitle>}
          {!user && (
            <Styled.LoginAlertText>
              {t('addCardModal.alreadyHaveAccount')}
              <HackleTrack
                hackleEvent={{
                  key: HACKLE_KEYS.CLICK.SPACE.CREATE_CARD_LOGIN,
                  properties: {
                    spaceId,
                  },
                }}
              >
                <Link
                  href={{
                    pathname: ROUTES.USER.SIGN_IN,
                    query: { url: router.asPath, register: true },
                  }}
                >
                  {t('addCardModal.login')}
                </Link>
              </HackleTrack>
            </Styled.LoginAlertText>
          )}
        </Styled.SubtitleContainer>
      )}
      {progress.current === 1 && renderPreShowStep()}
      {progress.current === 2 && renderFormStep()}
    </Styled.FormContainer>
  );
};

export default RegisterSpaceProfile;
