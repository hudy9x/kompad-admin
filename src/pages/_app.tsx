import '@/styles/globals.css'
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
// styles
import '../styles/sidebar.css'
import '../components/Confirmbox/style.css'
import '../components/Controls/InputControl/style.css'
import '../components/Message/style.css'
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@/server/routers';
import { httpBatchLink } from '@trpc/client';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          /** headers are called on every request */
          headers: () => {
            return {
              Authorization: localStorage.get('accessToken'),
            };
          },
          url: ''
        }),
      ],
    };
  },
})(MyApp);
