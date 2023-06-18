import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import Line from '@components/Line';
import { modalContentTime } from '@components/ReservationRankModal';
import { BASE_URL } from '@constants/baseUrl';
import useTranslate from '@hooks/useTranslate';
import { CalendarIcon, GlobeIcon, LocationIcon } from '@Icon/Icons/Utils';
import { locationContent } from '@utils/format';
import { toTzDateTime } from '@utils/time';

import * as Styled from './index.styles';

interface LeftSidePreviewProp {
  pageInfo: HostInfoType;
  timezone: string;
  newConfirmTime: {
    startDateTime: string;
    endDateTime: string;
  };
}

const LeftSidePreview = ({
  pageInfo,
  timezone,
  newConfirmTime,
}: LeftSidePreviewProp) => {
  const { i18n } = useTranslate();
  const { t } = useTranslation('guestPage');

  const makeReservationOptions = useCallback(() => {
    return [
      {
        time: modalContentTime(
          toTzDateTime(newConfirmTime.startDateTime, timezone) as string,
          toTzDateTime(newConfirmTime.endDateTime, timezone) as string,
          i18n.language
        ),
        priority: 1,
      },
    ];
  }, [i18n.language, pageInfo]);

  return (
    <>
      <Styled.LeftSideContainer>
        <Styled.LeftSideWrapper>
          <Styled.LeftSideContentWrapper>
            <Styled.LeftSidePreviewName>
              {pageInfo.reservationPageName}
            </Styled.LeftSidePreviewName>
            <MediaQuery minWidth={1024}>
              <Styled.LeftSideDescription>
                {t('preview.description')} <br />
              </Styled.LeftSideDescription>
              <Line margin="0px" />
            </MediaQuery>
            <Styled.LeftSidePreviewInfos>
              <Styled.LeftSidePreviewInfo>
                <Styled.PreviewIconWrapper alignItems={'flex-start'}>
                  <CalendarIcon />
                </Styled.PreviewIconWrapper>
                <Styled.PreviewContentWrapper>
                  <Styled.PreviewRanking>
                    {makeReservationOptions().map((option, idx) => (
                      <Styled.PreviewRankWrapper key={idx}>
                        <Styled.PreviewRank>
                          {option.priority}
                          {t(`rank.${option.priority}`)}
                        </Styled.PreviewRank>
                        <Styled.PreviewTime>{option.time}</Styled.PreviewTime>
                      </Styled.PreviewRankWrapper>
                    ))}
                  </Styled.PreviewRanking>
                </Styled.PreviewContentWrapper>
              </Styled.LeftSidePreviewInfo>
              {!!pageInfo.location.length && (
                <Styled.LeftSidePreviewInfo>
                  <Styled.PreviewIconWrapper>
                    <LocationIcon />
                  </Styled.PreviewIconWrapper>
                  <Styled.PreviewContentWrapper>
                    {locationContent(pageInfo.location)}
                  </Styled.PreviewContentWrapper>
                </Styled.LeftSidePreviewInfo>
              )}
              <Styled.LeftSidePreviewInfo>
                <Styled.PreviewIconWrapper>
                  <GlobeIcon />
                </Styled.PreviewIconWrapper>
                <Styled.PreviewContentWrapper>
                  Timezone is {timezone}
                </Styled.PreviewContentWrapper>
              </Styled.LeftSidePreviewInfo>
            </Styled.LeftSidePreviewInfos>
          </Styled.LeftSideContentWrapper>
          <MediaQuery minWidth={1024}>
            <Styled.LeftSideImageWrapper>
              <ImageContainer width={300}>
                <AutoHeightImage
                  src={`${BASE_URL.image}/banners/powered_by_no_bg.png`}
                  alt="powered_by_sendtime"
                />
              </ImageContainer>
            </Styled.LeftSideImageWrapper>
          </MediaQuery>
        </Styled.LeftSideWrapper>
      </Styled.LeftSideContainer>
    </>
  );
};

export default LeftSidePreview;
