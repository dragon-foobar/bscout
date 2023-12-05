import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useState } from "react";
import Layout from '@/components/layout';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  
  return (
    <SessionProvider session={session}>
      <Layout {...pageProps}>
          <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
