import { adminRole } from '@/server/routers/role';
import { login } from '@/server/routers/login';
import * as trpcNext from '@trpc/server/adapters/next';

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: adminRole,
  createContext: () => ({}),
});
