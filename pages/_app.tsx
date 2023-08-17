import '@/styles/globals.css';
import '@/styles/customCalendar.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Splash from '@/components/Splash/Splash';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  const { events } = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleComplete);

    return () => {
      events.on('routeChangeStart', handleStart);
      events.on('routeChangeComplete', handleComplete);
    };
  }, [events]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <AnimatePresence>{isLoading && <Splash />}</AnimatePresence>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
