import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { GroupKeys, groupManageAPI } from '@api/group/invitation/Invitation';
import { coreUserState } from '@atoms/index';
import StyledButton from '@components/Button';
import { SubSection } from '@components/Reservation/Common';
import TextInput from '@components/TextInput';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useMainInput from '@hooks/inputs/useMainInput';
import useGroup from '@hooks/useGroup';
import useLoading from '@hooks/useLoading';
import { Icon } from '@iconify/react';
import { GridBox } from '@pages/GuestReservation/common.styles';

import { HideButton, MyInfoBox, ParticipantsContent } from '../index.styles';

type defaultInfoType = {
  invitationMessage: string;
  attendeeInfo: {
    [x: string]: { value: string; required: boolean };
  };
};

interface MainInfoProps {
  edit?: boolean;
  hideModal?: () => void;
  groupId: string;
  isNew?: string | string[];
  myInfo?: {
    memberName: string;
    email: string;
    phone?: string;
    memo?: string;
    customFields?: CustomFieldType[];
  };
}
const MainInfo = ({
  edit = false,
  hideModal,
  groupId,
  myInfo,
  isNew,
}: MainInfoProps) => {
  const user = useRecoilValue(coreUserState);
  const { group } = useGroup({ groupId });
  const [customFieldSettings, setCustomFieldSettings] = useState<
    CustomFieldSettingsType[] | null
  >(null);
  const router = useRouter();
  const { loadingView } = useLoading();
  const [participantInfo, setParticipantInfo] = useState<defaultInfoType>({
    invitationMessage: myInfo?.memo || '',
    attendeeInfo: {
      name: { value: myInfo?.memberName ?? user?.name ?? '', required: true },
      phone: { value: myInfo?.phone ?? user?.phone ?? '', required: false },
    },
  });

  const { description, DescriptionView } = useMainInput({
    defaultDescription: myInfo?.memo,
  });

  useEffect(() => {
    setParticipantInfo((prev) => ({ ...prev, invitationMessage: description }));
  }, [description]);
  const { t } = useTranslation('memberSettingPage');

  const { showModal: showConfirmModal, hideModal: hideConfirmModal } =
    useNestedModal({
      type: 'alert',
      title: t('editModal.saveSuccess.title'),
      description: t('editModal.saveSuccess.subtitle'),
    });

  const { isLoading } = useQuery(
    GroupKeys.getGroupInfo(groupId),
    () => groupManageAPI.getGroupInfo(groupId),
    {
      onSuccess: ({ data: { results } }) => {
        const settingsInfo = results[0].customFieldSettings;

        const result = settingsInfo?.reduce((obj, cur) => {
          const t = myInfo?.customFields?.find(
            ({ label }) => label === cur.label
          );

          return {
            ...obj,
            [cur.label]: { value: t?.value || '', required: cur.required },
          };
        }, {});

        const defaultInfo: defaultInfoType = {
          invitationMessage: myInfo?.memo ?? '',
          attendeeInfo: {
            name: { value: myInfo?.memberName ?? '', required: true },
            phone: { value: myInfo?.phone ?? '', required: false },
            ...result,
          },
        };

        setCustomFieldSettings(settingsInfo);
        setParticipantInfo(defaultInfo);
      },
      enabled: !!groupId,
    }
  );

  const customFields = Object.entries(participantInfo.attendeeInfo)
    .filter(([k, _]) => k !== 'name' && k !== 'phone')
    .map(([label, { value }]) => ({ label, value }));

  const { mutate: participate } = useMutation(
    () =>
      groupManageAPI.participate(
        {
          email: myInfo?.email ?? user?.email ?? '',
          phone: participantInfo.attendeeInfo.phone.value,
          memberName: participantInfo.attendeeInfo.name.value,
          customFields,
          memo: participantInfo.invitationMessage,
        },
        groupId
      ),
    {
      onSuccess: async () => {
        await showConfirmModal();
        hideConfirmModal();

        if (isNew) {
          router.push({
            pathname: ROUTES.ONBOARDING.INIT,
            query: { groupId },
          });
          return;
        }

        router.push(ROUTES.MY_CALENDAR);
      },
    }
  );

  const { mutate: editMyInfo } = useMutation(
    () =>
      groupManageAPI.editMyInfo(
        {
          memberName: participantInfo.attendeeInfo.name.value,
          email: myInfo?.email ?? '',
          phone: participantInfo.attendeeInfo.phone.value,
          customFields: customFields,
          memo: participantInfo.invitationMessage,
        },
        groupId
      ),
    {
      onSuccess: async () => {
        await showConfirmModal();
        hideModal?.();
      },
    }
  );

  const handleCustomField = (
    e: ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    setParticipantInfo((prev) => ({
      ...prev,
      attendeeInfo: {
        ...prev.attendeeInfo,
        [label]: { ...prev.attendeeInfo[label], value: e.target.value },
      },
    }));
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setParticipantInfo((prev) => ({
      ...prev,
      attendeeInfo: {
        ...prev.attendeeInfo,
        name: { ...prev.attendeeInfo.name, value: e.target.value },
      },
    }));
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setParticipantInfo((prev) => ({
      ...prev,
      attendeeInfo: {
        ...prev.attendeeInfo,
        phone: { ...prev.attendeeInfo.phone, value: e.target.value },
      },
    }));
  };

  const isRequired = Object.values(participantInfo.attendeeInfo).filter(
    ({ required }) => required
  );
  const isValid = isRequired.every(({ value }) => !!value);

  if (isLoading || customFieldSettings === null) return <>{loadingView()}</>;

  return (
    <ParticipantsContent>
      {hideModal && (
        <HideButton onClick={hideModal}>
          <Icon
            icon="eva:close-outline"
            width="50"
            height="35"
            color="#A6B5C6"
          />
        </HideButton>
      )}

      {!edit && (
        <SubSection subTitle={t('groupName')}>
          <TextInput
            value={group?.teamName ?? ''}
            onChange={() => {}}
            inputPadding={5}
            disabled
          />
        </SubSection>
      )}

      <SubSection
        subTitle={`${
          edit ? t('editModal.title') : t('editModal.notEditingModeTitle')
        }`}
        description={t('editModal.subtitle')}
      />

      <MyInfoBox edit={edit}>
        <GridBox>
          <TextInput
            label={t('editModal.name')}
            value={participantInfo.attendeeInfo.name.value}
            onChange={handleName}
            inputPadding={5}
            required
          />
          {edit && (
            <TextInput
              label={t('editModal.phone')}
              value={participantInfo.attendeeInfo.phone.value}
              onChange={handlePhone}
              inputPadding={5}
            />
          )}
          <TextInput
            label={t('editModal.email')}
            value={myInfo?.email || user?.email || ''}
            onChange={() => {}}
            inputPadding={5}
            disabled
            required
          />
          {(customFieldSettings ?? []).map(({ label, required }, idx) => (
            <TextInput
              key={idx}
              label={label}
              value={participantInfo.attendeeInfo[label]?.value}
              onChange={(e) => handleCustomField(e, label)}
              inputPadding={5}
              required={required}
            />
          ))}
        </GridBox>
      </MyInfoBox>

      <SubSection
        subTitle={t('editModal.memoTitle')}
        description={t('editModal.memoSubtitle')}
      >
        {DescriptionView({})}
      </SubSection>

      <StyledButton
        onClickButton={edit ? () => editMyInfo() : () => participate()}
        padding="15px 20px"
        disabled={!isValid}
      >
        {edit ? t('editModal.save') : t('editModal.join')}
      </StyledButton>
    </ParticipantsContent>
  );
};

export default MainInfo;
