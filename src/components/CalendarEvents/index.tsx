import React, { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyView from '@components/EmptyView';
import { TimeTable } from '@Icon/Icons/Utils';
import CustomIcon from '@Icon/index';

import CalendarEventItem from './CalendarEventItem';

interface CalendarEventsProps {
  data: MyReservation[];
  refetch?: () => void;
}

type MoreMenuOpenStatus = {
  id: string;
  opened: boolean;
};

const CalendarEvents = ({ data, refetch }: CalendarEventsProps) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<MoreMenuOpenStatus[]>(
    []
  );

  useEffect(() => {
    const defaultMoreMenuOpenStatus =
      data.map((event) => ({ id: event.uuid, opened: false })) ?? [];

    setIsMoreMenuOpen(defaultMoreMenuOpenStatus);
  }, [data]);

  const openMoreMenu = (id: string) => {
    const target = isMoreMenuOpen.filter((item) => item.id === id)[0];
    const targetIndex = isMoreMenuOpen.findIndex((item) => item.id === id);
    if (targetIndex === -1) return;

    setIsMoreMenuOpen((prev) => {
      const copy = [...prev];
      copy.splice(targetIndex, 1, { ...target, opened: !target.opened });

      return copy;
    });

    return;
  };

  const closeMoreMenu = () => {
    const newList = isMoreMenuOpen.map((item) => ({
      ...item,
      opened: false,
    }));

    setIsMoreMenuOpen(newList);
  };

  const handleClickMoreButton = (
    e: MouseEvent<HTMLButtonElement>,
    uuid: string
  ) => {
    e.stopPropagation();
    openMoreMenu(uuid);
  };

  const { t } = useTranslation('common');

  return (
    <div>
      {!data?.length ? (
        <EmptyView
          icon={
            <CustomIcon
              size={117}
              height={129}
              viewBox="0 0 117 129"
              fill="gray-300"
              stroke="none"
            >
              <TimeTable />
            </CustomIcon>
          }
          content={t('noBookingPageGuide')}
        />
      ) : (
        <>
          {data.map((d) => (
            <CalendarEventItem
              key={d.uuid}
              uuid={d.uuid}
              title={d.pageName}
              description={d.pageDescription}
              isActive={d.isActive}
              time={d.timeUnit}
              locations={d.locations}
              optionLength={d.optionCount}
              onClickMoreButton={(e: MouseEvent<HTMLButtonElement>) =>
                handleClickMoreButton(e, d.uuid)
              }
              isMoreMenuOpen={
                !!isMoreMenuOpen?.find((item) => item.id === d.uuid)?.opened
              }
              closeMoreMenu={() => closeMoreMenu()}
              questions={d.questions.map((q) => ({
                id: q.id,
                nanoId: q.id,
                questionType: q.type,
                title: q.title,
                othersInputValue: '',
                selectedOptions: [],
                options: q.options,
                isContainEtc: q.isContainEtc || false,
                isRequired: q.isRequired,
                isSwitchOn: q.isExposed,
                isSwitchToggleAllowed: false,
              }))}
              nestedPages={d.customPages}
              thirdPartyPages={d.thirdPersonPages}
              type={d.pageType}
              teamName={d.teamName}
              attendees={d.attendees}
              groupId={d.groupId}
              refetch={refetch}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CalendarEvents;
