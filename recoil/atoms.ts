import type { Study } from '@/types';
import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLogin',
  default: false,
});
/**선택한 스터디 */
export const currentStudyState = atom<Study>({
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
/**캘린더 날짜 선택 */
export const currentDateState = atom<string | undefined>({
  key: '',
  default: undefined,
});
