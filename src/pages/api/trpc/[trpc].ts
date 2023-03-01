import { appRouter } from '@/server/routers/index';
import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '@/server/context';
// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
});
