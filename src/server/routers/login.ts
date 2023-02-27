import { z } from 'zod';
import { procedure, router } from '../trpc';
import { adminAuth } from '../../libs/firebase-admin';
import { serialize } from "cookie";
import { LoginStatus } from '@/types';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export const addUserTokenRouter = router({
  addTokenUser: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        idToken: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      try {
        const userRecord = await adminAuth.getUserByEmail(input.email);
        if (!userRecord.customClaims || !userRecord.customClaims.admin) {
          return ({
            status: LoginStatus.Error,
            mess: 'User not admin',
          })
        }
        const decodedIdToken = await adminAuth.verifyIdToken(input.idToken);
        if (!decodedIdToken) {
          return ({
            status: LoginStatus.Error,
            mess: 'ID Token is not valid'
          })
        }
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await adminAuth.createSessionCookie(input.idToken, { expiresIn });
        const verifySessionCookie: DecodedIdToken = await adminAuth.verifySessionCookie(sessionCookie, true);
        if (!verifySessionCookie) {
          return ({
            status: LoginStatus.Error,
            mess: 'Verify failed',
          })
        }   
        const options = {
          path: "/",
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };
        await res.setHeader('Set-Cookie', serialize('user-token', sessionCookie, options));
        return ({
          status: LoginStatus.Success,
          mess: 'Successfully',
        })

      } catch (er: any) {
        // return something to indicate failure
        return ({
          status: LoginStatus.Error,
          mess: er.code as string,
        });
      }
    })
});






