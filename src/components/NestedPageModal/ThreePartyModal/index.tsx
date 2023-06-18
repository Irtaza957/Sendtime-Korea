import React, { MouseEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { ThirdPartyAPI } from '@api/nestedPage/ThirdParty';
import StyledButton from '@components/Button';
import DateTimeSelect from '@components/DateTimeSelect';
import { DateTimeContainer } from '@components/DateTimeSelect/index.styles';
import Line from '@components/Line';
import { SubSection } from '@components/Reservation/Common';
import ToggleButton from '@components/ToggleButton';
import usePersonalInfo, {
  BookingPageNameType,
  PersonalInfoType,
} from '@hooks/inputs/usePersonalInfo';
import usePagination from '@hooks/usePagination';
import useTranslate from '@hooks/useTranslate';
import { Icon } from '@iconify/react';

import { BlockBox, FlexBox } from '../../../../styles/container/index.styles';
import {
  ButtonContainer,
  ContentContainer,
  HideButton,
  NestedModalContainer,
  NestedModalTitle,
  Page,
} from '../index.styles';

import {
  BlockText,
  Container,
  EmphasisWord,
  EndAlert,
  FontStyle,
  PersonalInfo,
  PreviewDescription,
  SubToggle,
  SubToggleContainer,
  ThreePartyPreview,
} from './index.styles';

interface ThirdPartyModalProps {
  hideModal: () => void;
  parentId: string;
  updatePage?: () => void;
  title: string;
}

type PersonalType = 'proposal' | 'finalizer';
type AlarmType = 'kakao' | 'email' | 'remind';
type AlarmInfoType = {
  [P in PersonalType]: {
    [K in AlarmType]: boolean;
  };
};
const LAST_PAGE = 3;
const ThirdPartyModal = ({
  parentId,
  hideModal,
  updatePage,
  title,
}: ThirdPartyModalProps) => {
  const { i18n } = useTranslate();
  const { page, goNextPage, goPrevPage } = usePagination(LAST_PAGE);
  const {
    BookinPageNameView: BookingView,
    bookingPageInfo: bookingInfo,
    handleBookingPageString: handleBookingPageString,
  } = usePersonalInfo();

  const {
    PersonalInfoView: ProposalView,
    personalInfo: proposalInfo,
    onChangeProposerStartDate: onChangeProposerSDate,
    onChangeProposerStartTime: onChangeProposerSTime,
  } = usePersonalInfo();
  const {
    PersonalInfoView: FinalizerView,
    personalInfo: finalizerInfo,
    onChangeProposerStartDate: onChangeAcceptorSDate,
    onChangeProposerStartTime: onChangeAcceptorSTime,
  } = usePersonalInfo();

  useEffect(() => {
    if (bookingInfo.bookingPageName.value === '') {
      handleBookingPageString(title);
    }
  }, [title]);

  const [alarm, setAlarm] = useState<AlarmInfoType>({
    proposal: { kakao: true, email: true, remind: true },
    finalizer: { kakao: true, email: true, remind: true },
  });

  const { mutate: createThirdPartyReservation } = useMutation(
    (params: CreateThirdPartyParams) => ThirdPartyAPI.create(params),
    {
      onSuccess: (data) => {
        hideModal();
        updatePage?.();
      },
      onError: () => {},
    }
  );

  const onToggleAlarm = (personalType: PersonalType, type: AlarmType) => {
    setAlarm((prev) => ({
      ...prev,
      [personalType]: {
        ...prev[personalType],
        [type]: !prev[personalType][type],
      },
    }));
  };

  const isButtonDisabled = () => {
    if (page === 1) {
      return (
        !proposalInfo.name.validated || !bookingInfo.bookingPageName.validated
      );
    }

    if (page === 2) {
      return !finalizerInfo.name.value;
    }

    return false;
  };

  const bookingNameInfo = (bookingPageInfo: BookingPageNameType) => {
    const info = [bookingPageInfo.bookingPageName.value];

    return `${info.filter((i) => !!i).join(' / ')}`;
  };

  const personInfo = (personalInfo: PersonalInfoType) => {
    const info = [
      personalInfo.name.value,
      personalInfo.organization.value,
      personalInfo.department,
      personalInfo.role,
    ];

    return `${info.filter((i) => !!i).join(' / ')}`;
  };

  const alarmInfo = (p: PersonalType) => {
    const info = [];

    if (alarm[p].email) info.push('메일');
    if (alarm[p].kakao) info.push('알림톡');
    if (alarm[p].remind) info.push('알림 추가 설정');

    return info.length ? (
      info.join(', ')
    ) : (
      <EmphasisWord>설정한 알림이 없습니다.</EmphasisWord>
    );
  };

  const proposalContactInfo = (personalInfo: PersonalInfoType) => {
    const info = [personalInfo.email.value, personalInfo.phone.value];

    return `${info.filter((i) => !!i).join(' / ')}`;
  };

  const addSlash = (info: PersonalInfoType) => {
    const contactInfo = proposalContactInfo(info);

    return contactInfo ? `${contactInfo} / ` : '';
  };
  const goNextStep = () => {
    if (page !== 3) {
      goNextPage();
      return;
    }

    const reservationInfo = {
      bookingPageName: bookingInfo.bookingPageName.value,
      reservationProposer: {
        name: proposalInfo.name.value,
        organization: proposalInfo.organization.value,
        role: proposalInfo.role,
        department: proposalInfo.department,
        phone: proposalInfo.phone.value,
        email: proposalInfo.email.value,
        locale: i18n.language,
        allowKakao: alarm.proposal.kakao,
        allowEmail: alarm.proposal.email,
        allowProposalRemind: alarm.proposal.remind,
        reminderStartDate: proposalInfo.reminderStartDate.value,
        reminderStartTime: proposalInfo.reminderStartTime.value,
      },
      reservationAcceptor: {
        name: finalizerInfo.name.value,
        phone: finalizerInfo.phone.value,
        email: finalizerInfo.email.value,
        locale: i18n.language,
        allowKakao: alarm.finalizer.kakao,
        allowEmail: alarm.finalizer.email,
        allowProposalRemind: alarm.finalizer.remind,
        reminderStartDate: finalizerInfo.reminderStartDate.value,
        reminderStartTime: finalizerInfo.reminderStartTime.value,
      },
    };

    createThirdPartyReservation({ uuid: parentId, ...reservationInfo });
  };

  return (
    <NestedModalContainer height={662}>
      <ButtonContainer>
        <HideButton onClick={hideModal}>
          <Icon
            icon="eva:close-outline"
            width="50"
            height="35"
            color="#A6B5C6"
          />
        </HideButton>
      </ButtonContainer>
      <ContentContainer>
        <Container justifyContent="space-between">
          <BlockBox gap={10} alignItems="flex-start">
            <NestedModalTitle>
              3자 일정 조율하기
              <Page>
                ({page}/{LAST_PAGE})
              </Page>
            </NestedModalTitle>

            {page === 1 && (
              <>
                <BlockBox padding="10px">
                  <SubSection subTitle="3자 조율 일정 이름" required>
                    {BookingView({
                      bookingPageName: { show: true, required: true },
                    })}
                  </SubSection>
                  <br />
                  <SubSection
                    subTitle="예약 제안자"
                    description="내 예약페이지를 먼저 받아 시간을 여러 개 제안할 사람의 정보를 입력해주세요. \n 이메일이나 전화번호를 입력하면, 예약 제안자에게 이메일 또는 카카오톡 알림이 자동 발송됩니다."
                  >
                    <br />
                    {ProposalView({
                      organization: { show: true, required: false },
                      department: { show: true, required: false },
                      role: { show: true, required: false },
                      phone: { show: true, required: false },
                      email: { show: true, required: false },
                    })}
                  </SubSection>
                  <Line />
                  <BlockBox gap={10} margin="10px 0">
                    <FlexBox justifyContent="space-between">
                      알림 설정
                      <SubToggle justifyContent="flex-end" gap={20}>
                        <SubToggleContainer>
                          이메일
                          <ToggleButton
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                              e.stopPropagation();
                              onToggleAlarm('proposal', 'email');
                            }}
                            active={alarm.proposal.email}
                          />
                        </SubToggleContainer>
                        <SubToggleContainer>
                          카카오톡
                          <ToggleButton
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                              e.stopPropagation();
                              onToggleAlarm('proposal', 'kakao');
                            }}
                            active={alarm.proposal.kakao}
                          />
                        </SubToggleContainer>
                      </SubToggle>
                    </FlexBox>
                    <Line />
                    <BlockBox gap={4}>
                      <FlexBox justifyContent="space-between">
                        알림 추가 설정
                        <ToggleButton
                          onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            onToggleAlarm('proposal', 'remind');
                          }}
                          active={alarm.proposal.remind}
                        />
                      </FlexBox>
                    </BlockBox>
                    <BlockBox gap={4}>
                      <SubSection subTitle="">
                        <FlexBox justifyContent="space-between">
                          <DateTimeContainer>
                            <DateTimeSelect
                              startDate={proposalInfo.reminderStartDate.value}
                              setStartDate={onChangeProposerSDate}
                              startTime={proposalInfo.reminderStartTime.value}
                              setStartTime={onChangeProposerSTime}
                              disabled={false}
                            />
                            <FontStyle>
                              까지 제안이 없으면 제안 요청 알림을 한번 더
                              발송합니다.
                            </FontStyle>
                          </DateTimeContainer>
                        </FlexBox>
                        {proposalInfo.reminderStartTime.validated === false &&
                          proposalInfo.reminderStartTime.alertMessage}
                      </SubSection>
                    </BlockBox>
                  </BlockBox>
                </BlockBox>
              </>
            )}

            {page === 2 && (
              <>
                <BlockBox padding="10px">
                  <SubSection
                    subTitle="예약 확정자"
                    description="제안받은 시간 옵션 중 하나를 선택해 예약을 최종 확정할 사람의 정보를 입력해주세요. \n 이메일이나 전화번호를 입력하면, 예약 확정자에게 이메일 또는 카카오톡 알림이 자동 발송됩니다."
                  >
                    <br />
                    {FinalizerView({
                      name: { show: true, required: true },
                      organization: { show: false },
                      department: { show: false },
                      role: { show: false },
                      phone: { show: true, required: false },
                      email: { show: true, required: false },
                    })}
                  </SubSection>
                  <Line />
                  <BlockBox gap={10} margin="10px 0">
                    <FlexBox justifyContent="space-between">
                      알림 설정
                      <SubToggle justifyContent="flex-end" gap={20}>
                        <SubToggleContainer>
                          이메일
                          <ToggleButton
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                              e.stopPropagation();
                              onToggleAlarm('finalizer', 'email');
                            }}
                            active={alarm.finalizer.email}
                          />
                        </SubToggleContainer>
                        <SubToggleContainer>
                          카카오톡
                          <ToggleButton
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                              e.stopPropagation();
                              onToggleAlarm('finalizer', 'kakao');
                            }}
                            active={alarm.finalizer.kakao}
                          />
                        </SubToggleContainer>
                      </SubToggle>
                    </FlexBox>
                    <Line />
                    <BlockBox>
                      <FlexBox justifyContent="space-between">
                        알림 추가 설정
                        <ToggleButton
                          onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            onToggleAlarm('finalizer', 'remind');
                          }}
                          active={alarm.finalizer.remind}
                        />
                      </FlexBox>
                    </BlockBox>
                    <BlockBox gap={4}>
                      <SubSection subTitle="">
                        <FlexBox justifyContent="space-between">
                          <DateTimeContainer>
                            <DateTimeSelect
                              startDate={finalizerInfo.reminderStartDate.value}
                              setStartDate={onChangeAcceptorSDate}
                              startTime={finalizerInfo.reminderStartTime.value}
                              setStartTime={onChangeAcceptorSTime}
                              disabled={false}
                            />
                            <FontStyle>
                              까지 확정이 없으면 확정 요청 알림을 한번 더
                              발송합니다.
                            </FontStyle>
                          </DateTimeContainer>
                        </FlexBox>
                        {finalizerInfo.reminderStartTime.validated === false &&
                          finalizerInfo.reminderStartTime.alertMessage}
                      </SubSection>
                    </BlockBox>
                  </BlockBox>
                </BlockBox>
              </>
            )}

            {page === 3 && (
              <BlockBox margin="20px 0">
                <PreviewDescription>
                  아래 내용으로 3자 일정 조율이 시작됩니다.
                </PreviewDescription>
                <ThreePartyPreview>
                  <BlockBox alignItems="flex-start">
                    <PersonalInfo>{bookingNameInfo(bookingInfo)}</PersonalInfo>
                    <BlockText>예약 제안자</BlockText>
                    <PersonalInfo>
                      {personInfo(proposalInfo)} {' / '}
                      {addSlash(proposalInfo)}
                      {alarmInfo('proposal')}
                    </PersonalInfo>
                  </BlockBox>
                  <BlockBox alignItems="flex-start">
                    <BlockText>예약 확정자</BlockText>
                    <PersonalInfo>
                      {personInfo(finalizerInfo)} {' / '}
                      {addSlash(finalizerInfo)}
                      {alarmInfo('finalizer')}
                    </PersonalInfo>
                  </BlockBox>
                </ThreePartyPreview>

                <EndAlert>
                  3자 일정 조율을 시작하면{' '}
                  <EmphasisWord>
                    제안자와 확정자 정보 수정이 불가능
                  </EmphasisWord>
                  합니다. <br />
                  수정 필요 시에 3자 일정 조율 예약페이지를{' '}
                  <EmphasisWord>삭제 후 재생성</EmphasisWord>해주세요.
                </EndAlert>
              </BlockBox>
            )}
          </BlockBox>
          <FlexBox justifyContent="space-between" margin="15px 0 0 0">
            {page !== 1 ? (
              <StyledButton
                padding="12px 38px"
                borderRadius={10}
                onClickButton={() => goPrevPage()}
                color="gray-800"
                bgColor="white"
                withBorder
              >
                이전
              </StyledButton>
            ) : (
              <div />
            )}
            <StyledButton
              padding="12px 38px"
              borderRadius={10}
              disabled={isButtonDisabled()}
              onClickButton={goNextStep}
            >
              {page !== 3 ? '다음' : '시작하기'}
            </StyledButton>
          </FlexBox>
        </Container>
      </ContentContainer>
    </NestedModalContainer>
  );
};

export default ThirdPartyModal;
