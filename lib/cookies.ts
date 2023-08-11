import Cookies from 'js-cookie';

export const token = Cookies.get('token');

export const setToken = (token: string) => {
  return Cookies.set('token', token, { expires: 30 });
};

export const removeToken = () => {
  return Cookies.remove('token');
};
