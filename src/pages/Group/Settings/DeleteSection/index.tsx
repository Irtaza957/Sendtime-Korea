import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { groupCalendarAPI } from '@api/group/calendar/GroupCalendar';
import StyledButton from '@components/Button';
import { SubSection } from '@components/Reservation/Common';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { Section, SectionTitle } from '@pages/MyPage/index.styles';

import { Delete } from './index.styles';

interface DeleteSectionProps {
  groupId: string;
}

const DeleteSection = ({ groupId }: DeleteSectionProps) => {
  const router = useRouter();
  const { t: tGroupCalendarListPage } = useTranslation('groupCalendarListPage');
  const { t } = useTranslation('groupSettingPage');

  const { showModal: showDeleteModal, hideModal: hideDeleteModal } =
    useNestedModal({
      type: 'delete',
      title: tGroupCalendarListPage('message.deleteWarning.title'),
      description: tGroupCalendarListPage('message.deleteWarning.description'),
    });

  const { mutate: deleteGroup } = useMutation(
    () => groupCalendarAPI.deleteGroup(groupId),
    {
      onSuccess: async () => {
        await hideDeleteModal();
        router.push(ROUTES.GROUP.MANAGE);
      },
      onError: (e: { message: string }) => {
        alert(e.message);
        hideDeleteModal();
      },
    }
  );

  const handleDelete = async () => {
    const isValidated = await showDeleteModal(async () => {
      try {
        deleteGroup();
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  };

  return (
    <Section gap={40} padding="40px">
      <SectionTitle>{t('delete.title')}</SectionTitle>

      <Delete>
        <SubSection
          subTitle={t('delete.title')}
          description={t('delete.subtitle')}
        />
        <StyledButton bgColor="alert" onClickButton={handleDelete}>
          {t('delete.btn')}
        </StyledButton>
      </Delete>
    </Section>
  );
};

export default DeleteSection;
