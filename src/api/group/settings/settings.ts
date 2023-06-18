import { request } from '../../Request';

const GroupSettingKeys = {
  get: () => ['getGroupSettingsData'] as const,
};

const groupSettingAPI = {
  getSettings: async (groupId: string) => {
    return await request.get<GetGroupSettingsResponse>(
      `/teams/${groupId}/settings`
    );
  },

  updateInfo: async (groupId: string, params: UpdateGroupSettingsParams) => {
    return await request.put<UpdateGroupSettingsResponse>(
      `/teams/${groupId}/settings`,
      params
    );
  },
};

export { groupSettingAPI, GroupSettingKeys };
