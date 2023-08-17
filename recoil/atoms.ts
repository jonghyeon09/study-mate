import type { Study } from '@/types';
import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLogin',
  default: false,
});
/**선택한 스터디 */
export const currentStudyState = atom<Study | undefined>({
  key: 'currentStudy',
  default: undefined,
});
/**캘린더 날짜 선택 */
export const currentDateState = atom<string>({
  key: 'currentDate',
  default: '',
});

export const isOpenSideState = atom({
  key: 'isOpenSide',
  default: false,
});

export const isOpenMembersState = atom({
  key: 'isOpenMembers',
  default: false,
});
