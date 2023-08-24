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
export const currentDateState = atom<string | undefined>({
  key: 'currentDate',
  default: undefined,
});

export const isOpenSideState = atom({
  key: 'isOpenSide',
  default: false,
});

export const isOpenMembersState = atom({
  key: 'isOpenMembers',
  default: false,
});

export const isOpenStudyListState = atom({
  key: 'isOpenStudyList',
  default: false,
});

export const isCopyState = atom({
  key: 'isCopy',
  default: false,
});

export const isOpenCreateNoticeState = atom({
  key: 'isOpenCreateNotice',
  default: false,
});
