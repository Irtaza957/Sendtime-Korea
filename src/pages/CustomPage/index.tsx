import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { useMutation, useQuery } from 'react-query';

import { CustomPageAPI, CustomPageKeys } from '@api/customPage/CustomPage';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import CompanyCard from '@components/CompanyCard';
import CustomCard from '@components/CustomCard';
import InfoCard from '@components/CustomCard/InfoCard';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import TextCheckbox from '@components/TextCheckbox';
import { BASE_URL } from '@constants/baseUrl';
import { DO_NOT_SHOW_NETWORKING_PW } from '@constants/storage';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useMainInput from '@hooks/inputs/useMainInput';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { CircleRightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import * as Sentry from '@sentry/browser';
import { getLocalStorage, setLocalStorage } from '@utils/storage';

import { BlockBox } from '../../../styles/container/index.styles';

import {
  CardsContentWrapper,
  CardSection,
  CardsWrapper,
  CodeTitle,
  CompanyCardWrapper,
  CustomPageSection,
  LanguageDropdownWrapper,
  MainImageWrapper,
  NetworkPasswordContainer,
} from './index.styles';

const gap = 20;
const maxBannerHeight = 70;
const maxCardHeight = 550;

interface CustomPageProps {
  pageInfo: CustomPageInfo;
  customUrl: string;
}

const CustomPage = ({ pageInfo, customUrl }: CustomPageProps) => {
  const cardHeightRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowDimensions();
  const windowWidth = width || 0;

  const router = useRouter();
  const [cardInfo, setCardInfo] = useState<CustomCardType[]>(
    pageInfo.reservationPageCards
  );

  const { refetch: refetchPageData } = useQuery(
    CustomPageKeys.getCustomPageInfo(customUrl),
    () => CustomPageAPI.getCustomPageInfo(customUrl),
    { onSuccess: () => {}, enabled: false, refetchOnWindowFocus: false }
  );

  const { mutate: actions } = useMutation(CustomPageAPI.action, {
    onSuccess: async () => {
      const { data } = await refetchPageData();
      const newData = data?.results[0].reservationPageCards;

      if (!newData) return;
      setCardInfo(newData);
    },
    onError: (error) => {
      Sentry.captureException(error);
      console.error(error);
    },
  });

  const onCardLikeClick = (reservationPageUuid: string) => {
    actions({ customUrl, type: 'LIKE', reservationPageUuid });
  };
  const onCardShakeClick = (reservationPageUuid: string) => {
    actions({ customUrl, type: 'SHAKE', reservationPageUuid });
  };

  const BANNER_INFO = {
    content: i18next.t('profilePage:guide'),
    button: (
      <StyledButton
        bgColor="gray-800"
        padding="8px 15px"
        color="white"
        borderRadius={12}
        onClickButton={() =>
          router.push('https://www.landing.sendtime.app/build-your-profile-page')
        }
      >
        {i18next.t('profilePage:createBtn')}
        <CustomIcon size={14} fill="white" stroke="none">
          <CircleRightArrow />
        </CustomIcon>
      </StyledButton>
    ),
  };

  // const calculateMaxHeight = () => {
  //   const maxHeight =
  //     (pageInfo.reservationPageCards.length / 2) * (gap + maxCardHeight) +
  //     maxBannerHeight;

  //   return maxHeight;
  // };

  const makeGridColumn = () => {
    if (2000 <= windowWidth && 3 < cardInfo.length) {
      return 3;
    }

    if (1600 <= windowWidth && windowWidth < 2000 && 2 < cardInfo.length) {
      return 2;
    }

    if (1200 <= windowWidth && windowWidth < 1600 && 1 < cardInfo.length) {
      return 1;
    }

    if (cardInfo.length === 2) {
      return 1;
    }

    if (cardInfo.length === 3) {
      return 2;
    }

    if (cardInfo.length === 4) {
      return 3;
    }

    return 2;
  };

  const { showModal } = useNestedModal({
    type: 'alert',
    title: '죄송합니다.',
    description: '코드가 틀렸습니다. 다시 시도해주세요.',
  });

  const { title: password, TitleView: PasswordView } = useMainInput({});
  const [isValid, setIsValid] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(true);

  const confirmPassword = () => {
    const isCorrect = password.value === 'sendtimeX500';
    if (!isCorrect) {
      showModal();
      return;
    }

    if (doNotShowAgain) {
      setLocalStorage(DO_NOT_SHOW_NETWORKING_PW, 'true');
    }
    setIsValid(isCorrect);
  };

  const alreadyValidated = getLocalStorage(DO_NOT_SHOW_NETWORKING_PW);

  return (
    <>
      {(customUrl === 'sendtimenetworking' || customUrl === 'teampangapp') &&
      !isValid &&
      !alreadyValidated ? (
        <NetworkPasswordContainer>
          <CodeTitle>입장 코드를 입력해주세요.</CodeTitle>
          <BlockBox gap={10}>
            {PasswordView({ autoFocus: true })}
            <TextCheckbox
              checked={doNotShowAgain}
              onClick={() => setDoNotShowAgain((prev) => !prev)}
            >
              다시 입장할 땐 코드 없이 입장하기
            </TextCheckbox>
            <StyledButton onClickButton={confirmPassword} padding="10px 90px">
              입장하기
            </StyledButton>
          </BlockBox>
        </NetworkPasswordContainer>
      ) : (
        <CustomPageSection>
          <MainImageWrapper>
            <Image
              src={`${BASE_URL.image}/backgrounds/splab_bg.png`}
              alt="splab"
              layout="fixed"
              width="100"
              height="100"
              priority={false}
            />
          </MainImageWrapper>

          <CardsWrapper>
            <CardsContentWrapper>
              <CompanyCardWrapper>
                <LanguageDropdownWrapper>
                  <LanguageDropdown />
                </LanguageDropdownWrapper>
                <CompanyCard companyInfo={pageInfo} />
                <ImageContainer width={300}>
                  <AutoHeightImage
                    src={`${BASE_URL.image}/banners/powered_by_no_bg.png`}
                    alt="powered_by_sendtime"
                  />
                </ImageContainer>
              </CompanyCardWrapper>

              <CardSection
                cardCount={cardInfo.length}
                gap={gap}
                maxCardHeight={maxCardHeight}
                ref={cardHeightRef}
              >
                {cardInfo.map((cardInfo, idx) => (
                  <CustomCard
                    cardInfo={cardInfo}
                    customUrl={customUrl}
                    onCardLikeClick={onCardLikeClick}
                    onCardShakeClick={onCardShakeClick}
                    key={idx}
                  />
                ))}

                {cardInfo.length > 1 && (
                  <InfoCard
                    {...BANNER_INFO}
                    maxBannerHeight={maxBannerHeight}
                    gridColumn={makeGridColumn()}
                  />
                )}
              </CardSection>
            </CardsContentWrapper>
          </CardsWrapper>
        </CustomPageSection>
      )}
    </>
  );
};

export default CustomPage;
