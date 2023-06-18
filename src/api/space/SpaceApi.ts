import { Response } from '@api/Common';
import { request } from '@api/Request';

export const SpaceAPI = {
  getAllSpaces: () => {
    return request.get<SpaceListResponse>('/v2/space');
  },
  getEditData: (handle: string) => {
    return request.get(`/v2/space/${handle}`);
  },
  getSpace: (spaceHandle: string) => {
    return request.get<SpaceInfoResponse>(`/v2/space/${spaceHandle}`);
  },
  getSpaceProfiles: (spaceHandle: string) => {
    return request.get<SpaceProfileListResponse>(
      `/v2/space/${spaceHandle}/profiles`
    );
  },
  signUpAndCreateSpaceProfile: (
    signUpAndCreateSpaceProfileRequest: SignUpAndCreateSpaceProfileRequest
  ) => {
    return request.post<SpaceProfileInfoResponse>(
      '/v2/space/profile/signup',
      signUpAndCreateSpaceProfileRequest
    );
  },
  createSpace: (createSpaceRequest: CreateUpdateSpaceRequest) => {
    return request.post<SpaceInfoResponse>('/v2/space', createSpaceRequest);
  },
  updateSpace: (
    updateSpaceRequest: CreateUpdateSpaceRequest,
    handle: string
  ) => {
    return request.put<SpaceInfoResponse>(
      `/v2/space/${handle}`,
      updateSpaceRequest
    );
  },
  createSpaceProfile: (
    createSpaceProfileRequest: CreateSpaceProfileRequest
  ) => {
    return request.post<SpaceProfileInfoResponse>(
      '/v2/space/profile',
      createSpaceProfileRequest
    );
  },
  updateSpaceProfile: ({
    spaceId,
    profileId,
    updateSpaceProfileRequest,
  }: {
    spaceId: string;
    profileId: string;
    updateSpaceProfileRequest: UpdateSpaceProfileRequest;
  }) => {
    return request.put<SpaceProfileInfoResponse>(
      `/v2/space/profile/${spaceId}/${profileId}`,
      updateSpaceProfileRequest
    );
  },
  increaseProfileReactionCount: (profileId: string, reactionType: string) => {
    return request.post<SpaceProfileInfoResponse>(
      `/v2/space/profile/${profileId}/reaction/${reactionType}`
    );
  },
  uploadProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append('multipartFile', file);
    return request.post<Response<string>>(`/v2/space/profile/image`, formData);
  },
  createSpaceProfileInit: () => {
    return request.get<CreateSpaceProfileInitResponse>(
      '/v2/space/profile/init'
    );
  },
  sendMessage: (params: SendMessageRequest) => {
    return request.post('/v2/space/profile/send/message', params);
  },
};

export interface SpaceData {
  id: string;
  hostId: string;
  handle: string;
  title: string;
  localizedTitles: LocalizedText[];
  todayViews: number;
  isProfileCreateAllowed: boolean;
  description?: string;
  localizedDescriptions?: LocalizedText[];
  imageUrl?: string;
  imageConfig?: SpaceProfileImageConfig;
  particleConfig?: SpaceParticleConfig;
  profileCreateConfig?: SpaceProfileCreateConfig;
  profileCategoryConfig?: SpaceProfileCategoryConfig;
  isReactionsDisabled: boolean;
  isPrimaryButtonDisabled: boolean;
  isAccessLimitedToOnlyCardOwners: boolean;
  isChannelTalkDisabled: boolean;
  enterCode?: string;
  contactPoints: SpaceContactPointData[];
  profileSortingType?: 'RANDOM' | 'TITLE';
  isProfileSortingDescending?: boolean;
  isNeedPayments: boolean;
  isNeedMessaging?: boolean;
}

export interface SpaceParticleConfig {
  images?: SpaceParticleImage[];
  sizeValue?: SpaceParticleRangeValue;
  moveSpeed?: SpaceParticleRangeValue;
  numberDensityArea?: number;
  numberValue?: number;
}

export interface SpaceParticleImage {
  url: string;
  width?: number;
  height?: number;
}

export interface SpaceParticleRangeValue {
  min: number;
  max: number;
}

export interface SpaceProfileCreateConfig {
  defaultLanguage: string;
  localizedCreateButtonLabels?: LocalizedText[];
  preShowEmbedHtml?: string;
  localizedPreShowTitles?: LocalizedText[];
  localizedPreShowDescriptions?: LocalizedText[];
  supportedSocials?: SpaceSupportedSocial[];
  customAgreementConfigs?: CustomAgreementConfig[];
  localizedCustomAgreementTitle?: LocalizedText[];
}

