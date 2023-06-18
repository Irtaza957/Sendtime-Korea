import React, { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { nestedAPI } from '@api/nestedPage/NestedPage';
import {
  ChangeNestedActivateStatusParams,
  reservationAPI,
} from '@api/personal/reservation/Reservation';
import NestedPageModal from '@components/NestedPageModal';
import ToggleButton from '@components/ToggleButton';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useCopy from '@hooks/useCopy';
import { More, PageLink } from '@Icon/Icons/Utils';
import CustomIcon from '@Icon/index';
import { ModalContent } from '@pages/Group/Manage/MoreButtonWithModal';

import {
  ButtonsContainer,
  CustomModalContainer,
  FooterButton,
  ModalContentBox,
  ReservationFooter,
  ReservationHeader,
  ReservationTitle,
  ToggleContainer,
} from '../index.styles';
import MoreMenu from '../MoreMenu';

import { NestedItemContainer } from './index.styles';

interface NestedItemProps {
  uuid: string;
  customPageId: string;
  isActive: boolean;
  title: string;
  description?: string;
  questions: IFormQuestion[];
  answers: AnswerType[];
  onClickNestedMoreButton: (e: MouseEvent<HTMLButtonElement>) => void;
  isNestedMoreMenuOpen: boolean;
  closeNestedMoreMenu?: () => void;
  refetch?: () => void;
}

const NestedItem = ({
  customPageId,
  isActive,
  uuid,
  title,
  description,
  questions,
  answers,
  onClickNestedMoreButton,
  isNestedMoreMenuOpen,
  closeNestedMoreMenu,
  refetch,
}: NestedItemProps) => {
  const { t } = useTranslation('eventHistoryPage');
  const { copyLink } = useCopy();
  const router = useRouter();
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
      buttonText: {
        confirm: t('message.confirm.btn'),
      },
    });
  const { showModal: showEditModal, hideModal: hideEditModal } = useNestedModal(
    {
      type: 'custom',
      customModal: (
        <NestedPageModal
          parentId={uuid}
          pageTitle={title}
          pageDescription={description}
          questions={questions}
          answers={answers}
          hideModal={() => hideEditModal()}
          updatePage={refetch}
          customPageId={customPageId}
          edit
        />
      ),
    }
  );

  const { mutate: deletePage, isLoading: isDeleteLoading } = useMutation(
    ({ customPageId }: DeleteNestedPageParams) =>
      nestedAPI.delete({ customPageId }),
    {
      onSuccess: ({ data }) => {
        refetch?.();
      },
    }
  );

  const { mutate: changeNestedActivateStatus } = useMutation(
    ({ id, customPageId, active }: ChangeNestedActivateStatusParams) =>
      reservationAPI.changeNestedActivateStatus({ id, customPageId, active }),
    {
      onSuccess: ({ data }) => {
        refetch?.();
      },
    }
  );

  const onToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isActive) {
      const isValidated = await showDisableModal(async () => {
        try {
          changeNestedActivateStatus({
            id: uuid,
            customPageId,
            active: !isActive,
          });
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
          changeNestedActivateStatus({
            id: uuid,
            customPageId,
            active: !isActive,
          });

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

  const modalContents: ModalContent[] = [
    {
      content: t('editBtn'),
      onClickContent: () => {
        showEditModal();
      },
    },
    {
      content: t('deleteBtn'),
      alert: true,
      onClickContent: async () => {
        const isValidated = await showDeleteModal(async () => {
          try {
            deletePage({ customPageId });
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

  const navigateToReservationPage = () => {
    if (!isActive) return;

    router.push({
      pathname: `/reservation`,
      query: { i: uuid, cp: customPageId },
    });
  };

  const handleCopyUrl = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    copyLink({
      url: `/reservation?i=${uuid}&cp=${customPageId}`,
    });
  };

  return (
    <NestedItemContainer
      onClick={navigateToReservationPage}
      isActive={isActive}
    >
      <ReservationHeader isToggleButtonOn={isActive}>
        <ReservationTitle>{title}</ReservationTitle>
        <button onClick={onClickNestedMoreButton} disabled={!isActive}>
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
        {isNestedMoreMenuOpen && (
          <MoreMenu
            modalContents={modalContents}
            teamId={uuid}
            close={closeNestedMoreMenu}
          />
        )}
      </ReservationHeader>
      <ReservationFooter>
        <ButtonsContainer isToggleButtonOn={isActive}>
          <FooterButton disabled={!isActive} onClick={handleCopyUrl}>
            <CustomIcon size={16} height={16} stroke="none" fill="gray-700">
              <PageLink />
            </CustomIcon>
            <span>{t('URLcopy')}</span>
          </FooterButton>
        </ButtonsContainer>
        <ToggleContainer>
          {t('activate')}
          <ToggleButton onClick={onToggle} active={isActive} />
        </ToggleContainer>
      </ReservationFooter>
    </NestedItemContainer>
  );
};

export default NestedItem;
