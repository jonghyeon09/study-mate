import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import Splash from '@/components/Splash/Splash';

export default function Invite() {
  const [token] = useLocalStorage('token', '');
  const { query, push } = useRouter();
  const code = typeof query.code === 'string' ? query.code : undefined;

  useEffect(() => {
    if (!token) {
      push('/');
    }
  }, [push, token]);

  return <Splash />;
}