export type SpaceSupportedSocial = 'LINKEDIN' | 'INSTAGRAM' | 'TWITTER';

export interface CustomAgreementConfig {
  id: string;
  localizedHtmls: LocalizedText[];
  isRequired: boolean;
}

export interface SpaceProfileCategoryConfig {
  defaultLanguage: string;
  localizedCategoryLabels: LocalizedText[];
  categoryItems: SpaceProfileCategoryItem[];
}

export interface SpaceProfileCategoryItem {
  id: string;
  localizedNames: LocalizedText[];
  color?: string;
}

export interface LocalizedText {
  language: string;
  text: string;
}

export interface SpaceContactPointData {
  type: 'PHONE' | 'EMAIL' | 'WEBSITE';
  value: string;
}

export interface SpaceProfileData {
  id: string;
  memberId: string;
  spaceId: string;
  reservationPageId?: string;
  title: string;
  categoryId?: string;
  description?: string;
  expandableDescription?: string;
  imageUrl?: string;
  imageConfig?: SpaceProfileImageConfig;
  tags: string[];
  color?: string;
  links?: SpaceProfileLink[];
  isDescriptionUsingHtml: boolean;
  reactions: ProfileReactionData[];
  timeUnits?: number[];
  locations?: {
    id: string;
    name: string;
    type: string;
  }[];
  primaryButtonConfig?: {
    defaultLanguage: string;
    localizedLabels: LocalizedText[];
  };
  paymentsLink?: string;
  paymentsStatus?: 'PENDING' | 'SUCCESS' | 'CANCELED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

export interface SpaceProfileImageConfig {
  fitType?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  borderRadius?: number;
  width?: string;
  height?: string;
}

export interface SpaceProfileLink {
  url: string;
  label: string;
  iconId: string;
  size?: number;
  color?: string;
}

export interface ProfileReactionData {
  type: 'HEART' | 'HAND_SHAKE';
  count: number;
}

export interface CreateSpaceProfileInitData {
  reservationPages: ReservationPageForSpaceProfileData[];
}

export interface ReservationPageForSpaceProfileData {
  uuid: string;
  pageName: string;
}

export interface SpaceInfoResponse extends Response<SpaceData> {}

export interface SpaceListResponse
  extends Response<{ spaceList: SpaceData[] }> {}

export interface SpaceProfileListResponse
  extends Response<{ spaceProfileList: SpaceProfileData[] }> {}

export interface SignUpAndCreateSpaceProfileRequest {
  signUpInfo: {
    email: string;
    name: string;
    phone?: string;
    timezone: Timezone;
    locale: string;
  };
  spaceProfileInfo: CreateSpaceProfileRequest;
}

export interface CreateSpaceProfileRequest {
  spaceId: string;
  reservationPageId?: string;
  title: string;
  tags: string[];
  categoryId?: string;
  description?: string;
  imageUrl?: string;
  color?: string;
  links?: SpaceProfileLink[];
  isExposeToSearchAgreed: boolean;
  isMarketingUseAgreed: boolean;
  customAgreements: {
    id: string;
    isAgreed: boolean;
  }[];
}

export interface UpdateSpaceProfileRequest {
  reservationPageId?: string;
  title: string;
  tags: string[];
  categoryId?: string;
  description?: string;
  expandableDescription?: string;
  imageUrl?: string;
  imageConfig?: SpaceProfileImageConfig;
  color?: string;
  links?: SpaceProfileLink[];
  isDescriptionUsingHtml?: boolean;
  primaryButtonConfig?: SpaceProfileData['primaryButtonConfig'];
}

export interface CreateUpdateSpaceRequest {
  handle?: string;
  title: string;
  isProfileCreateAllowed: boolean;
  description: string;
  imageUrl?: string;
  contactPoints: SpaceContactPointData[];
  profileSortingType?: string;
  isProfileSortingDescending?: boolean;
  isReactionsDisabled?: boolean;
  isAccessLimitedToOnlyCardOwners?: boolean;
  endterCode?: string | null;
}

export interface SendMessageRequest {
  spaceId: string;
  senderId: string;
  targetId: string;
  message: string;
}

export interface SpaceProfileInfoResponse extends Response<SpaceProfileData> {}

export interface CreateSpaceProfileInitResponse
  extends Response<CreateSpaceProfileInitData> {}
