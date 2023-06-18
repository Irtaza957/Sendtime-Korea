import React, { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { ThirdPartyAPI } from '@api/nestedPage/ThirdParty';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useCopy from '@hooks/useCopy';
import { More, PageLink } from '@Icon/Icons/Utils';
import CustomIcon from '@Icon/index';
import { ModalContent } from '@pages/Group/Manage/MoreButtonWithModal';

import {
  BlockBox,
  FlexBox,
} from '../../../../../styles/container/index.styles';
import {
  ButtonsContainer,
  FooterButton,
  ReservationFooter,
  ReservationHeader,
  ReservationTitle,
} from '../index.styles';
import MoreMenu from '../MoreMenu';

import {
  PersonalInfo,
  PersonalType,
  ThirdPartyDelete,
  ThirdPartyItemContainer,
} from './index.styles';

interface ThirdPartyItemProps
  extends Omit<
    MyReservationThirdPersonPage,
    'id' | 'reservationPageName' | 'bookingPageName'
  > {
  uuid: string;
  thirdPartyPageId: string;
  title: string;
  onClickNestedMoreButton: (e: MouseEvent<HTMLButtonElement>) => void;
  isThirdPartyMoreMenuOpen: boolean;
  closeNestedMoreMenu?: () => void;
  refetch?: () => void;
}

const ThirdPartyItem = ({
  thirdPartyPageId,
  uuid,
  title,
  onClickNestedMoreButton,
  isThirdPartyMoreMenuOpen,
  closeNestedMoreMenu,
  refetch,
  ...rest
}: ThirdPartyItemProps) => {
  const router = useRouter();
  const { copyLink } = useCopy();

  const { showModal: showDeleteModal, hideModal: hideDeleteModal } =
    useNestedModal({
      type: 'delete',
      title: '해당 페이지를 삭제하시겠습니까?',
      description: (
        <ThirdPartyDelete>
          {`삭제 후 예약페이지에 접근할 수 없으며
          접수된 예약의 확정/변경/취소 역시 불가능합니다.`}
        </ThirdPartyDelete>
      ),
    });

  const { mutate: deletePage, isLoading: isDeleteLoading } = useMutation(
    ({ uuid, thirdPartyPageId }: DeleteThirdPartyParams) =>
      ThirdPartyAPI.delete({ uuid, thirdPartyPageId }),
    {
      onSuccess: ({ data }) => refetch?.(),
    }
  );

  const modalContents: ModalContent[] = [
    {
      content: '페이지 삭제',
      alert: true,
      onClickContent: async () => {
        const isValidated = await showDeleteModal(async () => {
          try {
            deletePage({ uuid, thirdPartyPageId });
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
    router.push({
      pathname: `/reservation`,
      query: { i: uuid, tp: thirdPartyPageId },
    });
  };

  const handleCopyUrl = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    copyLink({
      url: `/reservation?i=${uuid}&tp=${thirdPartyPageId}`,
    });
  };

  const personalInfo = (
    type: 'reservationProposer' | 'reservationAcceptor'
  ) => {
    if (!rest) return;
    const info = [rest[type].name, rest[type].email, rest[type].phone].filter(
      (i) => !!i
    );

    return `${info.join(' / ')} /`;
  };

  const alarmInfo = (type: 'reservationProposer' | 'reservationAcceptor') => {
    if (!rest) return;

    const alarms = [];

    if (rest[type].allowEmail) alarms.push('메일');
    if (rest[type].allowKakao) alarms.push('알림톡');
    if (rest[type].allowProposalRemind) alarms.push('알림 추가 설정');

    if (!alarms.length) return ' 알림 발송 안함';

    return ` ${alarms.join(', ')}`;
  };

  const proposalType = () => {
    if (!rest) return;
    switch (rest.reservationProposer.status) {
      case 'SEND_SUCCEEDED':
        return <PersonalType type="statusConfirmed">발송 완료</PersonalType>;
      case 'SEND_FAILED':
        return <PersonalType type="status">발송 실패</PersonalType>;
      case 'REQUEST_COMPLETED':
        return <PersonalType type="statusConfirmed">제안 완료</PersonalType>;
      case 'SEND_UNABLE':
        return <PersonalType type="status">알림 발송 안함</PersonalType>;
      case 'READY':
        return <PersonalType type="status">발송 대기</PersonalType>;

      default:
        return '';
    }
  };

  const acceptorType = () => {
    if (!rest) return;
    switch (rest.reservationAcceptor.status) {
      case 'WAITING':
        return '확정 대기중';
      case 'SEND_FAILED':
        return '발송 실패';
      case 'NEEDS_CONFIRMATION':
        return '확정 요청중';
      case 'CONFIRMED':
        return '확정 완료';
      case 'SEND_UNABLE':
        return '알림 발송 안함';
      default:
        return '';
    }
  };

  return (
    <ThirdPartyItemContainer onClick={navigateToReservationPage} isActive>
      <ReservationHeader isToggleButtonOn>
        <ReservationTitle>{title}</ReservationTitle>

        <button onClick={onClickNestedMoreButton}>
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
        {isThirdPartyMoreMenuOpen && (
          <MoreMenu
            modalContents={modalContents}
            teamId={uuid}
            close={closeNestedMoreMenu}
          />
        )}
      </ReservationHeader>
      <BlockBox gap={5}>
        <FlexBox justifyContent="flex-start" gap={5}>
          <PersonalType>예약 제안자</PersonalType>
          {proposalType()}
          <PersonalInfo>
            {personalInfo('reservationProposer')}
            {alarmInfo('reservationProposer')}
          </PersonalInfo>
        </FlexBox>

        <FlexBox justifyContent="flex-start" gap={5}>
          <PersonalType>예약 확정자</PersonalType>
          <PersonalType type="status">{acceptorType()}</PersonalType>
          <PersonalInfo>
            {personalInfo('reservationAcceptor')}
            {alarmInfo('reservationAcceptor')}
          </PersonalInfo>
        </FlexBox>
      </BlockBox>
      <ReservationFooter>
        <ButtonsContainer isToggleButtonOn>
          <FooterButton onClick={handleCopyUrl}>
            <CustomIcon size={16} height={16} stroke="none" fill="gray-700">
              <PageLink />
            </CustomIcon>
            <span>URL 복사</span>
          </FooterButton>
          {/* <FooterButton onClick={handleCopyUrl}>
            <CustomIcon size={16} height={16} stroke="none" fill="gray-700">
              <PageLink />
            </CustomIcon>
            <span>추가 메시지</span>
          </FooterButton> */}
        </ButtonsContainer>
      </ReservationFooter>
    </ThirdPartyItemContainer>
  );
};

export default ThirdPartyItem;
