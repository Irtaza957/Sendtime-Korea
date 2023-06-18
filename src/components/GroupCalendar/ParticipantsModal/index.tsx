import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import { RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import {
  ButtonContent,
  Dot,
  ModalContents,
  ModalTitle,
  Name,
  NonModalContents,
  NonModalTitle,
  NonParticipantsContainer,
  Participant,
  Participants,
  ParticipantsContainer,
} from './index.styles';

interface ParticipantsModalProps {
  participants: GroupMember[];
  groupId: string;
}

const ParticipantsModal = ({
  participants,
  groupId,
}: ParticipantsModalProps) => {
  const router = useRouter();

  const goMakeReservation = () => {
    router.push(
      {
        pathname: `/group/${groupId}/new/reservation`,
        query: {
          participants: participants.map(({ memberId }) => memberId).join(','),
        },
      },
      `/group/${groupId}/new/reservation`
    );
  };

  const { t } = useTranslation('groupHome');

  return (
    <>
      {!participants.length ? (
        <NonParticipantsContainer>
          <NonModalTitle>{t('noSelectedMemberModal.title')}</NonModalTitle>
          <NonModalContents>
            {t('noSelectedMemberModal.subtitle')}
          </NonModalContents>
        </NonParticipantsContainer>
      ) : (
        <ParticipantsContainer>
          <div>
            <ModalTitle>{t('modal.title')}</ModalTitle>
            <ModalContents>{t('modal.subtitle')}</ModalContents>

            <Participants>
              {participants.map(({ name, color }, idx) => (
                <Participant key={idx}>
                  <Dot color={color} />
                  <Name>{name}</Name>
                </Participant>
              ))}
            </Participants>
          </div>

          <StyledButton
            withBorder
            borderColor="purple-500"
            bgColor="white"
            color="purple-500"
            borderRadius={50}
            padding="8px 12px"
            align="end"
            onClickButton={goMakeReservation}
          >
            <ButtonContent>
              {t('modal.continue')}
              <CustomIcon
                size={8}
                height={16}
                fill="none"
                stroke="purple-500"
                viewBox="0 0 8 14"
              >
                <RightArrow />
              </CustomIcon>
            </ButtonContent>
          </StyledButton>
        </ParticipantsContainer>
      )}
    </>
  );
};

export default ParticipantsModal;
