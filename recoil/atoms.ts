import type { Study } from '@/types';
import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLogin',
  default: false,
});

export const currentState = atom<Study>({
  key: 'currentStudy',
  default: {
    studyId: '',
    enabled: false,
    studyLeadUserId: 0,
    description: '',
    role: '',
    openDate: '',
  },
});

export const currentDateState = atom<string | null>({
  key: '',
  default: null,
});
