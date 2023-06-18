import React from 'react';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { groupManageAPI } from '@api/group/invitation/Invitation';
import StyledButton from '@components/Button';
import WhiteButton from '@components/Button/WhiteButton';
import { SubContent } from '@components/MyPageSubComponents';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useMainInput from '@hooks/inputs/useMainInput';
import usePlusInput from '@hooks/inputs/usePlusInput';
import useLoading from '@hooks/useLoading';
import { Plus, RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import {
  Section,
  SectionDescription,
  SectionTitle,
} from '@pages/MyPage/index.styles';

import {
  Buttons,
  GapBox,
  GroupInvitationContainer,
  InvitationTitle,
  InviteTitleArea,
  PeopleContainer,
} from './index.styles';

const inputs = [
  {
    value: i18next.t('memberInvitePage:input.name.value'),
    placeholder: i18next.t('memberInvitePage:input.name.placeholder'),
    required: true,
  },
  {
    value: i18next.t('memberInvitePage:input.email.value'),
    placeholder: 'help@splab.dev',
    required: true,
  },
];

interface GroupInvitationProps {
  groupId: string;
  handleClose: () => void;
}

const GroupInvitation = ({ groupId, handleClose }: GroupInvitationProps) => {
  const router = useRouter();
  const { t } = useTranslation('memberInvitePage');

  const { PlusInput, inputList, isValid, makeInput } = usePlusInput(inputs);
  const { DescriptionView, description } = useMainInput({});
  const { loadingView } = useLoading();
  const { showModal } = useNestedModal({
    type: 'alert',
    title: t('modal.title'),
    description: t('modal.description'),
    buttonText: { alert: t('modal.btn') },
    blockDimmerClick: true,
  });

  const values: string[][] = [];

  inputList.forEach((input) => {
    const inputs = input.map((i) => i.value);
    values.push(inputs);
  });

  const invitees: TeamMemberInvitationType[] = values.map((v) => ({
    memberName: v[0],
    email: v[1],
    customFields: [],
  }));

  const { mutate: inviteMember, isLoading } = useMutation(
    () =>
      groupManageAPI.inviteMember(
        {
          invitationMemo: description,
          inviteMembers: invitees,
        },
        groupId
      ),
    {
      onSuccess: async () => {
        await showModal();
        const url = ROUTES.GROUP.PARTICIPANTS.replace('[groupId]', groupId);
        router.push(url);

        handleClose();
      },
      onError: () => {},
    }
  );
  const handleInvitation = async () => {
    inviteMember();
  };

  return (
    <GroupInvitationContainer>
      {isLoading && loadingView()}
      <Section gap={30}>
        <GapBox gap={20}>
          <div>
            <SectionTitle>{t('title')}</SectionTitle>
            <SectionDescription>{t('subtitle')}</SectionDescription>
          </div>

          <SubContent title="">
            {DescriptionView({ label: t('inviteMessage') })}
          </SubContent>
        </GapBox>

        <GapBox gap={20}>
          <InviteTitleArea>
            <InvitationTitle>
              {t('list.title')} ({inputList.length}
              {t('list.numberOfPeople')})
            </InvitationTitle>
            <WhiteButton
              color="purple-500"
              buttonText={
                <>
                  <CustomIcon
                    size={14}
                    height={10}
                    viewBox="0 -2 12 16"
                    scale={1.4}
                    fill="purple-500"
                    stroke="none"
                  >
                    <Plus />
                  </CustomIcon>
                  {t('list.add')}
                </>
              }
              onClick={makeInput}
            />
          </InviteTitleArea>
          <PeopleContainer>{PlusInput()}</PeopleContainer>
        </GapBox>

        <Buttons>
          <WhiteButton onClick={handleClose} />
          <StyledButton
            borderRadius={50}
            disabled={!isValid}
            onClickButton={handleInvitation}
          >
            {t('btn.confirm')}
            <CustomIcon
              size={8}
              height={16}
              fill="none"
              stroke="white"
              viewBox="0 0 8 14"
            >
              <RightArrow />
            </CustomIcon>
          </StyledButton>
        </Buttons>
      </Section>
    </GroupInvitationContainer>
  );
};

export default GroupInvitation;
