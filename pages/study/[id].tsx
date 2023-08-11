import Layout from '@/components/common/Layout';
import { QueryClient } from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';

function Study() {
  return (
    <Layout>
      <StudyHeader></StudyHeader>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(['posts'], getPosts)

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

export default Study;
