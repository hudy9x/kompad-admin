import { adminAuth } from "../libs/firebase-admin";
import { middleware, procedure } from "../trpc";
import { TRPCError } from '@trpc/server';

const checkAccessToken = middleware(async ({ ctx, next }) => {
  const accessToken = ctx.user?.accessToken;
  if (!accessToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  
  const verifyIdToken = await adminAuth.verifyIdToken(accessToken);
  if (!verifyIdToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user
    },
  });
});

export const adminProcedure = procedure.use(checkAccessToken)