import React, { forwardRef, useEffect } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import SelectTextInput from '@components/SelectTextInput';
import TextCheckbox from '@components/TextCheckbox';
import { SELECT_SPARE_TIME_KR } from '@constants/time';
import { PAGE_TYPE } from '@constants/utils';
import { useGroupReservation } from '@contexts/GroupReservationProvider';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useRadio, { RadioInputType } from '@hooks/inputs/useRadio';
import { Container, SemiContent } from '@pages/Reservation/index.styles';
import { translateTime } from '@utils/format';

import { SubSection } from '../Common';
import { Box, NoOrganizerAlert, SubContainer } from '../index.styles';
import PersonalSecondPage from '../SecondPage/Personal';

interface HowToSectionProps {
  type?: typeof PAGE_TYPE['personal'] | typeof PAGE_TYPE['group'];
  googleOrganizers?: {
    name: string;
    email: string;
    isLinked: boolean;
    checked: boolean;
  }[];
  edit?: boolean;
}

const NO_ORGANIZER = i18next.t('createGroupBookingPage:noOrganizer');
const radioData: RadioInputType[] = [
  {
    title: i18next.t('createGroupBookingPage:cohostSetting.1.title'),
    description: i18next.t(
      'createGroupBookingPage:cohostSetting.1.description'
    ),
    dataInfo: 'UNION',
  },
  {
    title: i18next.t('createGroupBookingPage:cohostSetting.2.title'),
    description: i18next.t(
      'createGroupBookingPage:cohostSetting.2.description'
    ),
    dataInfo: 'INTERSECTION',
  },
  {
    title: i18next.t('createGroupBookingPage:cohostSetting.3.title'),
    description: i18next.t(
      'createGroupBookingPage:cohostSetting.3.description'
    ),
    allowBlockingTimesText: i18next.t(
      'createGroupBookingPage:cohostSetting.3.allowBlockingTimesText'
    ),
    dataInfo: 'EMPTY',
  },
];

const HowToPage = forwardRef<HTMLDivElement, HowToSectionProps>(
  ({ type = PAGE_TYPE.personal, googleOrganizers, edit }, ref) => {
    const { t } = useTranslation('createGroupBookingPage');
    const {
      onClickGoogleOrganizer,
      onClickSpareTimeBeforeCheckbox,
      onClickSpareTimeStartSelectBox,
      onClickSpareTimeNextCheckbox,
      onClickSpareTimeEndSelectBox,
      setPageInfo,
      pageInfo,
    } = useGroupReservation();

    const selectTimeUnit = SELECT_SPARE_TIME_KR.map((value) => ({
      text: translateTime(value),
      value,
    }));

    const { RadioView, selected, allowBlockingTimes } = useRadio(
      radioData,
      pageInfo.displayOption
    );
    const { showModal } = useNestedModal({
      type: 'alert',
      title: i18next.t('createGroupBookingPage:alert.noEvent.title'),
      description: i18next.t('createGroupBookingPage:alert.noEvent.subtitle'),
    });

    const selectedValue = selected.find((s) => s.selected);
    useEffect(() => {
      if (selectedValue?.dataInfo === 'EMPTY') {
        showModal();
      }

      setPageInfo((prev) => ({
        ...prev,
        displayOption: selectedValue?.dataInfo ?? 'UNION',
      }));
    }, [selectedValue]);

    useEffect(() => {
      if (pageInfo.displayOption === 'EMPTY') {
        setPageInfo((prev) => ({
          ...prev,
          isDisplayBlockingTimes: allowBlockingTimes,
        }));
      }
    }, [allowBlockingTimes, pageInfo.displayOption]);

    if (type === PAGE_TYPE.personal) {
      return <PersonalSecondPage />;
    }

    if (type === PAGE_TYPE.group) {
      const selectedOrganizer = (googleOrganizers ?? []).find(
        ({ checked }) => checked
      );

      const value = () => {
        const linked = googleOrganizers?.filter(({ isLinked }) => isLinked);

        if (selectedOrganizer && selectedOrganizer.isLinked) {
          return `${selectedOrganizer.name}(${selectedOrganizer.email})`;
        }

        if (googleOrganizers?.length && linked?.length) {
          return `${linked[0].name}(${linked[0].email})`;
        }

        return '';
      };

      const selectedValues = (googleOrganizers ?? []).map(
        ({ name, email, isLinked }) => ({
          value: `${name}(${email})`,
          disabled: !isLinked,
          disabledText: i18next.t('createGroupBookingPage:noCalendar'),
        })
      );

      return (
        <Container ref={ref}>
          <SemiContent>
            {RadioView(i18next.t('createGroupBookingPage:cohostSetting.title'))}
          </SemiContent>

          {pageInfo.displayOption !== 'EMPTY' && (
            <SemiContent>
              <SubSection
                subTitle={t('buffer.title')}
                description={t('buffer.subtitle')}
              >
                <SubContainer>
                  <Box width={40} gap={6}>
                    <TextCheckbox
                      onClick={onClickSpareTimeBeforeCheckbox}
                      checked={pageInfo.spareTime.before.checked}
                    >
                      {t('buffer.beforeEvent')}
                    </TextCheckbox>
                    <SelectTextInput
                      value={pageInfo.spareTime.before.time}
                      onClickSelectBox={onClickSpareTimeStartSelectBox}
                      selectValues={selectTimeUnit}
                      disabled={!pageInfo.spareTime.before.checked}
                    />
                  </Box>

                  <Box width={40} gap={6}>
                    <TextCheckbox
                      onClick={onClickSpareTimeNextCheckbox}
                      checked={pageInfo.spareTime.next.checked}
                    >
                      {t('buffer.afterEvent')}
                    </TextCheckbox>
                    <SelectTextInput
                      value={pageInfo.spareTime.next.time}
                      onClickSelectBox={onClickSpareTimeEndSelectBox}
                      selectValues={selectTimeUnit}
                      disabled={!pageInfo.spareTime.next.checked}
                    />
                  </Box>
                </SubContainer>
              </SubSection>
            </SemiContent>
          )}

          <SemiContent>
            <SubSection
              subTitle={t('eventHost.title')}
              description={t('eventHost.subtitle')}
            >
              <SelectTextInput
                value={value()}
                selectValues={selectedValues}
                placeholder={NO_ORGANIZER}
                onClickSelectBox={onClickGoogleOrganizer}
                disabled={edit}
              />
              {!value() && (
                <NoOrganizerAlert>
                  {t('eventHost.description')}
                </NoOrganizerAlert>
              )}
            </SubSection>
          </SemiContent>
        </Container>
      );
    }
    return <></>;
  }
);

HowToPage.displayName = 'HowToPage';

export default HowToPage;
