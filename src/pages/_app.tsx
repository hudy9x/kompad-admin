import '@/styles/globals.css'
import type { AppProps, AppType } from 'next/app';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { trpc } from '../utils/trpc';
// styles
import '../styles/sidebar.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
};
export default trpc.withTRPC(MyApp);
