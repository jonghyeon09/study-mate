import { useRouter } from 'next/router';

function useUpdateQuery() {
  const { pathname, query, push } = useRouter();
  /**
   * @param pathname '/post/[pid]'
   * @param newQuery '{ pid: post.id }'
   */
  const updateQuery = (
    pathname: string,
    newQuery: Record<string, string | number>
  ) => {
    push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    });
  };

  return { updateQuery };
}

export default useUpdateQuery;
