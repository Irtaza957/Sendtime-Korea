import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';

import DetailModal from '../DetailModal';
import { AllDayEvent } from '..';

import {
  AllDayModalContainer,
  AllDayModalNavigation,
  Divider,
} from './index.styles';

interface AllDayModalProps {
  position: { x: number; y: number };
  allDayEvents: AllDayEvent[];
  onClickClose: () => void;
}

const AllDayModal = ({
  position,
  allDayEvents,
  onClickClose,
}: AllDayModalProps) => {
  const isLastIndex = (index: number) => index !== allDayEvents.length - 1;

  const { t } = useTranslation('common');

  return (
    <AllDayModalContainer position={position}>
      <AllDayModalNavigation>
        {t('allday')}
        <button onClick={onClickClose}>
          <Icon
            icon="eva:close-outline"
            width="20"
            height="20"
            color="gray-600"
          />
        </button>
      </AllDayModalNavigation>
      {allDayEvents.map((event, index) => (
        <>
          <DetailModal
            shadowed={false}
            isClosable={false}
            isAbsolute={false}
            key={event.id}
            title={event.title}
            time={event.time}
            user={event.user}
            location={event.location}
            category={event.category}
            onClickDelete={event.onClickDelete}
          />
          {isLastIndex(index) && <Divider />}
        </>
      ))}
    </AllDayModalContainer>
  );
};

export default AllDayModal;
