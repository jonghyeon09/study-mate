import { useRouter } from 'next/router';
import useLocalStorage from './useLocalStorage';
import { useCallback } from 'react';

function useLoginRedirect() {
  const [token] = useLocalStorage('token');
  const router = useRouter();

  const redirectToMain = useCallback(() => {
    if (!token) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { redirectToMain };
}

export default useLoginRedirect;
