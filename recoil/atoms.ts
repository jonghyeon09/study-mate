import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLogin',
  default: false,
});

export const currentStudy = atom({
  key: 'currentStudy',
  default: {
    id: null,
    name: null,
    role: null,
  },
});
