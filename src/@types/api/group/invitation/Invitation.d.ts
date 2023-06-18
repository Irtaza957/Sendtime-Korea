type ResponseStatus = {
  status: {
    code: number;
    message: string;
  };
};

type CustomField = {
  label: string;
  required: boolean;
};
type CreateGroupParams = {
  teamName: string;
  teamDescription: string;
  calendarOpenPeriodInfo: {
    isInfinite: boolean;
    startDateTime: string;
    endDateTime: string;
  };
  openTimes: OpenTimesType;
  masking: boolean;
  customFieldSettings: CustomField[];
  customUrl?: string;
};

type TeamMemberType = {
  memberId: string;
  activationStatus: string;
  updateDateTime: string;
  email: string;
  phone: string;
  name: string;
  color: string;
  teamRole: 'LEADER';
  customFields: CustomField[];
  leader: boolean;
};
type CreateGroupResponse = ResponseStatus & {
  results: [
    {
      teamId: string;
      createDateTime: string;
      createMemberId: string;
      teamName: string;
      customUrl: string;
      teamDescription: string;
      calendarOpenPeriod: string;
      teamMembers: TeamMemberType[];
    }
  ];
};

type CustomFieldType = {
  label: string;
  value: string;
};
type TeamMemberInvitationType = {
  memberName: string;
  email: string;
  customFields: CustomFieldType[];
};
type InviteMemberParams = {
  invitationMemo: string;
  inviteMembers: TeamMemberInvitationType[];
};

type ExistMember = {
  memberId?: string;
  memberName: string;
  email: string;
  customFields?: CustomFieldType[];
  memo: string;
};
type InviteMemberResponse = ResponseStatus;

type ParticipateParams = {
  memberName: string;
  email: string;
  phone: string;
  customFields: CustomFieldType[];
  memo: string;
};

type ParticipantMember = {
  memberId: string;
  memberName: string;
  email: string;
  phone: string;
  color: string;
  memo: string;
  customFields: CustomFieldType[];
};
type InviteeMember = ParticipantMember & {
  status: string;
};

type GetMemberResponse = ResponseStatus & {
  results: ParticipantMember[];
};

type GetInviteesResponse = ResponseStatus & {
  results: InviteeMember[];
};

type LeaveTeamResponse = Response;

type EditMyInfoParams = ParticipateParams;

type GroupInfoTeamMember = {
  memberId: string;
  createDateTime: string;
  updateDateTime: string;
  color: string;
  organization: string;
  role: string;
  department: string;
  memo: string;
  teamRole: string;
  leader: boolean;
};
type CustomFieldSettingsType = {
  label: string;
  required: boolean;
};

type GetGroupInfoResponse = ResponseStatus & {
  results: [
    {
      teamId: string;
      createDateTime: string;
      createMemberId: string;
      teamName: string;
      customUrl: string;
      teamDescription: string;
      calendarOpenPeriod: string;
      teamMembers: GroupInfoTeamMember[];
      customFieldSettings: CustomFieldSettingsType[];
    }
  ];
};
