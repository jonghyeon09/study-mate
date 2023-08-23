import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { joinStudy } from '@/services/joinStudy';
import { useQuery } from '@tanstack/react-query';
import { getStudyList } from '@/services';

export default function Invite() {
  const [token] = useLocalStorage('token', '');
  const { query, push } = useRouter();
  const code = typeof query.code === 'string' ? query.code : undefined;
  const { data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      push('/');
    }
  }, [push, token]);

  useEffect(() => {
    if (!code || !token) return;

    try {
      const handleJoin = async () => {
        const { studyId } = await joinStudy({
          data: {
            code,
          },
        });

        push({
          pathname: '/study/[id]',
          query: {
            id: studyList?.userId,
            study: studyId,
          },
        });
      };
      handleJoin();
    } catch (error) {
      push('/');
    }
  }, [code, push, studyList?.userId, token]);
}
