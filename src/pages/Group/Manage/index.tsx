import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import MediaQuery from 'react-responsive';
import { useRecoilState } from 'recoil';

import {
  groupCalendarAPI,
  GroupCalendarKeys,
} from '@api/group/calendar/GroupCalendar';
import { coreUserState } from '@atoms/index';
import StyledButton from '@components/Button';
import EmptyView from '@components/EmptyView';
import SideAreaContainer from '@components/SideAreaContainer';
import Table from '@components/Table';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { GroupCalendarEmpty, UpDownArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';
import { translateDateRange, translateKODateTime } from '@utils/format';
import { FORMAT } from '@utils/time';

import {
  GroupListTitleContainer,
  GroupTitle,
  SortableHeaderSpan,
  TableContainer,
  TeamManageContainer,
  TitleMain,
} from './index.styles';
import { ModalContent } from './MoreButtonWithModal';

interface SortableHeader {
  header: string;
}

const SortableHeader = ({ header }: SortableHeader) => {
  return (
    <SortableHeaderSpan>
      {header}
      <CustomIcon
        size={10}
        height={12}
        viewBox="0 0 10 16"
        fill="gray-750"
        stroke="none"
      >
        <UpDownArrow />
      </CustomIcon>
    </SortableHeaderSpan>
  );
};

export type ModalDefault = { id: number; checked: boolean };

const Manage = () => {
  const [user] = useRecoilState(coreUserState);
  const router = useRouter();
  const { t } = useTranslation('groupCalendarListPage');

  const { showModal: showNoCustomUrl, hideModal: hideNoCustomUrl } =
    useNestedModal({
      type: 'alert',
      title: t('message.missingURL.title'),
      description: t('message.missingURL.description'),
    });

  const { showModal: showDeleteModal, hideModal: hideDeleteModal } =
    useNestedModal({
      type: 'delete',
      title: t('message.deleteWarning.title'),
      description: t('message.deleteWarning.description'),
    });

  useEffect(() => {
    checkExistCustomModal();
  }, [user?.customUrl]);

  const checkExistCustomModal = async () => {
    if (user?.customUrl === null || user?.customUrl === '') {
      await showNoCustomUrl();
      router.push(ROUTES.ONBOARDING.URL);
      hideNoCustomUrl();
      return;
    }
  };

  const startFreeTrial = () => {
    router.push(ROUTES.GROUP.NEW);
  };

  const [teams, setTeams] = useState<Group[]>([]);

  const goMakeGroup = () => {
    router.push(ROUTES.GROUP.NEW);
  };

  const { refetch: getGroupList } = useQuery(
    GroupCalendarKeys.getList(),
    groupCalendarAPI.getList,
    {
      onSuccess: ({ data: { results } }) => {},
      enabled: false,
    }
  );

  const { mutate: deleteGroup } = useMutation(
    (teamId: string) => groupCalendarAPI.deleteGroup(teamId),
    {
      onSuccess: () => getGroupList(),
      onError: () => {},
    }
  );

  const modalContents: ModalContent[] = useMemo(
    () => [
      {
        content: t('manage'),
        onClickContent: (groupId: string) => {
          const url = ROUTES.GROUP.SETTINGS.replace('[groupId]', groupId);
          router.push(url);
        },
      },
      {
        content: t('delete'),
        alert: true,
        onClickContent: async (teamId: string) => {
          const isValidated = await showDeleteModal(async () => {
            try {
              deleteGroup(teamId);
              return true;
            } catch (e) {
              console.error(e);
              return false;
            }
          });
          if (isValidated) hideDeleteModal();
        },
      },
    ],
    []
  );

  const { data: groupList } = useQuery(
    GroupCalendarKeys.getList(),
    groupCalendarAPI.getList,
    {
      onSuccess: ({ data: { results } }) => {},
    }
  );

  const data = useMemo(() => teams, [teams]);
  const deepData = JSON.parse(JSON.stringify(data));
  const translatedData = deepData.map(
    (item: { calendarOpenPeriod: string; createDateTime: string }) => {
      return {
        ...item,
        calendarOpenPeriod: translateDateRange(item.calendarOpenPeriod, '.'),
        createDateTime: translateKODateTime(item.createDateTime),
      };
    }
  );

  const formatRowProps = (row: any) => {
    const { teamId } = row.original;

    return {
      onClick: () => {
        router.push(`${ROUTES.GROUP.MAIN}/${teamId}`);
      },
    };
  };

  const formatted = useMemo(() => {
    if (!groupList) return [];
    return groupList.data.results[0].map((team, idx) => ({
      ...team,
      createDateTime: dayjs(team.createDateTime).format(FORMAT.koYMDHm),
    }));
  }, [groupList]);

  useEffect(() => {
    if (!groupList) return;

    setTeams(formatted);
  }, [groupList, formatted]);

  const columns = [
    {
      Header: <SortableHeader header={t('columns.name')} />,
      accessor: 'teamName',
      flexBasis: 30,
      sortable: true,
    },
    {
      Header: <SortableHeader header={t('columns.createDateTime')} />,
      accessor: 'createDateTime',
      flexBasis: 20,
      sortable: true,
    },
    {
      Header: <SortableHeader header={t('columns.memberCount')} />,
      accessor: 'memberCount',
      align: 'center',
      flexBasis: 15,
      sortable: true,
    },
    {
      Header: t('columns.calendarOpenPeriod'),
      accessor: 'calendarOpenPeriod',
      flexBasis: 20,
    },
    {
      Header: '',
      accessor: 'more',
      show: true,
      flexBasis: 15,
      align: 'flex-end',
    },
  ];

  return (
    <TeamManageContainer>
      <WithSidebarComponent>
        <SideAreaContainer>
          <Title margin="0 0 15px 0px">
            <GroupListTitleContainer>
              <GroupTitle>{t('title')}</GroupTitle>
              <StyledButton onClickButton={goMakeGroup}>
                <Icon icon="ic:baseline-people" color="#fff" />
                <MediaQuery minWidth={769}>
                  <TitleMain>{t('createBtn')}</TitleMain>
                </MediaQuery>
              </StyledButton>
            </GroupListTitleContainer>
          </Title>
          {!translatedData.length ? (
            <EmptyView
              icon={
                <CustomIcon
                  size={172}
                  height={150}
                  fill="gray-200"
                  stroke="none"
                >
                  <GroupCalendarEmpty />
                </CustomIcon>
              }
              content={t('message.noGroups')}
            />
          ) : (
            <TableContainer>
              <Table
                data={translatedData}
                columns={columns}
                formatRowProps={formatRowProps}
                modalContents={modalContents}
              />
            </TableContainer>
          )}
        </SideAreaContainer>
      </WithSidebarComponent>
    </TeamManageContainer>
  );
};

export default Manage;
