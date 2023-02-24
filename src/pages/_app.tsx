import '@/styles/globals.css'
import type { AppType } from 'next/app';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { trpc } from '../utils/trpc';
// styles
import '../styles/sidebar.css'
import '../components/Confirmbox/style.css'
import '../components/Controls/InputControl/style.css'
import '../components/Message/style.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppType & {
  Component: NextPageWithLayout
}

const MyApp: AppPropsWithLayout = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
};
export default trpc.withTRPC(MyApp);
