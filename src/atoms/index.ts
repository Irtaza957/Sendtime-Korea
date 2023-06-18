import { atom } from 'recoil';

import { SpaceProfileData } from '@api/space/SpaceApi';

import { STATE_KEYS } from './keys';

const userState = atom<UserInfo | null>({
  key: STATE_KEYS.userState,
  default: null,
});

const timezoneState = atom<Timezone[]>({
  key: STATE_KEYS.timezoneState,
  default: [],
});

const coreUserState = atom<CoreUserInfo | null>({
  key: STATE_KEYS.coreUserState,
  default: null,
});

const mySpaceProfileState = atom<SpaceProfileData | null>({
  key: STATE_KEYS.mySpaceProfileState,
  default: null,
});

export { coreUserState, mySpaceProfileState, timezoneState, userState };
