import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LNG } from '@constants/language';
import { Icon } from '@iconify/react';
import { REGION } from '@utils/language';
import { toEnMonthName } from '@utils/time';

import {
  IconBackground,
  IconContainer,
  ModalContents,
  ReservationRankModalContainer,
  SelectCompletedButton,
} from './index.styles';
import RankDetail from './RankDetail';

interface ReservationRankModalProps {
  optionCount?: number;
  modalContents: {
    id: string;
    startDateTime: string;
    endDateTime: string;
    className: string;
  }[];
  onTimeSelectionCompleted: () => void;
  onDeleteOption: (id: string) => void;
}

export const modalContentTime = (
  startDate: string,
  endDate: string,
  lng = LNG.ko_KR
) => {
  if (!startDate || !endDate) return '-';
  const [syy, sMM, sDateAndTimes] = startDate.split('-');
  const [sdd, sTimes] = sDateAndTimes.split('T');
  const [shh, smm, sss] = sTimes.split(':');

  const [eyy, eMM, eDateAndTimes] = endDate.split('-');
  const [edd, eTimes] = eDateAndTimes.split('T');
  const [ehh, emm, ess] = eTimes.split(':');

  if (lng.includes(REGION.KO)) {
    if (syy === eyy && sMM === eMM && sdd === edd) {
      return `${syy}년 ${sMM}월 ${sdd}일 ${shh}:${smm} - ${ehh}:${emm}`;
    }

    if (syy === eyy && sMM === eMM) {
      return `${syy}년 ${sMM}월 ${sdd}일 ${shh}:${smm} - ${edd}일 ${ehh}:${emm}`;
    }

    if (syy === eyy) {
      return `${syy}년 ${sMM}월 ${sdd}일 ${shh}:${smm} - ${eMM}월 ${edd}일 ${ehh}:${emm}`;
    }

    return `${syy}년 ${sMM}월 ${sdd}일 ${shh}:${smm} - ${eyy}년 ${eMM}월 ${edd}일 ${ehh}:${emm} `;
  } else {
    const enSMM = toEnMonthName(+sMM);
    const enEMM = toEnMonthName(+eMM);

    if (syy === eyy && sMM === eMM && sdd === edd) {
      return `${shh}:${smm} - ${ehh}:${emm}, ${enSMM} ${sdd}th, ${syy}`;
    }

    if (syy === eyy && sMM === eMM) {
      return `${sdd}th ${shh}:${smm} - ${edd}th ${ehh}:${emm}, ${enSMM} ${syy}`;
    }

    if (syy === eyy) {
      return `${shh}:${smm} ${enSMM} ${sdd}th - ${ehh}:${emm} ${enEMM} ${edd}th, ${syy}`;
    }

    return `${shh}:${smm}, ${enSMM} ${sdd}th, ${syy} - ${ehh}:${emm}, ${enEMM} ${edd}th, ${eyy}`;
  }
};

const MODAL_CONTENTS_DEFAULT = 3;
const ReservationRankModal = ({
  optionCount = 3,
  modalContents,
  onTimeSelectionCompleted,
  onDeleteOption,
}: ReservationRankModalProps) => {
  const { t, i18n } = useTranslation('guestPage');
  const [height, setHeight] = useState(0);
  const [showLess, setShowLess] = useState(false);

  useEffect(() => {
    if (showLess) {
      setHeight(50);
      return;
    }

    setHeight(modalContents.length * 50);
  }, [modalContents, showLess]);

  useEffect(() => {
    if (modalContents.length <= MODAL_CONTENTS_DEFAULT) {
      setShowLess(false);
    }
  }, [modalContents]);

  const toggleShowLess = () => {
    setShowLess((prev) => !prev);
  };

  return (
    <ReservationRankModalContainer>
      {modalContents.length > 3 && (
        <IconContainer onClick={toggleShowLess}>
          <IconBackground />
          {showLess ? (
            <Icon
              icon="material-symbols:arrow-circle-up-rounded"
              color="var(--gray-600)"
              width={38}
            />
          ) : (
            <Icon
              icon="material-symbols:arrow-circle-down-rounded"
              color="var(--gray-600)"
              width={38}
            />
          )}
        </IconContainer>
      )}
      <ModalContents
        gap={8}
        height={height}
        showLess={showLess}
        contentLength={modalContents.length}
      >
        {modalContents.map(({ id, startDateTime, endDateTime }, idx) => (
          <RankDetail
            key={id}
            id={id}
            rank={idx + 1}
            time={modalContentTime(startDateTime, endDateTime, i18n.language)}
            onDelete={() => onDeleteOption(id)}
          />
        ))}
      </ModalContents>
      <SelectCompletedButton
        onClick={onTimeSelectionCompleted}
        disabled={!(modalContents.length > 0)}
      >
        {modalContents.length}/{optionCount} {t('slotSelected')}
      </SelectCompletedButton>
    </ReservationRankModalContainer>
  );
};

export default ReservationRankModal;
