import { request } from '../../Request';

const GroupCalendarKeys = {
  getList: () => ['getTeamList'],
  getGroupDetails: () => ['getTeamDetails'],
  getGroupCalendar: (memberIds: string[]) => ['getGroupCalendar', ...memberIds],
  getGroupPreview: () => ['getGroupPreview'],
  sync: (groupId: string) => ['sync', groupId],
};

const groupCalendarAPI = {
  deleteGroup: async (teamId: string) => {
    return await request.delete<DeleteGroupResponse>(`/teams/${teamId}`);
  },

  getList: async () => {
    return await request.get<GetGroupListResponse>(`/teams/summary`);
  },

  getGroupDetails: async (teamId: string) => {
    return await request.get<GetGroupDetailsResponse>(`/teams/${teamId}`);
  },

  makeBlock: async (params: MakeGroupBlockParams) => {
    const { startTime, endTime, groupId } = params;

    return await request.post<MakeGroupBlockResponse>(
      `/events/blockingTime/?team=${groupId}`,
      {
        startTime,
        endTime,
      }
    );
  },

  deleteBlock: async (params: DeleteGroupBlockParams) => {
    return await request.delete<DeleteGroupBlockResponse>(
      `/events/blockingTime/${params.blockTimeId}?team=${params.groupId}`
    );
  },

  sync: async ({ groupId }: { groupId: string }) => {
    return await request.get<GroupCalendarSyncResponse>(
      `/sync?team=${groupId}`
    );
  },

  getGroupCalendarPreview: async (params: GetGroupCalendarPreviewParams) => {
    const { team, ...rest } = params;
    return await request.post<GetGroupCalendarPreviewResponse>(
      `/reservationPages/preview2?team=${team}`,
      { ...rest }
    );
  },

  getGroupCalendar: async (params: GetGroupWeeklyEventParams) => {
    const { startDate, endDate, groupId, members } = params;

    return await request.get<GetGroupWeeklyEventResponse>(
      `/events/team?startDate=${startDate}&endDate=${endDate}&team=${groupId}&members=${members}`
    );
  },
};

export { groupCalendarAPI, GroupCalendarKeys };
