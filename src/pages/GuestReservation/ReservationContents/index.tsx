import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import StyledButton from '@components/Button';
import Line from '@components/Line';
import { FileUploadErrorModal } from '@components/pages/NewReservation/FormConfigPage/FileUploadErrorModal/index';
import FormQuestion from '@components/pages/NewReservation/FormConfigPage/FormQuestion';
import LeftSidebar from '@components/pages/reservationContent/LeftSidebar';
import RadioButton from '@components/RadioButton';
import TextInput from '@components/TextInput';
import { getIcon } from '@constants/images';
import { GuestInfoType } from '@contexts/GuestReservationProvider';
import useDebounce from '@hooks/useDebounce';
import useGuestUserInfo from '@hooks/useGuestUserInfo';
import useLoading from '@hooks/useLoading';
import useTranslate from '@hooks/useTranslate';
import { RightArrow } from '@Icon//Icons';
import { LeftArrow } from '@Icon/Icons/Utils';
import CustomIcon from '@Icon/index';
import { translateLocation } from '@utils/format';
import { getLocalStorage } from '@utils/storage';

import * as Styled from './index.styles';

const ReservationContents = () => {
  const router = useRouter();
  const { debounce } = useDebounce();
  const { loadingView } = useLoading();
  const { i18n } = useTranslate();
  const { t } = useTranslation('guestPage');
  const { t: ct } = useTranslation();
  const {
    i: pageId,
    cp: customPageId,
    tp: thirdPartyPageId,
    tz: timezone,
  } = router.query;
  const [options, setOptions] = useState<GuestInfoType['reservationOptions']>(
    []
  );

  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const pId = typeof pageId === 'string' ? pageId : '';
  const cpId = typeof customPageId === 'string' ? customPageId : '';
  const tpId = typeof thirdPartyPageId === 'string' ? thirdPartyPageId : '';
  const tzName =
    typeof timezone === 'string' ? timezone : (browserTimezone as string);

  const {
    onChangeCustomLocation,
    onClickCustomLocation,
    onClickLocation,
    createReservation,
    setGuestInfo,
    onChangeInputQuestion,
    onChangeFileInput,
    onChangeOptionQuestion,
    onChangeOthersInput,
    ErrorFields,
    hostInfo,
    customLocation,
    isLoading,
    isFormValidated,
  } = useGuestUserInfo({ pageId: pId, customPageId: cpId, thirdPartyId: tpId });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setErrorModal = (show = false, value = '') => {
    setShowErrorModal(show);
    setErrorMessage(value);
  };

  const optionLength = getLocalStorage(`${pId}length`);

  useEffect(() => {
    if (!optionLength) return;
    const reservations: GuestInfoType['reservationOptions'] = [];
    [...Array(+optionLength).keys()].forEach((_, idx) => {
      const option = getLocalStorage(`${pId}${idx}`);
      if (!option) {
        alert(t('alert.selectAgain'));
        router.back();

        return;
      }

      const [startDateTime, endDateTime] = option.split(',');
      const reservation = {
        id: nanoid(),
        priority: idx + 1,
        className: 'blocked-events',
        startDateTime,
        endDateTime,
      };
      reservations.push(reservation);
      setOptions((prev) => [...prev, reservation]);
    });
    setGuestInfo((prevState) => {
      return {
        ...prevState,
        reservationOptions: reservations,
      };
    });
  }, [optionLength, pId]);

  const redirectBeforePage = () => {
    const newPath = router.asPath.split('/contents').join('');
    router.push(newPath);
  };

  const onClickReservation = () => {
    debounce(createReservation, 500);
  };

  return (
    <>
      <Styled.GRContentContainer>
        {isLoading && loadingView()}
        <MediaQuery minWidth={1024}>
          <Styled.CtaButtonsWrapper>
            <StyledButton
              onClickButton={redirectBeforePage}
              bgColor="white"
              color="purple-500"
              padding="8px 14px"
              borderColor="purple-500"
              borderRadius={50}
              withBorder
            >
              <LeftArrow />
              {ct('prev')}
            </StyledButton>
            <StyledButton
              onClickButton={onClickReservation}
              bgColor="purple-500"
              color="white"
              borderColor="transparent"
              borderRadius={50}
              padding="8px 14px"
              disabled={isFormValidated()}
              withBorder
            >
              {ct('confirm')}
              <CustomIcon
                size={6}
                height={12}
                fill="none"
                stroke="white"
                viewBox="0 0 8 14"
              >
                <RightArrow />
              </CustomIcon>
            </StyledButton>
          </Styled.CtaButtonsWrapper>
        </MediaQuery>
        <Styled.GRContentWrapper>
          <MediaQuery maxWidth={1024}>
            <Styled.CtaButtonsWrapper>
              <StyledButton
                onClickButton={redirectBeforePage}
                bgColor="white"
                color="purple-500"
                padding="8px 14px"
                borderColor="purple-500"
                borderRadius={50}
                withBorder
              >
                <LeftArrow />
                {ct('prev')}
              </StyledButton>
              <MediaQuery minWidth={1024}>
                <StyledButton
                  onClickButton={onClickReservation}
                  bgColor="purple-500"
                  color="white"
                  borderColor="transparent"
                  borderRadius={50}
                  padding="8px 14px"
                  disabled={isFormValidated()}
                  withBorder
                >
                  {ct('confirm')}
                  <CustomIcon
                    size={6}
                    height={12}
                    fill="none"
                    stroke="white"
                    viewBox="0 0 8 14"
                  >
                    <RightArrow />
                  </CustomIcon>
                </StyledButton>
              </MediaQuery>
            </Styled.CtaButtonsWrapper>
          </MediaQuery>
          <Styled.GRContentLeftSideWrapper>
            <LeftSidebar {...hostInfo} timezone={tzName} options={options} />
            <MediaQuery maxWidth={1024}>
              <Line />
            </MediaQuery>
          </Styled.GRContentLeftSideWrapper>
          <Styled.GRContentRightSideWrapper>
            <Styled.GRContentRightSideInnerWrapper>
              <Styled.TitleWrapper>
                <Styled.SubTitle>{t('form.title')}</Styled.SubTitle>
              </Styled.TitleWrapper>
              {hostInfo.location.length ? (
                <>
                  <Styled.LocationSubTitle>
                    {t('location.value')}
                  </Styled.LocationSubTitle>
                  <Styled.LocationContainer>
                    {(hostInfo.location ?? []).map(
                      ({ id, name, type, checked }) => {
                        if (name === '예약자가 장소입력') {
                          return (
                            <Styled.LocationWrapper key={id} width="360px">
                              <RadioButton
                                checked={customLocation.checked}
                                onClick={onClickCustomLocation}
                              >
                                <TextInput
                                  value={customLocation.value}
                                  onChange={onChangeCustomLocation}
                                  inputPadding={5}
                                  placeholder={t('location.placeholder')}
                                  disabled={!customLocation.checked}
                                />
                              </RadioButton>
                            </Styled.LocationWrapper>
                          );
                        }

                        return (
                          <Styled.LocationWrapper key={id}>
                            <RadioButton
                              checked={checked}
                              onClick={() => onClickLocation(id)}
                            >
                              <div style={{ display: 'flex' }}>
                                <Styled.IconContainer>
                                  {getIcon(type)}
                                </Styled.IconContainer>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <p style={{ flexShrink: 0 }}>{translateLocation(name)}</p>

                                  {type === 'PHONE' && (
                                    <Styled.MeetAlert>
                                      ({hostInfo.hostName}
                                      {t('location.alert.phone')})
                                    </Styled.MeetAlert>
                                  )}
                                </div>
                              </div>
                            </RadioButton>
                          </Styled.LocationWrapper>
                        );
                      }
                    )}
                  </Styled.LocationContainer>
                  <Line margin="20px 0" />
                </>
              ) : (
                <Line margin="10px 0px 20px 0px" />
              )}
              {
                <>
                  <Styled.FormSubtitle>
                    {t('form.subTitle')}
                  </Styled.FormSubtitle>
                  <Styled.Box flex>
                    {hostInfo.form.questions.map(
                      (question: IFormQuestion, index: number) => (
                        <FormQuestion
                          key={index}
                          nanoId={question.nanoId}
                          title={question.title}
                          questionType={question.questionType}
                          required={question.isRequired}
                          isSwitchOn={question.isSwitchOn}
                          options={question.options}
                          selectedOptions={question.selectedOptions}
                          isPreview={true}
                          isReservationContent={true}
                          ErrorFields={ErrorFields}
                          setErrorModal={(show, value) =>
                            setErrorModal(show, value)
                          }
                          value={question.value}
                          onChangeInputQuestion={(
                            e:
                              | ChangeEvent<HTMLInputElement>
                              | ChangeEvent<HTMLTextAreaElement>
                              | MouseEvent<HTMLButtonElement>
                          ) => onChangeInputQuestion(e, question)}
                          onChangeOptionQuestion={(optionIndex: number) =>
                            onChangeOptionQuestion(optionIndex, question)
                          }
                          othersInputValue={question.othersInputValue}
                          onChangeFileInput={(
                            file: Blob | string,
                            name: string
                          ) => onChangeFileInput(file, question, name)}
                          onChangeOthersInput={(
                            e: ChangeEvent<HTMLInputElement>
                          ) => onChangeOthersInput(e, question)}
                        />
                      )
                    )}
                  </Styled.Box>
                </>
              }
            </Styled.GRContentRightSideInnerWrapper>
          </Styled.GRContentRightSideWrapper>
        </Styled.GRContentWrapper>
        <MediaQuery maxWidth={1024}>
          <Styled.FixedNextButton>
            <StyledButton
              onClickButton={onClickReservation}
              bgColor="purple-500"
              color="white"
              borderColor="transparent"
              borderRadius={4}
              padding="14px"
              disabled={isFormValidated()}
              withBorder
              width="100%"
            >
              {ct('confirm')}
              <CustomIcon
                size={6}
                height={12}
                fill="none"
                stroke="white"
                viewBox="0 0 8 14"
              >
                <RightArrow />
              </CustomIcon>
            </StyledButton>
          </Styled.FixedNextButton>
        </MediaQuery>
      </Styled.GRContentContainer>
      {showErrorModal && (
        <Styled.FileErrorModalContainer>
          <FileUploadErrorModal
            setErrorModal={(show, value) => setErrorModal(show, value)}
            errorMessage={errorMessage}
          />
        </Styled.FileErrorModalContainer>
      )}
    </>
  );
};

export default ReservationContents;
