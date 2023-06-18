import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import Line from '@components/Line';
import { modalContentTime } from '@components/ReservationRankModal';
import { BASE_URL } from '@constants/baseUrl';
import { GuestInfoType } from '@contexts/GuestReservationProvider';
import useTranslate from '@hooks/useTranslate';
import { CalendarIcon, GlobeIcon, LocationIcon } from '@Icon/Icons/Utils';
import { locationContent } from '@utils/format';

import * as Styled from './index.styles';

interface LeftSidePreviewProp {
  reservationPageName: string;
  location: { id: string; name: string; type: string; checked: boolean }[];
  timezone: string;
  options: GuestInfoType['reservationOptions'];
}

const LeftSidePreview = ({
  reservationPageName,
  location,
  timezone,
  options,
}: LeftSidePreviewProp) => {
  const { i18n } = useTranslate();
  const { t } = useTranslation('guestPage');

  const makeReservationOptions = useCallback(() => {
    return options.map(({ startDateTime, endDateTime }, idx) => ({
      time: modalContentTime(startDateTime, endDateTime, i18n.language),
      priority: `${idx + 1}`,
    }));
  }, [i18n.language, options]);

  return (
    <>
      <Styled.LeftSideContainer>
        <Styled.LeftSideWrapper>
          <Styled.LeftSideContentWrapper>
            <Styled.LeftSidePreviewName>
              {reservationPageName}
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
              {!!location.length && (
                <Styled.LeftSidePreviewInfo>
                  <Styled.PreviewIconWrapper>
                    <LocationIcon />
                  </Styled.PreviewIconWrapper>
                  <Styled.PreviewContentWrapper>
                    {locationContent(location)}
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
