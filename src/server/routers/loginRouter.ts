import { z } from 'zod';
import { procedure, router } from '../trpc';
import { signInWithEmailAndPassword } from "firebase/auth";
import { adminAuth } from '../libs/firebase-admin';
import { auth } from '../libs/firebase';

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
        const userRecord = await adminAuth.getUserByEmail(input.email);
        if (!userRecord.customClaims || !userRecord.customClaims.admin) {
          return 'USER KO PHAI ADMIN';
        }
        const authentication = await signInWithEmailAndPassword(auth, input.email, input.password);
        if(authentication) {
          return 'THANH CONG';
        } else {
          return 'THAT BAI'
        }
      } catch (er) {
        // return something to indicate failure
        return er;
      }
    })
});






