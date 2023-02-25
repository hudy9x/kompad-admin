import { z } from 'zod';
import { procedure, router } from '../trpc';
import { signInWithEmailAndPassword } from "firebase/auth";
import { adminAuth } from '../libs/firebase-admin';
import { auth } from '../libs/firebase';
import { CODE_ADMIN } from '@/enums';
import { serialize } from "cookie";

export const loginRouter = router({
  loginAdmin: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const res = await signInWithEmailAndPassword(auth, input.email, input.password);
        if (!res) {
          return ({
            status: CODE_ADMIN.ERR,
            mess: 'Unsuccessful',
            setCookie: ""
          })
        }
        const userRecord = await adminAuth.getUserByEmail(input.email);
        if (!userRecord.customClaims || !userRecord.customClaims.admin) {
          return ({
            status: CODE_ADMIN.ERR,
            mess: 'User not admin',
            setCookie: ""
          })
        }

        // create-session
        const idToken = await res.user.getIdToken();
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        const verifyIdToken = await adminAuth.verifyIdToken(idToken);
        if (!verifyIdToken) {
          return ({
            status: CODE_ADMIN.ERR,
            mess: 'Access token is not valid',
            setCookie: ""
          })
        }
        const accessToken = verifyIdToken.uid;
        const options = {
          path: "/",
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        return ({
          status: CODE_ADMIN.ADMIN,
          mess: 'Successfully',
          setCookie: serialize("session", accessToken, options)
        })
      } catch (er: any) {
        // return something to indicate failure
        return ({
          status: CODE_ADMIN.ERR,
          mess: er.code as string,
          setCookie: ""
        });
      }
    })
});






