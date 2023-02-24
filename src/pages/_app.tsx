import '@/styles/globals.css'
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
// styles
import '../styles/sidebar.css'
import '../components/Confirmbox/style.css'
import '../components/Controls/InputControl/style.css'
import '../components/Message/style.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);
