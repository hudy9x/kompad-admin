import "@/styles/globals.css";
import "@/components/style.css";

import { useEffect } from "react";
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { initializeMessaging } from "@/libs/firebase-client";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    initializeMessaging()
  }, [])
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
