import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { Box } from '@components/Reservation/index.styles';
import SideAreaContainer from '@components/SideAreaContainer';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { BASE_URL } from '@constants/baseUrl';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useGroup from '@hooks/useGroup';
import GroupInvitation from '@pages/Group/Invitation';
import { makeQueryString } from '@utils/etc';

import {
  CompleteContainer,
  CompletedTitle,
  Container,
  Content,
} from '../../../ReservationCompleted/index.styles';

const GroupNewReservationCompleted = () => {
  const router = useRouter();
  const { edit, groupId } = router.query;
  const { group } = useGroup({ groupId });
  const { t } = useTranslation('createGroupComplete');

  const { showModal, hideModal } = useNestedModal({
    type: 'custom',
    customModal: (
      <GroupInvitation
        groupId={makeQueryString(groupId)}
        handleClose={() => hideModal()}
      />
    ),
  });

  const handleInvitation = () => {
    showModal();
  };

  return (
    <WithSidebarComponent>
      <SideAreaContainer>
        <CompleteContainer>
          <Container gap={35}>
            <ImageContainer width={150}>
              <AutoHeightImage
                src={`${BASE_URL.image}/icons/new_done.gif`}
                alt="sendtime-logo"
              />
            </ImageContainer>

            <CompletedTitle>
              {group?.teamName}{' '}
              {edit ? t('editCompleteTitle') : t('createCompleteTitle')}
            </CompletedTitle>

            <Content>{t('subtitle')}</Content>

            <Box gap={10} flex>
              <StyledButton
                onClickButton={() => {
                  if (groupId !== 'undefined') {
                    router.push(`${ROUTES.GROUP.MAIN}/${groupId}`);
                    return;
                  }

                  router.push(ROUTES.GROUP.MANAGE);
                }}
                padding="15px 20px"
              >
                {t('moveToGroup')}
              </StyledButton>
              <StyledButton
                onClickButton={handleInvitation}
                padding="15px 20px"
              >
                {t('invite')}
              </StyledButton>
            </Box>
          </Container>
        </CompleteContainer>
      </SideAreaContainer>
    </WithSidebarComponent>
  );
};

export default GroupNewReservationCompleted;
