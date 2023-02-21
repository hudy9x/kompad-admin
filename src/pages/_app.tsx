import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// styles
import '../styles/sidebar.css'
import '../components/Confirmbox/style.css'
import '../components/Controls/InputControl/style.css'
import '../components/Message/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
