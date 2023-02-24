import { z } from 'zod';
import { procedure, router } from '../trpc';
import { auth } from "../../libs/firebase";
import { messageError } from '@/components/Message';
import 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import admin from 'firebase-admin';

export const login = router({
  loginAdmin: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string()
      })
    )
    .query(({ input }) => {
      admin.auth().getUserByEmail(input.email)
      .then((user) => {
        if(!user.customClaims) {
          messageError('Access denied')
        }
        return signInWithEmailAndPassword(auth, input.email, input.password)
      })
    })
})

export type LoginRouter = typeof login;