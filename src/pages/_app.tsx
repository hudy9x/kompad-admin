import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// styles
import '../styles/sidebar.css'
import '../components/Confirmbox/styles.css'
import '../components/Controls/InputControl/styles.css'
import '../components/Message/style.css'


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
