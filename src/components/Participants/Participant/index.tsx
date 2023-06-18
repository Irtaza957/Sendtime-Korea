import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { ModalContent } from 'pages/Group/Manage/MoreButtonWithModal';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import { groupManageAPI } from '@api/group/invitation/Invitation';
import { coreUserState } from '@atoms/index';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useSnackbar from '@hooks/useSnackbar';
import { Icon } from '@iconify/react';
import { ModalDefault } from '@pages/Group/Manage';
import MoreButtonWithModal from '@pages/Group/Manage/MoreButtonWithModal';
import MainInfo from '@pages/Group/Participation/MainInfo';

import {
  BottomField,
  Category,
  DetailInfo,
  Field,
  Fields,
  InvitationButton,
  Message,
  MyProfile,
  NameField,
  ParticipantContainer,
  Profile,
  ProfileName,
} from './index.styles';

export interface ParticipantsType {
  memberId: string;
  memberName: string;
  email: string;
  color: string;
  phone?: string;
  memo?: string;
  status?: string;
  customFields: { label: string; value: string }[];
  invite?: boolean;
}

interface ParticipantProps extends ParticipantsType {
  groupId: string;
  modalIdx: number;
  modalDefault: ModalDefault[];
  setModalDefault: Dispatch<SetStateAction<ModalDefault[]>>;
  refetch?: () => void;
}

const Participant = ({
  groupId,
  modalDefault,
  modalIdx,
  setModalDefault,
  memberId,
  memberName,
  email,
  color,
  phone,
  memo,
  status,
  invite = false,
  customFields,
  refetch,
  ...rest
}: ParticipantProps) => {
  const user = useRecoilValue(coreUserState);
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const myInfo =
    memberId === user?.id
      ? { memberName, email, phone, memo, customFields }
      : undefined;
  const { showModal, hideModal } = useNestedModal({
    type: 'custom',
    customModal: (
      <MainInfo
        hideModal={() => hideModal()}
        groupId={groupId}
        edit
        myInfo={myInfo}
      />
    ),
  });
  const { t } = useTranslation('memberSettingPage');
  const { showModal: showDeleteModal, hideModal: hideDeleteModal } =
    useNestedModal({
      type: 'delete',
      title: t('modal.cancelInvite.title'),
      description: t('modal.cancelInvite.subtitle'),
      buttonText: { delete: t('modal.cancelInvite.btn') },
    });

  const { showModal: showLeaveModal, hideModal: hideLeaveModal } =
    useNestedModal({
      type: 'delete',
      title: t('modal.leaveGroup.title'),
      description: t('modal.leaveGroup.subtitle'),
      buttonText: { delete: t('modal.leaveGroup.btn') },
    });

  const { mutate: deleteInvitee } = useMutation(
    () => groupManageAPI.deleteInvitee(groupId, memberId),
    {
      onSuccess: () => {
        refetch?.();
      },
    }
  );

  const handleDeleteInvitation = async () => {
    const isValidated = await showDeleteModal(async () => {
      try {
        deleteInvitee();
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    });

    if (isValidated) {
      hideDeleteModal();
      refetch?.();
    }
  };

  const handleClick = () => {
    if (invite) return;

    setShowMore((prev) => !prev);
  };

  const { mutate: leaveTeam } = useMutation(
    () => groupManageAPI.leaveGroup(groupId),
    {
      onSuccess: () => {},
      onError: ({ message }) => {
        alert(message);
      },
    }
  );

  const modalContents: ModalContent[] = [
    {
      content:
        memberId === user?.id
          ? t('modal.memberStatus.leave')
          : t('modal.memberStatus.remove'),
      alert: true,
      onClickContent: async (memberId: string) => {
        const isValidated = await showLeaveModal(async () => {
          try {
            leaveTeam();
            return true;
          } catch (e) {
            console.error(e);
            return false;
          }
        });

        if (isValidated) {
          hideLeaveModal();
          router.push(ROUTES.GROUP.MANAGE);
          showSnackbar({ message: t('message.leftGroup') });
        }
      },
    },
  ];
  const myModalContents = [
    {
      content: t('editMyInfo'),
      alert: false,
      onClickContent: async (teamId: string) => {
        await showModal();
        refetch?.();
      },
    },
    ...modalContents,
  ];

  const detail = () => {
    if (status === 'PENDING') {
      return t('modal.memberStatus.pending');
    }

    if (status === 'EXPIRED') {
      return t('modal.memberStatus.invitationExpire');
    }

    return status;
  };

  return (
    <ParticipantContainer onClick={handleClick}>
      <MyProfile>
        <NameField>
          <Profile color={color || 'var(--purple-400)'}>
            {memberName[0]}
          </Profile>
          <ProfileName>{memberName}</ProfileName>
          {status && <DetailInfo>{detail()}</DetailInfo>}
        </NameField>

        {/* 다른 사람들 그룹 내보내기는 이후 오픈될 예정 */}
        {!invite && memberId === user?.id && (
          <MoreButtonWithModal
            targetId={memberId}
            modalIdx={modalIdx}
            modalContents={
              memberId === user?.id ? myModalContents : modalContents
            }
            modalDefault={modalDefault}
            setModalDefault={setModalDefault}
          />
        )}
      </MyProfile>

      <Fields>
        <Field>
          <Icon icon="ic:round-email" width={15} color="#8f98a3" />
          {email}
        </Field>
        <Field>
          <Icon icon="clarity:phone-handset-solid" width={15} color="#8f98a3" />
          {phone}
        </Field>
      </Fields>
      <Fields>
        {/* {Object.entries(rest).map((r: string[], idx: number) => (
          <Field key={idx}>
            <Category>{r[0]}</Category>: {r[1]}
          </Field>
        ))} */}
        {customFields &&
          customFields.map(({ label, value }, idx: number) => (
            <Field key={idx}>
              <Category>{label}</Category>: {value}
            </Field>
          ))}
      </Fields>

      {invite ? (
        <InvitationButton onClick={handleDeleteInvitation}>
          {t('modal.cancelInvite.btn')}
        </InvitationButton>
      ) : (
        <>
          {memo && (
            <div>
              <Fields paddingLeft={0} className={showMore ? 'show' : 'hide'}>
                <Message>{memo}</Message>
              </Fields>
              <BottomField>
                {showMore ? (
                  <Icon icon="bxs:up-arrow" color="#8f98a3" width={12} />
                ) : (
                  <Icon icon="bxs:down-arrow" color="#8f98a3" width={12} />
                )}
              </BottomField>
            </div>
          )}
        </>
      )}
    </ParticipantContainer>
  );
};

export default Participant;
