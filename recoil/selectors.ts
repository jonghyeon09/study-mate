import { selector } from 'recoil';
import { isLoginState } from './atoms';

const token = localStorage.getItem('token');

const loginSubscribeState = selector({
  key: 'loginSubscribeState',
  get: ({ get }) => {
    return get(isLoginState);
  },
  set: ({ set }) => {},
});
