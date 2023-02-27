import { adminAuth } from "../../libs/firebase-admin";
import { middleware, procedure } from "../trpc";
import { TRPCError } from '@trpc/server';

const checkAccessToken = middleware(async ({ ctx, next }) => {
  let { req, res } = ctx;

  const cookieHeader = req.headers['set-cookie'];
  if(!cookieHeader) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const cookieParts = cookieHeader[0].split(';');
  const cookieValue = cookieParts[0].split('=')[1];

  const verifySessionCookie = await adminAuth.verifySessionCookie(cookieValue);
  if (!verifySessionCookie) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx
  });
});

export const adminProcedure = procedure.use(checkAccessToken)
