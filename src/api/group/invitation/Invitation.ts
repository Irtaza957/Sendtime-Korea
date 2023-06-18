import { request } from '@api/Request';

const GroupKeys = {
  getMembers: (groupId: string) => [groupId, 'getMembers'],
  getInvitees: (groupId: string) => [groupId, 'getInvitees'],
  getGroupInfo: (groupId: string) => [groupId, 'getGroupInfo'],
};

const groupManageAPI = {
  create: async (params: CreateGroupParams) => {
    return await request.post<CreateGroupResponse>(`/teams/`, params);
  },
  inviteMember: async (params: InviteMemberParams, groupId: string) => {
    const { data } = await request.post<InviteMemberResponse>(
      `v2/team/${groupId}/invite`,
      params
    );
  },

  participate: async (params: ParticipateParams, groupId: string) => {
    return await request.post<Response>(`/teams/${groupId}/joinTeam`, params);
  },

  editMyInfo: async (params: EditMyInfoParams, groupId: string) => {
    return await request.post<Response>(`/teams/${groupId}/myInfo`, params);
  },

  getMembers: async (groupId: string) => {
    return await request.get<GetMemberResponse>(`/teams/${groupId}/members`);
  },

  getInvitees: async (groupId: string) => {
    return await request.get<GetInviteesResponse>(
      `/teams/${groupId}/invitations`
    );
  },

  leaveGroup: async (groupId: string) => {
    return await request.post<LeaveTeamResponse>(`/teams/${groupId}/leaveTeam`);
  },

  getGroupInfo: async (groupId: string) => {
    return await request.get<GetGroupInfoResponse>(`/teams/${groupId}`);
  },

  deleteInvitee: async (groupId: string, memberId: string) => {
    return await request.delete<Response>(
      `/teams/${groupId}/invitations/${memberId}`
    );
  },
};
export { GroupKeys, groupManageAPI };
